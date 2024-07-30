/**
 * @file
 * @date 2023-08-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-16
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
export interface TextBtnProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
    /**
     * 按钮内容
     */
    label?: React.ReactNode;
    /**
     * 按钮icon
     */
    icon?: IconTypes | React.ReactNode;
    /**
     * icon放在左边还是右边
     * * 默认值为 左边
     */
    iconAlign?: "left" | "right";
    /**
     * 按钮尺寸
     * * 默认值为 default
     */
    size?: "small" | "default" | "large";
    /**
     * 按钮的loading状态
     */
    loading?: boolean;
    /**
     * 有没有文字下划线
     */
    underline?: boolean;
    /**
     * 在鼠标移上去的时候添加下划线
     */
    underlineOnHover?: boolean;
    /**
     * 在鼠标移上去的时候添加背景色
     */
    backgroundOnHover?: boolean;
    /**
     * 交互类型
     * 默认值为  primary
     */
    type?: "primary" | "auxiliary" | "neutral" | "danger" | "neutralDanger" | "neutralPrimary";
    /**
     * 获取dom
     */
    onMounted?: (el: HTMLButtonElement | null) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const TextBtn = forwardRef<BtnEvents | null, TextBtnProps>(
    (
        {
            label,
            icon,
            size = "default",
            loading,
            className,
            underline,
            underlineOnHover,
            backgroundOnHover,
            disabled,
            iconAlign = "left",
            type = "primary",
            ...props
        },
        ref,
    ) => {
        TextBtn.displayName = "TextBtn";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const iconEl = () => {
            if (typeof icon === "string" && icon in iconType) {
                return (
                    <span
                        className={classNames(styles.textBtn_icon, {
                            [styles[`textBtn_${iconAlign}Icon`]]: isValidChild(label),
                        })}
                    >
                        <Icon type={icon as IconTypes} />
                    </span>
                );
            }
            if (icon) {
                return (
                    <span
                        className={classNames(styles.textBtn_icon, {
                            [styles[`textBtn_${iconAlign}Icon`]]: isValidChild(label),
                        })}
                    >
                        {icon}
                    </span>
                );
            }
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <Btn
                className={classNames(
                    className,
                    styles.textBtn_wrapper,
                    styles[`textBtn_${size}`],
                    styles[`textBtn_${type}`],
                    {
                        [styles.textBtn_underline]: underline,
                        [styles.textBtn_underlineOnHover]: !underline && underlineOnHover,
                        [styles.textBtn_backgroundOnHover]: backgroundOnHover,
                        [styles.textBtn_disabled]: disabled,
                        [styles.textBtn_loading]: loading,
                    },
                )}
                ref={ref}
                classNameOnMousedown={styles.textBtn_pending}
                classNameOnHover={styles.textBtn_hover}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <>
                        <LoadingComponent
                            type="spinningBubbles"
                            width={size === "large" ? "1.8rem" : "1.6rem"}
                            height={size === "large" ? "1.8rem" : "1.6rem"}
                            className={styles.textBtn_loadingIcon}
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
TextBtn.displayName = "TextBtn";
