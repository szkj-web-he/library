/**
 * @file
 * @date 2022-10-19
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-19
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useInsertionEffect, useRef, useState } from "react";
import {
    deepCloneData,
    getScrollValue,
    useDomResize,
    useDomResizeLayout,
    useLayoutEventListener,
    useUnmount,
} from "../../../..";
import { useLatest } from "../../../../Hooks/useLatest";
import { ActionType, useCssTransition } from "../../Hooks/useCssTransition";
import { useElementSize } from "../../Hooks/useElementSize";
import { AutoPositionResult, main } from "../../Kite/Unit/autoPosition";
import { toFixed } from "../../Kite/Unit/toFixed";
import { TransitionClassProps, getTransitionClass } from "../../Kite/Unit/transitionClass";
import Triangle from "../../Kite/Unit/triangle";
import { MainProps, Rect, SizeProps } from "../../Kite/Unit/type";
import styles from "../style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "id">,
        Omit<MainProps, "handlePositionChange"> {
    root?: Element;
    show: boolean;
    hashId?: string;
    children?: React.ReactNode;
    isTransition: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<HTMLDivElement, TempProps>(
    (
        {
            root,
            placement = "cb",
            direction = "vertical",
            offset,
            triangle,
            animate,
            handleTransitionStart,
            handleTransitionEnd,
            handleTransitionCancel,
            style,
            className,
            mount,
            show,
            hashId,
            bodyClassName,
            isTransition,
            children,
            ...props
        },
        ref,
    ) => {
        Temp.displayName = "PositionPortal";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        /**
         * 位置信息
         */
        const positionalRef = useRef<string | null>(null);
        /**
         * 位置信息
         */
        const [positional, setPositional] = useState<AutoPositionResult | null>(null);
        /**
         * 自动判断位置下拉框位置的方法
         */
        const autoPositionFn = useRef<ReturnType<typeof main> | null>(null);
        /**
         * 下拉框的动画执行状态
         */
        const transitionEnd = useRef<boolean | null>(null);
        /**
         * 点位信息
         */
        const [point, setPoint] = useState<React.CSSProperties | null>(null);

        /**
         * 按钮的rect
         */
        const btnRect = useRef<Rect | null>(null);

        /**
         * rootRef
         */
        const rootRef = useLatest(root);

        /**
         * 用来diff比较
         */
        /**
         * 下拉框的大小
         */
        const portalSize = useRef<SizeProps | null>(null);
        /**
         * 三角行的大小
         */
        const triangleSize = useRef<SizeProps | null>(null);
        /**
         * 主轴的方向
         */
        const directionRef = useLatest(direction);
        /**
         * 起点位置
         */
        const placementRef = useLatest(placement);
        /**
         * 下拉框的偏移属性
         */
        const portalOffsetRef = useLatest(offset);
        /**
         * 三角形的偏移属性
         */
        const triangleOffsetRef = useLatest(triangle);
        /**
         * 动画过渡属性
         */
        const animationRef = useLatest(animate);

        /**
         * 挂载点属性
         */
        const mountRef = useLatest(mount);
        /**
         * 下拉框的dom
         */
        const portalRef = useRef<HTMLDivElement | null>(null);

        /**
         * show的变化状态
         */
        const showRef = useRef<{
            from?: boolean;
            to?: boolean;
        }>({
            from: undefined,
            to: undefined,
        });

        const [dispatch, insertedAttr] = useCssTransition(
            () => {
                // console.log("**************** start ******************");

                handleTransitionStart?.();
                transitionEnd.current = false;
            },
            () => {
                // console.log("**************** end ******************");
                handleTransitionEnd?.();
                transitionEnd.current = true;
            },

            () => {
                transitionEnd.current = true;
                // console.log("****************** cancel ********************");
                handleTransitionCancel?.();
            },
            portalRef,
            "auto",
            "auto",
            { ...style, ...point },
        );
        /**
         * useCssTransition的dispatch
         */
        const dispatchRef = useLatest(dispatch);
        /**
         * 是否需要过渡动画
         */
        const isTransitionRef = useLatest(isTransition);
        /**
         * 获取下拉框的尺寸
         */
        const [getSizeClassList, getSizeRef, getSizeFinishRef] = useElementSize(portalRef);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /**
         * 刷新计算位置的方法
         */
        const refreshFn = useRef((needSwitchVisible = false) => {
            /**
             * 设置portal的位置
             */
            const setLatLng = (res: AutoPositionResult | undefined) => {
                if (res) {
                    let left = toFixed(res.menu[0]);
                    let top = toFixed(res.menu[1]);
                    if (mountRef.current) {
                        const pRect = mountRef.current.getBoundingClientRect();
                        const scrollData = getScrollValue();

                        if (pRect) {
                            const x = pRect.left + scrollData.x;
                            const y = pRect.top + scrollData.y;
                            left = toFixed(res.menu[0] - x);
                            top = toFixed(res.menu[1] - y);
                        }
                    }

                    if (portalRef.current) {
                        portalRef.current.style.left = `${left}px`;
                        portalRef.current.style.top = `${top}px`;
                    }
                    setPoint({
                        left: `${left}px`,
                        top: `${top}px`,
                    });
                }
            };

            /***
             * 赋值过渡所需要的class name
             */
            const setTransitionClass = (position: AutoPositionResult | undefined) => {
                let classList: undefined | TransitionClassProps = undefined;

                const arr = placementRef.current.split("");
                const x = arr[0] as "l" | "r" | "c";
                const y = arr[1] as "t" | "b" | "c";
                switch (directionRef.current) {
                    case "horizontal":
                        if (x === "l") {
                            classList = position?.reverse
                                ? getTransitionClass("r", y, directionRef.current)
                                : getTransitionClass("l", y, directionRef.current);
                        } else {
                            classList = position?.reverse
                                ? getTransitionClass("l", y, directionRef.current)
                                : getTransitionClass("r", y, directionRef.current);
                        }
                        break;
                    case "vertical":
                        if (y === "t") {
                            classList = position?.reverse
                                ? getTransitionClass(x, "b", directionRef.current)
                                : getTransitionClass(x, "t", directionRef.current);
                        } else {
                            classList = position?.reverse
                                ? getTransitionClass(x, "t", directionRef.current)
                                : getTransitionClass(x, "b", directionRef.current);
                        }
                        break;
                }
                dispatchRef.current({
                    type: ActionType.SetClassNameAction,
                    payload: {
                        type: animationRef.current,
                        enterActive: classList.enter.active,
                        toEnter: classList.enter.to,
                        fromEnter: classList.enter.from,
                        leaveActive: classList.leave.active,
                        toLeave: classList.leave.to,
                        fromLeave: classList.leave.from,
                    },
                });
            };

            /**
             * 计算位置
             */

            if (typeof showRef.current.to !== "boolean") {
                return;
            }

            if (!portalSize.current) {
                return;
            }

            if (showRef.current.to) {
                let data: AutoPositionResult | undefined = undefined;

                const rect = rootRef.current?.getBoundingClientRect();

                /**
                 * 挂在btn的位置数据
                 */
                if (Math.round(rect?.height ?? 0) && Math.round(rect?.width ?? 0)) {
                    btnRect.current = {
                        height: rect?.height ?? 0,
                        width: rect?.width ?? 0,
                        bottom: rect?.bottom ?? 0,
                        left: rect?.left ?? 0,
                        right: rect?.right ?? 0,
                        top: rect?.top ?? 0,
                    };
                }

                data = autoPositionFn.current?.({
                    btnRect: btnRect.current ?? {
                        height: 0,
                        width: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 0,
                    },
                    triangleSize: [
                        triangleSize.current?.width ?? 0,
                        triangleSize.current?.height ?? 0,
                    ],
                    menuSize: portalSize.current,
                    direction: directionRef.current,
                    placement: placementRef.current,
                    offset: {
                        menu: portalOffsetRef.current,
                        triangle: triangleOffsetRef.current?.offset,
                    },
                });

                if (JSON.stringify(data) !== positionalRef.current) {
                    positionalRef.current = JSON.stringify(data);
                    setPositional(data ? { ...data } : null);
                    setLatLng(data);
                    setTransitionClass(data);
                }
            }

            if (needSwitchVisible) {
                const showVal = showRef.current.to;
                dispatchRef.current({
                    type: ActionType.SwitchVisibleStatusAction,
                    payload: {
                        value: showVal,
                        isTransition: isTransitionRef.current,
                    },
                });
            }
        });

        /**
         * 将监听的数据转化为静态变量
         * start
         */

        useInsertionEffect(() => {
            autoPositionFn.current = main();
        }, []);

        /**
         * end
         * 将监听的数据转化为静态变量
         */

        useInsertionEffect(() => {
            /**
             *
             * 当切换为 可见
             *
             * 当
             * 1. 过渡状态为true的时候可以计算
             *
             *
             * 2. 过渡还没有开始的时候也可以
             * 因为portal的尺寸已经读取了
             *
             */
            if (show !== showRef.current.to) {
                showRef.current = {
                    from: showRef.current.to,
                    to: show,
                };
                if (transitionEnd.current) {
                    transitionEnd.current = null;
                }
            }
        }, [show]);

        useEffect(() => {
            const fn = (el: HTMLDivElement | undefined) => {
                if (!el) {
                    void getSizeFinishRef.current();
                    return;
                }
                const rect = el.getBoundingClientRect();

                portalSize.current = {
                    width: rect.width,
                    height: rect.height,
                };

                const triangleNode = el.querySelector(`.${styles.kite_triangle}`);

                if (triangleNode) {
                    const _rect = triangleNode.getBoundingClientRect();
                    triangleSize.current = {
                        width: _rect.width,
                        height: _rect.height,
                    };
                }
                void getSizeFinishRef.current().finally(() => {
                    refreshFn.current(true);
                });
            };

            if (typeof show === "boolean") {
                if ((transitionEnd.current || transitionEnd.current === null) && show) {
                    void getSizeRef.current().then(fn);
                } else {
                    void getSizeFinishRef.current();
                    refreshFn.current(true);
                }
            }

            //忽略ref的依赖
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [show]);

        useUnmount(() => {
            portalSize.current = null;
        });

        const handleScroll = () => {
            refreshFn.current();
        };
        useLayoutEventListener("scroll", handleScroll, undefined, true);
        useLayoutEventListener("resize", handleScroll);

        /**
         * 监听 kite的root element的变化
         * 如果 top、left、width、height和之前不同 就得重新计算位置
         */
        useDomResizeLayout(
            { current: root as Element | null },
            () => {
                refreshFn.current();
            },
            [root],
        );

        /**
         * 比较children element的变化
         */
        useDomResize(
            portalRef,
            (res) => {
                if (!transitionEnd.current) {
                    return;
                }

                if (
                    res &&
                    showRef.current.to &&
                    portalRef.current &&
                    window.getComputedStyle(portalRef.current, null).display !== "none"
                ) {
                    portalSize.current = {
                        width: res[0].contentRect.width,
                        height: res[0].contentRect.height,
                    };
                }

                refreshFn.current();
            },
            [],
        );

        useEffect(() => {
            if (showRef.current.to) {
                refreshFn.current();
            }
        }, [root, direction, placement, offset, triangle, mount]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const getClassName = () => {
            const arr = [
                styles[
                    `kite_${direction}${placement.slice(0, 1).toUpperCase()}${placement.slice(
                        1,
                        2,
                    )}`
                ],
            ];
            if (getSizeClassList?.length) {
                arr.push(...deepCloneData(getSizeClassList));
            } else {
                arr.push(...deepCloneData(insertedAttr.className));
            }
            if (positional?.reverse) {
                arr.push(styles.kite_reverse);
            }
            return arr.join(" ") + (className ? ` ${className}` : "");
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                key={hashId ? `${hashId}-main` : undefined}
                className={getClassName()}
                ref={(el) => {
                    portalRef.current = el;

                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                    }
                }}
                style={{ ...style, ...point, ...insertedAttr.style }}
                {...props}
            >
                <Triangle
                    className={styles.kite_triangle}
                    attr={triangle}
                    position={positional ?? undefined}
                    d={direction}
                    placement={placement}
                />

                <div className={styles.kite_body + (bodyClassName ? ` ${bodyClassName}` : "")}>
                    {children}
                </div>
            </div>
        );
    },
);
Temp.displayName = "PositionPortal";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
