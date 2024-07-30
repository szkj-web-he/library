/**
 * @file Resize
 * @date 2022-01-12
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-12
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef } from "react";
import styles from "../style.module.scss";
import { stopSelect } from "../../../DataInput/Slider/Unit/noSelected";
import { getTransformAttr } from "./getTransformAttr";
import { getScrollValue } from "../../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface DragAttr {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface TempProps {
    handleChange: (oldRes: DragAttr | null, newRes: DragAttr | null) => void;
    dragEl: HTMLElement | null;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ handleChange, dragEl }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const styleEl = useRef<HTMLStyleElement | null>(null);

    const oldAttr = useRef<DragAttr | null>(null);

    const newAttr = useRef<DragAttr | null>(null);

    const selectedFn = useRef<typeof document.onselectstart>(null);

    const point = useRef({
        x: 0,
        y: 0,
    });

    /**
     * Mouse down 的开始位置
     *  left
     *      1 => 右
     *     -1 => 左
     *
     * top
     *       1 => 下
     *      -1 => 上
     */
    const type = useRef<null | {
        left?: true;
        top?: true;
        right?: true;
        bottom?: true;
    }>(null);

    const timer = useRef<number>();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        return () => {
            timer.current && window.clearTimeout(timer.current);
        };
    }, []);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * 根据type 来定义 它们自己的边界
     * @param type
     * @returns
     */
    const getBoundary = (
        type: null | {
            left?: true;
            top?: true;
            right?: true;
            bottom?: true;
        },
    ) => {
        if (!dragEl) {
            return;
        }
        const boundary: {
            top?: number;
            bottom?: number;
            left?: number;
            right?: number;
        } = {};

        const minSpace = 100;

        const scrollData = getScrollValue();

        const rect = dragEl.getBoundingClientRect();
        if (type?.left) {
            boundary.left = 0;
            boundary.right = rect.left + rect.width + scrollData.x - minSpace;
        } else if (type?.right) {
            boundary.left = rect.left + scrollData.x + minSpace;
            boundary.right = window.innerWidth;
        }

        if (type?.top) {
            boundary.top = 0;
            boundary.bottom = rect.top + rect.height + scrollData.y - minSpace;
        } else if (type?.bottom) {
            boundary.top = rect.top + scrollData.y + minSpace;
            boundary.bottom = window.innerHeight;
        }
        return boundary;
    };
    /**
     *
     * @param e 当移动时
     * @returns
     */
    const handleMouseMove = (e: MouseEvent) => {
        if (timer.current) {
            return;
        }
        timer.current = window.setTimeout(() => {
            timer.current = undefined;
            if (!dragEl) {
                return;
            }
            let x = e.pageX;
            let y = e.pageY;
            const boundary = getBoundary(type.current);
            const rect = dragEl.getBoundingClientRect();

            if (boundary?.right && x > boundary.right) {
                x = boundary.right;
            } else if (boundary?.left && x < boundary.left) {
                x = boundary.left;
            }

            if (boundary?.bottom && y > boundary.bottom) {
                y = boundary.bottom;
            } else if (boundary?.top && y < boundary.top) {
                y = boundary.top;
            }

            let { left, top, width, height } = rect;
            if (window.getComputedStyle(dragEl, null).boxSizing !== "border-box") {
                width = dragEl.clientWidth;
                height = dragEl.clientHeight;
            }

            const moveX = x - point.current.x;
            const moveY = y - point.current.y;

            point.current.x = x;
            point.current.y = y;

            const scrollData = getScrollValue();

            if (type.current?.left) {
                left = x;
                width -= moveX;
            } else if (type.current?.right) {
                left = rect.left + scrollData.x;
                width += moveX;
            }

            if (type.current?.top) {
                top = y;
                height -= moveY;
            } else if (type.current?.bottom) {
                top = rect.top + scrollData.y;
                height += moveY;
            }

            const attr = getTransformAttr(dragEl);

            newAttr.current = {
                x: left,
                y: top,
                width,
                height,
            };
            if (attr) {
                dragEl.style.transform = "none";
            }
            dragEl.style.left = `${newAttr.current.x}px`;
            dragEl.style.top = `${newAttr.current.y}px`;
            dragEl.style.width = `${newAttr.current.width}px`;
            dragEl.style.height = `${newAttr.current.height}px`;
        });
    };

    const handleMouseUp = () => {
        window.clearTimeout(timer.current);
        timer.current = undefined;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.onselectstart = selectedFn.current;
        point.current = {
            x: 0,
            y: 0,
        };
        styleEl.current?.remove();
        if (JSON.stringify(oldAttr.current) === JSON.stringify(newAttr.current)) {
            return;
        }
        handleChange(oldAttr.current, newAttr.current);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!dragEl) return;

        stopSelect(e, selectedFn, true);

        const x = e.pageX;
        const y = e.pageY;

        point.current = {
            x,
            y,
        };

        oldAttr.current = newAttr.current
            ? {
                  ...newAttr.current,
              }
            : null;
        const cursorAttr = window.getComputedStyle(e.currentTarget, null).cursor;

        styleEl.current = document.createElement("style");
        styleEl.current.innerHTML = `*{cursor:${cursorAttr} !important}`;
        document.head.append(styleEl.current);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    /**
     * 当鼠标按下 在top上时
     */
    const handleMouseDownOnTop = (e: React.MouseEvent<HTMLDivElement>) => {
        type.current = { top: true };
        handleMouseDown(e);
    };
    /**
     * 当鼠标按下 在right上时
     */
    const handleMouseDownOnRight = (e: React.MouseEvent<HTMLDivElement>) => {
        type.current = { right: true };
        handleMouseDown(e);
    };
    /**
     * 当鼠标按下 在bottom上时
     */
    const handleMouseDownOnBottom = (e: React.MouseEvent<HTMLDivElement>) => {
        type.current = { bottom: true };
        handleMouseDown(e);
    };
    /**
     * 当鼠标按下 在left上时
     */
    const handleMouseDownOnLeft = (e: React.MouseEvent<HTMLDivElement>) => {
        type.current = { left: true };
        handleMouseDown(e);
    };
    /**
     * 当鼠标按下 在top left上时
     */
    const handleMouseDownOnTopLeft = (e: React.MouseEvent<HTMLDivElement>) => {
        type.current = { left: true, top: true };
        handleMouseDown(e);
    };
    /**
     * 当鼠标按下 在top right上时
     */
    const handleMouseDownOnTopRight = (e: React.MouseEvent<HTMLDivElement>) => {
        type.current = { top: true, right: true };
        handleMouseDown(e);
    };
    /**
     * 当鼠标按下 在bottom right上时
     */
    const handleMouseDownOnBottomRight = (e: React.MouseEvent<HTMLDivElement>) => {
        type.current = { bottom: true, right: true };
        handleMouseDown(e);
    };
    /**
     * 当鼠标按下 在bottom left上时
     */
    const handleMouseDownOnBottomLeft = (e: React.MouseEvent<HTMLDivElement>) => {
        type.current = { bottom: true, left: true };
        handleMouseDown(e);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <div className={styles.drag_topBar} tabIndex={-1} onMouseDown={handleMouseDownOnTop} />
            <div
                className={styles.drag_rightBar}
                tabIndex={-1}
                onMouseDown={handleMouseDownOnRight}
            />
            <div
                className={styles.drag_bottomBar}
                tabIndex={-1}
                onMouseDown={handleMouseDownOnBottom}
            />
            <div
                tabIndex={-1}
                className={styles.drag_leftBar}
                onMouseDown={handleMouseDownOnLeft}
            />
            <div
                tabIndex={-1}
                className={styles.drag_tlBar}
                onMouseDown={handleMouseDownOnTopLeft}
            />
            <div
                tabIndex={-1}
                className={styles.drag_trBar}
                onMouseDown={handleMouseDownOnTopRight}
            />
            <div
                tabIndex={-1}
                className={styles.drag_brBar}
                onMouseDown={handleMouseDownOnBottomRight}
            />
            <div
                tabIndex={-1}
                className={styles.drag_blBar}
                onMouseDown={handleMouseDownOnBottomLeft}
            />
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
