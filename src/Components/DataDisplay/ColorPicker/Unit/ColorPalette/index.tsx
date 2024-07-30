/**
 * @file color palette
 * @date 2021-08-12
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-12
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";

import { otherToRGB, rgbToHsv, hsvToRgb } from "../colorConversion";
import { stopSelect } from "../../../../DataInput/Slider/Unit/noSelected";
import { getScrollValue } from "../../../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface SubColorProps {
    defaultColor: string;
    mainColor?: [number, number, number];
    getSelectColor: (r: number, g: number, b: number) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const SubColor: React.FC<SubColorProps> = ({ defaultColor, mainColor, getSelectColor }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const colorPaletteRef = useRef<null | HTMLDivElement>(null);

    const syncPosition = useRef({
        x: 0,
        y: 0,
    });

    const [position, setPosition] = useState(syncPosition.current);

    const preMousePoint = useRef({
        x: 0,
        y: 0,
    });

    const selectFn = useRef<typeof document.onselectstart>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        if (colorPaletteRef.current) {
            const [width, height] = [
                colorPaletteRef.current.clientWidth,
                colorPaletteRef.current.clientHeight,
            ];
            const rgb = otherToRGB(defaultColor);
            let [x, y] = [width, 0];

            if (rgb && mainColor) {
                const [h, s, v] = rgbToHsv(...rgb);
                const [mh] = rgbToHsv(...mainColor);

                if (mh === h) {
                    x = Math.round((s / 100) * width);
                    y = Math.round(((100 - v) / 100) * height);
                }
            }

            syncPosition.current = {
                x,
                y,
            };

            setPosition(syncPosition.current);
        }
    }, [defaultColor, mainColor]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const getColorByPoint = (x: number, y: number): [number, number, number] => {
        const [width, height] = [
            colorPaletteRef.current?.clientWidth || 0,
            colorPaletteRef.current?.clientHeight || 0,
        ];

        const s = (x / width) * 100;
        const v = ((height - y) / height) * 100;
        const h = mainColor ? rgbToHsv(mainColor[0], mainColor[1], mainColor[2])[0] : 0;

        return hsvToRgb(h, s, v).map((item) => Math.round(item)) as [number, number, number];
    };

    useEffect(() => {
        const rgb = getColorByPoint(position.x, position.y);

        getSelectColor && getSelectColor(...rgb);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

    const handleMouseMove = (e: MouseEvent) => {
        const el = colorPaletteRef.current;
        if (el) {
            const moveX = e.pageX - preMousePoint.current.x;
            const moveY = e.pageY - preMousePoint.current.y;

            let x = syncPosition.current.x + moveX;
            let y = syncPosition.current.y + moveY;
            preMousePoint.current = {
                x: e.pageX,
                y: e.pageY,
            };

            if (x > el.clientWidth) {
                x = el.clientWidth;
            } else if (x < 0) {
                x = 0;
            }
            if (y > el.clientHeight) {
                y = el.clientHeight;
            } else if (y < 0) {
                y = 0;
            }
            syncPosition.current = {
                x,
                y,
            };

            setPosition(syncPosition.current);
        }
    };
    const handleMouseUp = (e: MouseEvent) => {
        handleMouseMove(e);
        preMousePoint.current = { x: 0, y: 0 };
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.onselectstart = selectFn.current;
        selectFn.current = null;
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        stopSelect(e, selectFn, true);
        preMousePoint.current = { x: e.pageX, y: e.pageY };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = colorPaletteRef.current;
        if (el) {
            const scrollPosition = getScrollValue();

            const colorPaletteRect = el.getBoundingClientRect();

            const left = Math.round((colorPaletteRect?.left || 0) * 100) / 100 + scrollPosition.x;
            const top = Math.round((colorPaletteRect?.top || 0) * 100) / 100 + scrollPosition.y;

            let x = e.pageX - left;
            let y = e.pageY - top;

            if (x < 0) {
                x = 0;
            } else if (x > el.clientWidth) {
                x = el.clientWidth;
            }

            if (y < 0) {
                y = 0;
            } else if (y > el.clientHeight) {
                y = el.clientHeight;
            }

            syncPosition.current = {
                x,
                y,
            };

            setPosition(syncPosition.current);
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={styles.subColor_wrap}
            ref={colorPaletteRef}
            onMouseDown={handleClick}
            style={mainColor ? { backgroundColor: `rgb(${mainColor.join(",")})` } : {}}
        >
            <div className={styles.subColor_white} />
            <div className={styles.subColor_black} />
            <div
                className={styles.subColor_bar}
                onMouseDown={handleMouseDown}
                style={Object.assign(
                    {},
                    {
                        transform: `translate(${position.x}px, ${position.y}px)`,
                    },
                    {
                        backgroundColor: `rgb(${getColorByPoint(position.x, position.y).join(
                            ",",
                        )})`,
                    },
                )}
            />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
