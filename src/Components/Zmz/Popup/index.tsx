/**
 * @file
 * @date 2022-11-14
 * @author mingzhou.zhang
 * @lastModify  2022-11-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { Transition } from "../../..";
import classNames from "../../../Unit/classNames";
import { Icon } from "../../Icon";
import styles from "./style.module.scss";
import { mountElement } from "../../Cover/Unit/mountEl";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
type PositionType = "top" | "right" | "bottom" | "left";
export interface PopupProps {
    /**
     * control whether the container is display
     */
    show: boolean;
    /**
     * container style
     */
    bodyStyle?: React.CSSProperties;
    /**
     * container classname
     */
    bodyClassname?: string;
    /**
     * mask classname
     */
    maskClassname?: string;
    /**
     * transition position
     */
    position?: PositionType;
    /**
     * control click mask is work
     */
    maskClosable?: boolean;
    /**
     * control whether the button is display
     */
    showCloseButton?: boolean;
    /**
     * control whether children delete at container hide
     */
    removeOnHidden?: boolean;
    /**
     * container content
     */
    children?: React.ReactNode;
    /**
     * called when the popup is close
     */
    onClose?: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Popup: React.FC<PopupProps> = ({
    show,
    bodyStyle,
    bodyClassname,
    maskClassname,
    position = "bottom",
    maskClosable = true,
    showCloseButton,
    removeOnHidden,
    children,
    onClose,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return createPortal(
        <Fragment>
            <Transition
                show={show}
                className={classNames(styles.popup_mask, maskClassname)}
                fromEnter={styles.popup_mask_form_enter}
                enterActive={styles.popup_mask_form_active}
                toEnter={styles.popup_mask_to_enter}
                fromLeave={styles.popup_mask_form_leave}
                leaveActive={styles.popup_mask_to_active}
                toLeave={styles.popup_mask_to_leave}
                onClick={() => {
                    if (maskClosable) onClose?.();
                }}
            />
            <Transition
                show={show}
                style={bodyStyle}
                className={classNames(
                    styles.popup_wrap,
                    styles[`popup_wrap_position_${position}`],
                    bodyClassname,
                )}
                fromEnter={styles[`popup_wrap_${position}_form_enter`]}
                enterActive={styles[`popup_wrap_${position}_form_active`]}
                toEnter={styles[`popup_wrap_${position}_to_enter`]}
                fromLeave={styles[`popup_wrap_${position}_form_leave`]}
                leaveActive={styles[`popup_wrap_${position}_to_active`]}
                toLeave={styles[`popup_wrap_${position}_to_leave`]}
                removeOnHidden={removeOnHidden}
            >
                {showCloseButton && (
                    <span className={styles.popup_wrap_close} onClick={() => onClose?.()}>
                        <Icon type="close" />
                    </span>
                )}
                {children}
            </Transition>
        </Fragment>,
        mountElement(),
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
