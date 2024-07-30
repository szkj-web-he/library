/**
 * @file css animation keyframes component
 * @date 2022-04-21
 * @author mingzhou.zhang
 * @lastModify 2022-04-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface keyFramesProps {
    /**
     * animation name
     */
    name: string;
    /**
     * percentage or from or to
     */
    [key: string]: React.CSSProperties | string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const KeyFrames = (props: keyFramesProps) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const toCss = (cssObject: React.CSSProperties | string) => {
        const cssObjectType = cssObject;
        if (typeof cssObjectType === "string") {
            return cssObjectType;
        } else {
            Object.keys(cssObjectType).reduce((accumulator, key) => {
                const cssKey = key.replace(/[A-Z]/g, (v) => `-${v.toLowerCase()}`);
                const cssValue = cssObjectType[key as keyof typeof cssObjectType]
                    ?.toString()
                    .replace("'", "");
                if (typeof cssValue !== "undefined") {
                    return `${accumulator}${cssKey}:${cssValue};`;
                } else {
                    return "";
                }
            }, "");
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <style>
            {`@keyframes ${props.name} {
                ${Object.keys(props)
                    .map((key) => {
                        return ["from", "to"].includes(key)
                            ? `${key} { ${toCss(props[key]) as string} }`
                            : /^_[0-9]+$/.test(key)
                            ? `${key.replace("_", "")}% { ${toCss(props[key]) as string} }`
                            : "";
                    })
                    .join(" ")}
            }`}
        </style>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
