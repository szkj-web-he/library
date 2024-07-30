/**
 * @file Loading v2
 * @date 2022-04-18
 * @author mignzhou.zhang
 * @lastModify mignzhou.zhang 2022-04-18
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { KeyFrames } from "./Unit/keyFrames";
import styles from "./style.module.scss";
import { defaultPathList, fillPathList } from "../../../DefaultData/Zmz/loadingV2";
import useRafInterval from "../../../Hooks/useRafInterval";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface LoadingV2Props {
    /**
     * custom className
     */
    className?: string;
    /**
     * The style of the component
     */
    style?: React.CSSProperties;
    /**
     * The content of the component
     */
    content?: string;
    /**
     * The contentSize of the component
     */
    contentSize?: number;
    /**
     * The percent of the text fill
     */
    percent?: number;
    /**
     * control animation speed
     * if percent has value, it not work
     */
    delay?: number;
    /**
     * fill color of text
     */
    fillColor?: string;
    /**
     * wave animation speed
     */
    waveSpeed?: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const LoadingV2: React.FC<LoadingV2Props> = ({
    className,
    content,
    contentSize = 6,
    style,
    percent,
    delay = 30,
    fillColor = "#c5ebef",
    waveSpeed = 2,
}) => {
    /**
     * animation start position
     */
    const rectPositionY = contentSize * 0.8;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [highValue, setHighValue] = useState(0);
    const [rectWidth, setRectWidth] = useState(0);

    const textRef = useRef(null);
    const defaultRef = useRef(null);

    const clear = useRafInterval(() => {
        setHighValue((pervious) => {
            if (pervious >= 0) return pervious - 0.1;
            else return rectPositionY;
        });
    }, delay);

    useEffect(() => {
        if (percent != undefined) {
            clear();
        }
        return () => {
            clear();
        };
    }, [clear, percent]);

    useEffect(() => {
        let defaultWidth;
        if (defaultRef.current) {
            const scale = Number(
                getComputedStyle(defaultRef.current)
                    ["transform"].replace(/[A-z|(|)]/g, "")
                    .split(",")[0],
            );
            defaultWidth = (defaultRef.current as SVGGElement).getBBox().width * scale;
        }
        const textWidth = textRef.current && (textRef.current as SVGTextElement).getBBox().width;
        if (content) {
            textWidth && setRectWidth(textWidth);
        } else {
            defaultWidth && setRectWidth(defaultWidth);
        }
    }, [content]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    /**
     *  percent value range should be 0-100
     */
    if (typeof percent !== "undefined" && (percent < 0 || percent > 100)) {
        console.error("percent value range should be 0-100");
        return <></>;
    } else {
        return (
            <div
                className={`${styles.loadingv2_wrapper} ${className ? className : ""}`}
                style={{ ...style }}
            >
                <KeyFrames name="fill" _0={`x: -${rectWidth}`} _100={`x: 0`} />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width={`${rectWidth}`}
                    height={`${contentSize}rem`}
                >
                    <defs>
                        <pattern
                            id="water"
                            width=".25"
                            height="1.1"
                            patternContentUnits="objectBoundingBox"
                        >
                            <path
                                fill={fillColor}
                                d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"
                            />
                        </pattern>

                        <text
                            ref={textRef}
                            id="text"
                            transform={`matrix(1 0 0 1 0 ${contentSize * 10 * 0.8})`}
                            fontFamily="'Akrobat-Black'"
                            fontSize={`${contentSize}rem`}
                            letterSpacing="0.5rem"
                        >
                            {content ? content : "dataReachable"}
                        </text>

                        {/* fill font */}
                        <g
                            ref={defaultRef}
                            transform={`scale(${contentSize / (15 / 100) / 100})`}
                            id="layer_fill_outer"
                            data-name="layer fill outer"
                        >
                            <g id="layer_fill_inner" data-name="layer fill inner">
                                {fillPathList.map((p, index) => (
                                    <path key={index} className={styles.layer_fill_path} d={p} />
                                ))}
                            </g>
                        </g>
                        {/* background font */}
                        <g
                            transform={`scale(${contentSize / (15 / 100) / 100})`}
                            id="layer_default_outer"
                            data-name="layer default outer"
                        >
                            <g id="layer_default_inner" data-name="layer default inner">
                                {defaultPathList.map((p, index) => (
                                    <path
                                        key={index}
                                        className={styles.layer_default_path}
                                        d={p}
                                        transform="translate(-2 -2)"
                                    />
                                ))}
                            </g>
                        </g>

                        <mask id="text_mask">
                            {content ? (
                                <use xlinkHref="#text" fill="#fff" />
                            ) : (
                                <use xlinkHref="#layer_fill_outer" />
                            )}
                        </mask>
                    </defs>
                    {content && <use xlinkHref="#text" fill="#eee" />}
                    <rect
                        style={{
                            animation: `fill ${waveSpeed}s infinite linear`,
                        }}
                        y={`${
                            percent ? rectPositionY - rectPositionY * (percent / 100) : highValue
                        }rem`}
                        mask="url(#text_mask)"
                        fill="url(#water)"
                        width={`${rectWidth * 2}px`}
                        height={`${contentSize}rem`}
                    />
                    {!content && <use xlinkHref="#layer_default_outer" />}
                </svg>
            </div>
        );
    }
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
