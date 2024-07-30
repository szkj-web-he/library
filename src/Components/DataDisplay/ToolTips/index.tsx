/**
 * @file ToolTips
 * @date 2021-03-12
 * @author Andy Jiang
 * @lastModify Andy Jiang 2021-03-12
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { Button } from "../../Buttons/Button";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ToolTipsProps {
    /**
     * types of ToolTip, include left-top, left-middle, left-bottom, top-left, top-middle, top-right, right-top, right-middle, right-bottom, bottom-left, bottom-middle, bottom-right
     */
    type?: "LT" | "LM" | "LB" | "TL" | "TM" | "TR" | "RT" | "RM" | "RB" | "BL" | "BM" | "BR";
    /**
     * background of ToolTip, include back and white
     */
    background?: "black" | "white";
    /**
     * width
     */
    width?: string;
    /**
     * height
     */
    height?: string;
    /**
     * content of ToolTip
     */
    content?: string;
    /**
     * label of button
     */
    buttonLabel?: string;
    /**
     * confirm function
     */
    onConfirm?: () => void;
    /**
     * custom classname
     */
    className?: string;
    /**
     * custom style
     */
    style?: React.CSSProperties;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ToolTips: React.FC<ToolTipsProps> = ({
    type = "LM",
    background = "black",
    width = "10.8rem",
    height = undefined,
    content = "I am Left Middle Demo",
    className,
    style,
    ...props
}: ToolTipsProps) => {
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * get arrow style according to the type
     */
    const getArrowPosition = () => {
        switch (type) {
            case "LT":
                return styles.ToolTips_arrow__LT;
            case "LM":
                return styles.ToolTips_arrow__LM;
            case "LB":
                return styles.ToolTips_arrow__LB;
            case "TL":
                return styles.ToolTips_arrow__TL;
            case "TM":
                return styles.ToolTips_arrow__TM;
            case "TR":
                return styles.ToolTips_arrow__TR;
            case "RT":
                return styles.ToolTips_arrow__RT;
            case "RM":
                return styles.ToolTips_arrow__RM;
            case "RB":
                return styles.ToolTips_arrow__RB;
            case "BL":
                return styles.ToolTips_arrow__BL;
            case "BM":
                return styles.ToolTips_arrow__BM;
            case "BR":
                return styles.ToolTips_arrow__BR;
        }
    };
    /**
     * get background style according to the background
     */
    const getBackground = () => {
        switch (background) {
            case "black":
                return styles.ToolTips_container__black;
            case "white":
                return styles.ToolTips_container__white;
        }
    };
    /**
     * get arrow style according to the background
     */
    const getArrowBackground = () => {
        switch (background) {
            case "black":
                return styles.ToolTips_arrow__black;
            case "white":
                return styles.ToolTips_arrow__white;
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={
                [
                    styles.ToolTips_container,
                    getBackground(),
                    props.buttonLabel ? styles.ToolTips_buttonContainer : undefined,
                ].join(" ") + (className ? ` ${className}` : "")
            }
            style={Object.assign({}, { ...style }, { width }, height && { height })}
        >
            <span>{content}</span>
            <div
                className={[styles.ToolTips_arrow, getArrowBackground(), getArrowPosition()].join(
                    " ",
                )}
            />

            {props.buttonLabel && (
                <div className={styles.ToolTips_button}>
                    <Button
                        label={props.buttonLabel}
                        size={"small"}
                        {...Object.assign({}, props.onConfirm && { onClick: props.onConfirm })}
                    />
                </div>
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
