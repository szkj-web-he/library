/**
 * @file
 * @date 2021-12-14
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { Icon } from "../../..";
import classNames from "../../../Unit/classNames";
import styles from "./style.module.scss";
import { useMobileDatePicker } from "../MobileDatePicker/Context/context";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const MobileDatePickerInput: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    onClick,
    ...props
}) => {
    MobileDatePickerInput.displayName = "MobileDatePickerInput";
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { toOpen, value, placeholder, disabled, show, handleClearClick } = useMobileDatePicker();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={classNames(styles.mobileDatePickerInput_wrapper, className, {
                [styles.mobileDatePickerInput_disabled]: disabled,
                [styles.mobileDatePickerInput_active]: show,
            })}
            {...props}
            onClick={(e) => {
                onClick?.(e);
                if (disabled) {
                    return;
                }
                toOpen();
            }}
        >
            <span
                className={styles.mobileDatePickerInput_placeholder}
                style={{
                    display: value ? "none" : undefined,
                }}
            >
                {placeholder}
            </span>

            <span
                className={styles.mobileDatePickerInput_content}
                style={{
                    display: value ? undefined : "none",
                }}
            >
                {value}
            </span>
            {value && !disabled ? (
                <Icon
                    type="empty"
                    className={styles.mobileDatePickerInput_clearIcon}
                    onClick={(e) => {
                        if (disabled) {
                            return;
                        }
                        e.stopPropagation();

                        handleClearClick?.();
                    }}
                />
            ) : (
                <Icon type="calendar" className={styles.mobileDatePickerInput_calendarIcon} />
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
MobileDatePickerInput.displayName = "MobileDatePickerInput";
