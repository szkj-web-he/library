/**
 * @file progress
 * @date 2022-04-29
 * @author  mingzhou.zhang
 * @lastModify  2022-04-29
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import styles from "./style.module.scss";
import { Line } from "./Unit/line";
import { Pie } from "./Unit/pie";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ProgressProps {
    /**
     * The classname for progress
     */
    className?: string;
    /**
     * The style for progress
     */
    style?: React.CSSProperties;
    /**
     * To set the completion percentage
     */
    percent?: number;
    /**
     * Whether to display the progress value
     */
    showInfo?: boolean;
    /**
     * Whether the text is display in the progress
     * only type is line , it work
     */
    inner?: boolean;
    /**
     * The radius for progress.
     * only type is pie , it work.
     * unit such as rem | em | px
     */
    radius?: string;
    /**
     * The color of unfilled part
     */
    trailColor?: string;
    /**
     * The color of completion part
     */
    percentColor?: string;
    /**
     * To set the type, options: line circle
     */
    type?: "line" | "pie";
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Progress: React.FC<ProgressProps> = ({ className, style, type = "pie", ...props }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const renderProgress = () => {
        switch (type) {
            case "line":
                return <Line {...props} />;
            case "pie":
                return <Pie {...props} />;
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.progress_container + ` ${className ? className : ""}`} style={style}>
            {renderProgress()}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
