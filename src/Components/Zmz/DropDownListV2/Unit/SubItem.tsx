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
import { Icon } from "../../../Icon";
import styles from "../style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface SubItemContent {
    content: React.ReactNode;
    id: string | number;
}

export type SubItemProps = SubItemContent & {
    className?: string;
    onClick?: () => void;
};
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const SubItem: React.FC<SubItemProps> = ({ className, id, content, onClick }) => {
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
            key={id}
            className={classNames(styles.dropDownListsV2_subFloatingLabel, className)}
            onClick={onClick}
        >
            <Icon type="right" className={styles.dropDownListsV2_subFloatingIcon} />
            <div className={styles.dropDownListsV2_subFloatingContent}>{content}</div>
        </li>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
