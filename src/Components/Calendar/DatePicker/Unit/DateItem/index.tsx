/**
 * @file 天
 * @date 2023-07-24
 * @author xuejie.he
 * @lastModify xuejie.he 2023-07-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useMemo } from "react";
import styles from "../Date/style.module.scss";
import { DateItem } from "../setDataMap";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 单挑数据
     */
    data: DateItem;
    /**
     * 最小的时间
     */
    minTime?: Date;
    /**
     * 最大的时间
     */
    maxTime?: Date;
    /**
     * 是否只读
     */
    readonly?: boolean;
    /**
     * 是否被选中的
     */
    isSelected: boolean;
    /**
     * 当被点击时
     */
    handleDateClick: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    data,
    minTime,
    maxTime,
    readonly,
    isSelected,
    handleDateClick,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const classList = useMemo(() => {
        const nowDate = new Date();
        const nowYear = nowDate.getFullYear();
        const nowMonth = nowDate.getMonth() + 1;
        const nowDay = nowDate.getDate();

        const arr = [styles.dateTemp_dayContainer];

        const selfTime = new Date(data.year, data.month - 1, data.date);

        if (minTime && selfTime < minTime) {
            arr.push(styles.dateTemp_disabled);
        }

        if (maxTime && selfTime > maxTime) {
            arr.push(styles.dateTemp_disabled);
        }

        if (readonly) {
            arr.push(styles.dateTemp_readonly);
        }

        if (isSelected) {
            arr.push(styles.dateTemp_daySelected);
        } else if (data.year === nowYear && data.month === nowMonth && data.date === nowDay) {
            arr.push(styles.dateTemp_toDate);
        } else if (!data.active) {
            arr.push(styles.dateTemp_dayGray);
        }
        return arr;
    }, [data.active, data.date, data.month, data.year, isSelected, maxTime, minTime, readonly]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClick = () => {
        if (readonly) {
            return;
        }
        if (classList.includes(styles.dateTemp_disabled)) {
            return;
        }
        handleDateClick();
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <li className={styles.dateTemp_col}>
            <div
                className={classList.join(" ")}
                onClick={() => {
                    handleClick();
                }}
            >
                {data.date}
            </div>
        </li>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
