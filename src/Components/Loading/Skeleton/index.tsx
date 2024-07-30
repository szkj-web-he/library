/**
 * @file
 * @date 2021-11-11
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { Icon } from "../../..";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface SkeletonProps {
    /**
     * The style of the placeholder element currently displayed
     */
    variant?: "img" | "circle" | "rect";
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * className of this component
     */
    className?: string;
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
export const Skeleton: React.FC<SkeletonProps> = ({ variant, style, className, width, height }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const wrapperElement = () => {
        switch (variant) {
            case "img":
                return (
                    <div
                        className={
                            styles.skeleton_imgWrapper__loading + (className ? " " + className : "")
                        }
                        style={Object.assign(
                            {},
                            style && { ...style },
                            width && { width },
                            height && { height },
                        )}
                    >
                        <Icon type="fillPicture" className={styles.skeleton_imgIcon} />
                    </div>
                );
            case "circle":
                return (
                    <div
                        className={
                            styles.skeleton_circleWrapper__loading +
                            (className ? ` ${className}` : "")
                        }
                        style={Object.assign(
                            {},
                            style && { ...style },
                            width && { width },
                            height && { height },
                        )}
                    />
                );
            case "rect":
                return (
                    <div
                        className={
                            styles.skeleton_rectWrapper__loading +
                            (className ? ` ${className}` : "")
                        }
                        style={Object.assign(
                            {},
                            style && { ...style },
                            width && { width },
                            height && { height },
                        )}
                    />
                );
            default:
                return <></>;
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return wrapperElement();
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
