/**
 * @file TopMessage
 * @date 2022-02-24
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useLayoutEffect, useRef } from "react";
import { Icon, Transition, useGetSet, useLatest, useUnmount } from "../../../../..";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface TopMessageProps {
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
export const TopMessage: React.FC<TopMessageProps> = ({
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
    persist,
    onTriggerClose,
    bindSetVisibleStatus,
}) => {
    TopMessage.displayName = "TopMessage";
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const timer = useRef<null | number>(null);

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
    /**
     * handle Over
     */
    const handleTransitionEnd = () => {
        timer.current && window.clearTimeout(timer.current);
        if (getVisible()) {
            if (!persist) {
                timer.current = window.setTimeout(() => {
                    setVisible(false);
                }, duration);
            }

            return;
        }
        onClose?.(hashId);
    };

    const handleClick = () => {
        timer.current && window.clearTimeout(timer.current);
        setVisible(false);
        onTriggerClose?.();
    };

    let closeEl: React.ReactNode = (
        <div className={styles.topMessage_closeIcon}>
            <Icon type="close" onClick={handleClick} />
        </div>
    );

    const classNameList = [styles.topMessage_wrap];
    className && classNameList.push(className);

    let iconEl: React.ReactNode = null;

    switch (type) {
        case "error":
            classNameList.push(styles.topMessage_errorWrap);
            iconEl = <Icon type="error" className={styles.topMessage_errorIcon} />;
            break;
        case "info":
            classNameList.push(styles.topMessage_infoWrap);
            iconEl = <Icon type="info" className={styles.topMessage_infoIcon} />;
            break;
        case "success":
            classNameList.push(styles.topMessage_successWrap);
            iconEl = <Icon type="successSolid" className={styles.topMessage_successIcon} />;
            break;
        case "warning":
            classNameList.push(styles.topMessage_warnWrap);
            iconEl = <Icon type="warning" className={styles.topMessage_warnIcon} />;
            break;
        case "none":
            iconEl = null;
            break;
        default:
            iconEl = null;
            break;
    }

    if (icon !== undefined) {
        iconEl = icon;
    }

    if (closeIcon) {
        closeEl = closeIcon;
    }
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Transition
            show={getVisible()}
            firstAnimation={true}
            handleTransitionEnd={handleTransitionEnd}
            className={classNameList.join(" ")}
            removeOnHidden={true}
            animationType="inTop"
            cache={false}
            style={style}
            onClick={onClick}
        >
            {iconEl && <div className={styles.topMessage_icon}>{iconEl}</div>}
            <div className={styles.topMessage_content}>{content}</div>

            {(closeIcon || persist) && closeEl}
        </Transition>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
TopMessage.displayName = "TopMessage";
