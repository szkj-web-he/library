/**
 * @file BottomMessage
 * @date 2022-02-25
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-25
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useLayoutEffect, useRef } from "react";
import { Transition, classNames, useGetSet, useLatest, useUnmount } from "../../../../..";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface BottomMessageProps {
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
     * identity of this component
     */
    hashId: string;
    /**
     * bind setVisible function
     */
    bindSetVisibleStatus?: (handleEvent: (status: boolean) => void) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const BottomMessage: React.FC<BottomMessageProps> = ({
    content,
    duration,
    onClose,
    className,
    style,
    onClick,
    hashId,
    bindSetVisibleStatus,
}) => {
    BottomMessage.displayName = "BottomMessage";
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
            timer.current = window.setTimeout(() => {
                setVisible(false);
            }, duration);
            return;
        }

        onClose?.(hashId);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <Transition
            show={getVisible()}
            firstAnimation={true}
            handleTransitionEnd={handleTransitionEnd}
            className={classNames(styles.bottomMessage_wrap, className)}
            removeOnHidden={true}
            animationType="inBottom"
            cache={false}
            style={style}
            onClick={onClick}
        >
            {content}
        </Transition>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
BottomMessage.displayName = "BottomMessage";
