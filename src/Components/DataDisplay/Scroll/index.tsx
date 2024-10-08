/**
 * @file Scroll component
 * @date 2022-02-15
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, memo, startTransition, useEffect, useRef, useState } from "react";
import { getScrollValue, useDomDisplay, useDomResize } from "../../..";
import DragBar from "../../DataInput/Slider/Unit/dragBar";
import { Point } from "../../DataInput/Slider/Unit/type";
import { useLatest } from "./../../../Hooks/useLatest";
import styles from "./style.module.scss";
import { setScrollBar } from "./Unit/setScrollBar";
import { useHover } from "./Unit/useHover";
import { useMobile } from "./Unit/useMobile";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface ScrollProps extends React.DOMAttributes<HTMLDivElement> {
    /**
     * scroll content
     */
    children?: React.ReactNode;
    /**
     * width of this component
     */
    width?: string;
    /**
     * width of this component
     */
    height?: string;
    /**
     * handler scroll bar change
     */
    handleBarChange?: (res: {
        left: number;
        top: number;
        scrollHeight: number;
        scrollWidth: number;
        offsetHeight: number;
        offsetWidth: number;
        clientHeight: number;
        clientWidth: number;
    }) => void;
    /**
     * default scrollTop
     */
    defaultScrollTop?: number;
    /**
     * default scrollLeft
     */
    defaultScrollLeft?: number;
    /**
     * className of scroll component wrap
     */
    className?: string;
    /**
     * style of scroll component body
     */
    style?: React.CSSProperties;
    /**
     * className of scroll component body
     */
    bodyClassName?: string;
    /**
     * hidden scrollbar
     */
    hidden?: boolean | { x?: boolean; y?: boolean };
    /**
     * Is the default position for smooth scrollbars
     */
    isSmooth?: boolean;
    /**
     * Prevent event bubbling when mouse is on the bar
     */
    stopPropagation?: boolean;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ScrollComponent = memo(
    forwardRef<HTMLDivElement | null, ScrollProps>(
        (
            {
                hidden,
                children,
                width,
                height,
                handleBarChange,
                defaultScrollTop,
                defaultScrollLeft,
                className,
                style,
                isSmooth,
                stopPropagation = true,
                bodyClassName,
                ...props
            },
            ref,
        ) => {
            ScrollComponent.displayName = "ScrollComponent";
            /* <------------------------------------ **** STATE START **** ------------------------------------ */
            /************* This section will include this component HOOK function *************/

            const scrollEl = useRef<HTMLDivElement | null>(null);

            const smoothRef = useLatest(isSmooth);

            const [focus, setFocus] = useState(false);

            const mobileStatus = useMobile();

            const [isHover, cRef] = useHover();

            /**
             * ref状态的isHover
             */
            const isHoverRef = useLatest(isHover);
            /**
             * ref状态的focus
             */
            const focusRef = useLatest(focus);

            const verticalBarRef = useRef<HTMLDivElement | null>(null);
            const horizontalBarRef = useRef<HTMLDivElement | null>(null);

            /* <------------------------------------ **** STATE END **** ------------------------------------ */
            /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
            /************* This section will include this component parameter *************/

            useEffect(() => {
                const node = scrollEl.current;
                if (
                    typeof defaultScrollTop === "number" &&
                    node &&
                    defaultScrollTop !== node.scrollTop
                ) {
                    node.scrollTo({
                        top: defaultScrollTop,
                        behavior: smoothRef.current ? "smooth" : "auto",
                    });
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [defaultScrollTop]);

            useEffect(() => {
                const node = scrollEl.current;
                if (
                    typeof defaultScrollLeft === "number" &&
                    node &&
                    defaultScrollLeft !== node.scrollLeft
                ) {
                    node.scrollTo({
                        left: defaultScrollLeft,
                        behavior: smoothRef.current ? "smooth" : "auto",
                    });
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [defaultScrollLeft]);

            useEffect(() => {
                const node = scrollEl.current;
                if (!node) {
                    return;
                }

                if (focus || isHover) {
                    startTransition(() => {
                        setScrollBar(node);
                    });
                }
            }, [focus, isHover]);

            /**
             * 监听尺寸变化
             */
            useDomResize(
                scrollEl,
                () => {
                    if (isHoverRef.current || focusRef.current) {
                        startTransition(() => {
                            setScrollBar(scrollEl.current);
                        });
                    }
                },
                [],
            );

            /**
             * 监听dom变化
             */
            useEffect(() => {
                const node = scrollEl.current;

                const ob = new MutationObserver(() => {
                    if (isHoverRef.current || focusRef.current) {
                        startTransition(() => {
                            setScrollBar(scrollEl.current);
                        });
                    }
                });
                node &&
                    ob.observe(node, {
                        attributes: true,
                        characterData: true,
                        childList: true,
                        subtree: true,
                    });
                return () => {
                    ob.disconnect();
                };
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []);

            /**
             * 监听滚动容器的可见状态
             */
            useDomDisplay(scrollEl, () => {
                startTransition(() => {
                    const node = scrollEl.current;
                    setScrollBar(node);
                });
            });

            /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
            /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
            /************* This section will include this component general function *************/

            /**
             * 监听滚动
             * @param {React.UIEvent<HTMLDivElement>} e event
             */
            const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
                const el = e.currentTarget;
                handleBarChange?.({
                    left: el.scrollLeft,
                    top: el.scrollTop,
                    scrollHeight: el.scrollHeight,
                    scrollWidth: el.scrollWidth,
                    offsetHeight: el.offsetHeight,
                    offsetWidth: el.offsetWidth,
                    clientHeight: el.clientHeight,
                    clientWidth: el.clientWidth,
                });

                startTransition(() => {
                    setScrollBar(scrollEl.current);
                });
            };

            /**
             * 鼠标在纵轴滚动条上
             * 拖拽中
             */
            const handleDragMoveOfVertical = ({ pageY, offsetY }: Point) => {
                const node = scrollEl.current;
                if (!node) {
                    return;
                }
                const bar = verticalBarRef.current;
                if (!bar) {
                    return;
                }

                const y = pageY - offsetY;

                const { top } = node.getBoundingClientRect();

                const scrollData = getScrollValue();

                const val = y - (top + scrollData.y);

                /**
                 * 可滚动的高度
                 */
                const scrollHeight = node.scrollHeight - node.offsetHeight;
                /**
                 * 视口的可滚动高度
                 */
                const clientScrollHeight = node.offsetHeight - bar.offsetHeight;
                node.scrollTop = (val * scrollHeight) / clientScrollHeight;
            };

            /**
             * 展示滚动条
             */
            const showBar = () => {
                setFocus(true);
            };
            /**
             * 鼠标在横向滚动条上
             * 拖拽中
             */
            const handleDragMoveOfHorizontal = ({ pageX, offsetX }: Point) => {
                const node = scrollEl.current;
                if (!node) {
                    return;
                }
                const bar = horizontalBarRef.current;
                if (!bar) {
                    return;
                }
                const x = pageX - offsetX;

                const { left } = node.getBoundingClientRect();

                const scrollData = getScrollValue();

                const val = x - (left + scrollData.x);

                /**
                 * 可滚动的宽度
                 */
                const scrollWidth = node.scrollWidth - node.offsetWidth;
                /**
                 * 视口的可滚动宽度
                 */
                const clientScrollWidth = node.offsetWidth - bar.offsetWidth;

                node.scrollLeft = (val * scrollWidth) / clientScrollWidth;
            };

            const hiddenBar = () => {
                setFocus(false);
            };

            /********************* element ******************************************/
            /**
             * 纵向滚动条
             */
            const verticalBar =
                hidden === true || (typeof hidden === "object" && hidden?.y === true) ? (
                    <></>
                ) : (
                    <DragBar
                        className={`${styles.scroll_scrollBar__vertical}${
                            isHover || focus || mobileStatus
                                ? ` ${styles.scroll_scrollBar__active}`
                                : ""
                        }`}
                        ref={verticalBarRef}
                        handleDragStart={showBar}
                        handleDragMove={handleDragMoveOfVertical}
                        handleDragEnd={hiddenBar}
                        handleDragCancel={hiddenBar}
                        stopPropagation={stopPropagation}
                    />
                );

            /**
             * 横向滚动条
             */
            const horizontalBar =
                hidden === true || (typeof hidden === "object" && hidden?.x === true) ? (
                    <></>
                ) : (
                    <DragBar
                        className={`${styles.scroll_scrollBar__horizontal}${
                            isHover || focus || mobileStatus
                                ? ` ${styles.scroll_scrollBar__active}`
                                : ""
                        }`}
                        ref={horizontalBarRef}
                        handleDragStart={showBar}
                        handleDragMove={handleDragMoveOfHorizontal}
                        handleDragEnd={hiddenBar}
                        handleDragCancel={hiddenBar}
                        stopPropagation={stopPropagation}
                    />
                );

            /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
            return (
                <div
                    className={styles.scroll_scrollContainer + (className ? ` ${className}` : "")}
                    ref={(el) => {
                        cRef.current = el;

                        if (typeof ref === "function") {
                            ref(el);
                        } else if (ref !== null) {
                            (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                        }
                    }}
                    style={{ width, height }}
                    {...props}
                >
                    {verticalBar}
                    {horizontalBar}
                    <div
                        ref={scrollEl}
                        className={
                            styles.scroll_scrollBody + (bodyClassName ? ` ${bodyClassName}` : "")
                        }
                        style={Object.assign(
                            {},
                            style,
                            hidden === true ||
                                (typeof hidden === "object" && hidden?.x === true
                                    ? { overflowX: "hidden" }
                                    : {}),

                            hidden === true ||
                                (typeof hidden === "object" && hidden?.y === true
                                    ? { overflowY: "hidden" }
                                    : {}),
                        )}
                        onScroll={handleScroll}
                    >
                        {children}
                    </div>
                </div>
            );
        },
    ),
);
ScrollComponent.displayName = "ScrollComponent";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
