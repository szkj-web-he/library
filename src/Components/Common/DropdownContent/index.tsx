/**
 * @file
 * @date 2022-09-29
 * @author xuejie.he
 * @lastModify xuejie.he 2022-09-29
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { deepCloneData } from "../../..";
import useUpdateEffect from "../../../Hooks/useUpdateEffect";
import { DropdownProps, useDropdownContext } from "../Dropdown";
import { useDropdownClick } from "../Hooks/useDropdownClick";
import Portal from "../Portal";
import { TriggerProps } from "../Unit/type";
import { useLatest } from "./../../../Hooks/useLatest";
import { useDropdownPropsContext } from "./../Dropdown/index";
import { useBtnContextmenu } from "./Hooks/useBtnContextmenu";
import { useBtnDisable } from "./Hooks/useBtnDisable";
import { useBtnFocus } from "./Hooks/useBtnFocus";
import { useBtnHover } from "./Hooks/useBtnHover";
import { useBtnIsClick } from "./Hooks/useBtnIsClick";
import { useBtnClick } from "./Hooks/useClick";
import { useDelayChangeVisible } from "./Hooks/useDelayChangeVisible";
import { useInitBtnId } from "./Hooks/useInitBtn";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface DropdownContentProps extends DropdownProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * body className
     */
    bodyClassName?: string;
    /**
     * fn when visible change
     */
    handleVisibleChange?: (visible: boolean) => void;
    /**
     * 修改content是否可见的方法
     */
    changeVisibleFn?:
        | React.MutableRefObject<React.Dispatch<React.SetStateAction<boolean>> | undefined>
        | ((res: React.Dispatch<React.SetStateAction<boolean>> | undefined) => void);

    /**
     * 这个组件的事件id
     */
    eventId?: string;
    /**
     * ontransitionEnd callback
     * 当下拉框的过渡动画结束时
     */
    handleTransitionEnd?: () => void;
    /**
     * ontransitionStart callback
     * 当下拉框的过渡动画开始时
     */
    handleTransitionStart?: () => void;
    /**
     * ontransitionCancel callback
     * 当下拉框的过渡动画取消时
     */
    handleTransitionCancel?: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
    (
        {
            show,
            removeOnHide,
            cache,
            trigger,
            placement,
            direction,
            animate,
            triangle,
            offset,
            mount,
            disable,
            hideOnClick,
            delayOnShow,
            delayOnHide,
            changeVisibleFn,
            onClickCapture,
            onMouseEnter,
            onMouseLeave,
            onMouseDown,
            onFocus,
            onBlur,
            handleVisibleChange,
            eventId,
            style,
            children,
            tabIndex,
            ...props
        },
        ref,
    ) => {
        DropdownContent.displayName = "DropdownContent";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const portalRef = useRef<HTMLDivElement | null>(null);
        /**
         * dropdown的参数
         * eventName   组件间通讯的id
         */
        const {
            disable: globalDisable,
            trigger: globalTrigger,
            show: globalShow,
            delayOnShow: globalDelayOnShow,
            delayOnHide: globalDelayOnHide,
            hideOnClick: globalHideOnClick,
            ...globalParams
        } = useDropdownPropsContext();

        const btnIsClickEvent = useBtnIsClick(eventId);

        const [btnId, setBtnId] = useInitBtnId();

        const disableVal = useMemo(() => disable ?? globalDisable, [disable, globalDisable]);

        const triggerVal = useMemo(() => trigger ?? globalTrigger, [globalTrigger, trigger]);

        const triggerRef = useRef<{
            from?: TriggerProps | TriggerProps[];
            to?: TriggerProps | TriggerProps[];
        }>();

        /**
         * btn被禁用的状态
         */
        const btnDisable = useBtnDisable(eventId);

        /**
         * 自定义的可见状态
         *
         * 只要它是undefined，组件就做内部逻辑
         */
        const customVisible = useMemo(() => show ?? globalShow, [globalShow, show]);

        /**
         * 默认可见状态
         */
        const [visible, setVisible] = useState(customVisible ?? false);

        const { btn } = useDropdownContext();

        /**
         * 改变下拉是否可见的方法
         */
        const visibleChangeFn = useLatest(handleVisibleChange);

        const timer = useDropdownClick(
            customVisible === undefined,
            visible,
            btnIsClickEvent,
            () => {
                setVisible(false);
            },
            triggerVal,
        );

        /**
         * 处理从btn传递过来的左击事件
         */
        useBtnClick(
            customVisible === undefined,
            visible,
            btnDisable,
            (status) => {
                timer.current && window.clearTimeout(timer.current);
                setVisible(status);
            },
            (id) => {
                setBtnId(id);
            },
            btnId,
            eventId,
        );

        /**
         * 处理从btn传递过来的右击事件
         */
        useBtnContextmenu(
            customVisible === undefined,
            visible,
            btnDisable,
            (status) => {
                timer.current && window.clearTimeout(timer.current);
                setVisible(status);
            },
            (id) => {
                setBtnId(id);
            },
            eventId,
        );

        /**
         * 处理从btn传过来的hover事件
         */
        const btnHover = useBtnHover(
            customVisible === undefined,
            visible,
            btnDisable,
            (id) => {
                setBtnId(id);
            },
            eventId,
        );

        /**
         * 处理从btn传过来的focus事件
         */
        const btnFocus = useBtnFocus(
            customVisible === undefined,
            visible,
            btnDisable,
            (id) => {
                setBtnId(id);
            },
            btnId,
            eventId,
        );

        /**
         * content的hover状态
         * 会被disable和自定义的show影响
         */
        const [contentHover, setContentHover] = useState(false);

        /**
         * 真的hover状态
         *
         * 事件类型的触发
         * 会被disable和自定义的show影响
         */
        const contentHoverRef = useRef(false);

        /**
         * content的focus状态
         */
        const [contentFocus, setContentFocus] = useState(false);

        /**
         * 真的hover状态
         * 事件类型的触发
         */
        const contentFocusRef = useRef(false);

        /**
         * 处理hover逻辑
         */
        useDelayChangeVisible(
            btnHover,
            contentHover,
            (status) => {
                setVisible(status);
            },
            delayOnShow ?? globalDelayOnShow,
            delayOnHide ?? globalDelayOnHide,
        );

        /**
         * 处理focus逻辑
         */
        useDelayChangeVisible(
            btnFocus,
            contentFocus,
            (status) => {
                setVisible(status);
            },
            delayOnShow ?? globalDelayOnShow,
            delayOnHide ?? globalDelayOnHide,
        );

        /**
         * 将修改visible的方法暴露出去
         * 这样不仅可以做组件内的交互
         * 也可以让使用者自己做交互
         * 让两个交互合并起来都可以执行
         */
        if (changeVisibleFn) {
            if (typeof changeVisibleFn === "function") {
                changeVisibleFn(setVisible);
            } else {
                changeVisibleFn.current = setVisible;
            }
        }

        useUpdateEffect(() => {
            /**
             * 当自定义的可见状态被改变时
             */
            setVisible(() => customVisible ?? false);
        }, [customVisible]);

        /**
         * 当visible变化时
         */
        useEffect(() => {
            visibleChangeFn.current?.(visible);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [visible]);

        /**
         * 存储事件变化
         */
        useEffect(() => {
            triggerRef.current = {
                from: triggerRef.current?.to,
                to: deepCloneData(triggerVal),
            };
        }, [triggerVal]);

        useEffect(() => {
            if (
                triggerRef.current?.from?.includes("focus") &&
                !triggerRef.current?.to?.includes("focus") &&
                contentFocusRef.current
            ) {
                setContentFocus(false);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [triggerVal]);

        useEffect(() => {
            if (
                triggerRef.current?.to?.includes("focus") &&
                disableVal &&
                contentFocusRef.current
            ) {
                setContentFocus(false);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [disableVal]);

        useEffect(() => {
            if (
                triggerRef.current?.from?.includes("hover") &&
                !triggerRef.current?.to?.includes("hover") &&
                contentHoverRef.current
            ) {
                /**
                 * 当triggerVal变化的时候
                 * 从有hover事件变成了没有hover的时候
                 */
                setContentHover(false);
            } else if (
                !triggerRef.current?.from?.includes("hover") &&
                triggerRef.current?.to?.includes("hover") &&
                contentHoverRef.current
            ) {
                /**
                 * 当triggerValue变化的时候
                 * 从没有hover事件变成了有hover的时候
                 */

                setContentHover(true);
            }
        }, [triggerVal]);

        /**
         * 针对hover
         * 要判断disable和
         * 是否有自定义show的状态的判断
         */
        useEffect(() => {
            if (customVisible) {
                return;
            }
            if (triggerRef.current?.to === "hover") {
                if (disableVal) {
                    setContentHover(false);
                } else {
                    setContentHover(contentHoverRef.current);
                }
            }
        }, [disableVal, customVisible]);

        /**
         * 针对focus
         * 要判断disable和
         * 是否有自定义show的状态的判断
         */
        useEffect(() => {
            if (triggerRef.current?.to === "focus") {
                const el = portalRef.current;
                if (customVisible) {
                    if (el && el === document.activeElement) {
                        el.blur();
                    }
                } else {
                    setContentFocus(contentFocusRef.current);
                }
            }
        }, [customVisible]);

        /**
         * 下拉列表内容不做右击事件
         * 所以合并到click事件内
         *
         * 如需新增此事件 请做新的逻辑
         */
        const handleClick = () => {
            timer.current && window.clearTimeout(timer.current);
            /**
             * 如果有自定义的展示状态
             * 则取消内部的交互
             */
            if (customVisible !== undefined) {
                return;
            }

            const hideOnClickVal = hideOnClick ?? globalHideOnClick ?? true;

            if (
                (triggerVal?.includes("click") || triggerVal?.includes("contextmenu")) &&
                hideOnClickVal
            ) {
                setVisible(false);
            }
        };

        const handleMouseEnter = () => {
            contentHoverRef.current = true;
            /**
             * 如果有自定义的展示状态
             * 则取消内部的交互
             */
            if (customVisible !== undefined || disableVal) {
                return;
            }

            if (triggerVal?.includes("hover")) {
                setContentHover(true);
            }
        };

        const handleMouseLeave = () => {
            contentHoverRef.current = false;
            /**
             * 如果有自定义的展示状态
             * 则取消内部的交互
             */
            if (customVisible !== undefined || disableVal) {
                return;
            }
            if (triggerVal?.includes("hover")) {
                setContentHover(false);
            }
        };

        const handleFocus = () => {
            contentFocusRef.current = true;

            /**
             * 如果有自定义的展示状态
             * 则取消内部的交互
             */
            if (customVisible !== undefined) {
                return;
            }

            if (triggerVal === "focus" || triggerVal?.includes("focus")) {
                setContentFocus(true);
            }
        };
        const handleBlur = () => {
            contentFocusRef.current = false;

            /**
             * 如果有自定义的展示状态
             * 则取消内部的交互
             */
            if (customVisible !== undefined) {
                return;
            }

            if (triggerVal === "focus" || triggerVal?.includes("focus")) {
                setContentFocus(false);
            }
        };

        /**
         * 获取tabIndex的值
         */
        const tabIndexValue = () => {
            if (triggerVal === undefined) {
                return tabIndex;
            }

            if ((triggerVal === "focus" || triggerVal?.includes("focus")) && !disableVal) {
                return -1;
            }
            return undefined;
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        return (
            <Portal
                show={visible}
                direction={direction ?? globalParams.direction ?? "vertical"}
                placement={placement ?? globalParams.placement ?? "cb"}
                removeOnHidden={removeOnHide ?? globalParams.removeOnHide ?? true}
                cache={cache ?? globalParams.cache ?? true}
                ref={(el) => {
                    portalRef.current = el;
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                    }
                }}
                root={(btnId ? btn.current[btnId] : undefined) as Element | undefined}
                animate={animate ?? globalParams.animate}
                triangle={triangle ?? globalParams.triangle}
                offset={offset ?? globalParams.offset}
                mount={mount ?? globalParams.mount}
                onClickCapture={(e) => {
                    onClickCapture?.(e);
                    handleClick();
                }}
                onMouseEnter={(e) => {
                    onMouseEnter?.(e);
                    handleMouseEnter();
                }}
                onMouseLeave={(e) => {
                    onMouseLeave?.(e);
                    handleMouseLeave();
                }}
                onMouseDown={(e) => {
                    onMouseDown?.(e);
                }}
                onFocus={(e) => {
                    onFocus?.(e);
                    handleFocus();
                }}
                onBlur={(e) => {
                    onBlur?.(e);
                    handleBlur();
                }}
                style={style}
                tabIndex={tabIndexValue()}
                {...props}
            >
                {children}
            </Portal>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
DropdownContent.displayName = "DropdownContent";
