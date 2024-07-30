/**
 * @file
 * @date 2022-05-23
 * @author mingzhou.zhang
 * @lastModify  2022-05-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { cloneElement, useRef, ReactElement } from "react";
import { BaseInputProps } from "./interface";
import { hasAddon, hasDisabled, hasPrefixSuffix } from "./util";
import styles from "../style.module.scss";
import classNames from "../../../../Unit/classNames";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const BaseInput: React.FC<BaseInputProps> = (props) => {
    const {
        inputElement,
        prefix,
        suffix,
        addonAfter,
        addonBefore,
        addonStyleHide,
        className,
        style,
        affixWrapperClassName,
        groupClassName,
        wrapperClassName,
        focused,
        disabled,
        readOnly,
        allowClear,
        value,
        bordered,
        hidden,
        handleReset,
        triggerFocus,
    } = props;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const containerRef = useRef<HTMLSpanElement>(null);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const onInputMouseDown: React.MouseEventHandler = (event) => {
        if (containerRef.current?.contains(event.target as Element)) {
            triggerFocus?.();
        }
    };

    const getClearIcon = () => {
        if (!allowClear) {
            return null;
        }
        const needClear = !disabled && !readOnly && value;
        const iconNode =
            typeof allowClear === "object" && allowClear?.clearIcon ? allowClear.clearIcon : "✖";

        return (
            <span
                className={classNames(styles.input_clear_icon, {
                    [`${styles.input_clear_icon__hidden}`]: !needClear,
                })}
                tabIndex={-1}
                onClick={handleReset}
                onMouseDown={(event) => event.preventDefault()}
            >
                {iconNode}
            </span>
        );
    };

    let element: ReactElement = cloneElement(inputElement, {
        value,
        hidden,
    });

    if (hasPrefixSuffix(props)) {
        const affixWrapperCls = classNames(
            styles.input_affix_wrapper,
            {
                [`${styles.input_affix_wrapper__disabled}`]: disabled,
                [`${styles.input_affix_wrapper__focused}`]: focused,
                [`${styles.input_affix_wrapper__readOnly}`]: readOnly,
                [`${styles.input_affix_wrapper_clear_btn}`]: suffix && allowClear && value,
                [`${styles.input_affix_wrapper__borderless}`]: !bordered,
            },
            !hasAddon(props) && className,
            affixWrapperClassName,
        );

        const suffixNode = (suffix || allowClear) && (
            <span className={styles.input_suffix}>
                {getClearIcon()}
                {suffix}
            </span>
        );

        element = (
            <span
                className={affixWrapperCls}
                ref={containerRef}
                style={style}
                hidden={!hasAddon(props) && hidden}
                onMouseDown={onInputMouseDown}
            >
                {prefix && <span className={styles.input_prefix}>{prefix}</span>}
                {cloneElement(inputElement, { style: null, value, hidden: null })}
                {suffixNode}
            </span>
        );
    }

    if (hasAddon(props)) {
        const mergedGroupCls = `${styles.input_group_wrapper} ${className ?? ""} ${
            groupClassName ?? ""
        }`;

        const mergedWrapperCls = `${styles.input_wrapper} ${styles.input_group} ${
            wrapperClassName ?? ""
        }`;

        // Need another wrapper for changing display:table to display:inline-block
        // and put style prop in wrapper
        return (
            <span className={mergedGroupCls} style={style} hidden={hidden}>
                <span className={mergedWrapperCls}>
                    {addonBefore && (
                        <span
                            tabIndex={-1}
                            className={classNames(styles.input_group_addon, {
                                [`${styles.input_group_addon__hide}`]: addonStyleHide,
                                [`${styles.input_group_addon__disabled}`]: hasDisabled(props),
                                [`${styles.input_group_addon__lineless}`]:
                                    !hasDisabled(props) == !disabled,
                            })}
                        >
                            {addonBefore}
                        </span>
                    )}
                    {hasDisabled(props) !== !disabled && addonBefore && (
                        <span
                            className={classNames(styles.input_gap_line, {
                                [`${styles.input_gap_line__disabled}`]: disabled,
                            })}
                        />
                    )}
                    {cloneElement(element, {
                        style: null,
                        hidden: null,
                        className: classNames((element.props as { className: string }).className, {
                            [`${styles.input_addonbefore}`]:
                                !hasPrefixSuffix(props) && !addonBefore,
                            [`${styles.input_addonafter}`]: !hasPrefixSuffix(props) && !addonAfter,
                        }),
                    })}
                    {hasDisabled(props) !== !disabled && addonAfter && (
                        <span
                            className={classNames(styles.input_gap_line, {
                                [`${styles.input_gap_line__disabled}`]: disabled,
                            })}
                        />
                    )}
                    {addonAfter && (
                        <span
                            tabIndex={-1}
                            className={classNames(styles.input_group_addon, {
                                [`${styles.input_group_addon__hide}`]: addonStyleHide,
                                [`${styles.input_group_addon__disabled}`]: hasDisabled(props),
                                [`${styles.input_group_addon__lineless}`]:
                                    !hasDisabled(props) == !disabled,
                            })}
                        >
                            {addonAfter}
                        </span>
                    )}
                </span>
            </span>
        );
    }
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return element;
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
