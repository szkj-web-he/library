/**
 * @file color slider
 * @date 2021-08-12
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-12
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { hslToRgb, rgbToHsl, otherToRGB } from "../colorConversion";
import { stopSelect } from "../../../../DataInput/Slider/Unit/noSelected";
import { toFixedNumber } from "../toFixedNumber";
import { getScrollValue } from "../../../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ColorSliderProps {
    defaultColor: string;
    getMainColor: (r: number, g: number, b: number) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ColorSlider: React.FC<ColorSliderProps> = ({ getMainColor, defaultColor }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const mainColorRef = useRef<null | HTMLDivElement>(null);

    const syncLeft = useRef(0);

    /**
     * 0~1
     */
    const [left, setLeft] = useState<number>(0);

    const preMousePoint = useRef(0);

    const selectFn = useRef<typeof document.onselectstart>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const rgb = otherToRGB(defaultColor);
        const el = mainColorRef.current;

        if (rgb && el) {
            const [h] = rgbToHsl(...rgb);
            setLeft(h / 360);
        }
    }, [defaultColor]);

    useEffect(() => {
        const color = hslToRgb(left * 360, 100, 50);

        getMainColor && getMainColor(...color);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [left]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleMouseMove = (e: MouseEvent) => {
        const el = mainColorRef.current;
        if (el) {
            const moveX = e.pageX - preMousePoint.current;

            let x = syncLeft.current + moveX;

            preMousePoint.current = e.pageX;

            if (x > el.clientWidth) {
                x = el.clientWidth;
            } else if (x < 0) {
                x = 0;
            }

            syncLeft.current = x;

            setLeft(toFixedNumber(syncLeft.current / el.clientWidth, 2));
        }
    };
    const handleMouseUp = (e: MouseEvent) => {
        handleMouseMove(e);
        preMousePoint.current = 0;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.onselectstart = selectFn.current;
        selectFn.current = null;
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        stopSelect(e, selectFn, true);
        preMousePoint.current = e.pageX;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = mainColorRef.current;

        if (el) {
            const scrollPosition = getScrollValue();

            const rect = el.getBoundingClientRect();

            const val = Math.round((rect?.left || 0) * 100) / 100 + scrollPosition.x;

            let x = e.pageX - val;

            if (x < 0) {
                x = 0;
            } else if (x > el.clientWidth) {
                x = el.clientWidth;
            }

            syncLeft.current = x;

            setLeft(toFixedNumber(syncLeft.current / el.clientWidth, 2));
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={styles.colorSlider_colorContainer}
            ref={mainColorRef}
            onMouseDown={handleClick}
        >
            <div className={styles.colorSlider_colorContent} />
            <div
                className={styles.colorSlider_colorBar}
                onMouseDown={handleMouseDown}
                style={{
                    left: `${left * 100}%`,
                    backgroundColor: `rgb(${hslToRgb(left * 360, 100, 50).join(",")})`,
                }}
            />
        </div>
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
