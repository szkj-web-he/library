/**
 * @file transition component
 * @date 2021-11-26
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { TransitionStatus } from "../../../DefaultData/Transition";
import useGetSet from "../../../Hooks/UseGetSet";
import classNames from "../../../Unit/classNames";
import { ActionType, useCssTransition } from "../Hooks/useCssTransition";
import { useRemoveOnHidden } from "../Hooks/useRemoveOnHidden";
import { useLatest } from "./../../../Hooks/useLatest";
import { TransitionStatusContext } from "./Context/status";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface TransitionProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * is child component visible
     */
    show: boolean;
    /**
     * enter className
     * * Intersection of fromEnter and toEnter
     */
    enterActive?: string;
    /**
     * leave className
     * * Intersection of fromLeave and toLeave
     */
    leaveActive?: string;
    /**
     * ClassName when entering
     */
    toEnter?: string;
    /**
     * ClassName when leaving
     */
    toLeave?: string;
    /**
     * ClassName when starting to enter
     */
    fromEnter?: string;
    /**
     * ClassName when starting to leave
     */
    fromLeave?: string;
    /**
     * children of ReactNode
     */
    children?: React.ReactNode;
    /**
     * first animation
     */
    firstAnimation?: boolean;
    /**
     * The component library encapsulates several default animation libraries
     */
    animationType?:
        | "fade"
        | "zoom"
        | "taller"
        | "wider"
        | "inLeft"
        | "inRight"
        | "inTop"
        | "inBottom"
        | "slideDown"
        | "slideUp"
        | "slideLeft"
        | "slideRight";

    /**
     * 如果animationType为taller的时候
     * height 为多少像素
     * * 默认是auto
     */
    height?: number | "auto";
    /**
     * 如果animationType为wider的时候
     * width 为多少像素
     * * 默认是auto
     */
    width?: number | "auto";

    /**
     * ontransitionEnd callback
     * 当过渡结束时的回调
     */
    handleTransitionEnd?: (show: boolean) => void;

    /**
     * Remove when the element is hidden
     * 隐藏时，是否移除节点
     */
    removeOnHidden?: boolean;
    /**
     * Cache only works if removeOnHidden=true.
     * When cache=true, as long as the element has been rendered, it will no longer be removed.  The opposite is the state of cache=false.
     *
     * cache的使用仅在removeOnHidden=true时生效
     *
     * 当cache为true
     * 隐藏时，移除节点(只会执行一次)
     *
     * 当cache为false
     * 隐藏时，移除节点(每次都会执行)
     *
     */
    cache?: boolean;
    /**
     * transitionStart callback
     * 当过渡开始时的回调
     */
    handleTransitionStart?: (show: boolean) => void;
    /**
     * transition cancel callback
     * 当过渡取消时的回调
     */
    handleTransitionCancel?: (show: boolean) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Transition = forwardRef<HTMLDivElement, TransitionProps>(
    (
        {
            show,
            children,
            firstAnimation = false,
            handleTransitionEnd,
            handleTransitionStart,
            handleTransitionCancel,
            removeOnHidden = false,
            cache,
            ...props
        },
        ref,
    ) => {
        Transition.displayName = "Transition";
        /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const [handleEnd, isInstall] = useRemoveOnHidden(show, removeOnHidden, cache);

        /**
         * show的变化次数
         */
        const showCount = useRef(0);
        const preShow = useRef<boolean>();

        {
            if (preShow.current !== show) {
                ++showCount.current;
                preShow.current = show;
            }
        }

        if (isInstall) {
            return (
                <Main
                    show={show}
                    ref={ref}
                    isTransition={showCount.current < 2 ? firstAnimation : true}
                    handleTransitionStart={(status) => {
                        handleTransitionStart?.(status);
                    }}
                    handleTransitionEnd={(status) => {
                        handleTransitionEnd?.(status);
                        handleEnd();
                    }}
                    handleTransitionCancel={(status) => {
                        handleTransitionCancel?.(status);
                        handleEnd();
                    }}
                    {...props}
                >
                    {children}
                </Main>
            );
        }
        return <></>;
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Transition.displayName = "Transition";

const Main = forwardRef<
    HTMLDivElement,
    Omit<TransitionProps, "removeOnHidden" | "cache" | "firstAnimation"> & {
        isTransition: boolean;
    }
>(
    (
        {
            className,
            style,
            children,
            handleTransitionStart,
            handleTransitionEnd,
            handleTransitionCancel,
            animationType,
            enterActive,
            fromEnter,
            fromLeave,
            leaveActive,
            toEnter,
            toLeave,
            height,
            width,
            show,
            isTransition,
            ...props
        },
        ref,
    ) => {
        Main.displayName = "Main";

        /**
         * 执行动画的dom
         */
        const cloneRef = useRef<HTMLDivElement | null>(null);
        /**
         * 过渡进度的获取
         */
        const [getTransitionProgress, setTransitionProgress] = useGetSet<TransitionStatus | null>(
            null,
        );

        /**
         * css动画的hooks
         * dispatch 是任务分发器
         * insertedAttr 需要挂在的dom属性
         */
        const [dispatch, insertedAttr] = useCssTransition(
            handleTransitionStart,
            handleTransitionEnd,
            handleTransitionCancel,
            cloneRef,
            width,
            height,
            style,
            (res) => {
                setTransitionProgress(res ?? null);
            },
        );

        const dispatchRef = useLatest(dispatch);

        const isTransitionRef = useLatest(isTransition);

        useLayoutEffect(() => {
            dispatchRef.current({
                type: ActionType.SetClassNameAction,
                payload: {
                    type: animationType,
                    enterActive,
                    fromEnter,
                    fromLeave,
                    leaveActive,
                    toEnter,
                    toLeave,
                },
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [animationType, enterActive, fromEnter, fromLeave, leaveActive, toEnter, toLeave]);

        useEffect(() => {
            dispatchRef.current({
                type: ActionType.SwitchVisibleStatusAction,
                payload: {
                    value: show,
                    isTransition: isTransitionRef.current,
                },
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [show]);

        // /**
        //  * 测试逻辑
        //  */

        // useLayoutEffect(() => {
        //     const node = cloneRef.current;
        //     if (!node) {
        //         return;
        //     }

        //     const fn = () => {
        //         console.log(" ******************** ");
        //         console.log("style", node.getAttribute("style"));
        //         console.log("className", node.getAttribute("class"));
        //         console.log(" ******************** ");
        //     };

        //     const ob = new MutationObserver(fn);
        //     ob.observe(node, {
        //         attributes: true,
        //     });
        //     return () => {
        //         ob.disconnect();
        //     };
        // }, [show]);

        return (
            <TransitionStatusContext.Provider
                value={() => {
                    return getTransitionProgress() ?? undefined;
                }}
            >
                <div
                    ref={(el) => {
                        cloneRef.current = el;
                        if (typeof ref === "function") {
                            ref(el);
                        } else if (ref !== null) {
                            (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                        }
                    }}
                    style={{ ...style, ...insertedAttr.style }}
                    className={classNames(...insertedAttr.className, className)}
                    {...props}
                >
                    {children}
                </div>
            </TransitionStatusContext.Provider>
        );
    },
);

Main.displayName = "Main";
