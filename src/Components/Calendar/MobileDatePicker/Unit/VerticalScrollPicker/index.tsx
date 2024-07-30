/**
 * @file
 * @date 2023-06-07
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from "react";
import { mathMul, useDomResize } from "../../../../..";
import { useLatest } from "../../../../../Hooks/useLatest";
import classNames from "../../../../../Unit/classNames";
import { setStyle } from "../../../../Common/Transition/Unit/addStyle";
import { RecordProps, useVerticalSlide } from "../../Hooks/useVerticalSlide";
import Item from "../VerticalScrollPickerItem";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface VerticalScrollPickerProps {
    /**
     * 滚动的数据
     */
    records: Array<RecordProps>;

    /**
     * 视口高度
     * 只会有一条数据展示
     *
     * 而这个被展示的数据就在这个视口内
     */
    viewHeight: string;

    /**
     * class name
     */
    className?: string;
    /**
     *
     */
    style?: React.CSSProperties;
    /**
     * 当前值
     */
    value?: string;
    /**
     * 当选中的数据发生变化时
     */
    handleChange?: (value: string) => void;

    /**
     * 当滚动触发时
     */
    onScroll?: (res: { offsetHeight: number; scrollTop: number; scrollHeight: number }) => void;
    /**
     * 当滚动开始的时候
     */
    handleScrollStart?: () => void;
    /**
     * 当滚动结束的时候
     */
    handleScrollEnd?: () => void;
}

export interface VerticalScrollPickerEvents {
    /**
     * 滚动到
     * @param id 要跳转到
     * @param isAnimate 是否有动画 默认为true
     * @returns
     */
    scrollTo: (id: string, isAnimate?: boolean) => void;
    /**
     * 终止滚动
     */
    termination: () => void;
    /**
     * 重置
     */
    init: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const VerticalScrollPicker = forwardRef<
    VerticalScrollPickerEvents | null,
    VerticalScrollPickerProps
>(
    (
        {
            records,
            viewHeight,
            className,
            style,
            value,
            handleChange,
            onScroll,
            handleScrollEnd,
            handleScrollStart,
        },
        events,
    ) => {
        VerticalScrollPicker.displayName = "VerticalScrollPicker";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        /**
         * 可见高度
         */
        const viewHeightRef = useRef<number>();
        /**
         * 滚动容器的offsetHeight
         */
        const offsetHeightRef = useRef<number>();
        /**
         * 滚动容器的scrollHeight
         */
        const scrollHeightRef = useRef<number>();

        /**
         * 视口dom
         */
        const viewRef = useRef<HTMLDivElement | null>(null);

        /**
         * 滚动容器
         */
        const scrollBody = useRef<HTMLDivElement | null>(null);

        /**
         * 最新的handleChange的方法
         */
        const handleChangeRef = useLatest(handleChange);

        /**
         * 滚动y
         */
        const translateY = useRef(0);

        const animationFrameTimer = useRef<number>();

        /**
         * 活跃的id
         */
        const [activeId, setActiveId] = useState(value ?? records[0].id);

        const msgId = useId();

        /**
         * 移动状态
         */
        const moveStatus = useRef<boolean>();
        /**
         * 在滚动容器的高度发生变化的时候需要 滚动到指定的值上
         */
        const toValue = useRef<number>();

        /**
         * 在滚动容器的高度发生变化的时候需要 滚动到指定的id上
         * value 最终的id
         * isAnimate 是否有动画
         */
        const toId = useRef<{
            value: string;
            isAnimate: boolean;
        }>();

        /**
         * 容器
         */
        const ref = useRef<HTMLDivElement | null>(null);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /**
         * 开始移动
         */
        const startMove = () => {
            const event = new CustomEvent(`start-${msgId}`);
            document.dispatchEvent(event);
            handleScrollStart?.();
            moveStatus.current = true;
        };
        /**
         * 结束移动
         */
        const endMove = () => {
            const event = new CustomEvent(`end-${msgId}`);
            document.dispatchEvent(event);
            handleScrollEnd?.();
            moveStatus.current = false;

            if (typeof toValue.current === "number") {
                setScrollTop(toValue.current);
                toValue.current = undefined;
            }
        };

        /**
         * 赋值滚动高度
         */
        const setScrollTop = (top: number) => {
            const node = scrollBody.current;
            if (!node) {
                return;
            }
            translateY.current = top;

            setStyle(node, {
                transform: `translate3d(0,${translateY.current}px,0)`,
            });

            onScroll?.({
                offsetHeight: offsetHeightRef.current ?? 0,
                scrollTop: Math.abs(translateY.current),
                scrollHeight: scrollHeightRef.current ?? 0,
            });
        };

        const [mouseDown, touchStart, terminationAnimate] = useVerticalSlide(
            setScrollTop,
            records,
            viewHeightRef,
            offsetHeightRef,
            scrollHeightRef,
            translateY,
            (val) => {
                if (val) {
                    startMove();
                    return;
                }

                endMove();
                return;
            },
        );

        /**
         * 最新的terminationAnimate方法
         */

        useDomResize(viewRef, () => {
            offsetHeightRef.current = viewRef.current?.offsetHeight;
        });

        useDomResize(ref, () => {
            viewHeightRef.current = ref.current?.offsetHeight;
        });

        const findIdTranslateY = (val: string) => {
            let index = -1;
            for (let i = 0; i < records.length; ) {
                if (records[i].id === val) {
                    index = i;
                    i = records.length;
                } else {
                    ++i;
                }
            }
            return mathMul(-index, offsetHeightRef.current ?? 0);
        };

        useDomResize(scrollBody, () => {
            scrollHeightRef.current = scrollBody.current?.offsetHeight;

            if (toId.current?.value) {
                const endVal = findIdTranslateY(toId.current.value);
                if (toId.current.isAnimate) {
                    startMove();
                    loadingLinerAnimate(endVal, () => {
                        toId.current = undefined;
                        endMove();
                    });
                    return;
                }

                setScrollTop(endVal);
                toId.current = undefined;
                return;
            }

            const endVal = findIdTranslateY(activeId);
            if (endVal !== translateY.current) {
                if (moveStatus.current) {
                    toValue.current = endVal;
                } else {
                    setScrollTop(endVal);
                }
            }
        });

        const termination = () => {
            terminationAnimate();
            animationFrameTimer.current && window.cancelAnimationFrame(animationFrameTimer.current);
        };

        useImperativeHandle(events, () => {
            return {
                scrollTo: (id, isAnimate = true) => {
                    termination();
                    if (scrollHeightRef.current) {
                        const endVal = findIdTranslateY(id);
                        if (isAnimate) {
                            startMove();
                            loadingLinerAnimate(endVal, endMove);
                        } else {
                            setScrollTop(endVal);
                        }
                        return;
                    }
                    toId.current = {
                        value: id,
                        isAnimate,
                    };
                },

                termination,

                init: () => {
                    termination();
                    if (scrollHeightRef.current) {
                        const endVal = findIdTranslateY(value ?? records[0].id);
                        setScrollTop(endVal);
                        return;
                    }

                    toId.current = {
                        value: value ?? records[0].id,
                        isAnimate: false,
                    };
                },
            };
        });

        useEffect(() => {
            handleChangeRef.current?.(activeId);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [activeId]);

        useEffect(() => {
            return () => {
                animationFrameTimer.current &&
                    window.cancelAnimationFrame(animationFrameTimer.current);
            };
        }, []);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        /**
         * 开始动画
         * @param speed 速度
         * @param endVal 结束的值
         * @param endAnimate 当动画结束是要干的事情
         * @returns
         */
        const startAnimate = (speed: number, endVal: number, endAnimate: () => void) => {
            if (
                (speed > 0 && translateY.current + speed >= endVal) ||
                (speed < 0 && translateY.current + speed <= endVal) ||
                speed === 0
            ) {
                setScrollTop(endVal);
                endAnimate?.();
                return;
            }

            animationFrameTimer.current = window.requestAnimationFrame(() => {
                setScrollTop(translateY.current + speed);

                startAnimate(speed, endVal, endAnimate);
            });
        };

        /**
         * 加载匀速动画
         * @param endVal 最后的值
         * @param endCallback 动画执行后 要干的事情
         */
        const loadingLinerAnimate = (endVal: number, endCallback: () => void) => {
            const speed =
                endVal - translateY.current ? Math.round((endVal - translateY.current) / 15) : 0;
            startAnimate(speed, endVal, endCallback);
        };

        /**
         * 当item的相交状态发生变化时
         */
        const itemIntersectChange = (status: boolean, id: string) => {
            if (status) {
                setActiveId(id);
            }
        };

        /**
         * 当item被点击时
         */
        const handleItemClick = (index: number) => {
            if (!offsetHeightRef.current) {
                return;
            }
            const offsetHeight = offsetHeightRef.current;

            termination();
            startMove();
            const endVal = mathMul(-index, offsetHeight);

            loadingLinerAnimate(endVal, endMove);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={classNames(className, styles.verticalScrollPicker_wrapper)}
                style={style}
                ref={ref}
                onMouseDown={mouseDown}
                onTouchStart={touchStart}
            >
                <div
                    className={styles.verticalScrollPicker_view}
                    style={{
                        height: viewHeight,
                    }}
                    ref={viewRef}
                >
                    <div className={styles.verticalScrollPicker_content} ref={scrollBody}>
                        {records.map((item, index) => {
                            return (
                                <Item
                                    key={item.id}
                                    parent={scrollBody}
                                    style={{
                                        height: viewHeight,
                                    }}
                                    onClick={() => {
                                        handleItemClick(index);
                                    }}
                                    handleChange={(status) => {
                                        itemIntersectChange(status, item.id);
                                    }}
                                    msgId={msgId}
                                    active={activeId === item.id}
                                >
                                    {item.content}
                                </Item>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
VerticalScrollPicker.displayName = "VerticalScrollPicker";
