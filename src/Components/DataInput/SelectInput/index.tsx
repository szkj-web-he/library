/**
 * @file check or radio input
 * @date 2021-06-03
 * @author xuejie.he
 * @lastModify xuejie.he 2021-06-03
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import styles from "./style.module.scss";
import { Icon } from "../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */

/** This section will include all the interface for this tsx file */
type ListItem = {
    id: string | number;
    content: React.ReactNode;
};

export interface SelectInputProps {
    /**
     * type of this component
     */
    type?: "check" | "radio";
    /**
     * list of this component data,item must have id
     * id: item key
     * content: item content
     */
    list?: {
        id: string | number;
        content: React.ReactNode;
    }[];
    /**
     * default value
     * value === item's id
     */
    defaultValue?: (string | number)[];
    /**
     * handler change
     */
    handleChange?: (res: (string | number)[]) => void;
    /**
     * Can I deselect the button
     */
    isToggle?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const SelectInput: React.FC<SelectInputProps> = ({
    type = "radio",
    list,
    defaultValue,
    handleChange = undefined,
    isToggle = false,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const selectStatus = (res: ListItem) => {
        return defaultValue?.some?.((index) => index === res.id);
    };

    const toggleItem = (res: ListItem) => {
        const n = defaultValue ? defaultValue.findIndex((index) => index === res.id) : -1;
        let arr: (string | number)[] = Array.isArray(defaultValue)
            ? JSON.parse(JSON.stringify(defaultValue))
            : [];
        if (type === "radio") {
            if (isToggle) {
                if (n >= 0) {
                    arr.splice(n, 1);
                } else {
                    arr = [res.id];
                }
            } else {
                arr = [res.id];
            }
        } else if (n >= 0) {
            arr.splice(n, 1);
        } else {
            arr.push(res.id);
        }

        handleChange?.([...arr]);
    };
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <ul className={styles.selectInput_container}>
            {list?.map((index) => {
                return (
                    <li
                        key={index.id}
                        className={
                            styles.selectInput_item +
                            (Array.isArray(defaultValue) &&
                            defaultValue.some((item) => item === index.id)
                                ? ` ${styles.selectInput_itemActive}`
                                : "")
                        }
                        onClick={() => {
                            toggleItem(index);
                        }}
                    >
                        <Icon
                            type={selectStatus(index) ? "checkboxSolid" : "checkboxEmpty"}
                            className={styles.selectInput_icon}
                        />
                        {index.content}
                    </li>
                );
            })}
        </ul>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
