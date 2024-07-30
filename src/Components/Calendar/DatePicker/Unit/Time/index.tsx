/**
 * @file
 * @date 2021-12-14
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, Icon } from "../../../../..";
import { isTrue } from "../../../../Table/Unit/isTrue";
import { monthDropDownList } from "../dateData";
import { addZero } from "../dateFormat";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TimePickerProps {
    handleApplyClick?: () => void;
    handleCancelClick?: () => void;
    show?: boolean;
    hour?: number;
    year?: number;
    month?: number;
    day?: number;
    unit?: "PM" | "AM";
    handleHourChange: (res: number) => void;
    handleUnitChange: (res: "PM" | "AM") => void;
    minTime?: Date;
    maxTime?: Date;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const TimePicker: React.FC<TimePickerProps> = ({
    show,
    hour,
    unit,
    year,
    month,
    day,
    handleHourChange,
    handleUnitChange,
    handleApplyClick,
    handleCancelClick,
    minTime,
    maxTime,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const ref = useRef<HTMLInputElement | null>(null);

    const { t, i18n } = useTranslation();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        if (ref.current && show) {
            ref.current.value = hour?.toString() || "";
        }
    }, [hour, show]);

    useEffect(() => {
        const node = ref.current;
        const fn = (e: KeyboardEvent) => {
            const keyVal = e.key;

            if (keyVal === "Enter") {
                const val = Number((e.currentTarget as HTMLInputElement).value.trim());

                if (val < 11 && val > -1 && !(val % 1)) {
                    handleHourChange(val);
                }
            }
        };

        if (show && node) {
            node.addEventListener("keydown", fn);
        }
        return () => {
            node?.removeEventListener("keydown", fn);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    const switchUnit = () => {
        switch (unit) {
            case "AM":
                handleUnitChange("PM");
                break;
            case "PM":
                handleUnitChange("AM");
                break;
        }
    };

    const minus = () => {
        if (isTrue(hour)) {
            let h = hour as number;
            --h;
            if (h < 0) {
                h = 12;
            }
            handleHourChange(h);
        }
    };

    const plus = () => {
        if (isTrue(hour)) {
            let h = hour as number;
            ++h;
            if (h > 12) {
                h = 0;
            }

            handleHourChange(h);
        }
    };

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const iconEl = (handleUpClick: () => void, handleDownClick: () => void) => (
        <div className={styles.timePicker_arrow}>
            <Icon type="aUpAndDown" className={styles.timePicker_upIcon} onClick={handleUpClick} />
            <Icon
                type="aUpAndDownUp"
                onClick={handleDownClick}
                className={styles.timePicker_downIcon}
            />
        </div>
    );

    const unitEl = () => (
        <div className={styles.timePicker_unit}>
            <div className={styles.timePicker_unitContent}>
                {t(unit ? `CalendarComponent.${unit}` : "")}
            </div>
            {iconEl(switchUnit, switchUnit)}
        </div>
    );

    const timeValEl = () => (
        <div className={styles.timePicker_timeVal}>
            <input
                type="text"
                className={styles.timePicker_timeIpt}
                ref={ref}
                onBlur={(e) => {
                    e.currentTarget.value = hour?.toString() || "";
                }}
            />
            {iconEl(minus, plus)}
        </div>
    );

    const disableStatus = () => {
        let disabled = false;
        if (typeof hour === "number" && year && month && day && unit) {
            const timeVal = new Date(year, month - 1, day, unit === "PM" ? hour + 12 : hour);

            if (minTime && timeVal < minTime) {
                disabled = true;
            }
            if (maxTime && timeVal > maxTime) {
                return true;
            }
        }
        return disabled;
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.timePicker_wrapper}>
            <div className={styles.timePicker_content}>
                {isTrue(hour) && unit && month && year && day ? (
                    i18n.language === "cn" ? (
                        <>
                            {year}-{month <= 9 ? `0${month}` : month}-{addZero(2, day)}
                            {timeValEl()}
                            {unitEl()}
                        </>
                    ) : (
                        <>
                            {monthDropDownList()[month - 1].content.slice(0, 3)} {addZero(2, day)},
                            {year}
                            {timeValEl()}
                            {unitEl()}
                        </>
                    )
                ) : (
                    `${t("CalendarComponent.No Time")}`
                )}
            </div>
            <div className={styles.timePicker_Btn}>
                <Button
                    label={t("CalendarComponent.Apply")}
                    width="6rem"
                    height="2.4rem"
                    size="small"
                    disabled={disableStatus()}
                    className={styles.timePicker_apply}
                    onClick={handleApplyClick}
                />
                <Button
                    label={t("CalendarComponent.Cancel")}
                    type="secondary"
                    size="small"
                    width="5rem"
                    height="2.4rem"
                    className={styles.timePicker_cancel}
                    onClick={handleCancelClick}
                />
            </div>
        </div>
    );
};
export default TimePicker;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
