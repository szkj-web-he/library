/**
 * @file Loading
 * @date 2021-02-09
 * @author Andy Jiang
 * @lastModify Andy Jiang 2021-02-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */

export interface LoadingProps {
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * width of this component
     */
    width?: string;
    /**
     * height of this component
     */
    height?: string;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Loading: React.FC<LoadingProps> = ({ className, style, width, height }) => {
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <div
            className={styles.loadingWrapper + (className ? ` ${className}` : "")}
            style={Object.assign({}, style, width && { width }, height && { height })}
        >
            <div className={styles.loadingFormCol}>
                <div className={styles.loadingPageWrapper}>
                    <div className={styles.loadingPageTitle}>DataReachable</div>
                    <div className={styles.loadingAnimation}>
                        <div className={styles.cubeGrid}>
                            <div className={styles.loadingCube1} />
                            <div className={styles.loadingCube2} />
                            <div className={styles.loadingCube3} />
                            <div className={styles.loadingCube4} />
                            <div className={styles.loadingCube5} />
                            <div className={styles.loadingCube6} />
                            <div className={styles.loadingCube7} />
                            <div className={styles.loadingCube8} />
                            <div className={styles.loadingCube9} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
