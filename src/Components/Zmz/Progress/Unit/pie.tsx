/**
 * @file pie progress
 * @date 2022-05-06
 * @author mingzhou.zhang
 * @lastModify  2022-05-06
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef } from "react";
import { ProgressProps } from "..";
import styles from "../style.module.scss";
import { validProgress } from "./util";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Pie: React.FC<ProgressProps> = ({
    percent = 45,
    trailColor = "#FFF",
    percentColor = "rgba(0,0,0,.6)",
    radius = "3rem",
    showInfo = false,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const wrap = useRef<HTMLDivElement | null>(null);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const setPieWidthAndHeight = (radius: string): React.CSSProperties => {
        const wrapNode = wrap.current;
        if (wrapNode) {
            let isRate = false;
            radius.replace("%", (replacement) => {
                replacement === "%" && (isRate = true);
                return "";
            });
            return {
                width: isRate ? "5rem" : radius,
                height: isRate ? "5rem" : radius,
            };
        } else {
            return {
                width: "3rem",
                height: "3rem",
            };
        }
    };

    const pieStyle: Record<string, string> = {
        "--percent": `${validProgress(percent)}`,
        "--trailColor": trailColor,
        "--percentColor": percentColor,
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            ref={wrap}
            className={styles.progress_pie_wrapper}
            style={{ ...setPieWidthAndHeight(radius), ...pieStyle }}
        >
            <div className={styles.progress_pie_left}></div>
            <div className={styles.progress_pie_right}></div>
            {showInfo && <span className={styles.progress_pie_value}>{percent}%</span>}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
