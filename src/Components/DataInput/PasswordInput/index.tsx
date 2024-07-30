/**
 * @file Index file of PasswordInput component
 * @date 2020-09-04
 * @author Andy Jiang
 * @lastModify Andy Jiang 2020-09-04
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef, useState } from "react";
import style from "./style.module.scss";
import { Icon } from "../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface PasswordInputProps {
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
     * placeholder of this component
     */
    placeholder?: string;
    /**
     * The style when the component gets focus
     */
    focusStyle?: React.CSSProperties;
    /**
     * onKeyDown of this component
     */
    onKeyDown?: (keyString: string) => void;
    /**
     * onFocus of this component
     */
    onFocus?: (iptVal: string) => void;
    /**
     * onBlur of this component
     */
    onBlur?: (iptVal: string) => void;
    /**
     * className of this component
     */
    className?: string;
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
     * getInputEl
     */
    getInputEl?: (el: HTMLInputElement) => void;
    /**
     * maxLength of this component
     */
    maxLength?: number;
    /**
     * minLength of this component
     */
    minLength?: number;
    /**
     * autoFocus of this component
     */
    autoFocus?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const PasswordInput: React.FC<PasswordInputProps> = ({
    width = "33rem",
    height = "4.5rem",
    handleInputOnChange,
    placeholder = "Please input your password",
    onKeyDown = undefined,
    focusStyle,
    onFocus,
    onBlur,
    className,
    defaultValue,
    readOnly,
    disabled,
    getInputEl,
    maxLength,
    minLength,
    autoFocus,
}: PasswordInputProps) => {
    /* <------------------------------------ **** STATES START **** ------------------------------------ */
    const [showPwd, setShowPwd] = useState(false);
    const ref = useRef<null | HTMLInputElement>(null);
    const [focusStatus, changeFocusStatus] = useState(false);
    /* <------------------------------------ **** STATES END **** ------------------------------------ */

    /* <------------------------------------ **** FUNCTIONS START **** ------------------------------------ */
    /**
     * will be called when input changes
     * @param event event target
     */
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInputOnChange && handleInputOnChange(event.currentTarget.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const keyVal = e.key;
        onKeyDown && onKeyDown(keyVal);
        if (keyVal === "Escape" || keyVal === "Enter") {
            ref.current && ref.current.blur();
        }
    };

    /* <------------------------------------ **** FUNCTIONS END **** ------------------------------------ */
    return (
        <div
            className={style.passwordInput_inputContainer + (className ? " " + className : "")}
            style={Object.assign(
                {},
                { height, width },
                focusStatus ? focusStyle || { borderColor: "#478DA5" } : {},
            )}
        >
            <input
                ref={(el) => {
                    ref.current = el;
                    if (el) {
                        getInputEl && getInputEl(el);
                    }
                }}
                autoFocus={autoFocus}
                type={showPwd ? "text" : "password"}
                className={style.passwordInput_input}
                placeholder={placeholder}
                onChange={handleInput}
                defaultValue={defaultValue}
                readOnly={readOnly}
                disabled={disabled}
                onKeyDown={handleKeyDown}
                maxLength={maxLength}
                minLength={minLength}
                onFocus={(e) => {
                    changeFocusStatus(true);
                    onFocus && onFocus(e.currentTarget.value);
                }}
                onBlur={(e) => {
                    changeFocusStatus(false);
                    onBlur && onBlur(e.currentTarget.value);
                }}
            />
            <div
                className={style.passwordInput_inputShowPwdIcon}
                onClick={() => {
                    setShowPwd(!showPwd);
                }}
            >
                <Icon type={showPwd ? "closeeyeHide" : "openeyeShow"} />
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
