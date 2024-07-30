/**
 * @file line progress
 * @date 2022-05-06
 * @author mingzhou.zhang
 * @lastModify  2022-05-06
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { ProgressProps } from "..";
import { validProgress } from "./util";
import styles from "../style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Line: React.FC<ProgressProps> = ({
    percent,
    inner = false,
    showInfo = true,
    trailColor = "#E0E0E0",
    percentColor = "#22A6B3",
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const trailStyle = trailColor
        ? {
              backgroundColor: trailColor,
          }
        : undefined;

    const percentStyle = {
        width: `${validProgress(percent)}%`,
        backgroundColor: percentColor ? percentColor : "",
        borderRadius: `1rem`,
        height: `${showInfo && inner ? "" : ".8rem"}`,
        textAlign: "right",
    } as React.CSSProperties;
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <div
                className={
                    styles.progress_line_outer +
                    ` ${showInfo && !inner ? styles.progress_show_info : ""}`
                }
            >
                <div className={styles.progress_line_inner} style={trailStyle}>
                    <div className={styles.progress_line_bg} style={percentStyle}>
                        {inner && showInfo ? (
                            <span
                                style={{ marginRight: ".5rem", color: "white" }}
                            >{`${validProgress(percent)}%`}</span>
                        ) : null}
                    </div>
                </div>
            </div>
            {!inner && showInfo ? (
                <span style={{ marginLeft: ".5rem" }}>{`${validProgress(percent)}%`}</span>
            ) : null}
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
