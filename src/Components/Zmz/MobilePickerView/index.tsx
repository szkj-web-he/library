/**
 * @file
 * @date 2022-11-08
 * @author mingzhou.zhang
 * @lastModify  2022-11-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import classNames from "../../../Unit/classNames";
import styles from "./style.module.scss";
import { PickerColumn, WheelType } from "./Unit/PickerColumn";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

interface ValGroups {
    [key: string]: string;
}

interface OptGroups {
    [key: string]: Array<string>;
}

export interface MobilePickerViewProps {
    className?: string;
    style?: React.CSSProperties;
    valueGroups: ValGroups;
    optionGroups: OptGroups;
    itemHeight?: string;
    height?: string;
    wheel?: WheelType;
    onChange?: (key: string, val: string) => void;
    onClick?: (key: string, val: string) => void;
}

export const MobilePickerView: React.FC<MobilePickerViewProps> = ({
    className,
    style,
    valueGroups,
    optionGroups,
    itemHeight = "3.6rem",
    height = "21.6rem",
    wheel = "off",
    onChange,
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
        <div
            className={classNames(styles.picker_container, className)}
            style={{ height, ...style }}
        >
            <div className={styles.picker_inner}>
                {Object.keys(optionGroups).map((name) => {
                    return (
                        <PickerColumn
                            key={name}
                            name={name}
                            value={valueGroups[name]}
                            options={optionGroups[name]}
                            itemHeight={itemHeight}
                            columnHeight={height}
                            wheel={wheel}
                            onChange={onChange}
                            onClick={onClick}
                        />
                    );
                })}
                <div className={styles.picker_highlight} style={{ height: itemHeight }} />
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
