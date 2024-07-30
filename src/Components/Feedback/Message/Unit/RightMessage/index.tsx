/**
 * @file RightMessage
 * @date 2022-02-24
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Icon, Transition, useGetSet, useLatest, useUnmount } from "../../../../..";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface RightMessageProps {
    /**
     * Notification type
     */
    type: "success" | "info" | "warning" | "error" | "none";
    /**
     * Notification content
     */
    content: React.ReactNode;
    /**
     * Time(seconds) before auto-dismiss
     */
    duration?: number;
    /**
     * callback of on close
     */
    onClose?: (hashId: string) => void;

    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * callback of onClick
     */
    onClick?: () => void;
    /**
     * icon of this component
     */
    icon?: React.ReactNode;
    /**
     * identity of this component
     */
    hashId: string;
    /**
     * Customize the close icon
     */
    closeIcon?: React.ReactNode;
    /**
     * Custom Title
     */
    title?: React.ReactNode;
    /**
     * whether is always exist
     *
     * if persist value is true, duration is not work
     */
    persist?: boolean;
    /**
     * when click close button trigger
     */
    onTriggerClose?: () => void;
    /**
     * bind setVisible function
     */
    bindSetVisibleStatus?: (handleEvent: (status: boolean) => void) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const RightMessage: React.FC<RightMessageProps> = ({
    type,
    content,
    duration,
    onClose,
    className,
    style,
    onClick,
    icon,
    hashId,
    closeIcon,
    title,
    persist,
    onTriggerClose,
    bindSetVisibleStatus,
}) => {
    RightMessage.displayName = "RightMessage";
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const timer = useRef<null | number>(null);

    const { t } = useTranslation();

    /**
     * 是否可见
     */
    const [getVisible, setVisible] = useGetSet(true);
    /**
     * 最新的bindSetVisibleStatus
     */
    const bindSetVisibleStatusRef = useLatest(bindSetVisibleStatus);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /**
     * 将改变 可见状态的方法，暴露出去
     */
    useLayoutEffect(() => {
        bindSetVisibleStatusRef.current?.(setVisible);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setVisible]);

    /**
     * 卸载时
     * 清除延时器
     */
    useUnmount(() => {
        timer.current && window.clearTimeout(timer.current);
    });

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleClick = () => {
        timer.current && window.clearTimeout(timer.current);
        setVisible(false);
        onTriggerClose?.();
    };

    /**
     * handle Over
     */
    const handleTransitionEnd = () => {
        timer.current && window.clearTimeout(timer.current);
        if (getVisible()) {
            if (persist) {
                //如果一直存在
                return;
            }
            timer.current = window.setTimeout(() => {
                setVisible(false);
                timer.current = null;
            }, duration);

            return;
        }

        onClose?.(hashId);
    };

    const classNameList = [styles.rightMessage_wrap];
    className && classNameList.push(className);

    let iconEl: React.ReactNode = null;

    let titleEl: React.ReactNode = "";

    switch (type) {
        case "error":
            titleEl = t("MessageComponent.Error");
            classNameList.push(styles.rightMessage_errorWrap);
            iconEl = <Icon type="error" className={styles.rightMessage_errorIcon} />;
            break;
        case "info":
            titleEl = t("MessageComponent.Info");
            classNameList.push(styles.rightMessage_infoWrap);
            iconEl = <Icon type="info" className={styles.rightMessage_infoIcon} />;
            break;
        case "success":
            titleEl = t("MessageComponent.Success");
            classNameList.push(styles.rightMessage_successWrap);
            iconEl = <Icon type="successSolid" className={styles.rightMessage_successIcon} />;
            break;
        case "warning":
            titleEl = t("MessageComponent.Warning");
            classNameList.push(styles.rightMessage_warnWrap);
            iconEl = <Icon type="warning" className={styles.rightMessage_warnIcon} />;
            break;
        case "none":
            iconEl = null;
            break;
        default:
            iconEl = null;
            break;
    }

    if (title !== undefined) {
        titleEl = title;
    }

    if (icon !== undefined) {
        iconEl = icon;
    }

    let closeEl: React.ReactNode = <Icon type="close" className={styles.rightMessage_closeIcon} />;

    if (closeIcon !== undefined) {
        closeEl = closeIcon;
    }

    let containerEl: React.ReactNode = (
        <div className={styles.rightMessage_container}>
            <div className={styles.rightMessage_top}>
                <div className={styles.rightMessage_name}>{titleEl}</div>
                {closeIcon || persist ? (
                    <div className={styles.rightMessage_closeBtn} onClick={handleClick}>
                        {closeEl}
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className={styles.rightMessage_content}>{content}</div>
        </div>
    );

    if (type === "none") {
        containerEl = (
            <div className={styles.rightMessage_noneWrap}>
                <span>{content}</span>
                {(closeIcon || persist) && (
                    <div
                        className={styles.rightMessage_closeBtn}
                        style={{ marginLeft: "1rem", display: "inline-flex" }}
                        onClick={handleClick}
                    >
                        {closeEl}
                    </div>
                )}
            </div>
        );
    }

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <Transition
            show={getVisible()}
            firstAnimation={true}
            handleTransitionEnd={handleTransitionEnd}
            className={classNameList.join(" ")}
            removeOnHidden={true}
            animationType="inRight"
            cache={false}
            style={style}
            onClick={onClick}
        >
            {iconEl && <div className={styles.rightMessage_icon}>{iconEl}</div>}
            {containerEl}
        </Transition>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
RightMessage.displayName = "RightMessage";
