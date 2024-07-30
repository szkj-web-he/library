/**
 * @file index file of SearchInput component
 * @date 2020-09-04
 * @author Andy Jiang
 * @lastModify Andy Jiang 2020-09-04
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import style from "./style.module.scss";
import { Icon } from "../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface SearchInputProps {
    /**
     * is this input component can be change into a icon
     */
    changeable?: boolean;
    /**
     * width of this input component
     */
    width?: string;
    /**
     * height of this input component
     */
    height?: string;
    /**
     * get current Node
     */
    getCurrentRef?: (el: HTMLInputElement) => void;
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
    /**
     * onChange of this component
     */
    onChange?: (res: string) => void;
    /**
     * autoFocus of this component
     */
    autoFocus?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const SearchInput: React.FC<SearchInputProps> = ({
    width = "20rem",
    height = "3.2rem",
    changeable = false,
    onKeyDown,
    getCurrentRef,
    placeholder,
    onBlur,
    onFocus,
    autoFocus,
    className,
    maxLength,
    minLength,
    defaultValue,
    onChange,
    readOnly,
    disabled,
}: SearchInputProps) => {
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [focusStatus, setFocusStatus] = useState(false);
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETERS START **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETERS END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTIONS START **** ------------------------------------ */

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const code = e.key;
        onKeyDown && onKeyDown(code);
        if (code === "Escape" || code === "Enter") {
            (e.target as HTMLInputElement).blur();
        }
    };

    const mainClassName = () => {
        if (changeable) {
            return focusStatus ? " " + style.searchInput_containerOpen : "";
        } else {
            return " " + style.searchInput_containerOpen;
        }
    };

    /* <------------------------------------ **** FUNCTIONS END **** ------------------------------------ */

    return (
        <div
            className={
                style.searchInput_container + (className ? " " + className : "") + mainClassName()
            }
            style={{ height, width }}
        >
            <Icon type="search" className={style.searchInput_icon} />
            <input
                className={style.searchInput_input}
                defaultValue={defaultValue}
                maxLength={maxLength}
                minLength={minLength}
                readOnly={readOnly}
                onFocus={(e) => {
                    setFocusStatus(true);
                    onFocus && onFocus(e.currentTarget.value);
                }}
                onBlur={(e) => {
                    setFocusStatus(false);
                    onBlur && onBlur(e.currentTarget.value);
                }}
                onChange={(e) => {
                    onChange && onChange(e.currentTarget.value);
                }}
                disabled={disabled}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                autoFocus={autoFocus}
                ref={(el) => {
                    el && getCurrentRef && getCurrentRef(el);
                }}
            />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
