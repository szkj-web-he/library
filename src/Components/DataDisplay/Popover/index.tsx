/**
 * @file popover file
 * @date 2022-01-15
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */

import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Kite, ScrollComponent, useUpdateLayoutEffect } from "../../..";
import classNames from "../../../Unit/classNames";
import { isDomChild } from "../../../Unit/isDomChild";
import { useLatest } from "./../../../Hooks/useLatest";
import { OffsetProps, TriangleProps, defaultAttr } from "./Unit/defaultAttr";
import { KiteRoot } from "./Unit/rootContext";
import styles from "./style.module.scss";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The kite will fly around root
     */
    root: React.ReactElement | Element;
    /**
     * children
     */
    children?: React.ReactNode;
    /**
     * width : The width of the box where the triangle is located
     * height : The width of the box where the triangle is located
     * color : Triangle color
     * offset : Triangle offset
     */
    triangle?: {
        width: string;
        height: string;
        color?: string;
        offset?: {
            x?:
                | number
                | ((
                      val: number,
                      width: { triangle?: number; root: number; kite: number },
                  ) => number);
            y?:
                | number
                | ((
                      val: number,
                      height: { triangle?: number; root: number; kite: number },
                  ) => number);
        };
    };
    /**
     * offset of 'Kite'
     */
    offset?: {
        x?:
            | number
            | ((val: number, width: { triangle: number; root: number; kite: number }) => number);
        y?:
            | number
            | ((val: number, height: { triangle: number; root: number; kite: number }) => number);
    };
    /**
     * Where to put it in root
     */
    placement?: "lb" | "rb" | "cb" | "lt" | "rt" | "ct" | "rc" | "lc";
    /**
     * The direction of the main axis
     */
    direction?: "vertical" | "horizontal";
    /**
     * where to mount
     */
    mount?: Element;

    /**
     * 延时展示
     * 默认为150ms
     */
    delayShow?: number;
    /**
     * 延时隐藏
     * 默认为150ms
     */
    delayHidden?: number;
    /**
     * custom of this component
     */
    custom?: boolean;
    /**
     * show of popover
     */
    show?: boolean;
    /**
     *
     * 当可视状态改变时 触发
     *
     */
    handleVisibleChange?: (res: boolean) => void;
    /**
     * body className
     */
    bodyClassName?: string;
    /**
     * 当为disable为true的时候
     * hover无效
     */
    disable?: boolean;
    /**
     * 自适应宽高
     */
    autoSize?: boolean;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
    (
        {
            root,
            children,
            triangle,
            className,
            style,
            offset,
            placement = "ct",
            direction = "vertical",
            onMouseLeave,
            onMouseEnter,
            autoSize,
            mount,
            custom = false,
            show,
            handleVisibleChange,
            bodyClassName,
            delayShow = 150,
            delayHidden = 150,
            disable,
            ...props
        },
        ref,
    ) => {
        Popover.displayName = "Popover";
        /**
         * 是否可见
         */
        const [visible, setVisible] = useState(show ?? false);

        const [rootEl, setRootEl] = useState<Element | null>(null);

        /**
         * 最新的handleVisibleChange
         */
        const handleVisibleChangeRef = useLatest(handleVisibleChange);

        /**
         * 最新的disable的值
         */
        const disabledRef = useLatest(disable);

        /**
         * root的真实的hover状态
         */
        const rootHoverRef = useRef(false);

        /**
         * kite的真实的hover状态
         */
        const kiteHoverRef = useRef(false);

        /**
         * 最新的delayShow的值
         */
        const delayShowRef = useLatest(delayShow);
        /**
         * 最新的delayHidden的值
         */
        const delayHiddenRef = useLatest(delayHidden);

        /**
         * 延时展示的timer
         */
        const delayShowTimer = useRef<number | null>(null);
        /**
         * 延时隐藏的timer
         */
        const delayHiddenTimer = useRef<number | null>(null);
        /**
         * kite的mouseenter延时器
         */
        const kiteEnterTimer = useRef<number | null>(null);

        /**
         * 统一的 mouseenter的逻辑
         */
        const mouseenterFn = useRef(() => {
            if (disabledRef.current) {
                return;
            }
            delayHiddenTimer.current && window.clearTimeout(delayHiddenTimer.current);
            delayHiddenTimer.current = null;
            if (delayShowTimer.current) {
                return;
            }

            delayShowTimer.current = window.setTimeout(() => {
                delayShowTimer.current = null;
                setVisible(true);
            }, delayShowRef.current);
        });
        /**
         * 统一的 mouseleave的逻辑
         */
        const mouseleaveFn = useRef(() => {
            if (disabledRef.current) {
                return;
            }
            delayShowTimer.current && window.clearTimeout(delayShowTimer.current);
            delayShowTimer.current = null;
            if (delayHiddenTimer.current) {
                return;
            }

            delayHiddenTimer.current = window.setTimeout(() => {
                delayHiddenTimer.current = null;
                setVisible(false);
            }, delayHiddenRef.current || 17);
        });

        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        useLayoutEffect(() => {
            handleVisibleChangeRef.current?.(visible);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [visible]);

        useUpdateLayoutEffect(() => {
            setVisible(show ?? false);
            delayHiddenTimer.current && window.clearTimeout(delayHiddenTimer.current);
            delayHiddenTimer.current = null;
            delayShowTimer.current && window.clearTimeout(delayShowTimer.current);
            delayShowTimer.current = null;
        }, [show]);

        useEffect(() => {
            if (disable) {
                delayHiddenTimer.current && window.clearTimeout(delayHiddenTimer.current);
                delayHiddenTimer.current = null;
                delayShowTimer.current && window.clearTimeout(delayShowTimer.current);
                delayShowTimer.current = null;
                setVisible(false);
            } else if (rootHoverRef.current || kiteHoverRef.current) {
                mouseenterFn.current();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [disable]);

        /**
         * root的mouseEnter事件
         */
        useLayoutEffect(() => {
            const handleMouseEnter = () => {
                rootHoverRef.current = true;
                kiteEnterTimer.current && window.clearTimeout(kiteEnterTimer.current);
                kiteEnterTimer.current = null;
                mouseenterFn.current();
            };

            if (rootEl instanceof Element) {
                rootEl.addEventListener("mouseenter", handleMouseEnter);
                return () => {
                    rootEl.removeEventListener("mouseenter", handleMouseEnter);
                };
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [rootEl]);

        /**
         * root的mouseLeave事件
         */
        useEffect(() => {
            const handleMouseLeave = () => {
                rootHoverRef.current = false;
                mouseleaveFn.current();
            };

            if (rootEl instanceof Element) {
                rootEl.addEventListener("mouseleave", handleMouseLeave);
                return () => {
                    rootEl.removeEventListener("mouseleave", handleMouseLeave);
                };
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [rootEl]);

        /**
         * kite的mouseLeave事件
         */
        const handleKiteMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
            onMouseLeave?.(e);
            if (!isDomChild(e)) {
                return;
            }

            kiteEnterTimer.current && window.clearTimeout(kiteEnterTimer.current);
            kiteEnterTimer.current = null;
            kiteHoverRef.current = false;
            mouseleaveFn.current();
        };

        /**
         * kite的mouseEnter事件
         */
        const handleKiteMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
            onMouseEnter?.(e);
            if (!isDomChild(e)) {
                return;
            }

            kiteHoverRef.current = true;
            /**
             * 为什么要延时
             * 因为，
             * kite的mouseEnter会在 root的mouseleave之前执行，
             */
            kiteEnterTimer.current = window.setTimeout(() => {
                mouseenterFn.current();
            });
        };

        const classNameList: string[] = [];
        let defaultAttrData: {
            triangle: TriangleProps;
            offset: OffsetProps;
        } | null = null;

        if (!custom) {
            classNameList.push(styles[`popover_${direction}`]);
            defaultAttrData = rootEl ? defaultAttr(placement, direction) : null;
        }

        /**
         * 偏移设置
         */
        const offsetData = {
            x: offset?.x ?? defaultAttrData?.offset.x,
            y: offset?.y ?? defaultAttrData?.offset.y,
        };

        /**
         * 三角形属性
         */
        const triangleData: TriangleProps = {
            width: triangle?.width ?? defaultAttrData?.triangle.width ?? "0",
            height: triangle?.height ?? defaultAttrData?.triangle.height ?? "0",
            color: triangle?.color ?? defaultAttrData?.triangle.color,
            offset: {
                x: triangle?.offset?.x ?? defaultAttrData?.triangle.offset?.x,
                y: triangle?.offset?.y ?? defaultAttrData?.triangle.offset?.y,
            },
        };

        return (
            <KiteRoot.Provider value={setRootEl}>
                <Kite
                    root={root}
                    mount={mount}
                    show={visible}
                    style={style}
                    animate="fade"
                    onMouseLeave={handleKiteMouseLeave}
                    onMouseEnter={handleKiteMouseEnter}
                    className={classNameList.join(" ") + (className ? ` ${className}` : "")}
                    placement={placement}
                    direction={direction}
                    offset={offsetData}
                    triangle={triangleData}
                    bodyClassName={classNames(
                        { [styles.popover_body]: !custom, [styles.popover_autoSize]: autoSize },
                        bodyClassName,
                    )}
                    ref={ref}
                    {...props}
                >
                    {autoSize ? (
                        <ScrollComponent
                            className={styles.popover_scroll}
                            bodyClassName={styles.popover_scrollBody}
                        >
                            {children}
                        </ScrollComponent>
                    ) : (
                        children
                    )}
                </Kite>
            </KiteRoot.Provider>
        );

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    },
);
Popover.displayName = "Popover";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
