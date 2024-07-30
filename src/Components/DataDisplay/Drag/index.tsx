/**
 * @file Drag component
 * @date 2022-05-30
 * @author xuejie.he
 * @lastModify xuejie.he 2022-05-30
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useRef, useState } from "react";
import { getScrollValue } from "../../..";
import { stopSelect } from "../../DataInput/Slider/Unit/noSelected";
import styles from "./style.module.scss";
import { getTransformAttr } from "./Unit/getTransformAttr";
import Resize, { DragAttr } from "./Unit/resize";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface DragProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Is it possible to drag and drop
     */
    isDrag?: boolean;
    /**
     * Is it resizable
     */
    isResize?: boolean;
    /**
     * children of this component
     */
    children?: React.ReactNode;
    /**
     * resize callback
     */
    handleResize?: (res: { old?: DragAttr; new?: DragAttr }) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Drag = forwardRef<HTMLDivElement, DragProps>(
    ({ isDrag = true, isResize = false, children, onMouseDown, handleResize, ...props }, ref) => {
        Drag.displayName = "Drag";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const [root, setRoot] = useState<HTMLDivElement | null>(null);

        const selectedFn = useRef<typeof document.onselectstart>(null);

        const point = useRef({
            offsetX: 0,
            offsetY: 0,
        });

        const dragTimer = useRef<number>();

        const attrRef = useRef<{ old?: DragAttr; new?: DragAttr }>({});
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        const handleMouseMove = (e: MouseEvent) => {
            if (dragTimer.current) {
                return;
            }
            dragTimer.current = window.setTimeout(() => {
                dragTimer.current = undefined;

                if (!root) return;

                let x = e.pageX;
                let y = e.pageY;

                if (x < 0) {
                    x = 0;
                } else if (x > window.innerWidth) {
                    x = window.innerWidth;
                }

                if (y < 0) {
                    y = 0;
                } else if (y > window.innerHeight) {
                    y = window.innerHeight;
                }
                const left = x - point.current.offsetX;
                const top = y - point.current.offsetY;

                const rect = root.getBoundingClientRect();
                let { width, height } = rect;
                if (window.getComputedStyle(root, null).boxSizing !== "border-box") {
                    width = root.clientWidth;
                    height = root.clientHeight;
                }
                attrRef.current.new = Object.assign(
                    attrRef.current?.new
                        ? {
                              ...attrRef.current.new,
                          }
                        : {},
                    {
                        x: left,
                        y: top,
                        width,
                        height,
                    },
                );

                const attr = getTransformAttr(root);
                if (attr) {
                    root.style.transform = `none`;
                }
                root.style.left = `${left}px`;
                root.style.top = `${top}px`;
                root.style.width = `${attrRef.current.new.width}px`;
                root.style.height = `${attrRef.current.new.height}px`;
            });
        };
        const handleMouseUp = () => {
            window.clearTimeout(dragTimer.current);
            dragTimer.current = undefined;

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.onselectstart = selectedFn.current;
            point.current = {
                offsetX: 0,
                offsetY: 0,
            };
        };

        const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
            onMouseDown?.(e);
            if (!isDrag) {
                return;
            }

            stopSelect(e, selectedFn, true);

            const el = e.currentTarget;
            const rect = el.getBoundingClientRect();
            const scrollData = getScrollValue();

            const x = e.pageX;
            const y = e.pageY;

            point.current = {
                offsetX: x - (rect.left + scrollData.x),
                offsetY: y - (rect.top + scrollData.y),
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={styles.drag_wrap}
                ref={(el) => {
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                    }

                    if ((isDrag || isResize) && el !== root) {
                        setRoot(el);
                    }
                }}
                onMouseDown={handleMouseDown}
                {...props}
            >
                {isResize && (
                    <Resize
                        dragEl={root}
                        handleChange={(oldAttr, newAttr) => {
                            attrRef.current = {
                                old: oldAttr ? { ...oldAttr } : undefined,
                                new: newAttr ? { ...newAttr } : undefined,
                            };
                            handleResize?.(attrRef.current);
                        }}
                    />
                )}
                {children}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Drag.displayName = "Drag";
