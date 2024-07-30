/**
 * @file 确认按钮
 * @date 2023-06-13
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import styles from "./style.module.scss";
import classNames from "../../../../../Unit/classNames";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    onClick: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ onClick }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [isPending, setIsPending] = useState(false);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <button
            className={classNames(styles.mobileDatePicker_confirmBtn, {
                [styles.mobileDatePicker_confirmBtn__isPending]: isPending,
            })}
            onMouseDown={() => {
                setIsPending(true);
                document.addEventListener(
                    "mouseup",
                    () => {
                        setIsPending(false);
                    },
                    { once: true },
                );
            }}
            onClick={() => {
                onClick();
            }}
        >
            确定
        </button>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
