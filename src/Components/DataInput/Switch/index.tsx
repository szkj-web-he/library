/**
 * @file switch
 * @date 2021-06-09
 * @author xuejie.he
 * @lastModify xuejie.he 2021-06-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { HTMLAttributes } from "react";
import styles from "./styles.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface SwitchProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
    /**
     * handler switch change
     */
    handleChange?: (state: boolean) => void;
    /**
     * width of this component
     */
    width?: string;
    /**
     * height of this component
     */
    height?: string;
    /**
     * default value of this component
     */
    defaultValue?: boolean;
    /**
     * children of this component
     */
    children?: React.ReactNode;
    /**
     * switch active classname
     */
    activeClassName?: string;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Switch: React.FC<SwitchProps> = ({
    handleChange = undefined,
    width = "3.2rem",
    height = "1.6rem",
    style = undefined,
    className = undefined,
    defaultValue = false,
    activeClassName,
    children,
    ...rest
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
            {...rest}
            className={
                styles.switch_container +
                (defaultValue ? " " + styles.switch_container__active : "") +
                (className ? " " + className : "")
            }
            style={Object.assign({}, { width, height }, style)}
            onClick={() => {
                const state = !defaultValue;
                handleChange && handleChange(state);
            }}
        >
            <div className={styles.switch_subContent}>{children}</div>
            <div className={styles.switch_box + ` ${activeClassName ?? ""}`} />
            <div
                className={styles.switch_bar}
                style={{
                    width: height,
                }}
            />
        </div>
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
