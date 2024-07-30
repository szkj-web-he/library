/**
 * @file
 * @date 2022-08-24
 * @author
 * @lastModify  2022-08-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    forwardRef,
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
    HTMLAttributes,
} from "react";

import { TimeColumn, ColumnType, TimeColumnProps, TimeColumnChangeProps } from "../TimeColumn";
import classNames from "../../../../../Unit/classNames";
import styles from "./style.module.scss";
import { transformHours } from "../transformHours";
import { getDateInfo } from "../getDateInfo";
import { omit } from "../../../../../Unit/utils";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface TimePickerBaseProps
    extends Omit<
        HTMLAttributes<HTMLDivElement>,
        "onChange" | "value" | "defaultValue" | "defaultOpenValue"
    > {
    format?: string;
    use12Hours?: boolean;
    disabled?: boolean;
    extraFooter?: React.ReactNode;
    onChange?: (res: TimeInfo) => void;
    onTimeColumnChange?: (res: TimeInfo) => void;
}

export interface TimeWrapProps extends TimePickerBaseProps {
    value: Date | null;
}

export interface TimeWrapRef {
    getValue: () => TimeInfo | null;
}

export type TimeType = "H" | "h" | "m" | "s" | "a";

export type MemoTimeType = "Y" | "M" | "D" | TimeType;

export type TimeInfo = Record<TimeType, number>;

export type MemoTime = Record<MemoTimeType, number> & { date: Date };
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const TimeWrap = forwardRef<TimeWrapRef, TimeWrapProps>(
    (
        { value, format = "h:mm:ss a", use12Hours = false, onTimeColumnChange, className, ...rest },
        ref,
    ) => {
        TimeWrap.displayName = "TimeWrap";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const [curTime, setCurTime] = useState<Date | null>(value);
        const [curTimeInfo, setcurTimeInfo] = useState<TimeInfo | null>(null);

        const memoTime = useRef<MemoTime | null>(null);

        useEffect(() => {
            const dateTime = value ?? curTime;
            if (dateTime && !memoTime.current) {
                memoTime.current = getDateInfo(dateTime);

                setcurTimeInfo({ ...memoTime.current });
            }
            if (value) setCurTime(value);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value]);

        useEffect(() => {
            if (curTime) memoTime.current = getDateInfo(curTime);
        }, [curTime]);

        useImperativeHandle(ref, () => ({
            getValue() {
                return curTimeInfo;
            },
        }));

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */

        const handleTimeColumnChange = (res: TimeColumnChangeProps) => {
            const { type, val } = res;
            const v = Number(val);
            if (memoTime.current) {
                let curDate: Date;
                const { Y, M, D, h, m, s, a } = memoTime.current;
                switch (type) {
                    case "H":
                        curDate = new Date(Y, M, D, transformHours(v, a), m, s);
                        break;
                    case "h":
                        {
                            const u12 = use12Hours || format.toLowerCase().includes("a");
                            curDate = u12
                                ? new Date(Y, M, D, transformHours(v, a), m, s)
                                : new Date(Y, M, D, v, m, s);
                        }
                        break;
                    case "m":
                        curDate = new Date(Y, M, D, h, v, s);
                        break;
                    case "s":
                        curDate = new Date(Y, M, D, h, m, v);
                        break;
                    case "a": {
                        const h12 = transformHours(h, v);
                        curDate = new Date(Y, M, D, h12, m, s);
                    }
                }
                const timeInfo = getDateInfo(curDate);
                type === "a" && (timeInfo.a = v);
                setCurTime(curDate);
                setcurTimeInfo(timeInfo);
                onTimeColumnChange?.(timeInfo);
            }
        };

        const transformColumn = (date: Date | null, format: string) => {
            const u12 = use12Hours || format.toLowerCase().includes("a");
            const columnList: TimeColumnProps[] = [];

            if (date === null) {
                for (const k of ["hh", "mm", "ss"]) {
                    columnList.push({
                        value: `0`,
                        type: k as ColumnType,
                        use12Hours: u12,
                        className: `${styles.picker_time_column_wrap}`,
                        onChange: handleTimeColumnChange,
                    });
                }
                return columnList;
            }

            const o: Record<string, number> = {
                "H+": transformHours(date.getHours(), date.getHours() <= 11 ? 0 : 1), // 12hour
                "h+": date.getHours(), // hour
                "m+": date.getMinutes(), // minute
                "s+": date.getSeconds(), // second
            };

            for (const k in o) {
                const reg = new RegExp(k);
                if (reg.test(format)) {
                    let value = `${o[k]}`;
                    const match = format.match(reg);
                    value = k === "h+" && u12 ? `${transformHours(date.getHours())}` : `${o[k]}`;
                    match !== null &&
                        columnList.push({
                            value,
                            type: match[0][0] as ColumnType,
                            use12Hours: u12,
                            className: `${styles.picker_time_column_wrap}`,
                            onChange: handleTimeColumnChange,
                        });
                }
            }

            if (u12) {
                columnList.push({
                    value: `${date.getHours() < 12 ? 0 : 1}`,
                    type: "a",
                    className: `${styles.picker_time_column_wrap}`,
                    use12Hours: u12,
                    onChange: handleTimeColumnChange,
                });
            }

            return columnList;
        };

        const renderColumnList = () => {
            const columnList = transformColumn(curTime, format);
            return (
                <div
                    {...omit(rest, ["onChange"])}
                    className={classNames(styles.picker_time_content, className)}
                >
                    {columnList.map((item, index) => (
                        <TimeColumn key={index} {...item} />
                    ))}
                </div>
            );
        };

        /************* This section will include this component general function *************/
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return renderColumnList();
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
