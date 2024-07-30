/**
 * @file
 * @date 2022-11-18
 * @author mingzhou.zhang
 * @lastModify  2022-11-18
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { Fragment, useCallback, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { languageConfig } from "../../../DefaultData/Zmz/calendarMobile";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { Icon } from "../../Icon";
import { Input } from "../Input";
import { MobilePickerView } from "../MobilePickerView";
import { Popup } from "../Popup";
import { Tabs, TabsItem } from "../Tabs";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface CalendarMobileProps {
    value?: Date;
    defaultValue?: Date;
    disabled?: boolean;
    onChange?: (value: Date) => void;
}

const padZero = (value: string | number) => {
    return Number(value) < 10 ? `0${value}` : `${value}`;
};

const getDateInfo = (value: Date) => {
    const year = padZero(value.getFullYear());
    const month = padZero(value.getMonth() + 1);
    const day = padZero(value.getDate());
    const hour = padZero(value.getHours());
    const minute = padZero(value.getMinutes());
    const second = padZero(value.getSeconds());
    return {
        date: {
            year,
            month,
            day,
        },
        time: {
            hour,
            minute,
            second,
        },
    };
};
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const CalendarMobile: React.FC<CalendarMobileProps> = ({
    value,
    defaultValue = new Date(),
    disabled,
    onChange,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [show, setShow] = useState(false);
    const [inputVal, setInputVal] = useState("");

    const pickerMemo = useRef({
        date: getDateInfo(new Date()).date,
        time: getDateInfo(new Date()).time,
    });
    const date = useRef(getDateInfo(new Date()).date);
    const time = useRef(getDateInfo(new Date()).time);
    const val = useRef(value ?? defaultValue);

    const { t } = useTranslation();

    useLangConfig("CalendarMobileComponent", languageConfig);

    useLayoutEffect(() => {
        if (value === val.current || value === undefined) return;
        if (!tabList.length) return;
        val.current = value;
        const { date: d, time: t } = getDateInfo(val.current);
        const list = [...tabList];
        list[0].children = DatePicker(d, getDatePart(d));
        list[1].children = TimePicker(t);
        setTabList(list);
        transformTimeToValue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const handleConfirm = () => {
        const cache = pickerMemo.current;
        cache.date = date.current;
        cache.time = time.current;
        const { year, month, day } = date.current;
        const { hour, minute, second } = time.current;
        const value = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hour),
            Number(minute),
            Number(second),
        );
        setShow(false);
        onChange?.(value);
        val.current = value;
        transformTimeToValue();
    };

    const generateNumberArray = (begin: number, end: number) => {
        const array = [];
        for (let i = begin; i <= end; i++) {
            array.push(padZero(i));
        }
        return array;
    };

    const transformTimeToValue = () => {
        const options: Intl.DateTimeFormatOptions = {
            dateStyle: "short",
            timeStyle: "medium",
            hour12: false,
        };
        const dateString = Intl.DateTimeFormat("cn", options)
            .formatToParts(val.current)
            .map(({ type, value }) => {
                if (type === "month" || type === "day") {
                    return padZero(value);
                }
                if (type === "literal" && value === "/") {
                    return "-";
                }
                if (type === "hour") {
                    return ` ${value}`;
                }
                return value;
            })
            .join("");
        setInputVal(dateString);
        // return dateString;
    };

    const handleDateChange = (key: string, val: string) => {
        const newDate = {
            ...date.current,
            [key]: val,
        };
        const oldDays = Number(newDate.day);
        const days = getDatePart(newDate).day.length;

        if (oldDays > days) {
            newDate.day = "01";
        }

        const list = [...tabList];
        list[0].children = DatePicker(newDate, getDatePart(newDate));
        setTabList(list);
        date.current = newDate;
    };

    const handleTimeChange = (key: string, val: string) => {
        const newTime = {
            ...time.current,
            [key]: val,
        };

        const list = [...tabList];
        list[1].children = TimePicker(newTime);
        setTabList(list);
        time.current = newTime;
    };

    const getDatePart = (date: Record<string, string>) => {
        const { year, month } = date;
        const days = new Date(Number(year), Number(month), 0).getDate();
        return {
            year: generateNumberArray(1970, 2100),
            month: generateNumberArray(1, 12),
            day: generateNumberArray(1, days),
        };
    };
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const TabsConfirm = (
        <button className={styles.mobile_calendar_tabs_confirm} onClick={handleConfirm}>
            {t("CalendarMobileComponent.Confirm")}
        </button>
    );

    const DatePicker = useCallback(
        (value: Record<string, string>, options: Record<string, string[]>) => (
            <MobilePickerView
                valueGroups={value}
                optionGroups={{ ...options }}
                onChange={handleDateChange}
                wheel="normal"
            />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [date],
    );

    const TimePicker = useCallback(
        (value: Record<string, string>) => (
            <MobilePickerView
                valueGroups={value}
                optionGroups={{
                    hour: generateNumberArray(0, 23),
                    minute: generateNumberArray(0, 59),
                    second: generateNumberArray(0, 59),
                }}
                onChange={handleTimeChange}
                wheel="normal"
            />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [time],
    );

    const [tabList, setTabList] = useState<TabsItem[]>([
        {
            key: "1",
            label: t("CalendarMobileComponent.Select Date"),
            children: DatePicker(date.current, getDatePart(date.current)),
        },
        {
            key: "2",
            label: t("CalendarMobileComponent.Select Time"),
            children: TimePicker(time.current),
        },
    ]);

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Fragment>
            <Input
                placeholder={`${t("CalendarMobileComponent.Please select the deadline")}...`}
                onClick={(event) => {
                    event.preventDefault();
                    setShow(true);
                }}
                disabled={disabled}
                readOnly
                value={inputVal}
                suffix={
                    <Icon
                        className={classNames(styles.mobile_calendar_icon, {
                            [`${styles.mobile_calendar_icon__disabled}`]: disabled,
                        })}
                        type="calendar"
                    />
                }
            />
            <Popup
                show={show}
                onClose={() => {
                    const { date: d, time: t } = pickerMemo.current;
                    const list = [...tabList];
                    date.current = d;
                    time.current = t;
                    list[0].children = DatePicker(d, getDatePart(d));
                    list[1].children = TimePicker(t);
                    setTabList(list);
                    setShow(false);
                }}
            >
                <Tabs items={tabList} tabBarExtraContent={TabsConfirm} />
            </Popup>
        </Fragment>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
