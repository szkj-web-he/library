/**
 * @file Index file of GeneralInput component
 * @date 2020-09-04
 * @author Andy Jiang
 * @lastModify Andy Jiang 2020-09-04
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef } from "react";
import style from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface GeneralInputProps {
    /**
     * width of this input component
     */
    width?: string;
    /**
     * height of this input component
     */
    height?: string;
    /**
     * get input value
     */
    handleInputOnChange?: (value: string) => void;
    /**
     * get child
     */
    getChild?: (el: HTMLInputElement) => void;
    /**
     * placeholder of this  component
     */
    placeholder?: string;
    /**
     * onBlur of this  component
     */
    onBlur?: (value: string) => void;
    /**
     * onFocus of this  component
     */
    onFocus?: (value: string) => void;
    /**
     * className of this  component
     */
    className?: string;
    /**
     * maxLength of this component
     */
    maxLength?: number;
    /**
     * minLength of this component
     */
    minLength?: number;
    /**
     * defaultValue of this component
     */
    defaultValue?: string;
    /**
     * readOnly of this component
     */
    readOnly?: boolean;
    /**
     * disabled of this component
     */
    disabled?: boolean;
    /**
     * onKeyDown of this component
     */
    onKeyDown?: (keyString: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const GeneralInput: React.FC<GeneralInputProps> = ({
    width = "28rem",
    height = "3rem",
    handleInputOnChange,
    getChild,
    className,
    placeholder,
    onBlur,
    onFocus,
    maxLength,
    minLength,
    defaultValue,
    readOnly,
    disabled,
    onKeyDown,
}: GeneralInputProps) => {
    const ref = useRef<null | HTMLInputElement>(null);
    /* <------------------------------------ **** INIT START **** ------------------------------------ */
    /* <------------------------------------ **** INIT END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <input
            className={style.generalInput_inputContainer + (className ? ` ${className}` : "")}
            style={{ height, width, lineHeight: height }}
            ref={(el) => {
                el && getChild && getChild(el);
                ref.current = el;
            }}
            placeholder={placeholder}
            maxLength={maxLength}
            minLength={minLength}
            defaultValue={defaultValue}
            readOnly={readOnly}
            disabled={disabled}
            onKeyDown={(e) => {
                const codeVal = e.key;
                onKeyDown && onKeyDown(codeVal);
                if (codeVal === "Escape" || codeVal === "Enter") {
                    ref.current?.blur();
                }
            }}
            onBlur={(e) => {
                onBlur && onBlur(e.currentTarget.value);
            }}
            onFocus={(e) => {
                onFocus && onFocus(e.currentTarget.value);
            }}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInputOnChange && handleInputOnChange(event.target.value);
            }}
        />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
