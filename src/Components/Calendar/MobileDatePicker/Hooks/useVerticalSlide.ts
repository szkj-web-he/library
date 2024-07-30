/**
 * @file 纵向滑动
 * @date 2023-06-13
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-13
 */

import { useRef } from "react";
import { mathMul, mathSum, useUnmount } from "../../../..";
import { MovePointParams, useDrag } from "../../../../Hooks/useDrag";

export interface RecordProps {
    id: string;
    content: React.ReactNode;
}

/**
 * 纵向滑动的hook
 * @param setScrollTop  赋值滚动高度
 * @param records 需要滚动的数据
 * @param viewHeightRef 可见的高度
 * @param offsetHeightRef offset height
 * @param scrollHeightRef scroll height
 * @param scrollTopRef  scroll top
 * @param setMoveStatus 赋值当前是否正在移动中
 * @returns [可以执行手势的dom,终止动画的回调]
 */
export const useVerticalSlide = (
    setScrollTop: (val: number) => void,
    records: Array<RecordProps>,
    viewHeightRef: React.MutableRefObject<number | undefined>,
    offsetHeightRef: React.MutableRefObject<number | undefined>,
    scrollHeightRef: React.MutableRefObject<number | undefined>,
    scrollTopRef: React.MutableRefObject<number>,
    setMoveStatus: (status: boolean) => void,
): [...ReturnType<typeof useDrag>, () => void] => {
    /**
     * 开始的坐标
     */
    const startPoint = useRef<{
        x: number;
        y: number;
    }>();

    /**
     * 开始的时间
     */
    const startTime = useRef<number>();

    /**
     * 最后一次移动的数据
     * time 时间差
     * move 移动的距离
     */
    const lastData = useRef<{
        time: number;
        move: number;
    }>();

    /**
     * 下一帧执行的延时器
     */
    const animationFrameTimer = useRef<number>();

    /**
     * 是不是第一次移动
     * 用来判断移动方向
     */
    const isFirstMove = useRef(false);

    /**
     * 减速度的计时器
     */
    const delayTimer = useRef<number>();

    /**
     * 是否动画结束
     */
    const isEndAnimate = useRef(true);

    /**
     * 寻找 距离视口最近上一个的item
     */
    const findPreviousItem = () => {
        const scrollHeight = scrollHeightRef.current;
        if (!scrollHeight) {
            return;
        }

        const offsetHeight = offsetHeightRef.current;

        if (!offsetHeight) {
            return;
        }

        const translateY = scrollTopRef.current;

        if (translateY > 0) {
            return 0;
        }

        if (Math.abs(translateY) > scrollHeight - offsetHeight) {
            return -(scrollHeight - offsetHeight);
        }

        /**
         * 当前被展示的是
         */
        let index = Math.floor(Math.abs(translateY) / offsetHeight);
        const val = mathMul(-index, offsetHeight);
        if (val - translateY < 5) {
            index -= 1;
        }

        if (index > records.length - 1) {
            index = records.length - 1;
        } else if (index < 0) {
            index = 0;
        }
        return -1 * mathMul(index, offsetHeight);
    };

    /**
     * 寻找 距离视口最近下一个的item 的偏移值
     */
    const findNextItem = () => {
        const scrollHeight = scrollHeightRef.current;
        if (!scrollHeight) {
            return;
        }

        const offsetHeight = offsetHeightRef.current;

        if (!offsetHeight) {
            return;
        }

        const translateY = scrollTopRef.current;

        if (translateY > 0) {
            return 0;
        }

        if (Math.abs(translateY) > scrollHeight - offsetHeight) {
            return -(scrollHeight - offsetHeight);
        }

        let index = Math.ceil(Math.abs(translateY) / offsetHeight);
        const val = mathMul(-index, offsetHeight);
        if (Math.abs(val - translateY) <= 5) {
            ++index;
        }

        if (index > records.length - 1) {
            index = records.length - 1;
        } else if (index < 0) {
            index = 0;
        }

        return mathMul(-index, offsetHeight);
    };

    /**
     * 寻找 距离视口最近的item 的偏移值
     */
    const findRecentItem = () => {
        const scrollHeight = scrollHeightRef.current;
        if (!scrollHeight) {
            return;
        }

        const offsetHeight = offsetHeightRef.current;
        if (!offsetHeight) {
            return;
        }

        const translateY = scrollTopRef.current;

        if (translateY > 0) {
            return 0;
        }

        if (Math.abs(translateY) > scrollHeight - offsetHeight) {
            return -(scrollHeight - offsetHeight);
        }

        const index = Math.round(Math.abs(translateY) / offsetHeight);
        return -1 * mathMul(index, offsetHeight);
    };

    /**
     * 赋值偏移值
     * @param move
     * @returns
     */
    const setTranslateY = (val: number) => {
        setScrollTop(val);

        const translateY = scrollTopRef.current;
        const scrollHeight = scrollHeightRef.current;
        const offsetHeight = offsetHeightRef.current;

        if (translateY >= 0) {
            animationFrameTimer.current && window.cancelAnimationFrame(animationFrameTimer.current);
            return "top";
        }
        if (!scrollHeight || !offsetHeight) {
            return;
        }

        if (Math.abs(translateY) >= scrollHeight - offsetHeight) {
            animationFrameTimer.current && window.cancelAnimationFrame(animationFrameTimer.current);
            return "bottom";
        }
    };
    /**
     * 之和
     * @param move
     * @returns
     */
    const sumVal = (move: number) => {
        return setTranslateY(mathSum(scrollTopRef.current, move));
    };

    /**
     * 移动中
     */
    const handleMove = (point: MovePointParams) => {
        setMoveStatus(true);
        animationFrameTimer.current && window.cancelAnimationFrame(animationFrameTimer.current);

        animationFrameTimer.current = undefined;

        if (!viewHeightRef.current || !offsetHeightRef.current || !scrollHeightRef.current) {
            return;
        }

        if (!startPoint.current) {
            isFirstMove.current = true;
            return;
        }

        const offsetHeight = offsetHeightRef.current;
        const scrollHeight = scrollHeightRef.current;
        const viewHeight = viewHeightRef.current;
        const translateY = scrollTopRef.current;

        if (
            Math.abs(point.pageY - startPoint.current.y) <=
                Math.abs(point.pageX - startPoint.current.x) &&
            isFirstMove.current === false
        ) {
            //当前滑动的方向不对
            startPoint.current = undefined;
            point.unBind();
            isFirstMove.current = true;
            return;
        }

        isFirstMove.current = true;

        point.preventDefault();

        /**
         * 大于0 是向上划
         * 小于0 是向下划
         */
        const move = point.pageY - startPoint.current.y;

        startPoint.current = {
            x: point.pageX,
            y: point.pageY,
        };

        lastData.current = {
            move,
            time: Date.now() - (startTime.current ?? 0),
        };

        startTime.current = Date.now();
        if (translateY + move > viewHeight / 2 + offsetHeight / 2) {
            //到了最上方
            return;
        }

        if (translateY + move < -(scrollHeight + viewHeight / 2 - offsetHeight / 2)) {
            //到了最下方
            return;
        }
        sumVal(move);
    };

    /**
     * 移动结束
     */
    const handleEnd = () => {
        if (!startPoint.current) {
            handleCancel();
            return;
        }

        const moveData = lastData.current;
        if (
            (moveData?.move && Math.abs(Math.round(moveData.move / moveData.time)) > 0) ||
            (!moveData?.time && moveData?.move)
        ) {
            inertialScrolling();
        } else {
            handleCancel();
        }
    };

    /**
     * 减速度
     * @param duration 持续多长时间减少
     * @param v 速度
     */
    const deceleration = (duration: number, v: { current: number }) => {
        if (isEndAnimate.current) {
            delayTimer.current && window.clearTimeout(delayTimer.current);
            delayTimer.current = undefined;
            return;
        }

        delayTimer.current = window.setTimeout(() => {
            if (!lastData.current?.move) {
                delayTimer.current && window.clearTimeout(delayTimer.current);
                return;
            }
            if (v.current > 0) {
                if (v.current - 3 > 2) {
                    v.current -= 3;
                } else {
                    v.current = 3;
                }
            } else {
                if (v.current + 3 < -2) {
                    v.current += 3;
                } else {
                    v.current = -3;
                }
            }
            if (Math.abs(v.current) < 4) {
                isEndAnimate.current = true;
            } else {
                deceleration(duration - 50, v);
            }
        }, duration);
    };

    /**
     * 执行动画
     * @param overStatus 是否过渡结束
     * @param v 速度
     * @param callback 当动画结束后 要干的事情
     */
    const toAnimate = (v: { current: number }, callback: () => void) => {
        if (!lastData.current || !scrollHeightRef.current || !offsetHeightRef.current) {
            const animationFrameTimerVal = animationFrameTimer.current;
            animationFrameTimerVal && window.cancelAnimationFrame(animationFrameTimerVal);
            return;
        }

        if (isEndAnimate.current) {
            const animationFrameTimerVal = animationFrameTimer.current;
            animationFrameTimerVal && window.cancelAnimationFrame(animationFrameTimerVal);
            callback();
            return;
        }

        const translateY = scrollTopRef.current;

        const scrollHeight = scrollHeightRef.current;

        const offsetHeight = offsetHeightRef.current;

        sumVal(v.current);
        if (translateY > 0) {
            isEndAnimate.current = true;
        } else if (Math.abs(translateY) > scrollHeight - offsetHeight) {
            isEndAnimate.current = true;
        }
        animationFrameTimer.current = window.requestAnimationFrame(() => {
            toAnimate(v, callback);
        });
    };

    /**
     * 当动画结束的时候
     */
    const handleAnimateEnd = () => {
        animationFrameTimer.current && window.cancelAnimationFrame(animationFrameTimer.current);
        animationFrameTimer.current = undefined;
        delayTimer.current && window.clearTimeout(delayTimer.current);
        delayTimer.current = undefined;
        setMoveStatus(false);
    };

    /**
     * 最后要停在一个合适的位置上
     * @param  endVal 最后的值
     * @param  v 速度
     *
     */
    const anchorShore = (endVal: number, v: { current: number }) => {
        if (!lastData.current) {
            return;
        }
        const translateY = scrollTopRef.current;

        if (v.current > 0) {
            if (v.current - 0.5 < 2) {
                v.current = 2;
            } else {
                v.current -= 0.5;
            }

            if (translateY + v.current >= endVal) {
                setTranslateY(endVal);
                handleAnimateEnd();
                return;
            }
        } else {
            if (v.current + 0.5 > -2) {
                v.current = -2;
            } else {
                v.current += 0.5;
            }
            if (translateY + v.current <= endVal) {
                setTranslateY(endVal);
                handleAnimateEnd();
                return;
            }
        }
        sumVal(v.current);

        animationFrameTimer.current = window.requestAnimationFrame(() => {
            anchorShore(endVal, v);
        });
    };

    /**
     * 定速
     * @param speed
     * @param endVal
     * @param endCallback
     */
    const constantSpeedAnimate = (speed: number, endVal: number, endCallback: () => void) => {
        const translateY = scrollTopRef.current;
        if (
            (speed > 0 && translateY + speed >= endVal) ||
            (speed < 0 && translateY + speed <= endVal) ||
            speed === 0
        ) {
            setTranslateY(endVal);
            endCallback?.();
            return;
        }

        animationFrameTimer.current = window.requestAnimationFrame(() => {
            sumVal(speed);

            constantSpeedAnimate(speed, endVal, endCallback);
        });
    };

    /**
     * 请求固定帧内的速度
     * @param endVal 最后的值
     * @param endCallback 当结束是要干的事情
     */
    const constantSpeed = (endVal: number, endCallback: () => void) => {
        const translateY = scrollTopRef.current;

        const speed = endVal - translateY ? Math.round((endVal - translateY) / 15) : 0;
        constantSpeedAnimate(speed, endVal, endCallback);
    };
    /**
     * 惯性动画结束后要干的事情
     * @param  direction 滑动的方向
     * @param  v 速度
     */
    const inertialScrolledAfter = (direction: "down" | "up", v: { current: number }) => {
        if (!offsetHeightRef.current) {
            return;
        }

        const offsetHeight = offsetHeightRef.current;
        const translateY = scrollTopRef.current;

        let endVal = 0;
        if (direction === "down") {
            endVal = findPreviousItem() ?? 0;
            if (endVal < translateY) {
                constantSpeed(endVal, () => {
                    handleAnimateEnd();
                });
                return;
            }
        } else {
            endVal = findNextItem() ?? mathMul(-(records.length - 1), offsetHeight);
            if (endVal > translateY) {
                constantSpeed(endVal, () => {
                    handleAnimateEnd();
                });
                return;
            }
        }
        anchorShore(endVal, v);
    };

    /**
     * 惯性滚动
     */
    const inertialScrolling = () => {
        if (!lastData.current) {
            return;
        }
        /**
         * 手势方向
         */
        const direction = lastData.current.move > 0 ? "down" : "up";
        /**
         * 速度
         */
        const v = {
            current: lastData.current.time
                ? Math.ceil(lastData.current.move / lastData.current.time)
                : lastData.current.move,
        };

        if (v.current > 0) {
            v.current += 8;
        } else {
            v.current -= 8;
        }
        isEndAnimate.current = false;
        /**
         * 减速度
         */
        deceleration(100, v);

        /**
         * 运动
         */
        animationFrameTimer.current = window.requestAnimationFrame(() => {
            toAnimate(v, () => {
                inertialScrolledAfter(direction, v);
            });
        });
    };

    /**
     * 取消移动
     */
    const handleCancel = () => {
        animationFrameTimer.current && window.cancelAnimationFrame(animationFrameTimer.current);
        delayTimer.current && window.clearTimeout(delayTimer.current);
        const val = findRecentItem() ?? 0;
        constantSpeed(val, () => {
            handleAnimateEnd();
        });
    };

    const [mouseDown, touchStart] = useDrag(
        (point) => {
            //开始
            startPoint.current = {
                x: point.pageX,
                y: point.pageY,
            };

            startTime.current = Date.now();
            animationFrameTimer.current && window.cancelAnimationFrame(animationFrameTimer.current);

            animationFrameTimer.current = undefined;

            delayTimer.current && window.clearTimeout(delayTimer.current);
            delayTimer.current = undefined;

            lastData.current = undefined;

            isFirstMove.current = false;

            isEndAnimate.current = true;
        },
        handleMove,
        handleEnd,
        handleCancel,
    );

    /**
     * 终止动画
     */
    const terminationAnimate = () => {
        startPoint.current = undefined;

        startTime.current = undefined;

        animationFrameTimer.current && window.cancelAnimationFrame(animationFrameTimer.current);

        animationFrameTimer.current = undefined;

        delayTimer.current && window.clearTimeout(delayTimer.current);
        delayTimer.current = undefined;

        lastData.current = undefined;

        isFirstMove.current = false;

        isEndAnimate.current = true;
    };

    useUnmount(terminationAnimate);

    return [mouseDown, touchStart, terminationAnimate];
};
