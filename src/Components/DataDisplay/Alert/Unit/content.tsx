/**
 * @file main
 * @date 2022-01-10
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-10
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Icon, ScrollComponent } from "../../../..";
import styles from "../style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * content of this component
     */
    content?: React.ReactNode;
    /**
     * title of component
     */
    title?: React.ReactNode;
    /**
     * type of component
     */
    type: "error" | "warn" | "success" | "info";
    /**
     * custom
     */
    custom?: boolean;
    /**
     * custom context
     */
    children?: React.ReactNode;
    /**
     * function to control the display state of alert component
     */
    changeStatus?: () => void;
    /**
     * handle cancel
     */
    handleCancel?: () => void;
    /**
     * handle confirm
     */
    handleConfirm?: (() => Promise<void>) | (() => void);
    /**
     * hidden default close icon
     */
    hiddenCloseIcon?: boolean;
    /**
     * confirm for loading
     */
    confirmLoading?: boolean;
    /**
     * width of component
     */
    width?: string;
    /**
     *height of component
     */
    height?: string;
    /**
     * confirmText of component
     */
    confirmText: string;
    /**
     * cancelText of component
     */
    cancelText: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    content,
    title,
    type,
    custom,
    children,
    changeStatus,
    handleCancel,
    handleConfirm,
    hiddenCloseIcon,
    confirmLoading,
    confirmText,
    cancelText,
}) => {
    const { t } = useTranslation();

    const closeElement = hiddenCloseIcon ? (
        <></>
    ) : (
        <Icon
            type="close"
            className={styles.alert_closeIcon}
            {...Object.assign({ onClick: changeStatus })}
            title={t("AlertComponent.close")}
        />
    );

    /**
     * context
     */
    if (custom) {
        return (
            <>
                {closeElement}
                {children}
            </>
        );
    }
    /**
     * title icon type
     */
    let titleIconData: {
        icon: "error" | "info" | "warning" | "successSolid";
        color: string;
    } | null = null;
    switch (type) {
        case "error":
            titleIconData = {
                icon: "error",
                color: "#DC0000",
            };
            break;
        case "warn":
            titleIconData = {
                icon: "warning",
                color: "#FF8B03",
            };
            break;
        case "info":
            titleIconData = { icon: "info", color: "#1890FF" };
            break;
        case "success":
            titleIconData = { icon: "successSolid", color: "#52C41A" };
            break;
    }

    return (
        <>
            {closeElement}
            <ScrollComponent>
                <div className={styles.alert_top}>
                    <Icon
                        type={titleIconData.icon}
                        style={{ color: titleIconData.color }}
                        className={styles.alert_titleIcon}
                    />
                    {title}
                </div>
                <div className={styles.alert_content}>{content}</div>
                <div className={styles.alert_btns}>
                    <Button
                        className={styles.alert_submit}
                        label={confirmText}
                        width="7.7rem"
                        height="2.8rem"
                        type="none"
                        loading={confirmLoading}
                        onClick={handleConfirm}
                    />
                    <Button
                        className={styles.alert_cancel}
                        {...{
                            onClick: handleCancel,
                            label: `${cancelText}`,
                            type: "secondary",
                            width: "7.7rem",
                            height: "2.8rem",
                        }}
                    />
                </div>
            </ScrollComponent>
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
