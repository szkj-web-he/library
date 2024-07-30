/**
 * @file
 * @date 2023-08-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-16
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import styles from "../style.module.scss";
import { TabBarExtraContent } from "./type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */

/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * config extra content
     */
    tabBarExtraContent?: TabBarExtraContent | React.ReactNode;
    /**
     * 在哪个位置插入
     */
    extraType: "before" | "after";
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ tabBarExtraContent, extraType }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    if (!tabBarExtraContent) return null;

    let content: React.ReactNode;

    let assertExtra: TabBarExtraContent = {};

    if (typeof tabBarExtraContent === "object" && !React.isValidElement(tabBarExtraContent)) {
        assertExtra = tabBarExtraContent as TabBarExtraContent;
    } else {
        assertExtra.after = tabBarExtraContent;
    }

    // eslint-disable-next-line prefer-const
    content = extraType === "after" ? assertExtra.after : assertExtra.before;

    return content ? <div className={styles.tabs_nav_extra_content}>{content}</div> : null;
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
