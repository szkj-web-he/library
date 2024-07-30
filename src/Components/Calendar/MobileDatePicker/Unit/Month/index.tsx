/**
 * @file 月
 * @date 2023-06-13
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef } from "react";
import { RecordProps } from "../../Hooks/useVerticalSlide";
import Item from "../Item";
import { VerticalScrollPicker, VerticalScrollPickerEvents } from "../VerticalScrollPicker";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    value: string;
    /**
     * 当月发生变化时
     */
    handleChange: (res: string) => void;
    /**
     * 当移动状态发生变化时
     */
    handleMoveStatusChange: (status: boolean) => void;
    /**
     * 可见状态
     */
    show: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ value, handleChange, handleMoveStatusChange, show }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const event = useRef<VerticalScrollPickerEvents>({
        scrollTo: () => undefined,
        termination: () => undefined,
        init: () => undefined,
    });
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        if (show) {
            event.current.init();
        } else {
            event.current.termination();
        }
    }, [show]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const dataEl = () => {
        const arr: Array<RecordProps> = [];
        for (let i = 0; i < 12; i++) {
            arr.push({
                id: `${i}`,
                content: <Item content={i + 1} unit="月" />,
            });
        }
        return arr;
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <VerticalScrollPicker
            viewHeight={"3.2rem"}
            records={dataEl()}
            className={styles.mobileDatePicker_month}
            value={value}
            ref={event}
            handleChange={handleChange}
            handleScrollStart={() => {
                handleMoveStatusChange(true);
            }}
            handleScrollEnd={() => {
                handleMoveStatusChange(false);
            }}
        />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
