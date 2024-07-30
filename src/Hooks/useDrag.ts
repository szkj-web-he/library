/**
 * @file 拖拽事件
 * @date 2023-06-09
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-09
 */

import { useRef } from "react";
import { useLatest } from "./useLatest";

/**
 * drag 暴露出来的点位信息
 */
export interface PointProp {
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
}

export interface MovePointParams extends PointProp {
    /**
     * 阻止原生事件
     * @returns
     */
    preventDefault: () => void;
    /**
     * 解除绑定
     * @returns
     */
    unBind: () => void;
}

/**
 * 拖拽节点
 * @param handleStart 开始拖拽的回调
 * @param handleMove 拖拽中的回调
 * @param handleEnd 拖拽结束的回调
 * @param handleCancel 拖拽取消的回调
 * @returns
 */
export const useDrag = (
    handleStart: (res: PointProp) => void,
    handleMove: (res: MovePointParams) => void,
    handleEnd: (res: PointProp) => void,
    handleCancel: () => void,
): [(e: MouseEvent | React.MouseEvent) => void, (e: TouchEvent | React.TouchEvent) => void] => {
    const selectedFn = useRef<typeof document.onselectstart>(null);
    /**
     * 开始的事件
     */
    const startFn = useLatest(handleStart);
    /**
     * 结束的事件
     */
    const endFn = useLatest(handleEnd);
    /**
     * 移动事件
     */
    const moveFn = useLatest(handleMove);
    /**
     * 取消事件
     */
    const cancelFn = useLatest(handleCancel);

    /**
     * 移动端事件
     */

    const options: AddEventListenerOptions = {
        passive: false,
        capture: true,
    };

    const removeTouchHandle = () => {
        document.removeEventListener("touchmove", handleTouchMove, options);
        document.removeEventListener("touchend", handleTouchEnd, options);
        document.removeEventListener("touchcancel", handleTouchCancel, options);
    };

    /**
     * touchmove
     */
    const handleTouchMove = (e: TouchEvent) => {
        if (!e.cancelable) {
            return;
        }

        const { pageX, pageY, clientX, clientY } = e.changedTouches[0];

        moveFn.current({
            pageX,
            pageY,
            clientX,
            clientY,
            preventDefault: () => {
                e.preventDefault();
                e.stopImmediatePropagation();
            },
            unBind: removeTouchHandle,
        });
    };

    /**
     * touchend
     * @param e
     * @returns
     */
    const handleTouchEnd = (e: TouchEvent) => {
        removeTouchHandle();

        endFn.current({
            pageX: e.changedTouches[0].pageX,
            pageY: e.changedTouches[0].pageY,
            clientX: e.changedTouches[0].clientX,
            clientY: e.changedTouches[0].clientY,
        });
    };

    const handleTouchCancel = () => {
        removeTouchHandle();

        cancelFn.current();
    };

    /**
     * 开始触摸
     */
    const handleTouchStart = (e: TouchEvent | React.TouchEvent) => {
        if (!e.cancelable) {
            return true;
        }

        startFn.current({
            pageX: e.changedTouches[0].pageX,
            pageY: e.changedTouches[0].pageY,
            clientX: e.changedTouches[0].clientX,
            clientY: e.changedTouches[0].clientY,
        });

        document.addEventListener("touchmove", handleTouchMove, options);
        document.addEventListener("touchend", handleTouchEnd, options);
        document.addEventListener("touchcancel", handleTouchCancel, options);
    };
    /**
     * 手机端事件 结束
     */

    /**
     * 桌面端事件
     */

    /**
     * 还原事件
     */
    const removeDeskHandle = () => {
        document.removeEventListener("mousemove", handleMouseMove, true);
        document.removeEventListener("mouseup", handleMouseUp, true);
        window.removeEventListener("blur", handleMouseCancel, true);
        document.onselectstart = selectedFn.current;
        selectedFn.current = null;
    };

    /**
     * 清除选择
     * 并阻止其它事件
     */
    const removeSelect = (e: MouseEvent) => {
        e.stopImmediatePropagation();
        e.preventDefault();
        window.getSelection()?.removeAllRanges();
        selectedFn.current = document.onselectstart;
        document.onselectstart = () => false;
    };

    /**
     * 移动
     * @param e
     */
    const handleMouseMove = (e: MouseEvent) => {
        const { pageX, pageY, clientX, clientY } = e;

        moveFn.current({
            pageX,
            pageY,
            clientX,
            clientY,
            preventDefault: () => {
                removeSelect(e);
            },
            unBind: removeDeskHandle,
        });
    };

    /**
     * 当鼠标松开
     * @param e
     */
    const handleMouseUp = (e: MouseEvent) => {
        endFn.current({
            pageX: e.pageX,
            pageY: e.pageY,
            clientX: e.clientX,
            clientY: e.clientY,
        });
        removeDeskHandle();
    };

    /**
     * 取消
     */
    const handleMouseCancel = () => {
        cancelFn.current();
        removeDeskHandle();
    };

    /**
     * 开始拖拽
     */
    const handleMouseDown = (e: MouseEvent | React.MouseEvent) => {
        startFn.current({
            pageX: e.pageX,
            pageY: e.pageY,
            clientX: e.clientX,
            clientY: e.clientY,
        });
        document.addEventListener("mousemove", handleMouseMove, true);
        document.addEventListener("mouseup", handleMouseUp, true);
        window.addEventListener("blur", handleMouseCancel, true);
    };

    return [handleMouseDown, handleTouchStart];
};
