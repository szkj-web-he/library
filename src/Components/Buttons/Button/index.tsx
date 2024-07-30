/**
 * @file
 * @date 2020-09-04
 * @author Mark
 * @lastModify Mark 2020-09-04
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Icon, IconDefinition } from "../../..";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    type?: "primary" | "secondary" | "danger" | "none";
    size?: "normal" | "small" | "big";
    /**
     * How wide should the button be?
     */
    width?: string;
    /**
     * How high should the button be?
     */
    height?: string;
    /**
     * What text should the button display?
     */

    label?: React.ReactNode;

    /**
     * Optional click handler
     */
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    /**
     * disable button event
     */
    disabled?: boolean;
    /**
     * is loading state or not
     */
    loading?: boolean;

    /**
     * @deprecated please use iconNode render Icon
     * icon of this component
     */
    icon?: IconDefinition;
    /**
     * icon node of this component
     */
    iconNode?: React.ReactNode;
    /**
     * class name
     */
    className?: string;
    /**
     * btn type
     */
    btnType?: "submit" | "reset" | "button";
    /**
     * custom loading text
     */
    loadingText?: string;
    /**
     * custom style
     */
    style?: React.CSSProperties;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/**
 * @deprecated 将在v0.5.0后移除
 */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            type = "none",
            label = "Button",
            height = "3.2rem",
            size = "normal",
            width,
            onClick,
            disabled,
            loading,
            icon,
            iconNode,
            btnType,
            className,
            loadingText,
            style,
        },
        ref,
    ) => {
        Button.displayName = "Button";

        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const { i18n } = useTranslation();

        const defaultLoadingText =
            loadingText ?? (i18n.language === "cn" ? "加载中···" : "loading");

        /**
         * get different size style
         */
        const getButtonSizestyles = () => {
            switch (size) {
                case "normal":
                    return styles.button_button__normal;
                case "small":
                    return styles.button_button__small;
                case "big":
                    return type === "primary"
                        ? styles.button_button__big
                        : type === "secondary"
                        ? styles.button_secondaryButton__big
                        : undefined;
            }
        };
        /**
         * this function will select the button styles
         * @param {sting} type the type of the button, primary, secondary or danger
         */
        const getButtonstyles = (type: string): string => {
            if (type === "primary") {
                return [
                    styles.button_button__primary,
                    size === "big" ? undefined : styles.button__button__pressed,
                    disabled || loading || size === "big"
                        ? undefined
                        : styles.button__primaryButton__hover,
                    getButtonSizestyles(),
                ].join(" ");
            } else if (type === "secondary") {
                return [
                    styles.button_button__secondary,
                    disabled || loading || size === "big"
                        ? undefined
                        : styles.button__secondaryButton__hover,
                    disabled && styles.button_button__secondary__disabled,
                    getButtonSizestyles(),
                ].join(" ");
            } else if (type === "danger") {
                return styles.button_button__danger;
            }
            return styles.button_button__primary;
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <button
                type={btnType}
                className={getButtonstyles(type) + (className ? ` ${className}` : "")}
                ref={ref}
                tabIndex={-1}
                style={Object.assign({
                    height,
                    minWidth: width,
                    background: disabled ? "gray" : undefined,
                    color: disabled ? "white" : undefined,
                    border: disabled ? "none" : undefined,
                    cursor: disabled || loading ? "default" : undefined,
                    ...style,
                })}
                onMouseDown={(e) => {
                    if (type === "primary" && size !== "big") {
                        e.currentTarget.classList.remove(styles.button__button__pressed);
                    }
                }}
                onMouseUp={(e) => {
                    if (type === "primary" && size !== "big") {
                        e.currentTarget.classList.add(styles.button__button__pressed);
                    }
                }}
                onClick={(e) => {
                    onClick?.(e);
                }}
                disabled={Boolean(disabled || loading)}
            >
                {loading && <span className={styles.button_loadingDot} />}
                <span>{loading ? defaultLoadingText : label}</span>
                {icon && (
                    <span>
                        <Icon icon={icon} />
                    </span>
                )}
                {iconNode && <span>{iconNode}</span>}
            </button>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Button.displayName = "Button";
