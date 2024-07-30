/**
 * @file
 * @date 2022-11-08
 * @author mingzhou.zhang
 * @lastModify  2022-11-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import classNames from "../../../../Unit/classNames";
import { transformValue } from "../../../../Unit/transformValue";
import styles from "../style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
type TransitionType = "wheel" | "touch" | "click";

export type WheelType = "off" | "natural" | "normal";

export interface PickerColumnProps {
    name: string;
    value: string;
    options: Array<string>;
    itemHeight: string;
    columnHeight: string;
    wheel?: WheelType;
    onChange?: (key: string, val: string) => void;
    onClick?: (key: string, val: string) => void;
}

export interface TransformOptions {
    startTouchY: number;
    startScrollerTranslate: number;
    isMoving: boolean;
    minTranslate: number;
    maxTranslate: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const PickerColumn: React.FC<PickerColumnProps> = (props) => {
    const {
        name,
        value,
        options,
        itemHeight,
        columnHeight,
        wheel = "off",
        onChange,
        onClick,
    } = props;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const getTranslate = useMemo(() => {
        let selectedIndex = options.indexOf(value);
        const columnHeightVal = transformValue(columnHeight);
        const itemHeightVal = transformValue(itemHeight);
        if (selectedIndex < 0) {
            // throw new ReferenceError();
            console.warn(`Warning: "${name}" doesn't contain an option of "${value}".`);
            onChange?.(name, options[0]);
            selectedIndex = 0;
        }

        return {
            startScrollerTranslate:
                columnHeightVal / 2 - itemHeightVal / 2 - selectedIndex * itemHeightVal,
            minTranslate: columnHeightVal / 2 - itemHeightVal * options.length + itemHeightVal / 2,
            maxTranslate: columnHeightVal / 2 - itemHeightVal / 2,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columnHeight, itemHeight, name, options, value]);

    const [scrollerTranslate, setScrollerTranslate] = useState(
        getTranslate?.startScrollerTranslate ?? 0,
    );

    const transformOptions = useRef<TransformOptions | null>(null);
    const transitionType = useRef<TransitionType | null>(null);
    const clickValue = useRef<string>("");
    const wheelValue = useRef<string>("");
    const touchValue = useRef<string>("");

    const srcollerWrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        removeEventListener();

        addEventListener();
        return () => {
            removeEventListener();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    useLayoutEffect(() => {
        if (transformOptions.current === null) {
            transformOptions.current = {
                isMoving: false,
                startTouchY: 0,
                ...getTranslate,
            };
        } else {
            transformOptions.current = {
                ...transformOptions.current,
                ...getTranslate,
            };
        }
        const index = options.indexOf(value);
        const scrollerValue = calcScrollerValue(index);
        setScrollerTranslate(scrollerValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTranslate, props]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const addEventListener = () => {
        srcollerWrapRef.current?.addEventListener("wheel", handleWheel);
        srcollerWrapRef.current?.addEventListener("touchstart", handleTouchStart);
        srcollerWrapRef.current?.addEventListener("touchmove", handleTouchMove);
        srcollerWrapRef.current?.addEventListener("touchend", handleTouchEnd);
        srcollerWrapRef.current?.addEventListener("touchcancel", handleTouchCancel);
    };

    const removeEventListener = () => {
        srcollerWrapRef.current?.removeEventListener("wheel", handleWheel);
        srcollerWrapRef.current?.removeEventListener("touchstart", handleTouchStart);
        srcollerWrapRef.current?.removeEventListener("touchmove", handleTouchMove);
        srcollerWrapRef.current?.removeEventListener("touchend", handleTouchEnd);
        srcollerWrapRef.current?.removeEventListener("touchcancel", handleTouchCancel);
    };
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    // 过渡结束后 更新组件
    const handleScrollerTransition = (type: TransitionType) => {
        switch (type) {
            case "wheel":
                {
                    const option = wheelValue.current;
                    onChange?.(name, option);
                }
                break;
            case "touch":
                {
                    const option = touchValue.current;
                    onChange?.(name, option);
                }
                break;
            case "click":
                {
                    const option = clickValue.current;
                    if (option === value) {
                        onClick?.(name, value);
                    } else {
                        onChange?.(name, option);
                    }
                }
                break;
        }
    };

    // 根据下标 计算滚动距离
    const calcScrollerValue = (selectedIndex: number) => {
        if (transformOptions.current) {
            const { maxTranslate } = transformOptions.current;
            const itemHeightVal = transformValue(itemHeight);
            return maxTranslate - selectedIndex * itemHeightVal;
        }
        return 0;
    };

    const handleTouchEndorCancel = (type: "end" | "cancel") => {
        if (transformOptions.current) {
            transitionType.current = "touch";
            const opt = transformOptions.current;
            if (!opt.isMoving) return;
            opt.isMoving = false;
            opt.startTouchY = 0;
            opt.startScrollerTranslate = 0;
            setScrollerTranslate((val) => {
                if (type === "end") {
                    const index = handleScrollerTranslateSattled(val);
                    touchValue.current = options[index];
                } else {
                    touchValue.current = options[0];
                }
                return val;
            });
        }
    };

    // 触碰结束后 固定下标
    const handleScrollerTranslateSattled = (scrollerTranslate: number) => {
        let activeIndex = 0;
        if (transformOptions.current) {
            const { minTranslate, maxTranslate } = transformOptions.current;
            const itemHeightVal = transformValue(itemHeight);

            if (scrollerTranslate >= maxTranslate) {
                activeIndex = 0;
            } else if (scrollerTranslate <= minTranslate) {
                activeIndex = options.length - 1;
            } else {
                activeIndex = -Math.round((scrollerTranslate - maxTranslate) / itemHeightVal);
            }
        }
        return activeIndex;
    };

    const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        transitionType.current = "wheel";

        const itemHeightVal = transformValue(itemHeight);

        let delta = event.deltaY * 0.1;
        delta = itemHeightVal * Math.sign(delta);

        switch (wheel) {
            case "natural":
                // ignore and continue
                break;
            case "normal":
                delta *= -1;
                break;
            default:
                return;
        }

        setScrollerTranslate((value) => {
            const scrollerValue = value + delta;
            const index = handleScrollerTranslateSattled(scrollerValue);
            wheelValue.current = options[index];
            return scrollerValue;
        });
    };

    const handleTouchStart = (event: TouchEvent) => {
        if (transformOptions.current) {
            const opt = transformOptions.current;
            const startTouchY = event.targetTouches[0].pageY;
            setScrollerTranslate((val) => {
                opt.startTouchY = startTouchY;
                opt.startScrollerTranslate = val;

                return val;
            });
        }
    };

    const handleTouchMove = (event: TouchEvent) => {
        if (transformOptions.current) {
            const opt = transformOptions.current;
            const { startScrollerTranslate, startTouchY, minTranslate, maxTranslate } = opt;
            event.preventDefault();

            const touchY = event.targetTouches[0].pageY;
            if (!opt.isMoving) {
                opt.isMoving = true;
                return;
            }

            let nextScrollerTranslate = startScrollerTranslate + touchY - startTouchY;
            if (nextScrollerTranslate < minTranslate) {
                nextScrollerTranslate =
                    minTranslate - (minTranslate - nextScrollerTranslate) ** 0.8;
                // minTranslate;
            } else if (nextScrollerTranslate > maxTranslate) {
                nextScrollerTranslate =
                    maxTranslate + (nextScrollerTranslate - maxTranslate) ** 0.8;
                // maxTranslate;
            }

            setScrollerTranslate(() => {
                return nextScrollerTranslate;
            });
        }
    };

    const handleTouchEnd = () => {
        handleTouchEndorCancel("end");
    };

    const handleTouchCancel = () => {
        handleTouchEndorCancel("cancel");
    };

    const handleItemClick = (option: string) => {
        transitionType.current = "click";
        clickValue.current = option;

        const selectIndex = options.indexOf(option);
        const scrollerValue = calcScrollerValue(selectIndex);
        setScrollerTranslate(scrollerValue);
    };

    const renderItems = () => {
        return options.map((option, index) => {
            const style = {
                height: itemHeight,
                lineHeight: itemHeight,
            };
            return (
                <div
                    key={index}
                    style={style}
                    className={classNames(styles.picker_item, {
                        [`${styles.picker_item_selected}`]: option === value,
                    })}
                    onClick={() => handleItemClick(option)}
                >
                    {option}
                </div>
            );
        });
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    const translateString = `translate(0, ${scrollerTranslate}px)`;
    return (
        <div className={styles.picker_column} ref={srcollerWrapRef}>
            <div
                className={styles.picker_scroller}
                style={{ transform: translateString }}
                onTransitionEnd={() => {
                    if (transitionType.current) handleScrollerTransition(transitionType.current);
                    transitionType.current = null;
                }}
            >
                {renderItems()}
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
