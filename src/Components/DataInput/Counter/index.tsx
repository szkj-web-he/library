/**
 * @file counter V2
 * @date 2021-07-19
 * @author xuejie.he
 * @lastModify xuejie.he 2021-07-19
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { Icon } from "../../..";
import classNames from "../../../Unit/classNames";
import styles from "./style.module.scss";
import { useRef } from "react";
import { useEffect } from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
type DirectionType = "horizontal" | "vertical";
export interface CounterProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onBlur" | "onInput"> {
    /**
     * default value
     */
    defaultValue?: number;
    /**
     * operation button direction
     */
    direction?: DirectionType;
    /**
     * step
     */
    step?: number;
    /**
     * disabled of this component
     */
    disabled?: boolean;
    /**
     * handle when value changes
     */
    handleValueOnChange?: (value: number) => void;
    /**
     * Minimum
     */
    min?: number;
    /**
     * maximum
     */
    max?: number;
    /**
     * onInput of this component
     */
    onInput?: (iptVal: string) => void;
    /**
     * onBlur of this component
     */
    onBlur?: (iptVal: string) => void;
    /**
     *className of this component
     */
    className?: string;
    /**
     * custom style
     */
    style?: React.CSSProperties;
    /**
     * custom Before Icon
     */
    customBeforeIcon?: React.ReactNode;
    /**
     * custom After Icon
     */
    customAfterIcon?: React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

export const Counter: React.FC<CounterProps> = ({
    direction = "horizontal",
    step = 1,
    disabled = false,
    handleValueOnChange,
    onInput,
    onBlur,
    defaultValue = 0,
    className,
    style,
    min,
    max,
    customBeforeIcon,
    customAfterIcon,
    onCompositionStart,
    onCompositionEnd,
    onKeyDown,
    ...props
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [key, setKey] = useState<string>(() => new Date().getTime().toString());

    const ref = useRef<HTMLInputElement | null>(null);

    /**
     * 在输入非英文的时候临时存储下来的input值
     */
    const compositionVal = useRef("");
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        if (ref.current) {
            ref.current.value = defaultValue.toString();
        }
    }, [defaultValue]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) {
            e.preventDefault();
            return;
        }

        const { value } = e.target;
        onInput?.(value);
        const status = /[^0-9]/.test(value);

        if (status === false) {
            if (typeof min === "number" && Number(value) < min) {
                handleValueOnChange?.(min);
            } else if (typeof max === "number" && Number(value) > max) {
                handleValueOnChange?.(max);
            } else {
                handleValueOnChange?.(Number(value));
            }
        }
    };

    const handleSubtract = () => {
        if (disabled) return;
        if (typeof min === "number" && defaultValue - step < min) {
            handleValueOnChange?.(min);
        } else {
            handleValueOnChange?.(defaultValue - step);
        }
        setKey(new Date().getTime().toString());
    };

    const handleAdd = () => {
        if (disabled) return;
        if (typeof max === "number" && defaultValue + step > max) {
            handleValueOnChange?.(max);
        } else {
            handleValueOnChange?.(defaultValue + step);
        }
        setKey(new Date().getTime().toString());
    };
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const beforeNode = (
        <div
            onClick={handleSubtract}
            className={classNames(styles.counter_subtractBtn, {
                [`${styles.counter_subtractBtn__disabled}`]:
                    disabled || (typeof min === "number" && defaultValue <= min),
            })}
        >
            {customBeforeIcon ?? direction === "horizontal" ? (
                <Icon type="subtract" className={styles.counter_subtractBtnIcon} />
            ) : (
                <Icon type="open" className={styles.counter_subtractBtnIcon} />
            )}
        </div>
    );

    const afterNode = (
        <div
            onClick={handleAdd}
            className={classNames(styles.counter_addBtn, {
                [`${styles.counter_addBtn__disabled}`]:
                    disabled || (typeof max === "number" && defaultValue >= max),
            })}
        >
            {customAfterIcon ?? direction === "horizontal" ? (
                <Icon type="addition01" className={styles.counter_addBtnIcon} />
            ) : (
                <Icon type="open" className={styles.counter_addBtnIcon} />
            )}
        </div>
    );

    const inputNode = (
        <input
            key={key}
            type="text"
            onInput={handleInput}
            {...props}
            onKeyDown={(e) => {
                onKeyDown?.(e);

                /**
                 * 限制只能输入数字
                 */
                const keyVal = e.key;
                const exclude = [
                    " ",
                    "_",
                    "/",
                    "+",
                    "*",
                    "=",
                    "(",
                    ")",
                    "&",
                    "^",
                    "%",
                    "$",
                    "#",
                    "@",
                    "!",
                    "~",
                    "`",
                    ",",
                    "?",
                    "<",
                    ">",
                    "{",
                    "}",
                    "[",
                    "]",
                    "|",
                    ":",
                    ";",
                    "'",
                    '"',
                    "\\",
                ];

                if (exclude.some((item) => item === keyVal)) {
                    e.preventDefault();
                    return;
                }

                if (/^[a-z]$/gi.test(keyVal) && e.ctrlKey === false && e.altKey === false) {
                    e.preventDefault();
                    return;
                }
            }}
            onCompositionStart={(e) => {
                compositionVal.current = e.currentTarget.value;
                onCompositionStart?.(e);
            }}
            onCompositionEnd={(e) => {
                e.currentTarget.value = compositionVal.current;
                compositionVal.current = "";
                onCompositionEnd?.(e);
            }}
            disabled={disabled}
            onBlur={(e) => {
                onBlur?.(e.target.value);
                setKey(new Date().getTime().toString());
            }}
            ref={ref}
            defaultValue={defaultValue}
            className={classNames(styles.counter_inputContainer, {
                [`${styles.counter_inputContainer__disabled}`]: disabled,
            })}
        />
    );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={classNames(
                styles.counter_container,
                styles[`counter_container_${direction}`],
                className,
            )}
            style={style}
        >
            {direction === "horizontal" && beforeNode}
            {inputNode}
            {direction === "horizontal" && afterNode}
            {direction === "vertical" && (
                <div className={styles.counter_operation_button}>
                    {beforeNode}
                    {afterNode}
                </div>
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
