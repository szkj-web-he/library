/**
 * @file 边框按钮
 * @date 2023-08-17
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef } from "react";
import { Icon, IconTypes, LoadingComponent } from "../../..";
import iconType from "../../../Components/Icon/Unit/customFontIcon";
import classNames from "../../../Unit/classNames";
import { isValidChild } from "../../../Unit/isValidChild";
import { Btn, BtnEvents } from "../Btn";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface BorderBtnProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
    /**
     * 按钮内容
     */
    label?: React.ReactNode;
    /**
     * 按钮icon
     */
    icon?: IconTypes | React.ReactNode;
    /**
     * 按钮尺寸
     * * 默认值为 default
     */
    size?: "small" | "default" | "large";
    /**
     * icon放在左边还是右边
     * * 默认值为 左边
     */
    iconAlign?: "left" | "right";
    /**
     * 按钮的loading状态
     */
    loading?: boolean;
    /**
     * 主题
     * 默认值 => primary
     */
    theme?: "primary" | "auxiliary" | "neutral";
    /**
     * 交互类型
     * 默认值 => default
     */
    type?: "default" | "invert" | "diffuse";
    /**
     * 获取dom
     */
    onMounted?: (el: HTMLButtonElement | null) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const BorderBtn = forwardRef<BtnEvents | null, BorderBtnProps>(
    (
        {
            label,
            icon,
            size = "default",
            iconAlign = "left",
            loading,
            className,
            disabled,
            theme = "primary",
            type = "default",
            ...props
        },
        ref,
    ) => {
        BorderBtn.displayName = "BorderBtn";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        const iconEl = () => {
            if (typeof icon === "string" && icon in iconType) {
                return (
                    <span
                        className={classNames(styles.borderBtn_icon, {
                            [styles[`borderBtn_${iconAlign}Icon`]]: isValidChild(label),
                        })}
                    >
                        <Icon type={icon as IconTypes} />
                    </span>
                );
            }
            if (icon) {
                return (
                    <span
                        className={classNames(styles.borderBtn_icon, {
                            [styles[`borderBtn_${iconAlign}Icon`]]: isValidChild(label),
                        })}
                    >
                        {icon}
                    </span>
                );
            }
        };
        return (
            <Btn
                ref={ref}
                className={classNames(
                    className,
                    styles.borderBtn_wrapper,
                    styles[`borderBtn_${size}`],
                    styles[`borderBtn_type${type}`],
                    styles[`borderBtn_theme${theme}`],
                    {
                        [styles.borderBtn_disabled]: disabled,
                        [styles.borderBtn_loading]: loading,
                    },
                )}
                disabled={disabled || loading}
                classNameOnMousedown={styles.borderBtn_pending}
                classNameOnHover={styles.borderBtn_hover}
                {...props}
            >
                {loading ? (
                    <>
                        <LoadingComponent
                            type="spinningBubbles"
                            width={size === "large" ? "1.8rem" : "1.6rem"}
                            height={size === "large" ? "1.8rem" : "1.6rem"}
                            className={styles.borderBtn_loadingIcon}
                        />
                        Loading
                    </>
                ) : (
                    <>
                        {iconAlign === "left" ? iconEl() : <></>}
                        {label}
                        {iconAlign === "right" ? iconEl() : <></>}
                    </>
                )}
            </Btn>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
BorderBtn.displayName = "BorderBtn";
