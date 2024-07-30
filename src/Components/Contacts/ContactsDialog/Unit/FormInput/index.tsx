/**
 * @file 表单输入框
 * @date 2023-06-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-16
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { Icon, Input, useUnmount } from "../../../../..";
import { AutoSizePopover } from "../AutoSizePopover";
import { useContactsMsgId } from "../context";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 错误时的提示文字
     */
    tipsOnError?: string;

    /**
     * 是否禁用
     */
    disabled: boolean;
    /**
     * 输入框的值
     */
    value?: string;
    /**
     * 输入框的值发生变化时
     */
    handleChange: (res: string) => void;
    /**
     * placeholder
     */
    placeholder: string;
    /**
     * 失焦
     */
    handleBlur: () => void;
    /**
     * 最多输入多长的字符
     */
    maxLength: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    tipsOnError,
    disabled,
    value = "",
    handleChange,
    placeholder,
    handleBlur,
    maxLength,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [focus, setFocus] = useState(false);

    const timer = useRef<number>();

    const msgId = useContactsMsgId();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useUnmount(() => {
        timer.current && window.clearTimeout(timer.current);
    });

    /**
     * 监听到取消按钮的点击时，清除计时器
     */
    useEffect(() => {
        const fn = () => {
            setFocus(false);
            timer.current && window.clearTimeout(timer.current);
        };

        document.addEventListener(`cancel-${msgId}`, fn);
        return () => {
            document.removeEventListener(`cancel-${msgId}`, fn);
        };
    }, [msgId]);

    /**
     * 监听初始化状态
     */
    useEffect(() => {
        const fn = () => {
            timer.current && window.clearTimeout(timer.current);
        };
        document.addEventListener(`init-${msgId}`, fn);
        return () => {
            document.removeEventListener(`init-${msgId}`, fn);
        };
    }, [msgId]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleFocusFn = () => {
        setFocus(true);
        timer.current && window.clearTimeout(timer.current);
    };

    const handleBlurFn = () => {
        timer.current = window.setTimeout(() => {
            setFocus(false);
            handleBlur();
        }, 100);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <AutoSizePopover
            show={!focus && !!tipsOnError}
            btn={
                <Input
                    height="4rem"
                    disabled={disabled}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    onFocus={() => {
                        handleFocusFn();
                    }}
                    maxLength={maxLength}
                    isError={!!tipsOnError}
                    className={styles.contactsDialog_formIpt}
                    onBlur={() => {
                        handleBlurFn();
                    }}
                />
            }
        >
            <Icon
                type="warning"
                fontSize="1.6rem"
                color="red"
                style={{
                    marginRight: "0.8rem",
                }}
            />
            {tipsOnError}
        </AutoSizePopover>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
