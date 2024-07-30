/**
 * @file
 * @date 2023-06-07
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { toDate } from "../DatePicker/Unit/typeToDate";
import Main from "./Unit/DialogMain";
import { MobileDatePickerInput } from "../MobileDatePickerInput";
import { Context } from "./Context/context";
import { customDate } from "../DatePicker/Unit/dateFormat";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface MobileDatePickerProps {
    /**
     * 日期输入框
     */
    children?: React.ReactNode;
    /**
     * 日期
     */
    value?: Date | number | string;
    /**
     * 最小的时间
     */
    // minTime?: Date | number | string;
    /**
     * 最大的时间
     */
    // maxTime?: Date | number | string;
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
    format?: string;
    /**
     * 当确认按钮点击时
     * @param date 选中的时间
     * @param formatDateStr 格式化后的时间
     */
    handleConfirmClick?: (date: Date, formatDateStr: string) => void;
    /**
     * 输入框的placeholder
     */
    placeholder?: string;
    /**
     * 是否只读
     */
    disabled?: boolean;
    /**
     * 当清空按钮被点击时
     */
    handleClearClick?: () => void;
}

export interface MobileDatePickerEvents {
    /**
     * 打开日期输入框
     * @returns
     */
    open: () => void;
    /**
     * 关闭日期输入框
     */
    close: () => void;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const MobileDatePicker = forwardRef<MobileDatePickerEvents | null, MobileDatePickerProps>(
    (
        {
            children,
            value,
            format = "yyyy-MM-dd",
            handleConfirmClick,
            placeholder = "请选择...",
            disabled,
            handleClearClick,
        },
        events,
    ) => {
        MobileDatePicker.displayName = "MobileDatePicker";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const [show, setShow] = useState(false);
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useImperativeHandle(events, () => {
            return {
                open: () => {
                    setShow(true);
                },
                close: () => {
                    setShow(false);
                },
            };
        });

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        /**
         * 获取日期字符串
         */
        const getValueStr = () => {
            if (value) {
                const date = toDate(value);

                if (date) {
                    return customDate(format, date);
                }
            }
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <Context.Provider
                value={{
                    toOpen: () => {
                        setShow(true);
                    },
                    value: getValueStr(),
                    placeholder,
                    disabled,
                    handleClearClick,
                    show,
                }}
            >
                {children ?? <MobileDatePickerInput />}
                <Main
                    show={show}
                    value={value ? toDate(value) ?? undefined : undefined}
                    handleClose={() => {
                        setShow(false);
                    }}
                    handleConfirm={handleConfirmClick}
                    format={format}
                />
            </Context.Provider>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
MobileDatePicker.displayName = "MobileDatePicker";
