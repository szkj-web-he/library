/**
 * @file
 * @date 2021-12-14
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../../../../..";
import { monthDropDownList, weekData } from "../dateData";
import Dropdown from "../Dropdown";
import { initDate } from "../initDate";
import { makeArr } from "../makeArr";
import { DateItem, setDateMap } from "../setDataMap";
import styles from "./style.module.scss";
import Item from "../DateItem";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface Label {
    id: string | number;
    content: string;
}
export interface DateProps {
    /**
     * Selected year
     */
    year?: number;
    /**
     * Selected month
     */
    month?: number;
    /**
     * Selected day
     */
    day?: number;
    /**
     * min time
     */
    minTime?: Date;
    /**
     * max time
     */
    maxTime?: Date;
    /**
     * readonly of this component
     */
    readonly?: boolean;
    /**
     * handle date click
     */
    handleDateClick: (year: number, month: number, date: number) => void;
    /**
     * show of this component
     */
    show: boolean;
    /**
     *
     */
    type: "date" | "dateTime";
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const DateTemp: React.FC<DateProps> = ({
    year,
    month,
    day,
    minTime,
    maxTime,
    readonly,
    show,
    handleDateClick,
    type,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [playedYear, setPlayedYear] = useState<number>();

    const [playedMonth, setPlayedMonth] = useState<number>();

    // set the initial calendar map array
    const [initialDateMap, setInitialDateMap] = useState<Array<Array<DateItem>>>();

    const [yearList, setYearList] = useState<Label[]>();

    const { t } = useTranslation();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useLayoutEffect(() => {
        if (show) {
            const dateData = initDate(year, month);
            setPlayedYear(dateData.year);
            setPlayedMonth(dateData.month);
        }
    }, [month, show, year]);

    useEffect(() => {
        if (playedYear && playedMonth) {
            setInitialDateMap(setDateMap(playedYear, playedMonth));
        }
    }, [playedYear, playedMonth]);

    useEffect(() => {
        if (playedYear) {
            const end = playedYear + 10;
            const arr: Label[] = [];
            for (let i = playedYear - 10; i <= end; i++) {
                arr.push({
                    id: i,
                    content: i.toString(),
                });
            }
            setYearList([...arr]);
        }
    }, [playedYear]);

    const handleMonthChange = (res: { id: string | number; content: string }) => {
        setPlayedMonth(res.id as number);
    };

    const handleYearChange = (res: { id: string | number; content: string }) => {
        setPlayedYear(res.id as number);
    };

    const handleYearScroll = (res: {
        left: number;
        top: number;
        scrollHeight: number;
        scrollWidth: number;
        offsetHeight: number;
        offsetWidth: number;
        clientHeight: number;
        clientWidth: number;
    }) => {
        if (yearList) {
            if (res.scrollHeight - (res.top + res.clientHeight) < 60) {
                const end = yearList[yearList.length - 1].id as number;
                const arr = makeArr(end + 1, end + 11);
                setYearList([...yearList, ...arr]);
            } else if (res.top < 10) {
                const start = yearList[0].id as number;
                const arr = makeArr(start - 10, start);
                setYearList([...arr, ...yearList]);
            }
        }
    };

    const handlePreClick = () => {
        if (playedMonth && playedYear) {
            let value = playedMonth - 1;
            if (value < 1) {
                value = 12;

                setPlayedYear(playedYear - 1);
            }
            setPlayedMonth(value);
        }
    };

    const handleNextClick = () => {
        if (playedMonth && playedYear) {
            let value = playedMonth + 1;
            if (value > 12) {
                value = 1;

                setPlayedYear(playedYear + 1);
            }
            setPlayedMonth(value);
        }
    };

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */

    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const yearEl = () =>
        playedYear && yearList ? (
            <Dropdown
                labels={yearList}
                value={playedYear}
                handleScroll={handleYearScroll}
                className={styles.dateTemp_yearContainer}
                handleChange={handleYearChange}
            />
        ) : (
            <></>
        );

    const monthEl = () =>
        playedMonth ? (
            <Dropdown
                labels={monthDropDownList()}
                value={playedMonth}
                style={{
                    width: "11.1rem",
                }}
                handleChange={handleMonthChange}
            />
        ) : (
            <></>
        );

    const dayListEl = () => {
        return initialDateMap ? (
            initialDateMap.map((item, index) => (
                <ul className={styles.dateTemp_row} key={`dateTempRow_${index}`}>
                    {item.map((dayData, n) => {
                        return (
                            <Item
                                key={`dateTempCol_${index}${n}`}
                                data={dayData}
                                minTime={minTime}
                                maxTime={maxTime}
                                readonly={readonly}
                                isSelected={
                                    dayData.year === year &&
                                    dayData.month === month &&
                                    dayData.date === day
                                }
                                handleDateClick={() => {
                                    handleDateClick(dayData.year, dayData.month, dayData.date);
                                }}
                            />
                        );
                    })}
                </ul>
            ))
        ) : (
            <></>
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles[`dateTemp_${type}`]}>
            <div className={styles.dateTemp_top}>
                <div className={styles.dateTemp_pre} onClick={handlePreClick}>
                    <Icon type="open" className={styles.dateTemp_preIcon} />
                </div>
                <div className={styles.dateTemp_monthAndYear}>
                    {yearEl()}
                    {monthEl()}
                </div>
                <div className={styles.dateTemp_next} onClick={handleNextClick}>
                    <Icon type="open" className={styles.dateTemp_nextIcon} />
                </div>
            </div>
            <div className={styles.dateTemp_table}>
                <div className={styles.dateTemp_week}>
                    {weekData.map((item, index) => (
                        <div className={styles.dateTemp_weekItem} key={`DateTempWeek_${index}`}>
                            {t(`CalendarComponent.${item}`)}
                        </div>
                    ))}
                </div>
                {dayListEl()}
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
