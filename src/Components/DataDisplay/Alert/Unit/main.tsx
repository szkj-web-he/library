/**
 * @file alert component
 * @date 2020-10-21
 * @author Andy
 * @lastModify Andy 2020-10-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef } from "react";
import styles from "../style.module.scss";
import { Transition } from "../../../..";
import { createPortal } from "react-dom";
import AlertMain from "./content";
import { useTranslation } from "react-i18next";
import { mountElement } from "../../../Cover/Unit/mountEl";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
export interface MainProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "content"> {
    /**
     * enter className
     * * Intersection of fromEnter and toEnter
     */
    enterActive?: string;
    /**
     * leave className
     * * Intersection of fromLeave and toLeave
     */
    leaveActive?: string;
    /**
     * ClassName when entering
     */
    toEnter?: string;
    /**
     * ClassName when leaving
     */
    toLeave?: string;
    /**
     * ClassName when starting to enter
     */
    fromEnter?: string;
    /**
     * ClassName when starting to leave
     */
    fromLeave?: string;
    /**
     * The component library encapsulates several default animation libraries
     */
    animationType?:
        | "fade"
        | "zoom"
        | "taller"
        | "wider"
        | "inLeft"
        | "inRight"
        | "inTop"
        | "inBottom"
        | "slideDown"
        | "slideUp"
        | "slideLeft"
        | "slideRight";
    /**
     * init display state of alert component
     */
    status?: boolean;
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
    type?: "error" | "warn" | "success" | "info";
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
     * width of component
     */
    width?: string;
    /**
     *height of component
     */
    height?: string;
    /**
     * transition end
     */
    handleTransitionEnd?: () => void;
    /**
     * transition start
     */
    handleTransitionStart?: () => void;
    /**
     * transition cancel
     */
    handleTransitionCancel?: () => void;
    /**
     * className of this component
     */
    className?: string;
    /**
     * where to mount
     */
    mountEl?: Element;
    /**
     * hidden default close icon
     */
    hiddenCloseIcon?: boolean;
    /**
     * confirm for loading
     */
    confirmLoading?: boolean;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * confirmText of component
     */
    confirmText?: string;
    /**
     * cancelText of component
     */
    cancelText?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Main = forwardRef<HTMLDivElement, MainProps>(
    (
        {
            status = false,
            content,
            title,
            type = "success",
            custom = false,
            children,
            changeStatus,
            handleCancel,
            handleConfirm,
            width = "34.6rem",
            height = "16.8rem",
            handleTransitionEnd,
            handleTransitionStart,
            handleTransitionCancel,
            className,
            mountEl,
            animationType = "fade",
            hiddenCloseIcon,
            confirmLoading,
            enterActive,
            leaveActive,
            toEnter,
            toLeave,
            fromEnter,
            fromLeave,
            style,
            confirmText,
            cancelText,
            ...props
        },
        ref,
    ) => {
        Main.displayName = "AlertMain";

        const { t } = useTranslation();
        /* <------------------------------------ **** STATES END **** ------------------------------------ */
        return createPortal(
            <div className={styles.alert_wrap + (className ? ` ${className}` : "")} style={style}>
                <Transition
                    animationType={animationType || enterActive || leaveActive ? "fade" : undefined}
                    show={status}
                    firstAnimation={status}
                    className={styles.alert_bg}
                />

                <div ref={ref} style={{ width, height }} className={styles.alert_body}>
                    <Transition
                        animationType={animationType}
                        {...props}
                        show={status}
                        handleTransitionEnd={handleTransitionEnd}
                        handleTransitionStart={handleTransitionStart}
                        handleTransitionCancel={handleTransitionCancel}
                        enterActive={enterActive}
                        leaveActive={leaveActive}
                        toEnter={toEnter}
                        toLeave={toLeave}
                        fromEnter={fromEnter}
                        fromLeave={fromLeave}
                        firstAnimation={status}
                        className={styles.alert_container}
                    >
                        <AlertMain
                            content={content}
                            title={title}
                            type={type}
                            custom={custom}
                            changeStatus={changeStatus}
                            handleCancel={handleCancel}
                            handleConfirm={handleConfirm}
                            hiddenCloseIcon={hiddenCloseIcon}
                            confirmLoading={confirmLoading}
                            confirmText={confirmText ?? t("AlertComponent.Confirm")}
                            cancelText={cancelText ?? t("AlertComponent.Cancel")}
                        >
                            {children}
                        </AlertMain>
                    </Transition>
                </div>
            </div>,
            mountElement(mountEl),
        );
    },
);

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Main.displayName = "AlertMain";
export default Main;
