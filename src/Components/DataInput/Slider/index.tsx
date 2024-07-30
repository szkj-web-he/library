/**
 * @file slider
 * @date 2021-08-26
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { getScrollValue } from "../../..";
import styles from "./style.module.scss";
import Bar from "./Unit/dragBar";
import { Point } from "./Unit/type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface SliderProps {
    /**
     * slider bar radius
     */
    r?: string;
    /**
     * listen slider bar change,
     * The return parameter of the function is the percentage of the slider bar
     * value of [0~1]
     */
    handleChange?: (value: number) => void;
    /**
     * Percentage of slider bar
     * value of [0~1];
     */
    value?: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Slider: React.FC<SliderProps> = ({
    r = "0.5rem",
    handleChange = undefined,
    value = 0,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const sliderRef = useRef<null | HTMLDivElement>(null);

    const point = useRef({
        x: 0,
    });

    const currentLeft = useRef(0);

    const track = useRef<null | HTMLDivElement>(null);

    const [left, setLeft] = useState(0);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const fn = () => {
            const node = track.current;
            let val = value;
            if (node) {
                if (val < 0) {
                    val = 0;
                } else if (val > 1) {
                    val = 1;
                }
                setLeft(val * node.offsetWidth);
            }
        };
        fn();
    }, [value]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleDragMove = ({ pageX, offsetX }: Point) => {
        const el = track.current;
        if (!el) {
            return;
        }

        const x = pageX - offsetX;

        const rect = el.getBoundingClientRect();

        const scrollData = getScrollValue();
        let left = x - (rect.left + scrollData.x);

        if (left < 0) {
            left = 0;
        } else if (left > el.offsetWidth) {
            left = el.offsetWidth;
        }

        currentLeft.current = left;

        point.current.x = x;

        handleChange?.(left / (el.offsetWidth || 1));
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const { pageX } = e;
        const rect = e.currentTarget.getBoundingClientRect();
        const scrollData = getScrollValue();
        const x = pageX - (rect.left + scrollData.x);

        handleChange?.(x / e.currentTarget.offsetWidth);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.slider_container} ref={sliderRef}>
            <div className={styles.slider_track} ref={track} onClick={handleClick}>
                <div
                    className={styles.slider_walked}
                    style={{
                        width: `${left}px`,
                    }}
                />
            </div>
            <Bar
                className={styles.slider_bar}
                style={{
                    width: `calc(${r} + ${r})`,
                    height: `calc(${r} + ${r})`,
                    left: `-${r}`,
                    transform: `translateX(${left}px)`,
                }}
                handleDragMove={handleDragMove}
            />
        </div>
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
