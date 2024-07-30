/**
 * @file
 * @date 2022-09-29
 * @author xuejie.he
 * @lastModify xuejie.he 2022-09-29
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useId, useMemo, useRef } from "react";
import { deepCloneData } from "../../..";
import classNames from "../../../Unit/classNames";
import { useDropdownMsgId, useDropdownPropsContext } from "../Dropdown";
import { TriggerProps } from "../Unit/type";
import { useLatest } from "./../../../Hooks/useLatest";
import { useDropdownContext } from "./../Dropdown/index";
import styles from "./style.module.scss";
import { joinMsgId } from "./Unit/joinStr";
import {
    BlurEvent,
    BtnIsClickEvent,
    ChangeDisable,
    ClickEvent,
    ContextmenuEvent,
    DropdownMsgType,
    FocusEvent,
    MouseenterEvent,
    MouseleaveEvent,
} from "./Unit/type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface DropdownBtnProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Type of interaction
     */
    trigger?: TriggerProps | TriggerProps[];
    /**
     * children of this component
     */
    children?: React.ReactNode;
    /**
     * disable of this component
     */
    disable?: boolean;

    /**
     * dropdown拓展
     * 可以实现1对多、多对多的功能
     * 1、n 个btn 可以对应多个content 且事件可以分类管理
     */
    /**
     * hover事件对应的那个content、btn id
     */
    hoverId?: string;
    /**
     * focus事件对应的那个content、btn id
     */
    focusId?: string;
    /**
     * click事件对应的那个content、btn id
     */
    clickId?: string;
    /**
     * contextmenu事件对应的那个content、btn id
     */
    contextmenuId?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const DropdownBtn = forwardRef<HTMLDivElement, DropdownBtnProps>(
    (
        {
            trigger,
            onClick,
            onMouseEnter,
            onMouseLeave,
            onFocus,
            onBlur,
            onContextMenu,
            onMouseDown,
            children,
            disable,
            hoverId,
            focusId,
            onMouseUp,
            clickId,
            contextmenuId,
            style,
            className,
            tabIndex,
            ...props
        },
        ref,
    ) => {
        DropdownBtn.displayName = "DropdownBtn";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const { trigger: triggerContext, disable: gDisable } = useDropdownPropsContext();

        const msgId = useDropdownMsgId();

        const { btn } = useDropdownContext();

        const id = useId();

        /**
         * btn的触发下拉事件的类型
         * 先看局部属性
         * 再看全局属性
         */
        const triggerValue = useMemo(() => {
            return trigger ? trigger : triggerContext;
        }, [triggerContext, trigger]);

        const triggerRef = useRef<{
            from?: TriggerProps | TriggerProps[];
            to?: TriggerProps | TriggerProps[];
        }>();

        /**
         * 是否禁用
         * 先看局部
         * 再看全局
         */
        const disableVal = useMemo(() => disable ?? gDisable, [disable, gDisable]);

        /**
         * 存储获焦状态
         */
        const focusStatus = useRef(false);
        /**
         * 存储hover状态
         */
        const hoverStatus = useRef(false);

        /**
         *
         */
        const hoverIdRef = useLatest(hoverId);
        const focusIdRef = useLatest(focusId);
        const clickIdRef = useLatest(clickId);
        const contextmenuIdRef = useLatest(contextmenuId);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /**
         * 存储事件变化
         */
        useEffect(() => {
            triggerRef.current = {
                from: triggerRef.current?.to,
                to: deepCloneData(triggerValue),
            };
        }, [triggerValue]);

        /**
         * 切换事件类型
         * 从 focus
         */
        useEffect(() => {
            if (
                triggerRef.current?.from?.includes("focus") &&
                !triggerRef.current?.to?.includes("focus") &&
                focusStatus.current
            ) {
                const eventData: BlurEvent = {
                    event: DropdownMsgType.blur,
                    id,
                };

                const event = new CustomEvent(joinMsgId(msgId, focusId), {
                    detail: eventData,
                });
                document.dispatchEvent(event);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [triggerValue]);

        useEffect(() => {
            if (triggerRef.current?.to?.includes("focus") && disableVal && focusStatus.current) {
                const eventData: BlurEvent = {
                    event: DropdownMsgType.blur,
                    id,
                };

                const event = new CustomEvent(joinMsgId(msgId, focusId), {
                    detail: eventData,
                });
                document.dispatchEvent(event);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [disableVal]);

        /**
         * 告诉'我'对应的content
         * '我'是可以点击的
         */
        useEffect(() => {
            const eventData: BtnIsClickEvent = {
                event: DropdownMsgType.isClick,
                value: !!(triggerValue?.includes("click") || triggerValue?.includes("contextmenu")),
            };

            if (!clickIdRef.current && !contextmenuIdRef.current) {
                /**
                 * 给对应的content发送消息
                 */
                const event = new CustomEvent(msgId, {
                    detail: eventData,
                });
                document.dispatchEvent(event);
                return;
            }
            /**
             * 给对应的click content发送消息
             */
            const clickEvent = new CustomEvent(joinMsgId(msgId, clickIdRef.current), {
                detail: eventData,
            });
            document.dispatchEvent(clickEvent);

            /**
             * 给对应的contextmenu content发送消息
             */
            const menuEvent = new CustomEvent(joinMsgId(msgId, contextmenuIdRef.current), {
                detail: eventData,
            });
            document.dispatchEvent(menuEvent);

            if (!clickIdRef.current || !contextmenuIdRef.current) {
                /**
                 * 给对应的content发送消息
                 */
                const event = new CustomEvent(msgId, {
                    detail: eventData,
                });
                document.dispatchEvent(event);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [triggerValue]);

        useEffect(() => {
            if (
                triggerRef.current?.from?.includes("hover") &&
                !triggerRef.current?.to?.includes("hover") &&
                hoverStatus.current
            ) {
                /**
                 * 当triggerValue变化的时候
                 * 从有hover事件变成了没有hover的时候
                 */

                const eventData: MouseleaveEvent = {
                    event: DropdownMsgType.mouseleave,
                    id,
                };

                const event = new CustomEvent(joinMsgId(msgId, hoverIdRef.current), {
                    detail: eventData,
                });
                document.dispatchEvent(event);
            } else if (
                !triggerRef.current?.from?.includes("hover") &&
                triggerRef.current?.to?.includes("hover") &&
                hoverStatus.current
            ) {
                /**
                 * 当triggerValue变化的时候
                 * 从没有hover事件变成了有hover的时候
                 */

                const eventData: MouseenterEvent = {
                    event: DropdownMsgType.mouseenter,
                    id,
                };

                const event = new CustomEvent(joinMsgId(msgId, hoverIdRef.current), {
                    detail: eventData,
                });
                document.dispatchEvent(event);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [id, msgId, triggerValue]);

        useEffect(() => {
            /**
             * 在btn的id生成的时候
             * 就把id告诉content
             * 避免在自定义控制show的时候 找不到btn
             */
            const event = new CustomEvent(msgId, {
                detail: {
                    event: DropdownMsgType.initBtn,
                    id,
                },
            });
            document.dispatchEvent(event);
        }, [id, msgId]);

        useEffect(() => {
            const dispatchFn = (joinId?: string) => {
                const eventData: ChangeDisable = {
                    event: DropdownMsgType.changeDisable,
                    disable: disableVal ?? false,
                };

                const event = new CustomEvent(joinMsgId(msgId, joinId), {
                    detail: eventData,
                });
                document.dispatchEvent(event);
            };

            /**
             * 告诉content组件
             * disable改变了
             */

            dispatchFn(hoverIdRef.current);

            dispatchFn(focusIdRef.current);

            dispatchFn(clickIdRef.current);

            dispatchFn(contextmenuIdRef.current);

            dispatchFn();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [msgId, disableVal]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        /**
         * 点击事件
         */
        const handleClick = () => {
            if (triggerValue === "click" || triggerValue?.includes("click")) {
                const eventData: ClickEvent = {
                    event: DropdownMsgType.click,
                    id,
                };

                const event = new CustomEvent(joinMsgId(msgId, clickId), {
                    detail: eventData,
                });
                document.dispatchEvent(event);
            }
        };

        /**
         * hover事件
         *  鼠标移入
         */
        const handleMouseEnter = () => {
            hoverStatus.current = true;

            if (triggerValue === "hover" || triggerValue?.includes("hover")) {
                const eventData: MouseenterEvent = {
                    event: DropdownMsgType.mouseenter,
                    id,
                };

                const event = new CustomEvent(joinMsgId(msgId, hoverId), {
                    detail: eventData,
                });
                document.dispatchEvent(event);
            }
        };

        /**
         * hover事件
         * 鼠标移出
         */
        const handleMouseLeave = () => {
            hoverStatus.current = false;
            if (triggerValue === "hover" || triggerValue?.includes("hover")) {
                const eventData: MouseleaveEvent = {
                    event: DropdownMsgType.mouseleave,
                    id,
                };

                const event = new CustomEvent(joinMsgId(msgId, hoverId), {
                    detail: eventData,
                });
                document.dispatchEvent(event);
            }
        };

        /**
         * focus事件
         * 获焦事件
         */
        const handleFocus = () => {
            focusStatus.current = true;
            if (triggerValue === "focus" || triggerValue?.includes("focus")) {
                const eventData: FocusEvent = {
                    event: DropdownMsgType.focus,
                    id,
                };

                const event = new CustomEvent(joinMsgId(msgId, focusId), {
                    detail: eventData,
                });
                document.dispatchEvent(event);
            }
        };

        /**
         * focus事件
         * 失去焦点事件
         */
        const handleBlur = () => {
            focusStatus.current = false;
            if (triggerValue === "focus" || triggerValue?.includes("focus")) {
                const eventData: BlurEvent = {
                    event: DropdownMsgType.blur,
                    id,
                };

                const event = new CustomEvent(joinMsgId(msgId, focusId), {
                    detail: eventData,
                });
                document.dispatchEvent(event);
            }
        };

        /**
         * contextmenu事件
         */
        const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
            if (triggerValue === "contextmenu" || triggerValue?.includes("contextmenu")) {
                const eventData: ContextmenuEvent = {
                    event: DropdownMsgType.contextmenu,
                    id,
                };

                e.preventDefault();
                const event = new CustomEvent(joinMsgId(msgId, contextmenuId), {
                    detail: eventData,
                });
                document.dispatchEvent(event);
            }
        };

        /**
         * 获取tabIndex的值
         */
        const tabIndexValue = () => {
            if (triggerValue === undefined) {
                return tabIndex;
            }

            if ((triggerValue === "focus" || triggerValue?.includes("focus")) && !disableVal) {
                return -1;
            }
            return undefined;
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                ref={(el) => {
                    btn.current[id] = el;

                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        ref.current = el;
                    }
                }}
                onClick={(e) => {
                    onClick?.(e);
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
                onMouseUp={(e) => {
                    onMouseUp?.(e);
                }}
                onFocus={(e) => {
                    onFocus?.(e);
                    handleFocus();
                }}
                onBlur={(e) => {
                    onBlur?.(e);
                    handleBlur();
                }}
                tabIndex={tabIndexValue()}
                onContextMenu={(e) => {
                    onContextMenu?.(e);
                    handleContextMenu(e);
                }}
                style={style}
                className={classNames(className, {
                    [styles.dropdownBtn_disable]: disableVal,
                })}
                {...props}
            >
                {children}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
DropdownBtn.displayName = "DropdownBtn";
