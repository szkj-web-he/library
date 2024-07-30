/**
 * @file radio files
 * @date 2022-01-17
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useRef, useState } from "react";
import useUpdateEffect from "../../../Hooks/useUpdateEffect";
import classNames from "../../../Unit/classNames";
import { isTrue } from "../../Table/Unit/isTrue";
import { useRadioContext } from "../RadioGroup/Unit/context";
import styles from "./style.module.scss";
import { toAnimate } from "./../CheckTree/Unit/toAnimate";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */

type OnChange = (
    /**
     * @deprecated 将废弃onChange的参数字段，因为不管怎么样这里的checkStatus始终为true,所以没有存在的必要
     */
    checkStatus: boolean,
) => void;

/** This section will include all the interface for this tsx file */
export interface RadioProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
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
     * 仅在点击到icon和文本时触发
     *
     * 但在custom时的触发效果就会不同
     * 仅在点击到icon触发
     */
    onChange?: OnChange;
    /**
     * defaultChecked of this component
     *
     * 默认是否被选中
     * 被动态监听
     */
    defaultChecked?: boolean;
    /**
     * checked of this component
     * 是否被选中
     * 动态监听
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
     * 自定义文本部分
     */
    custom?: boolean;
    /**
     * 活跃的class name
     */
    activeName?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Radio = forwardRef<HTMLDivElement, RadioProps>(
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
            activeName,
            ...props
        },
        ref,
    ) => {
        Radio.displayName = "Radio";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const [status, setStatus] = useState(() => {
            const val = defaultChecked ?? checked;
            return val ?? false;
        });

        const radiosContext = useRadioContext();

        const activeRef = useRef<HTMLDivElement | null>(null);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        useUpdateEffect(() => {
            setStatus(checked ?? false);
        }, [checked]);

        useEffect(() => {
            if (radiosContext.isGroup) {
                setStatus((pre) => {
                    const val = isTrue(radiosContext.value) ? radiosContext.value === value : false;
                    if (activeRef.current && pre !== val) {
                        toAnimate(activeRef.current, val);
                    }

                    return val;
                });
            }
        }, [radiosContext.value, value, radiosContext.isGroup]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        const disabledStatus = disabled || radiosContext.disabled;

        const handleClick = () => {
            if (disabledStatus) {
                return;
            }
            if (radiosContext.isGroup) {
                if (radiosContext.required) {
                    if (!status) {
                        radiosContext.setValue(value);
                    }
                } else {
                    radiosContext.setValue(status ? undefined : value);
                }
            } else {
                if (activeRef.current && !status) {
                    toAnimate(activeRef.current, true);
                }
                setStatus(true);
            }
            onChange?.(true);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={classNames(styles.radio_wrap, className, status && activeName, {
                    [`${styles.radio_iconDisabled}`]: disabledStatus,
                })}
                ref={ref}
                {...props}
            >
                <div
                    className={classNames(styles.radio_icon, {
                        [styles.radio_iconActive]: status,
                    })}
                    onClick={handleClick}
                >
                    <div className={styles.radio_defaultIcon} />
                    <div className={styles.radio_checkIcon} ref={activeRef} />
                </div>
                {custom ? (
                    children
                ) : (
                    <div className={styles.radio_content} onClick={handleClick}>
                        {children}
                    </div>
                )}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Radio.displayName = "Radio";
