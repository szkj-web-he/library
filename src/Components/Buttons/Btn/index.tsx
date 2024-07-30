/**
 * @file 自定义的按钮
 * @date 2023-08-17
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import classNames from "../../../Unit/classNames";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * 鼠标移上去时触发的样式
     */
    styleOnHover?: React.CSSProperties;
    /**
     * 鼠标移上去时触发的className
     */
    classNameOnHover?: string;
    /**
     * 鼠标按下时的样式
     */
    styleOnMousedown?: React.CSSProperties;
    /**
     * 鼠标按下时的className
     */
    classNameOnMousedown?: string;
    /**
     * children
     */
    children?: React.ReactNode;
    /**
     * 获取dom
     */
    onMounted?: (el: HTMLButtonElement | null) => void;
}

export interface BtnEvents {
    /**
     * 触发按下的样式
     */
    mousedown: () => void;
    /**
     * 取消触发按下的样式
     */
    mouseup: () => void;
    /**
     * 触发hover的样式
     */
    hover: (status: boolean) => void;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Btn = forwardRef<BtnEvents | null, BtnProps>(
    (
        {
            styleOnHover,
            classNameOnHover,
            styleOnMousedown,
            classNameOnMousedown,
            children,
            style,
            className,
            onMouseEnter,
            onMouseLeave,
            onMouseDown,
            onMounted,
            ...props
        },
        events,
    ) => {
        Btn.displayName = "Btn";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        /**
         * 是否 按下 中
         */
        const [pressed, setPressed] = useState(false);
        /**
         * 展示的 是否Hover
         */
        const [hover, setHover] = useState(false);
        /**
         * 真实的hover
         */
        const hoverRef = useRef(false);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        useImperativeHandle(events, () => {
            return {
                mousedown: () => {
                    setPressed(true);
                },
                mouseup: () => {
                    setPressed(false);
                },
                hover: (status) => {
                    setHover(status);
                },
            };
        });

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <button
                ref={(e) => {
                    onMounted?.(e);
                }}
                className={classNames(
                    className,
                    styles.btn_wrapper,
                    classNameOnMousedown && pressed ? classNameOnMousedown : "",
                    classNameOnHover && hover ? classNameOnHover : "",
                )}
                style={Object.assign(
                    {},
                    style,
                    styleOnHover && hover ? styleOnHover : undefined,
                    styleOnMousedown && pressed ? styleOnMousedown : undefined,
                )}
                onMouseDown={(e) => {
                    onMouseDown?.(e);
                    setPressed(true);
                    setHover(false);
                    document.addEventListener(
                        "mouseup",
                        () => {
                            setPressed(false);
                            setHover(hoverRef.current);
                        },
                        { once: true },
                    );
                }}
                onMouseEnter={(e) => {
                    onMouseEnter?.(e);
                    if (pressed) {
                        return;
                    }
                    hoverRef.current = true;
                    setHover(true);
                }}
                onMouseLeave={(e) => {
                    onMouseLeave?.(e);
                    setHover(false);
                    hoverRef.current = false;
                }}
                {...props}
            >
                {children}
            </button>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Btn.displayName = "Btn";
