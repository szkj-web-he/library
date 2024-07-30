/**
 * @file 日期选择器
 * @date 2021-12-14
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Kite, useUpdateEffect } from "../../..";
import { languageConfig } from "../../../DefaultData/Calendar";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { getDateInfo as getTimeInfo } from "../../Zmz/TimePickerV2/Unit/getDateInfo";
import { TimeInfo, TimePickerBaseProps, TimeWrap } from "../../Zmz/TimePickerV2/Unit/TimeWrap";
import { CalendarInput, CalendarInputProps } from "../CalendarInput";
import { useLatest } from "./../../../Hooks/useLatest";
import styles from "./style.module.scss";
import { DateTemp } from "./Unit/Date";
import { DateContext } from "./Unit/dateContext";
import { DateInfoProps, getDateInfo } from "./Unit/initDate";
import TimePicker from "./Unit/Time";
import { toDate } from "./Unit/typeToDate";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface DatePickerProps extends React.DOMAttributes<HTMLDivElement> {
    /**
     * Type of display
     */
    type?: "date" | "dateTime";
    /**
     * control time picker display
     */
    showTime?: boolean | TimePickerBaseProps;
    /**
     * defaultValue of this component
     */
    defaultValue?: Date | number | string;

    /**
     * readonly of dropdown
     */
    readonly?: boolean;
    /**
     * disabled of input
     */
    disabled?: boolean;

    /**
     * value of this component
     */
    value?: Date | number | string;
    /**
     * children of this component
     */
    children?: React.ReactElement<CalendarInputProps>;
    /**
     * width : The width of the box where the triangle is located
     * height : The width of the box where the triangle is located
     * color : Triangle color
     * offset : Triangle offset
     */
    triangle?: {
        width: string;
        height: string;
        color?: string;
        offset?: {
            x?: number | ((val: number) => number);
            y?: number | ((val: number) => number);
        };
    };
    /**
     * className of dropdown
     */
    className?: string;
    /**
     * style of dropdown
     */
    style?: React.CSSProperties;
    /**
     * offset of dropdown
     */
    offset?: {
        x?: number | ((val: number) => number);
        y?: number | ((val: number) => number);
    };
    /**
     * Where to put it in root
     */
    placement?: "lb" | "rb" | "cb" | "lt" | "rt" | "ct" | "rc" | "lc";
    /**
     * The direction of the main axis
     */
    direction?: "vertical" | "horizontal";

    /**
     * Selectable time range
     * Minimum value
     */
    minTime?: Date | number | string;
    /**
     * Selectable time range
     * Maximum value
     */
    maxTime?: Date | number | string;
    /**
     * Do you want to hide after clicking the drop-down box
     */
    hideOnClick?: boolean;
    /**
     * Callback of time change
     */
    handleTimeChange?: (res: Date | null) => void;
    /**
     *  Callback of  visible change
     */
    handleVisibleChange?: (status: boolean) => void;
    /**
     * visible of this component
     */
    show?: boolean;
    /**
     * when showTime is true and click confirm button
     */
    onTimeConfirm?: (date: Date, transformStr: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
    (
        {
            type = "date",
            showTime = false,
            defaultValue,
            disabled = false,
            readonly = false,
            value,
            children,
            triangle,
            className,
            style,
            offset,
            placement = "lb",
            direction = "vertical",
            minTime,
            maxTime,
            hideOnClick = true,
            handleTimeChange,
            handleVisibleChange,
            show,
            onTimeConfirm,
            ...props
        },
        ref,
    ) => {
        DatePicker.displayName = "DatePicker";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const [focus, setFocus] = useState(false);

        const [time, setTime] = useState(() => {
            if (defaultValue) {
                return toDate(defaultValue);
            } else if (value) {
                return toDate(value);
            } else {
                return null;
            }
        });

        const [visible, setVisible] = useState(show ?? false);

        const [timeData, setTimeData] = useState<DateInfoProps | null>(null);

        // hours:minutes:seconds info
        const [timeInfo, setTimeInfo] = useState<TimeInfo | null>(null);

        const handleTimeChangeFn = useLatest(handleTimeChange);

        const handleVisibleChangeFn = useLatest(handleVisibleChange);

        const { t } = useTranslation();

        /**
         * 这里加入翻译文件
         */
        useLangConfig("CalendarComponent", languageConfig);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useUpdateEffect(() => {
            setVisible(show ?? false);
        }, [show]);

        useEffect(() => {
            const timeVal = value || defaultValue;

            if (timeVal) {
                const dateVal = toDate(timeVal);

                if (dateVal && dateVal.getTime() !== time?.getTime()) {
                    setTime(dateVal);
                }
            } else {
                setTime(null);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [defaultValue, value]);

        useEffect(() => {
            if (time === null) {
                setTimeData(null);
                setTimeInfo(null);
            }

            setTimeData(getDateInfo(time || undefined));

            if (time) {
                setTimeInfo(getTimeInfo(time));
            }

            const timeVal = value || defaultValue;
            const dateVal = timeVal ? toDate(timeVal) : null;
            if (dateVal?.getTime() !== time?.getTime()) {
                handleTimeChangeFn.current?.(time || null);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [time]);

        useEffect(() => {
            handleVisibleChangeFn.current?.(visible);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [visible]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        /**
         * 选择当前时间
         */
        const handleCurrent = () => {
            const now = new Date();
            setTime(now);
            setTimeInfo({ ...getTimeInfo(now) });
            setTimeout(() => {
                setVisible(false);
            });
        };

        /**
         * 点击确认按钮时
         */
        const handleConfirm = () => {
            if (timeData) {
                const info = getTimePickerInfo();
                const { year, month, day, h, m, s } = transformTimePickerInfo(info);
                const date = new Date(
                    Number(year),
                    Number(month) - 1,
                    Number(day),
                    Number(h),
                    Number(m),
                    Number(s),
                );
                onTimeConfirm?.(date, `${year}-${month}-${day} ${h}:${m}:${s}`);
                setTime(date);
                setVisible(false);
            }
        };

        /**
         * 转化时间类型
         * @param data
         */
        const toChangeTime = (data = timeData) => {
            let timeVal: null | Date = null;
            if (data) {
                timeVal = new Date(
                    data.year,
                    data.month - 1,
                    data.day,
                    data.unit === "PM" ? data.hour + 12 : data.hour,
                );
            }
            setTime(timeVal);
            setVisible(false);
        };

        /**
         * 当点击事件时
         * @param year
         * @param month
         * @param date
         */
        const handleDateClick = (year: number, month: number, date: number) => {
            let data = timeData ? { ...timeData } : null;
            if (data) {
                data.year = year;
                data.month = month;
                data.day = date;
            } else {
                data = {
                    year,
                    month,
                    day: date,
                    hour: 8,
                    unit: "AM",
                };
            }
            setTimeData(data);
            if (type === "date" && !showTime) {
                toChangeTime(data);
            }
        };

        const timePickerEl = () => {
            if (type === "dateTime") {
                return (
                    <TimePicker
                        show={visible}
                        year={timeData?.year}
                        month={timeData?.month}
                        day={timeData?.day}
                        hour={timeData?.hour}
                        unit={timeData?.unit}
                        minTime={minTime ? toDate(minTime) || undefined : undefined}
                        maxTime={maxTime ? toDate(maxTime) || undefined : undefined}
                        handleHourChange={(value) => {
                            if (timeData) {
                                timeData.hour = value;
                                setTimeData({ ...timeData });
                            }
                        }}
                        handleUnitChange={(value) => {
                            if (timeData) {
                                timeData.unit = value;
                                setTimeData({ ...timeData });
                            }
                        }}
                        handleApplyClick={() => toChangeTime()}
                        handleCancelClick={() => {
                            setTimeData(getDateInfo(time || undefined));
                            setVisible(false);
                        }}
                    />
                );
            }
        };

        const getTimePickerInfo = (): Record<string, number | string> => {
            const dateList = { year: 0, month: 0, day: 0, h: 0, m: 0, s: 0 };
            let { year, month, day, h, m, s } = dateList;

            if (timeData) {
                ({ year, month, day } = { ...timeData });
            } else {
                ({ year, month, day } = { ...(getDateInfo(new Date()) as DateInfoProps) });
            }

            if (timeInfo) {
                ({ h, m, s } = { ...timeInfo });
            }
            return { year, month, day, h, m, s };
        };

        const transformTimePickerInfo = (info: Record<string, string | number>) => {
            const clone = { ...info };
            Object.keys(clone).forEach((item) => {
                clone[item] = Number(clone[item]) > 9 ? `${clone[item]}` : `0${clone[item]}`;
            });
            return clone;
        };

        const timePickerWrap = () => {
            const info = getTimePickerInfo();
            const { year, month, day, h, m, s } = transformTimePickerInfo(info);
            return (
                showTime && (
                    <div className={styles.date_picker_time_wrap}>
                        <div className={styles.date_picker_time_title}>
                            {(timeInfo || timeData) && `${year}-${month}-${day} ${h}:${m}:${s}`}
                        </div>

                        <TimeWrap
                            value={time ?? new Date(0, 0, 0, 0, 0, 0)}
                            format={(showTime as TimePickerBaseProps).format ?? "hh:mm:ss"}
                            onTimeColumnChange={(res) => {
                                setTimeInfo(res);
                                const time = new Date(
                                    Number(year),
                                    Number(month) - 1,
                                    Number(day),
                                    res.h,
                                    res.m,
                                    res.s,
                                );
                                setTime(time);
                            }}
                        />
                    </div>
                )
            );
        };

        const timePickerOperation = () => {
            return (
                <div className={styles.date_picker_operation}>
                    <span className={styles.date_picker_operation__current} onClick={handleCurrent}>
                        {t("CalendarComponent.Now")}
                    </span>
                    <button
                        className={classNames(styles.date_picker_operation__confirm, {
                            [`${styles.date_picker_operation__confirm__disabled}`]:
                                !timeData && !timeInfo && !time,
                        })}
                        onClick={handleConfirm}
                    >
                        {t("CalendarComponent.Apply")}
                    </button>
                </div>
            );
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <DateContext.Provider
                value={{
                    focus,
                    setFocus: (status) => {
                        setFocus(status);
                        if (status && !visible) {
                            setVisible(true);
                        }
                    },
                    time,
                    setTime,
                    disabled,
                    minTime,
                    maxTime,
                }}
            >
                <Kite
                    root={
                        children ?? (
                            <CalendarInput placeholder={t("CalendarComponent.Start Time")} />
                        )
                    }
                    ref={ref}
                    show={visible}
                    className={className}
                    bodyClassName={styles[`${type}Picker_wrapper`]}
                    style={style}
                    offset={offset}
                    triangle={triangle}
                    direction={direction}
                    placement={placement}
                    onClick={() => {
                        if (!visible) {
                            setVisible(true);
                        }
                    }}
                    handleGlobalClick={(status) => {
                        if (!visible) {
                            return;
                        }

                        if (focus) {
                            return;
                        }

                        if (!status.isBtn && !status.isMenu && hideOnClick) {
                            setVisible(false);
                        }
                    }}
                    {...props}
                >
                    <div
                        className={classNames(styles.date_picker_panel, {
                            [`${styles.date_picker_panel__showtime}`]: showTime,
                            [`${styles.date_picker_panel__fill}`]: !showTime,
                        })}
                    >
                        <DateTemp
                            show={visible}
                            minTime={minTime ? toDate(minTime) || undefined : undefined}
                            maxTime={maxTime ? toDate(maxTime) || undefined : undefined}
                            readonly={readonly}
                            handleDateClick={handleDateClick}
                            type={type}
                            year={timeData?.year}
                            month={timeData?.month}
                            day={timeData?.day}
                        />
                        {timePickerWrap()}
                    </div>
                    {showTime && timePickerOperation()}
                    {timePickerEl()}
                </Kite>
            </DateContext.Provider>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
DatePicker.displayName = "DatePicker";
