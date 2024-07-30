/**
 * @file 大号的对话框
 * @date 2023-01-31
 * @author xuejie.he
 * @lastModify xuejie.he 2023-01-31
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { useTranslation } from "react-i18next";
import { Icon, useEventListener } from "../../..";
import classNames from "../../../Unit/classNames";
import { ScrollComponent } from "../../DataDisplay/Scroll";
import { DialogCommonProps } from "../Unit/type";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends DialogCommonProps {
    /**
     * 是否有关闭按钮
     */
    closeIcon?: boolean;
    /**
     * 当隐藏按钮被点击时
     */
    onClose?: (isEsc?: true) => void;
    /**
     * 按钮
     */
    buttons?: React.ReactNode;
    /**
     * 是否有 返回按钮
     */
    backIcon?: boolean;
    /**
     * 当返回按钮被点击时
     */
    onBack?: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    size = "regular",
    closeIcon,
    type = "none",
    title,
    description,
    children,
    onClose,
    buttons,
    backIcon,
    onBack,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { i18n } = useTranslation();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            onClose?.(true);
        }
    });
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    const sizeStr = `${size.slice(0, 1).toUpperCase()}${size.slice(1, size.length).toLowerCase()}`;

    const titleEl = title ? <div className={styles.commonDialog_title}>{title}</div> : <></>;

    const desEl = description ? (
        <div className={styles.commonDialog_description}>{description}</div>
    ) : (
        <></>
    );

    const desAndTitleEl =
        titleEl || desEl ? (
            <div className={styles.commonDialog_titleAndDes}>
                {titleEl}
                {desEl}
            </div>
        ) : (
            <></>
        );

    let topEl = <></>;
    switch (type) {
        case "error":
            topEl = (
                <div className={styles.commonDialog_top}>
                    <div className={styles.commonDialog_iconContainer}>
                        <Icon type="warningTriangle" className={styles.commonDialog_errorIcon} />
                    </div>
                    {desAndTitleEl}
                </div>
            );
            break;
        case "info":
            topEl = (
                <div className={styles.commonDialog_top}>
                    <div className={styles.commonDialog_iconContainer}>
                        <Icon type="info" className={styles.commonDialog_infoIcon} />
                    </div>
                    {desAndTitleEl}
                </div>
            );
            break;
        case "warning":
            topEl = (
                <div className={styles.commonDialog_top}>
                    <div className={styles.commonDialog_iconContainer}>
                        <Icon type="warning" className={styles.commonDialog_warnIcon} />
                    </div>
                    {desAndTitleEl}
                </div>
            );
            break;
        default:
            topEl = <div className={styles.commonDialog_top}>{desAndTitleEl}</div>;
            break;
    }

    // type
    // description

    /**
     * 隐藏的btn
     */
    let hiddenBtn = <></>;
    if (closeIcon) {
        hiddenBtn = (
            <div
                className={styles.commonDialog_closeBtn}
                onClick={() => {
                    onClose?.();
                }}
            >
                <Icon type="close" className={styles.commonDialog_closeIcon} />
            </div>
        );
    }

    /**
     * 返回的btn
     */
    let backBtn = <></>;

    if (backIcon) {
        backBtn = (
            <div
                className={styles.commonDialog_backBtn}
                onClick={() => {
                    onBack?.();
                }}
            >
                <Icon type="nextArrow" className={styles.commonDialog_backIcon} />
            </div>
        );
    }

    /**
     * 对话框的按钮
     */
    let footerBtn = <></>;

    if (buttons) {
        footerBtn = <div className={styles.commonDialog_footerButtons}>{buttons}</div>;
    }

    return (
        <ScrollComponent
            className={styles[`commonDialog_wrapper${sizeStr}`]}
            bodyClassName={classNames(styles.commonDialog_body, {
                [styles.commonDialog_bodyCn]: i18n.language === "cn",
            })}
        >
            {backBtn}
            {hiddenBtn}
            {topEl}
            {children}
            {footerBtn}
        </ScrollComponent>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
