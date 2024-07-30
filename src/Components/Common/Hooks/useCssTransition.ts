/**
 * @file css过渡
 * @date 2022-09-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-09-08
 */

import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { TransitionStatus } from "../../../DefaultData/Transition";
import { useStateCallback } from "../../../Hooks/useStateCallback";
import { useUnmount } from "../../../Hooks/useUnmount";
import { deepCloneData } from "../../../Unit/deepCloneData";
import { SizeProps } from "../Kite/Unit/type";
import { setTransitionClass } from "../Transition/Unit/addClass";
import { setStyle } from "../Transition/Unit/addStyle";
import { forceReflow } from "../Transition/Unit/forceReflow";
import { getTransitionAttr } from "../Transition/Unit/getTransitionAttr";
import {
    GetClassNameProps,
    InitClassNameProps,
    initClassName,
} from "../Transition/Unit/initClassName";
import styles from "../Transition/style.module.scss";
import { useLatest } from "./../../../Hooks/useLatest";

/**
 *
 * 通过解读 react-transition-group这个库
 * 发现，这个hook不是很react
 * 存在弊端
 * 因为没有setState的存在，导致了一直操作的是真实dom，这样会发生当使用者在setState的时候，数据丢失
 *
 */

export enum ActionType {
    /**
     * 赋值过渡类名
     */
    SetClassNameAction = "SETCLASSNAME",
    /**
     * 切换可见状态
     * 合并了 获取宽高 和 切换可见状态
     */
    SwitchVisibleStatusAction = "SWITCHVISIBLESTATUS",
}
/**
 * 赋值过渡类名
 */
interface SetClassNameAction {
    type: ActionType.SetClassNameAction;
    payload: InitClassNameProps;
}

/**
 * 切换可见状态
 * 合并了 获取宽高 和 切换可见状态
 */
interface SwitchVisibleStatusAction {
    type: ActionType.SwitchVisibleStatusAction;
    payload: {
        value: boolean;
        isTransition: boolean;
    };
}

export function compareFn<T>(newData: T, oldData: T): T {
    if (typeof newData === "object" || typeof oldData === "object") {
        if (JSON.stringify(newData) === JSON.stringify(oldData)) {
            return oldData;
        }

        return newData;
    }

    return newData;
}

type TransitionAction = SetClassNameAction | SwitchVisibleStatusAction;

interface InsertAttrProps {
    className: Array<string>;
    style?: React.CSSProperties;
}

/**
 * transition-clock  用来获取过渡之前的数据
 * @param {((show: boolean) => void) | undefined} onTransitionStart 过渡开始的回调 参数show表示 正在执行的是哪个过渡状态 show===true时，可见动画 ;show===false时，隐藏动画
 * @param {((show: boolean) => void) | undefined} onTransitionEnd 过渡结束的回调 参数show表示 正在执行的是哪个过渡状态 show===true时，可见动画 ;show===false时，隐藏动画
 * @param {((show: boolean) => void) | undefined} onTransitionCancel 过渡取消的回调 参数show表示 正在执行的是哪个过渡状态 show===true时，可见动画 ;show===false时，隐藏动画
 * @param {MutableRefObject<HTMLDivElement | null>} node 要执行过渡的节点
 * @param {number | "auto" = "auto"} width 宽度  当 过渡属性是 'wider' 时，最好给一个明确的值
 * @param {number | "auto" = "auto"} height 高度  当 过渡属性是 'taller' 时，最好给一个明确的值
 * @param {React.CSSProperties} style node的样式 node会一直拥有的样式
 * @param {(res?: TransitionStatus) => void} handleTransitionProgressChange 当过渡进度发生变化的时候
 * @returns {[(action: TransitionAction) => void, InsertAttrProps]}
 */
export const useCssTransition = (
    onTransitionStart: ((show: boolean) => void) | undefined,
    onTransitionEnd: ((show: boolean) => void) | undefined,
    onTransitionCancel: ((show: boolean) => void) | undefined,
    node: MutableRefObject<HTMLDivElement | null>,
    width: number | "auto" = "auto",
    height: number | "auto" = "auto",
    style?: React.CSSProperties,
    handleTransitionProgressChange?: (res?: TransitionStatus) => void,
): [(action: TransitionAction) => void, InsertAttrProps] => {
    /**
     * 过渡切换时的类名
     */
    const transitionClassName = useRef<GetClassNameProps>();
    /**
     * 是否有过渡动画
     */
    const isTransition = useRef(false);

    const [show, setShow] = useState<boolean>();
    const showRef = useRef<boolean>();

    /**
     * 过渡属性
     */
    const animationName = useRef<InitClassNameProps["type"]>();

    /**
     * 最新的宽高
     */
    const widthRef = useLatest(width);
    const heightRef = useLatest(height);

    /**
     * 过渡状态
     */
    const [attr, setAttr] = useStateCallback<InsertAttrProps>({
        className: [styles.transition_hidden],
        style: undefined,
    });
    const attrRef = useLatest<InsertAttrProps>({
        className: [styles.transition_hidden],
        style: undefined,
    });

    /**
     * 用户设置的样式
     */
    const styleRef = useLatest(style);

    /**
     * 过渡状态
     *
     * ENTERING => 执行 enter 状态中
     * LEAVING => 执行 leave 状态中
     */
    const transitionStatus = useRef<"ENTERING" | "LEAVING" | null>(null);

    /**
     * 正在执行什么任务
     */
    const taskStatus = useRef<TransitionStatus | null>(null);

    /**
     * 延时执行的timer
     */
    const timer = useRef<number | null>(null);

    /**
     * 最新的handleTransitionProgressChange
     */
    const handleTransitionProgressChangeRef = useLatest(handleTransitionProgressChange);

    /**
     * 最新的过渡方法回调
     */
    const transitionStartFn = useLatest((show: boolean) => {
        if (transitionStatus.current) {
            timer.current && window.clearTimeout(timer.current);
            onTransitionCancel?.(transitionStatus.current === "ENTERING");
        }
        transitionStatus.current = show ? "ENTERING" : "LEAVING";
        onTransitionStart?.(show);
    });
    const transitionEndFn = useLatest((show: boolean) => {
        onTransitionEnd?.(show);
        transitionStatus.current = null;
    });
    const transitionCancelFn = useLatest((show: boolean) => {
        onTransitionCancel?.(show);
        transitionStatus.current = null;
    });

    /**
     * dom尺寸
     */
    const nodeSize = useRef<SizeProps>();

    /**
     * 监听show的展示状态变化
     */
    useEffect(() => {
        const root = node.current;

        /**判断是否有过渡类名 */
        const hasClassClassValue = (res: "enter" | "leave") => {
            if (!transitionClassName.current || !root) {
                return false;
            }
            const data = transitionClassName.current[res];
            return !!(data.active || data.from || data.to);
        };

        /**
         * 操作dom属性
         * @param res dom属性值
         * @param isForceReflow 是否需要刷新dom
         * @returns
         */
        const changeAttr = (
            el: HTMLElement,
            res: InsertAttrProps,
            isForceReflow: boolean = false,
        ) => {
            return new Promise((resolve) => {
                //操作样式
                setTransitionClass(el, res.className.join(" "), attrRef.current.className);

                setStyle(el, { ...styleRef.current, ...res.style });

                attrRef.current = deepCloneData(res);
                setAttr(deepCloneData(res), () => {
                    resolve(undefined);
                });
                if (isForceReflow) {
                    forceReflow();
                }
            });
        };

        /**
         * 设置过渡进度
         */
        const setTransitionProgress = (res?: TransitionStatus) => {
            handleTransitionProgressChangeRef.current?.(res);
            taskStatus.current = res ?? null;
        };

        const transitionClass = transitionClassName.current;

        /**
         * 结束进入
         */
        const enterEnd = () => {
            if (!root) {
                // root不见，取消过渡
                transitionCancelFn.current?.(true);
                return;
            }
            setTransitionProgress("ENTER-DONE");

            const delayTimeVal = getTransitionAttr(root).timeout; //获取root的过渡市场，延时+持续

            timer.current = window.setTimeout(() => {
                void changeAttr(root, {
                    className: [],
                    style: undefined,
                }).finally(() => {
                    readSize();
                    setTransitionProgress();
                    transitionEndFn.current?.(true);
                });
            }, delayTimeVal);
        };

        /**
         *  进入 后
         */
        const enterTo = () => {
            if (!transitionClass || !root) {
                // 过渡属性不见，取消过渡
                // root不见，取消过渡
                transitionCancelFn.current?.(true);
                return;
            }
            setTransitionProgress("ENTER-TO");

            let styleData: React.CSSProperties | undefined = undefined;
            if (nodeSize.current) {
                switch (animationName.current) {
                    case "taller":
                        styleData = {
                            height: `${nodeSize.current.height}px`,
                        };
                        break;
                    case "wider":
                        styleData = {
                            width: `${nodeSize.current.width}px`,
                        };
                        break;
                    default:
                        break;
                }
            }

            return new Promise((resolve) => {
                void changeAttr(root, {
                    className: [transitionClass.enter.active, transitionClass.enter.to],
                    style: styleData,
                }).finally(() => {
                    setTransitionProgress();
                    resolve(undefined);
                });
            });
        };

        /**
         * 进入前
         */
        const enterFrom = () => {
            if (!transitionClass || !root) {
                // 过渡属性不见，取消过渡
                // root不见，取消过渡
                transitionCancelFn.current?.(true);
                return;
            }
            setTransitionProgress("ENTER-FROM");
            return new Promise((resolve) => {
                void changeAttr(
                    root,
                    {
                        className: [transitionClass.enter.from, transitionClass.enter.active],
                    },
                    true,
                ).finally(() => {
                    setTransitionProgress();
                    resolve(undefined);
                });
            });
        };

        /**
         * 结束离开
         */
        const leaveEnd = () => {
            if (!root) {
                // root不见，取消过渡
                transitionCancelFn.current?.(false);
                return;
            }
            setTransitionProgress("LEAVE-DONE");

            const delayTimeVal = getTransitionAttr(root).timeout; //获取root的过渡市场，延时+持续

            timer.current = window.setTimeout(() => {
                void changeAttr(root, {
                    className: [styles.transition_hidden],
                    style: undefined,
                }).finally(() => {
                    setTransitionProgress();
                    transitionEndFn.current?.(false);
                });
            }, delayTimeVal);
        };

        /**
         * 离开
         */
        const leaveTo = () => {
            if (!transitionClass || !root) {
                // 过渡属性不见，取消过渡
                // root不见，取消过渡
                transitionCancelFn.current?.(false);
                return;
            }
            setTransitionProgress("LEAVE-TO");
            return new Promise((resolve) => {
                void changeAttr(root, {
                    className: [transitionClass.leave.to, transitionClass.leave.active],
                    style: undefined,
                }).finally(() => {
                    setTransitionProgress();
                    resolve(undefined);
                });
            });
        };

        /**
         * 离开前
         */
        const leaveFrom = () => {
            if (!transitionClass || !root) {
                // 过渡属性不见，取消过渡
                // root不见，取消过渡
                transitionCancelFn.current?.(false);
                return;
            }

            let styleData: React.CSSProperties | undefined = undefined;
            setTransitionProgress("LEAVE-FROM");
            return new Promise((resolve) => {
                if (nodeSize.current) {
                    switch (animationName.current) {
                        case "taller":
                            styleData = {
                                height: `${nodeSize.current.height}px`,
                            };
                            break;
                        case "wider":
                            styleData = {
                                width: `${nodeSize.current.width}px`,
                            };
                            break;
                        default:
                            break;
                    }
                }

                void changeAttr(
                    root,
                    {
                        className: [transitionClass.leave.from, transitionClass.leave.active],
                        style: styleData,
                    },
                    true,
                ).finally(() => {
                    setTransitionProgress();
                    resolve(undefined);
                });
            });
        };

        /**
         * 进入
         */
        const onEnter = async () => {
            if (!hasClassClassValue("enter")) {
                //没有过渡属性，跳出
                enterEnd();
                return;
            }

            await firstGetDomSize();

            await enterFrom();

            await enterTo();

            enterEnd();
        };

        /**
         * 离开
         */
        const onLeave = async () => {
            if (!hasClassClassValue("leave")) {
                //没有过渡属性，跳出
                leaveEnd();
                return;
            }

            await leaveFrom();

            await leaveTo();

            leaveEnd();
        };

        /**
         * 第一次获取dom的尺寸
         *
         */
        const firstGetDomSize = async () => {
            if (!root) {
                console.log("没有获取到dom");

                transitionCancelFn.current?.(true);
                return;
            }

            const status = needSize(); //是否需要获取宽高
            if (!status) {
                return;
            }

            if (nodeSize.current) {
                return;
            }

            if (
                window.getComputedStyle(root, null).display === "none" ||
                root.classList.contains(styles.transition_hidden) ||
                taskStatus.current
            ) {
                setTransitionProgress("READY");

                await changeAttr(
                    root,
                    {
                        className: [styles.transition_r__hidden],
                    },
                    true,
                );

                const rect = root.getBoundingClientRect();
                nodeSize.current = { height: rect.height, width: rect.width };
                await changeAttr(
                    root,
                    {
                        className: [styles.transition_hidden],
                    },
                    true,
                );
                setTransitionProgress();
                return;
            }

            const rect = root.getBoundingClientRect();
            nodeSize.current = { height: rect.height, width: rect.width };
        };

        /**
         * 判断是否需要去读宽高
         */
        const needSize = () => {
            const transitionAttrVal = animationName.current;
            if (!transitionAttrVal) {
                return false;
            }
            if (!["taller", "wider"].some((item) => item === transitionAttrVal)) {
                return false;
            }
            /**
             * 下面就是过渡属性是 "taller" "wider"
             */

            /**
             * 在已经告知宽高的情况下
             */
            if (animationName.current === "wider") {
                const widthVal = widthRef.current;
                if (widthVal !== "auto") {
                    nodeSize.current = { height: 0, width: widthVal };
                    return false;
                }
            } else if (animationName.current === "taller") {
                const heightVal = heightRef.current;
                if (heightVal !== "auto") {
                    nodeSize.current = { height: heightVal, width: 0 };
                    return false;
                }
            }
            return true;
        };

        /**
         * 读取尺寸
         */
        const readSize = () => {
            const status = needSize(); //是否需要获取宽高
            if (!status) {
                return;
            }
            const rect = root?.getBoundingClientRect();
            if (!rect) {
                return;
            }
            nodeSize.current = { height: rect.height, width: rect.width };
        };

        /**
         * 当 show的类型为boolean
         */
        if (typeof show === "boolean") {
            if (isTransition.current) {
                /**
                 * 如果需要执行过渡动画
                 */
                if (show) {
                    void onEnter();
                } else {
                    void onLeave();
                }
            } else {
                /**
                 * 如果不需要执行过渡动画
                 */
                if (show) {
                    void enterEnd();
                } else {
                    void leaveEnd();
                }
                isTransition.current = true;
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    /**
     * 当销毁时
     */
    useUnmount(() => {
        if (transitionStatus.current) {
            transitionCancelFn.current?.(transitionStatus.current === "ENTERING");
        }
        timer.current && window.clearTimeout(timer.current);
    });

    const dispatch = useCallback((action: TransitionAction) => {
        switch (action.type) {
            case ActionType.SetClassNameAction:
                animationName.current = action.payload.type;
                transitionClassName.current = initClassName(action.payload);
                break;
            case ActionType.SwitchVisibleStatusAction:
                transitionStartFn.current?.(action.payload.value);

                if (showRef.current === action.payload.value) {
                    transitionEndFn.current(action.payload.value);
                    return;
                }
                if (showRef.current === undefined && action.payload.value === false) {
                    transitionEndFn.current(action.payload.value);
                    return;
                }

                showRef.current = action.payload.value;

                isTransition.current = action.payload.isTransition;

                setShow(action.payload.value);
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [dispatch, attr];
};
