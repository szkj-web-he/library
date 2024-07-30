/**
 * @file ColorList
 * @date 2022-03-10
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-10
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import styles from "./style.module.scss";
import { colorList } from "../../../DefaultData/TextEditor/colorList";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ColorListProps {
    children?: React.ReactNode;
    handleClick?: (color: string) => void;
    color?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ColorList: React.FC<ColorListProps> = ({ children, handleClick, color }) => {
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const child = (
        <ul className={styles.colorList_body}>
            {colorList.map((items, n) => {
                return (
                    <li key={`${n}_hue`} className={styles.colorList_hue}>
                        {items.map((item) => {
                            const active = color === item;

                            return (
                                <div
                                    className={
                                        styles.colorList_item +
                                        (active ? ` ${styles.colorList_itemActive}` : "")
                                    }
                                    key={`${n}-${item}color`}
                                    onClick={() => handleClick?.(item)}
                                >
                                    <div
                                        className={styles[`colorList_subItem`]}
                                        style={{ backgroundColor: item }}
                                    />
                                </div>
                            );
                        })}
                    </li>
                );
            })}
        </ul>
    );

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.colorList_wrap}>
            {children}
            {child}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
