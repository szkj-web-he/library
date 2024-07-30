/**
 * @file
 * @date 2021-12-14
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../../..";
import classNames from "../../../Unit/classNames";
import { useDateContext } from "../DatePicker/Unit/dateContext";
import { customDate } from "../DatePicker/Unit/dateFormat";
import { toDate } from "../DatePicker/Unit/typeToDate";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface CalendarInputProps {
    /**
     * The value of this component
     */
    value?: string;
    /**
     * placeholder of this component
     */
    placeholder?: string;
    /**
     * disabled of this component
     */
    disabled?: boolean;
    /**
     * className of this component
     */
    className?: string;

    /**
     * custom date format
     * yyyy:year
     * MM:month
     * dd:day
     * example: 1.yyyy:MM:dd
     *          2.yyyy-MM-dd(default)
     *          3.dd/MM/yyyy
     *          more...
     */
    valueFormat?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;

    /**
     * readonly of this component
     */
    readonly?: boolean;
    /**
     * custom context
     */
    children?: React.ReactNode;
    /**
     * Callback function for  transform time to string
     */
    handleValueChange?: (res: string) => void;

    /**
     *  Customize the content of the display input
     * 自定义展示input的内容
     */
    transformTime?: (time: Date | null) => string;
    /**
     * 隐藏清空按钮
     */
    hiddenClear?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const CalendarInput = forwardRef<HTMLInputElement, CalendarInputProps>(
    (
        {
            value,
            placeholder,
            disabled: propsDisabled,
            className,
            valueFormat = "yyyy-MM-dd",
            readonly,
            style,
            children,
            handleValueChange,
            transformTime,
            hiddenClear,
            ...props
        },
        ref,
    ) => {
        CalendarInput.displayName = "CalendarInput";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const [hover, setHover] = useState(false);

        const iptRef = useRef<HTMLInputElement | null>(null);

        const {
            setFocus,
            time,
            setTime,
            disabled: configDisabled,
            minTime,
            maxTime,
        } = useDateContext();

        const [disabled, setDisabled] = useState(propsDisabled || configDisabled);

        const valueChangeFn = useRef(handleValueChange);

        const transformTimeRef = useRef(transformTime);

        const memoValueRef = useRef(value);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useLayoutEffect(() => {
            valueChangeFn.current = handleValueChange;
        }, [handleValueChange]);

        useLayoutEffect(() => {
            transformTimeRef.current = transformTime;
        }, [transformTime]);

        useLayoutEffect(() => {
            setDisabled(propsDisabled || configDisabled);
        }, [propsDisabled, configDisabled]);

        const handleClearClick = (e: React.MouseEvent<SVGElement>) => {
            e.preventDefault();
            setTime(null);

            if (iptRef.current) {
                iptRef.current.value = "";
            }
        };

        useEffect(() => {
            const node = iptRef.current;
            let val = "";
            if (node) {
                if (transformTimeRef.current) {
                    val = transformTimeRef.current(time);
                } else if (time) {
                    val = customDate(valueFormat, time);
                }
                node.value = val;
                valueChangeFn.current?.(val);
            }
        }, [time, valueFormat]);

        useEffect(() => {
            const node = iptRef.current;

            const fn = (e: KeyboardEvent) => {
                const val = e.key;
                let date: number | null = null;
                let iptVal: string | null = null;
                const currentTime = time || new Date();

                switch (val) {
                    case "ArrowUp":
                        date = currentTime.getTime() - 7 * 24 * 3600 * 1000;
                        e.preventDefault();
                        break;
                    case "ArrowDown":
                        date = currentTime.getTime() + 7 * 24 * 3600 * 1000;

                        e.preventDefault();
                        break;
                    case "ArrowLeft":
                        date = currentTime.getTime() - 24 * 3600 * 1000;
                        e.preventDefault();
                        break;
                    case "ArrowRight":
                        date = currentTime.getTime() + 24 * 3600 * 1000;
                        e.preventDefault();
                        break;
                    case "Enter": {
                        iptVal = (e.currentTarget as HTMLInputElement).value.trim();

                        date = toDate(iptVal)?.getTime() || null;
                    }
                }

                if (!date) {
                    return;
                }

                if (date === time?.getTime()) {
                    /**
                     * 时间没有变化
                     */
                    return;
                }

                const minTimeVal = minTime ? toDate(minTime)?.getTime() : null;
                const maxTimeVal = maxTime ? toDate(maxTime)?.getTime() : null;

                if (minTimeVal && date < minTimeVal) {
                    //时间太小
                    return;
                }
                if (maxTimeVal && date > maxTimeVal) {
                    //时间太大
                    return;
                }
                setTime(new Date(date));
            };

            if (node) {
                node.addEventListener("keydown", fn);
            }
            return () => {
                node?.removeEventListener("keydown", fn);
            };
        }, [maxTime, minTime, setTime, time]);

        useEffect(() => {
            if (iptRef.current && value) {
                iptRef.current.value = value;
                if (value) {
                    memoValueRef.current = value;
                }
            }
        }, [value]);

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setFocus(false);
            let val = "";
            if (transformTimeRef.current) {
                val = transformTimeRef.current(time);
            } else if (time) {
                val = customDate(valueFormat, time);
            }
            if (!memoValueRef.current) {
                e.currentTarget.value = val;
            }
        };

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const iconContent = () => {
            if (disabled || hiddenClear) {
                return <Icon type="calendar" className={styles.calendarInput_calendarIcon} />;
            }

            if (hover && (time || value)) {
                return (
                    <Icon
                        type="empty"
                        className={styles.calendarInput_clearIcon}
                        onClick={handleClearClick}
                    />
                );
            }

            return <Icon type="calendar" className={styles.calendarInput_calendarIcon} />;
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={styles.calendarInput_wrapper + (className ? ` ${className}` : "")}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                {...props}
                onFocusCapture={() => {
                    if (children && !disabled) {
                        setFocus(true);
                    }
                }}
                onBlurCapture={() => {
                    if (children) {
                        setFocus(false);
                    }
                }}
            >
                {children ? (
                    children
                ) : (
                    <>
                        <input
                            type="text"
                            disabled={disabled}
                            onFocus={() => {
                                setFocus(true);
                            }}
                            ref={(el) => {
                                iptRef.current = el;
                                if (typeof ref === "function") {
                                    ref(el);
                                } else if (ref !== null) {
                                    (ref as React.MutableRefObject<HTMLElement | null>).current =
                                        el;
                                }
                            }}
                            style={style}
                            readOnly={readonly}
                            className={classNames(styles.calendarInput_content, {
                                [`${styles.calendarInput_content__disabled}`]: disabled,
                            })}
                            placeholder={placeholder}
                            onBlur={handleBlur}
                        />
                        <div
                            className={styles.calendarInput_icon}
                            style={
                                !disabled && hover && (time || value)
                                    ? {}
                                    : { pointerEvents: "none" }
                            }
                        >
                            {iconContent()}
                        </div>
                    </>
                )}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
CalendarInput.displayName = "CalendarInput";
