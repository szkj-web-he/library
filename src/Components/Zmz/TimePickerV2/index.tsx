/**
 * @file
 * @date 2022-08-24
 * @author
 * @lastModify  2022-08-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Kite } from "../../..";
import { languageConfig } from "../../../DefaultData/Zmz/timePicker";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { createHash } from "../../../Unit/createHash";
import { deepCloneData } from "../../../Unit/deepCloneData";
import { CalendarInput } from "../../Calendar/CalendarInput";
import { KiteProps } from "../../Common/Kite";
import styles from "./style.module.scss";
import { getDateInfo } from "./Unit/getDateInfo";
import { TimeInfo, TimePickerBaseProps, TimeWrap, TimeWrapRef } from "./Unit/TimeWrap";
import { transformHours } from "./Unit/transformHours";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface TimePickerProps extends TimePickerBaseProps {
    value?: Date;
    defaultValue?: Date;
    defaultOpenValue?: Date;
}

export type TimePickerV2Props = TimePickerProps & Omit<KiteProps, "root">;
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

export const TimePickerV2: React.FC<TimePickerV2Props> = ({
    value,
    defaultValue,
    defaultOpenValue,
    disabled = false,
    extraFooter,
    format = "hh:mm:ss",
    use12Hours = false,
    placement = "lb",
    direction = "vertical",
    bodyClassName,
    style,
    onChange,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [show, setShow] = useState(false);

    const [nowDate, setNowDate] = useState(value ?? defaultValue ?? defaultOpenValue ?? new Date());

    const persistVal = useRef<TimeInfo>();

    const [inputVal, setInputVal] = useState<TimeInfo | null>(() => {
        const date = getDateInfo(value ?? defaultValue ?? defaultOpenValue ?? new Date());
        persistVal.current = deepCloneData(date);
        return { ...date };
    });

    const hash = createHash();

    const timeWrapRef = useRef<TimeWrapRef | null>(null);

    const { t } = useTranslation();

    //这里添加翻译文件
    useLangConfig("TimePickerV2Component", languageConfig);

    useEffect(() => {
        if (value) setNowDate(value);
    }, [value]);

    useEffect(() => {
        const pickerTimeInput = document.querySelector(
            `[class*=picker_time_input_wrap_${hash}] > input`,
        ) as HTMLInputElement;
        pickerTimeInput.addEventListener("focus", handleTimeInputFocus);

        () => {
            pickerTimeInput.removeEventListener("focus", handleTimeInputFocus);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTransformTime = () => {
        if (inputVal) {
            let str = format;
            const o: Record<string, number> = {
                "H+": inputVal.H, // 12 hour
                "h+": inputVal.h, // hour
                "m+": inputVal.m, // minute
                "s+": inputVal.s, // second
                a: inputVal.a, // AM or PM
            };

            for (const k in o) {
                const reg = new RegExp(k);
                if (reg.test(str)) {
                    str = str.replace(reg, (value) => {
                        if (value === "a") {
                            return o[k] ? "pm" : "am";
                        } else if (value === "A") {
                            return o[k] ? "PM" : "AM";
                        }
                        if (
                            value.toLowerCase().includes("h") &&
                            (format.toLowerCase().includes("a") || use12Hours)
                        ) {
                            return `${transformHours(o[k])}`;
                        }
                        return value.length === 1 ? `${o[k]}` : o[k] > 9 ? `${o[k]}` : `0${o[k]}`;
                    });
                }
            }
            return str;
        } else {
            return "please choice time";
        }
    };
    /************* This section will include this component general function *************/

    const handleTimeInputFocus = () => {
        if (!disabled) setShow(true);
    };

    const handleCurrent = () => {
        setShow(false);
        const res = { ...getDateInfo(new Date()) };
        if (value === undefined) {
            persistVal.current = res;
            setNowDate(new Date());
            setInputVal(res);
        }
        onChange?.(res);
    };

    const handleChange = () => {
        if (timeWrapRef.current) {
            const res = timeWrapRef.current.getValue();
            if (res) {
                let nowH = 0;
                const { Y, M, D } = getDateInfo(new Date());
                const isH12 = format.toLowerCase().includes("a") || use12Hours;
                const { h, m, s, a } = res;
                if (isH12) nowH = transformHours(h, a);
                setShow(false);
                if (value === undefined) {
                    persistVal.current = res;
                    setNowDate(new Date(Y, M, D, isH12 ? nowH : h, m, s));
                    setInputVal(res);
                }
                onChange?.(res);
            }
        }
    };

    const renderExtraFooter = () => {
        return <div className={styles.picker_time_footer_extra}>{extraFooter}</div>;
    };

    const renderFooter = () => {
        return (
            <div className={classNames(styles.picker_time_footer)}>
                <span
                    className={classNames(styles.picker_time_footer_current)}
                    onClick={handleCurrent}
                >
                    {t("TimePickerV2Component.Now")}
                </span>
                <button
                    className={classNames(styles.picker_time_footer_confirm)}
                    onClick={handleChange}
                >
                    {t("TimePickerV2Component.OK")}
                </button>
            </div>
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Kite
            show={show}
            root={
                <CalendarInput
                    disabled={disabled}
                    placeholder="please choice time"
                    value={handleTransformTime()}
                    className={`picker_time_input_wrap_${hash}`}
                    style={{ width: "200px" }}
                />
            }
            removeOnHidden={true}
            cache={false}
            direction={direction}
            placement={placement}
            handleGlobalClick={(status) => {
                if (!status.isBtn && !status.isMenu && show) {
                    if (persistVal.current) setInputVal(persistVal.current);
                    setShow(false);
                }
            }}
        >
            <div style={style} className={classNames(styles.picker_time_container, bodyClassName)}>
                <TimeWrap
                    ref={timeWrapRef}
                    value={nowDate}
                    format={format}
                    use12Hours={use12Hours}
                    onTimeColumnChange={(res) => {
                        setInputVal(res);
                    }}
                />
                {extraFooter && renderExtraFooter()}
                {renderFooter()}
            </div>
        </Kite>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
