/**
 * @file
 * @date 2022-11-23
 * @author mingzhou.zhang
 * @lastModify  2022-11-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import classNames from "../../../../Unit/classNames";
import styles from "../style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface TagItemContent {
    status: number;
    val: string;
    color: string;
    background: string;
}

export type TagItemProps = TagItemContent & {
    className?: string;
    onClick?: () => void;
};
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const TagItem: React.FC<TagItemProps> = ({
    className,
    status,
    color,
    background,
    val,
    onClick,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <li
            key={status}
            className={classNames(styles.dropDownListsV2_tags_item, className)}
            onClick={onClick}
        >
            <span
                className={styles.dropDownListsV2_tags_item_content}
                style={{ color, background }}
            >
                {val}
            </span>
        </li>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
