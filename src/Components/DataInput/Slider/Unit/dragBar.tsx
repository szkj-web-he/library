/**
 * @file 拖拽的柄
 * @date 2022-09-07
 * @author xuejie.he
 * @lastModify xuejie.he 2022-09-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, memo, useRef } from "react";
import { getScrollValue } from "../../../..";
import { Point } from "./type";
import useEventListener from "./../../../../Hooks/useEventListener";
import { useEffect } from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 开始拖拽
     */
    handleDragStart?: (res: Point) => void;
    /**
     * 拖拽移动中
     */
    handleDragMove?: (res: Point) => void;
    /**
     * 拖拽结束
     */
    handleDragEnd?: (res: Point) => void;
    /**
     * 拖拽取消
     */
    handleDragCancel?: () => void;
    /**
     * 是否阻止冒泡
     */
    stopPropagation?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<HTMLDivElement, TempProps>(
    (
        {
            handleDragStart,
            handleDragMove,
            handleDragEnd,
            handleDragCancel,
            stopPropagation = true,
            ...props
        },
        ref,
    ) => {
        Temp.displayName = "DragBar";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const bar = useRef<HTMLDivElement | null>(null);

        const touchStatus = useRef(false);

        const mouseDownStatus = useRef(false);

        const offset = useRef({
            x: 0,
            y: 0,
        });

        const selectedFn = useRef<typeof document.onselectstart>(null);

        const timer = useRef<number | null>(null);

        const destroy = useRef(false);

        const pointerStyle = useRef<HTMLStyleElement>();

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        useEffect(() => {
            const timerData = timer.current;
            destroy.current = false;
            return () => {
                timerData && window.clearTimeout(timerData);
                destroy.current = true;
            };
        }, []);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const removeSelect = (e: TouchEvent | MouseEvent) => {
            if (stopPropagation) {
                e.stopPropagation();
            }
            if (window.TouchEvent && e instanceof TouchEvent) {
                e.stopImmediatePropagation();
                e.preventDefault();
            }

            window.getSelection()?.removeAllRanges();
            selectedFn.current = document.onselectstart;
            document.onselectstart = () => false;
        };

        /**
         * 移除移动换事件
         */
        const removeHandle = () => {
            window.removeEventListener("blur", handleTouchBlur);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
            document.removeEventListener("touchcancel", handleTouchCancel);
        };

        const resetSelect = () => {
            document.onselectstart = selectedFn.current;
            selectedFn.current = null;
            offset.current = {
                x: 0,
                y: 0,
            };
            touchStatus.current = false;
            mouseDownStatus.current = false;
        };

        const handleTouchStart = (e: TouchEvent) => {
            timer.current && window.clearTimeout(timer.current);

            if (mouseDownStatus.current || e.cancelable === false || !bar.current) {
                return;
            }

            touchStatus.current = true;
            removeSelect(e);

            const scrollData = getScrollValue();
            const rect = bar.current.getBoundingClientRect();
            const left = rect.left + scrollData.x;
            const top = rect.top + scrollData.y;
            const event = e.changedTouches[0];
            offset.current = {
                x: event.pageX - left,
                y: event.pageY - top,
            };

            handleDragStart?.({
                offsetX: offset.current.x,
                offsetY: offset.current.y,
                pageX: event.pageX,
                pageY: event.pageY,
                clientX: event.clientX,
                clientY: event.clientY,
            });

            window.addEventListener("blur", handleTouchBlur);
            document.addEventListener("touchmove", handleTouchMove);
            document.addEventListener("touchend", handleTouchEnd);
            document.addEventListener("touchcancel", handleTouchCancel);
        };

        const handleTouchBlur = () => {
            timer.current && window.clearTimeout(timer.current);
            if (!touchStatus.current) {
                return;
            }
            resetSelect();
            handleDragCancel?.();
            removeHandle();
        };

        const handleTouchMove = (e: TouchEvent) => {
            timer.current && window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => {
                if (!touchStatus.current || destroy.current) {
                    return;
                }

                const event = e.changedTouches[0];

                handleDragMove?.({
                    offsetX: offset.current.x,
                    offsetY: offset.current.y,
                    pageX: event.pageX,
                    pageY: event.pageY,
                    clientX: event.clientX,
                    clientY: event.clientY,
                });
            });
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!touchStatus.current) {
                return;
            }
            timer.current && window.clearTimeout(timer.current);
            const event = e.changedTouches[0];
            resetSelect();
            handleDragEnd?.({
                offsetX: offset.current.x,
                offsetY: offset.current.y,
                pageX: event.pageX,
                pageY: event.pageY,
                clientX: event.clientX,
                clientY: event.clientY,
            });
            removeHandle();
        };

        const handleTouchCancel = () => {
            timer.current && window.clearTimeout(timer.current);
            if (!touchStatus.current) {
                return;
            }
            resetSelect();
            handleDragCancel?.();
            removeHandle();
        };

        const handleMouseDown = (e: MouseEvent) => {
            timer.current && window.clearTimeout(timer.current);
            if (touchStatus.current || !bar.current) {
                return;
            }
            const styleNode = document.createElement("style");
            styleNode.innerHTML = `*{
                cursor:${window.getComputedStyle(bar.current, null).cursor} !important;
            }`;
            document.head.appendChild(styleNode);

            pointerStyle.current = styleNode;

            removeSelect(e);

            const scrollData = getScrollValue();
            const rect = bar.current.getBoundingClientRect();
            const left = rect.left + scrollData.x;
            const top = rect.top + scrollData.y;

            offset.current = {
                x: e.pageX - left,
                y: e.pageY - top,
            };
            handleDragStart?.({
                offsetX: offset.current.x,
                offsetY: offset.current.y,
                pageX: e.pageX,
                pageY: e.pageY,
                clientX: e.clientX,
                clientY: e.clientY,
            });

            mouseDownStatus.current = true;
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("blur", handleMouseCancel);
        };

        const handleMouseMove = (e: MouseEvent) => {
            timer.current && window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => {
                if (!mouseDownStatus.current || destroy.current) {
                    return;
                }
                handleDragMove?.({
                    offsetX: offset.current.x,
                    offsetY: offset.current.y,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    clientX: e.clientX,
                    clientY: e.clientY,
                });
            });
        };

        const handleMouseUp = (e: MouseEvent) => {
            timer.current && window.clearTimeout(timer.current);
            if (!mouseDownStatus.current) {
                return;
            }
            handleDragEnd?.({
                offsetX: offset.current.x,
                offsetY: offset.current.y,
                pageX: e.pageX,
                pageY: e.pageY,
                clientX: e.clientX,
                clientY: e.clientY,
            });
            resetSelect();
            pointerStyle.current?.remove();
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("blur", handleMouseCancel);
        };

        const handleMouseCancel = () => {
            timer.current && window.clearTimeout(timer.current);
            if (!mouseDownStatus.current) {
                return;
            }
            pointerStyle.current?.remove();
            resetSelect();
            handleDragCancel?.();
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("blur", handleMouseCancel);
        };

        useEventListener("mousedown", handleMouseDown, bar);
        useEventListener("touchstart", handleTouchStart, bar, { passive: false });

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                ref={(el) => {
                    bar.current = el;
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                    }
                }}
                {...props}
            />
        );
    },
);
Temp.displayName = "DragBar";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default memo(Temp);
