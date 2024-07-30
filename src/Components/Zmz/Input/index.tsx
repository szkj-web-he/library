/**
 * @file
 * @date 2022-05-23
 * @author mingzhou.zhang
 * @lastModify  2022-05-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { InputFocusOptions, InputProps, InputRef } from "./Unit/interface";
import { hasAddon, hasPrefixSuffix, fixControlledValue, triggerFocus } from "./Unit/util";
import { omit } from "../../../Unit/utils";
import styles from "./style.module.scss";
import { BaseInput } from "./Unit/BaseInput";
import classNames from "../../../Unit/classNames";
import useControllableValue from "../../../Hooks/useControllableValue";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
/**
 * @deprecated v0.3.2将被废弃
 */
export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
    Input.displayName = "Input";
    const {
        className,
        defaultValue,
        disabled,
        maxLength,
        suffix,
        showCount,
        autoComplete,
        inputClassName,
        bordered = true,
        type = "text",
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onPressEnter,
        onInputChange,
        ...rest
    } = props;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [value, setValue] = useControllableValue({
        value: props.value,
        defaultValue,
        onChange: onInputChange,
    });
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const focus = (option?: InputFocusOptions) => {
        if (inputRef.current) {
            triggerFocus(inputRef.current, option);
        }
    };

    useEffect(() => {
        setFocused((prev) => (prev && disabled ? false : prev));
    }, [disabled]);

    useImperativeHandle(ref, () => ({
        clear() {
            setValue("");
        },
        focus,
        blur() {
            inputRef.current?.blur();
        },
        setSelectionRange: (
            start: number,
            end: number,
            direction?: "forward" | "backward" | "none",
        ) => {
            inputRef.current?.setSelectionRange(start, end, direction);
        },
        select: () => {
            inputRef.current?.select();
        },
        input: inputRef.current,
    }));

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        onChange?.(event);
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (onPressEnter && event.key === "Enter") {
            onPressEnter(event);
        }
        onKeyDown?.(event);
    };

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(event);
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(event);
    };

    const handleReset = () => {
        setValue("");
        focus();
    };

    /**
     * render input element
     * @returns input element
     */
    const getInputElement = () => {
        /**
         * filter duplicate attribute
         */
        const otherProps = omit(props, [
            "onInputChange",
            "onPressEnter",
            "addonBefore",
            "addonAfter",
            "prefix",
            "suffix",
            "allowClear",
            "defaultValue",
            "showCount",
            "affixWrapperClassName",
            "groupClassName",
            "inputClassName",
            "wrapperClassName",
            "addonStyleHide",
        ]);
        return (
            <input
                autoComplete={autoComplete}
                {...otherProps}
                ref={inputRef}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                className={classNames(
                    styles.input,
                    inputClassName,
                    !hasAddon(props) && !hasPrefixSuffix(props) && className,
                    {
                        [`${styles.input_borderless}`]: !bordered,
                    },
                )}
                type={type}
            />
        );
    };

    /**
     * when showCount is true, show count limit
     * @returns Suffix node
     */
    const getSuffix = () => {
        const hasMaxLength = Number(maxLength) > 0;

        if (suffix || showCount) {
            const valueLength = fixControlledValue(value).length;
            const dataCount =
                typeof showCount === "object"
                    ? showCount.formatter({ count: valueLength, maxLength })
                    : `${valueLength}${hasMaxLength ? ` / ${maxLength ?? 0}` : ""}`;

            return (
                <>
                    {!!showCount && <span className={styles.input_show_count}>{dataCount}</span>}
                    {suffix}
                </>
            );
        }
        return null;
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <BaseInput
            {...rest}
            className={className}
            value={fixControlledValue(value)}
            inputElement={getInputElement()}
            handleReset={handleReset}
            focused={focused}
            triggerFocus={focus}
            disabled={disabled}
            suffix={getSuffix()}
            bordered={bordered}
        />
    );
});
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
