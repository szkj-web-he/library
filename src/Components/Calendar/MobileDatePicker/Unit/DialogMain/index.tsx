/**
 * @file 选择日期的对话框
 * @date 2023-06-14
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useMemo, useState } from "react";
import { MobileDialog } from "../../../../Cover/MobileDialog";
import styles from "./style.module.scss";
import { useLatest } from "../../../../../Hooks/useLatest";
import { customDate } from "../../../DatePicker/Unit/dateFormat";
import ConfirmBtn from "../ConfirmBtn";
import Year from "../Year";
import Month from "../Month";
import Day from "../Day";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 是否可见
     */
    show: boolean;
    /**
     * 选中的年
     */
    value?: Date;
    /**
     * 关闭
     */
    handleClose: () => void;
    /**
     * 当确认日期后
     * @param date 选中的时间
     * @param formatDateStr 格式化后的时间
     */
    handleConfirm?: (date: Date, formatDateStr: string) => void;
    /**
     * 展示的格式
     * yyyy:年
     * MM:月
     * dd:日
     * example: 1.yyyy:MM:dd
     *          2.yyyy-MM-dd(default)
     *          3.dd/MM/yyyy
     *          more...
     */
    format: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ show, value, handleClose, handleConfirm, format }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    /**
     * 默认时间
     */
    const defaultDate = useMemo(() => {
        const date = value ?? new Date();

        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
        };
    }, [value]);

    /**
     * 当前展示的年
     */
    const [year, setYear] = useState(`${defaultDate.year}`);

    /**
     * 当前展示的月
     */
    const [month, setMonth] = useState(`${defaultDate.month}`);

    /**
     * 当前展示的日
     */
    const [day, setDay] = useState(`${defaultDate.day}`);

    /**
     * 年的滚动状态
     * 是不是在移动中
     */
    const [yearMove, setYearMove] = useState<boolean>();
    /**
     * 月的移动状态
     */
    const [monthMove, setMonthMove] = useState<boolean>();
    /**
     * 日的移动状态
     */
    const [dayMove, setDayMove] = useState<boolean>();

    /**
     * 确认按钮是否被点击
     */
    const [isClickConfirm, setIsClickConfirm] = useState(false);

    /**
     * 最新的年
     */
    const latestYear = useLatest(year);
    /**
     * 最新的月
     */
    const latestMonth = useLatest(month);
    /**
     * 最新的日
     */
    const latestDay = useLatest(day);
    /**
     * 最新的handleConfirm
     */
    const handleConfirmRef = useLatest(handleConfirm);
    /**
     * 最新的格式化字符串
     */
    const latestFormat = useLatest(format);
    /**
     * 最新的handleClose
     */
    const handleCloseRef = useLatest(handleClose);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        if (isClickConfirm && !yearMove && !monthMove && !dayMove) {
            const date = new Date(
                Number(latestYear.current),
                Number(latestMonth.current),
                Number(latestDay.current),
            );
            handleCloseRef.current();
            setIsClickConfirm(false);
            handleConfirmRef.current?.(date, customDate(latestFormat.current, date));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dayMove, isClickConfirm, monthMove, yearMove]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleConfirmClick = () => {
        setIsClickConfirm(true);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <MobileDialog
            show={show}
            onCloseClick={() => {
                handleClose();
            }}
            bodyClassName={styles.mobileDatePicker_body}
        >
            <div className={styles.mobileDatePicker_top}>
                <div className={styles.mobileDatePicker_date}>选择日期</div>
                <ConfirmBtn onClick={handleConfirmClick} />
            </div>
            <div className={styles.mobileDatePicker_main}>
                <div className={styles.mobileDatePicker_selectBlock} />
                <div className={styles.mobileDatePicker_flex}>
                    <Year
                        value={`${defaultDate.year}`}
                        handleChange={(res) => {
                            setYear(res);
                        }}
                        show={show}
                        isMove={yearMove ?? false}
                        handleMoveStatusChange={(status) => {
                            setYearMove(status);
                        }}
                    />
                    <Month
                        value={`${defaultDate.month}`}
                        handleChange={(res) => {
                            setMonth(res);
                        }}
                        show={show}
                        handleMoveStatusChange={(status) => {
                            setMonthMove(status);
                        }}
                    />

                    <Day
                        year={year ? Number(year) : defaultDate.year}
                        month={(month ? Number(month) : defaultDate.month) + 1}
                        value={`${defaultDate.day}`}
                        handleChange={(res) => {
                            setDay(res);
                        }}
                        show={show}
                        yearIsMove={yearMove ?? false}
                        monthIsMove={monthMove ?? false}
                        isMove={dayMove ?? false}
                        handleMoveStatusChange={(status) => {
                            setDayMove(status);
                        }}
                    />
                </div>
            </div>
        </MobileDialog>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
