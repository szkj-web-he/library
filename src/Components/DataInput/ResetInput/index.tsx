/**
 * @file ResetInput
 * @date 2021-01-27
 * @author Andy Jiang
 * @lastModify Andy Jiang 2021-01-27
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { Icon } from "../../..";
import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import classNames from "../../../Unit/classNames";
import { useTranslation } from "react-i18next";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import { languageConfig } from "../../../DefaultData/DataInput/resetInput";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ResetInputProps {
    /**
     * width of current component
     */
    width?: string;
    /**
     * height of current component
     */
    height?: string;
    /**
     * focus style
     */
    focusStyle?: React.CSSProperties;
    /**
     * when input field on change
     */
    onChange?: (value: string) => void;
    /**
     * when input field on blur
     */
    onBlur?: (value: string) => void;
    /**
     * when input field on focus
     */
    onFocus?: (value: string) => void;
    /**
     * get input el
     */
    getInputEl?: (e: HTMLInputElement) => void;
    /**
     * default value
     */
    defaultValue?: string;
    /**
     * input value
     */
    value?: string;
    /**
     * disabled of this component
     */
    disabled?: boolean;
    /**
     * onKeyDown of this component
     */
    onKeyDown?: (keyString: string) => void;
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;

    /**
     * readOnly of this component
     */
    readOnly?: boolean;
    /**
     * maxLength of this component
     */
    maxLength?: number;
    /**
     * minLength of this component
     */
    minLength?: number;
    /**
     * placeholder of this component
     */
    placeholder?: string;
    /**
     * autoFocus of this component
     */
    autoFocus?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ResetInput: React.FC<ResetInputProps> = forwardRef<HTMLInputElement, ResetInputProps>(
    (
        {
            width = "20rem",
            height = "4rem",
            disabled = false,
            onChange,
            onBlur,
            onFocus,
            getInputEl,
            onKeyDown,
            focusStyle,
            className,
            style,
            defaultValue,
            value,
            readOnly,
            maxLength,
            minLength,
            placeholder,
            autoFocus,
        },
        ref,
    ) => {
        ResetInput.displayName = "ResetInput";

        const cRef = useRef<null | HTMLInputElement>(null);

        const [isHover, setIsHover] = useState(false);

        const [focusState, setFocusState] = useState<boolean>();

        const valRef = useRef(value);

        const [val, setVal] = useState(valRef.current);

        const focusFn = useRef(onFocus);

        const blurFn = useRef(onBlur);

        const { t } = useTranslation();
        //这里添加翻译文件
        useLangConfig("ResetInputComponent", languageConfig);
        /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        useLayoutEffect(() => {
            focusFn.current = onFocus;
        }, [onFocus]);

        useLayoutEffect(() => {
            blurFn.current = onBlur;
        }, [onBlur]);

        useEffect(() => {
            if (value === undefined) return;
            valRef.current = value;
            setVal(valRef.current);
            if (cRef.current) {
                cRef.current.value = value;
            }
        }, [value]);
        /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        useEffect(() => {
            const timer = window.setTimeout(() => {
                if (focusState === true) {
                    focusFn.current?.(valRef.current ?? "");
                } else if (focusState === false) {
                    blurFn.current?.(valRef.current ?? "");
                }
            });
            return () => {
                window.clearTimeout(timer);
            };
        }, [focusState]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        const visibleClearIcon = () => {
            return (isHover || focusState) && val ? {} : { display: "none" };
        };

        const _focusStyles = () => {
            if (focusState) {
                return focusStyle ? focusStyle : { border: "1px solid #22A6B3" };
            }
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                style={Object.assign({}, { width, height }, style, _focusStyles())}
                className={classNames(styles.resetInput_container, className, {
                    [`${styles.resetInput_container__disabled}`]: disabled,
                })}
                onMouseEnter={() => {
                    if (!disabled) {
                        setIsHover(true);
                    }
                }}
                onMouseLeave={() => {
                    setIsHover(false);
                }}
            >
                {/* <------------------------------------ **** SECTION1 START **** ------------------------------------ */}
                <input
                    autoFocus={autoFocus}
                    type="text"
                    ref={(el) => {
                        if (el && getInputEl) {
                            getInputEl(el);
                        }
                        if (typeof ref === "function") {
                            ref(el);
                        } else if (ref !== null) {
                            (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                        }

                        cRef.current = el;
                    }}
                    defaultValue={defaultValue}
                    readOnly={readOnly}
                    maxLength={maxLength}
                    minLength={minLength}
                    style={{ lineHeight: height }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.persist();
                        const val = e.target.value.trim();
                        valRef.current = val;
                        setVal(valRef.current);
                        onChange?.(valRef.current);
                    }}
                    placeholder={placeholder}
                    className={styles.resetInput_input}
                    disabled={disabled}
                    onFocus={() => {
                        setFocusState(true);
                    }}
                    onBlur={() => {
                        setFocusState(false);
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        e.persist();

                        const codeVal = e.key;
                        onKeyDown?.(codeVal);
                        if (codeVal === "Escape" || codeVal === "Enter") {
                            cRef.current?.blur();
                        }
                    }}
                />
                <Icon
                    type="empty"
                    style={visibleClearIcon()}
                    className={styles.resetInput_reset}
                    onMouseDown={(e) => {
                        e.preventDefault();
                    }}
                    title={t("ResetInputComponent.Clear")}
                    onClick={() => {
                        if (cRef.current) {
                            cRef.current.value = "";
                            setVal("");
                            onChange?.("");
                        }
                    }}
                />

                {/* <------------------------------------ **** SECTION1 END **** ------------------------------------ */}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
ResetInput.displayName = "ResetInput";
