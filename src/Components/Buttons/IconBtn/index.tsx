/**
 * @file
 * @date 2023-08-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-16
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef } from "react";
import classNames from "../../../Unit/classNames";
import { Btn, BtnEvents } from "../Btn";
import styles from "./style.module.scss";
import { LoadingComponent } from "../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface IconBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * 获取dom
     */
    onMounted?: (el: HTMLButtonElement | null) => void;
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
     * 按钮内容
     */
    label?: React.ReactNode;
    /**
     * 主题
     * 默认值 => primary
     */
    theme?:
        | "shadow"
        | "hoverShadow"
        | "background"
        | "hoverBackground"
        | "hoverPrimary"
        | "neutral"
        | "primary"
        | "danger"
        | "border";
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const IconBtn = forwardRef<BtnEvents | null, IconBtnProps>(
    (
        { disabled, size = "default", label, className, loading, theme = "primary", ...props },
        ref,
    ) => {
        IconBtn.displayName = "IconBtn";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <Btn
                className={classNames(
                    className,
                    styles.iconBtn_wrapper,
                    styles[`iconBtn_${size}`],
                    styles[`iconBtn_${theme}Theme`],
                    {
                        [styles.iconBtn_disabled]: disabled,
                        [styles.iconBtn_loading]: loading,
                    },
                )}
                ref={ref}
                classNameOnMousedown={styles.iconBtn_pending}
                classNameOnHover={styles.iconBtn_hover}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <LoadingComponent
                        type="spinningBubbles"
                        width={size === "small" ? "1.4rem" : size === "large" ? "2rem" : "1.8rem"}
                        height={size === "small" ? "1.4rem" : size === "large" ? "2rem" : "1.8rem"}
                        className={styles.iconBtn_loadingIcon}
                    />
                ) : (
                    label
                )}
            </Btn>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

IconBtn.displayName = "IconBtn";
