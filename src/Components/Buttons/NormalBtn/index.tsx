/**
 * @file 标准的按钮
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
import { Btn, BtnEvents } from "../Btn";
import styles from "./style.module.scss";
import { isValidChild } from "../../../Unit/isValidChild";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface NormalBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
     * 是否为危险按钮
     */
    danger?: boolean;
    /**
     * 获取dom
     */
    onMounted?: (el: HTMLButtonElement | null) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const NormalBtn = forwardRef<BtnEvents | null, NormalBtnProps>(
    (
        {
            disabled,
            size = "default",
            label,
            icon,
            className,
            loading,
            danger,
            iconAlign = "left",
            ...props
        },
        ref,
    ) => {
        NormalBtn.displayName = "NormalBtn";
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
                        className={classNames(styles.normalBtn_icon, {
                            [styles[`normalBtn_${iconAlign}Icon`]]: isValidChild(label),
                        })}
                    >
                        <Icon type={icon as IconTypes} />
                    </span>
                );
            }
            if (icon) {
                return (
                    <span
                        className={classNames(styles.normalBtn_icon, {
                            [styles[`normalBtn_${iconAlign}Icon`]]: isValidChild(label),
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
                    styles.normalBtn_wrapper,
                    styles[`normalBtn_${size}`],
                    {
                        [styles.normalBtn_danger]: danger,
                        [styles.normalBtn_disabled]: disabled,
                        [styles.normalBtn_loading]: loading,
                    },
                )}
                ref={ref}
                classNameOnMousedown={styles.normalBtn_pending}
                classNameOnHover={styles.normalBtn_hover}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <>
                        <LoadingComponent
                            type="spinningBubbles"
                            width={size === "large" ? "1.8rem" : "1.6rem"}
                            height={size === "large" ? "1.8rem" : "1.6rem"}
                            color="#fff"
                            className={styles.normalBtn_loadingIcon}
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
NormalBtn.displayName = "NormalBtn";
