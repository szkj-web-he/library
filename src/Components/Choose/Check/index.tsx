/**
 * @file check file
 * @date 2022-01-17
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Icon, useUpdateEffect } from "../../..";
import classNames from "../../../Unit/classNames";
import { isTrue } from "../../Table/Unit/isTrue";
import { useCheckContext } from "../CheckGroup/Unit/context";
import styles from "./style.module.scss";
import { toAnimate } from "./../CheckTree/Unit/toAnimate";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface CheckProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    /**
     * value of this component
     */
    value?: string | number;
    /**
     * disabled of this component
     */
    disabled?: boolean;
    /**
     * onChange of this component
     */
    onChange?: (checkStatus: boolean) => void;
    /**
     * defaultChecked of this component
     */
    defaultChecked?: boolean;
    /**
     * checked of this component
     */
    checked?: boolean;

    /**
     * children of this component
     *
     * By default children will be wrapped by div
     */
    children?: React.ReactNode;
    /**
     * custom will cancel being wrapped by div
     */
    custom?: boolean;
    /**
     * The type for component
     */
    type?: "default" | "solid";
    /**
     * readonly of this component
     */
    readonly?: boolean;
    /**
     * node selected classname
     */
    activeName?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Check: React.FC<CheckProps> = forwardRef<HTMLDivElement, CheckProps>(
    (
        {
            value,
            disabled,
            onChange,
            defaultChecked,
            checked,
            className,
            children,
            custom,
            readonly,
            activeName,
            type = "default",
            onClickCapture,
            ...props
        },
        ref,
    ) => {
        Check.displayName = "Check";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const [status, setStatus] = useState(() => {
            const val = defaultChecked ?? checked;
            return val ?? false;
        });

        const checkData = useCheckContext();

        const iconRef = useRef<HTMLDivElement | null>(null);

        const activeCheckIcon = useRef<Element | null>(null);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        useUpdateEffect(() => {
            setStatus(checked ?? false);
        }, [checked]);

        useEffect(() => {
            if (checkData.isGroup) {
                setStatus((pre) => {
                    let status = false;
                    if (checkData.value && isTrue(value)) {
                        status = checkData.value.includes(value ?? "");
                    }

                    if (pre !== status && activeCheckIcon.current) {
                        toAnimate(activeCheckIcon.current, status);
                    }

                    return status;
                });
            }
        }, [checkData.value, value, checkData.isGroup]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const disabledStatus = disabled || checkData.disabled;

        /**
         * 当组件被点击时
         */
        const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
            onClickCapture?.(e);
            if (disabledStatus) {
                return;
            }
        };

        const handleClick = () => {
            if (!disabledStatus && !readonly) {
                const val = !status;
                if (checkData.isGroup) {
                    const arr = checkData.value ? [...checkData.value] : [];
                    const n = arr.findIndex((item) => item === value);
                    if (val) {
                        if (n < 0) {
                            isTrue(value) && arr.push(value ?? "");
                        }
                    } else if (n >= 0) {
                        arr.splice(n, 1);
                    }
                    checkData.setValue([...arr]);
                } else {
                    if (activeCheckIcon.current) {
                        toAnimate(activeCheckIcon.current, val);
                    }
                    setStatus(val);
                }

                onChange?.(val);
            }
        };

        let icon = (
            <>
                <Icon
                    type="checkboxSolid"
                    className={styles.check_checkActiveIcon}
                    ref={(el) => {
                        activeCheckIcon.current = el;
                    }}
                />
                <Icon type="checkboxEmpty" className={styles.check_checkNoActiveIcon} />
            </>
        );

        if (type !== "default") {
            icon = (
                <>
                    <div className={styles.check_solidDefaultIcon} />
                    <div
                        className={styles.check_solidActiveIcon}
                        ref={(el) => {
                            activeCheckIcon.current = el;
                        }}
                    />
                </>
            );
        }

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={classNames(className, status && activeName, {
                    [`${styles.check_wrap}`]: type === "default",
                    [`${styles.check_wrap__solid}`]: type !== "default",
                    [`${styles.check_iconDisabled}`]: disabledStatus,
                })}
                ref={ref}
                {...props}
                onClickCapture={handleClickCapture}
            >
                <div
                    className={classNames(
                        type === "default" ? styles.check_iconBtn : styles.check_iconSolidBtn,
                        {
                            [styles.check_iconBtnActive]: status,
                        },
                    )}
                    onClick={handleClick}
                    ref={iconRef}
                >
                    {icon}
                </div>

                {custom ? (
                    children
                ) : (
                    <div
                        className={classNames(
                            type === "default" ? styles.check_content : styles.check_content_solid,
                            {
                                [`${styles.check_content_solid__active}`]: status,
                            },
                        )}
                        onClick={handleClick}
                    >
                        {children}
                    </div>
                )}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Check.displayName = "Check";
