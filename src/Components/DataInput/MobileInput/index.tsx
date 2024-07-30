/**
 * @file MobileInput
 * @date 2021-11-12
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-12
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { DropdownBtn, Input } from "../../..";
import classNames from "../../../Unit/classNames";
import Area from "./Unit/AreaCodeDropDown";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface MobileInputProps {
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;

    /**
     * disabled of this component
     */
    disabled?: boolean;

    /**
     * area code list
     */
    areaCodeList?: { value: number; img: string; key: string }[];

    /**
     * selected area code key
     */
    selectedAreaCodeKey?: string;
    /**
     * Maximum length of mobile phone number
     */
    maxLength?: number;
    /**
     * value of mobile phone number
     */
    value?: string;
    /**
     * defaultvalue of mobile phone number
     */
    defaultValue?: string;
    /**
     * When the input box value changes
     */
    handleInput?: (res: string) => void;
    /**
     * error of this component
     */
    error?: boolean;

    /**
     * When the input box value blur
     */
    handleBlur?: () => void;
    /**
     * When the input box value focus
     */
    handleFocus?: () => void;

    /**
     * placeholder of this component
     */
    placeholder?: string;
    /**
     * When the area code changes
     */
    handleAreaCodeChange?: (areaCode: number, area: string) => void;
    /**
     * Where to install the dropdown
     */
    mount?: HTMLElement;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const MobileInput: React.FC<MobileInputProps> = ({
    className,
    style,
    disabled,
    areaCodeList,
    selectedAreaCodeKey,
    maxLength,
    value,
    defaultValue,
    handleInput,
    error,
    handleBlur,
    handleFocus,
    placeholder,
    handleAreaCodeChange,
    mount,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    /**
     * 下拉框是否打开
     */
    const [show, setShow] = useState(false);

    const [iptFocus, setIptFocus] = useState(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    const handleIptFocus = () => {
        setIptFocus(true);
        handleFocus?.();
    };

    const handleIptBlur = () => {
        setIptFocus(false);
        handleBlur?.();
    };

    const handleIptInput = (val: string) => {
        handleInput?.(val);
    };

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    const containerClassName = classNames(
        styles.mobileInput_wrapper,
        {
            [styles.mobileInput_wrapper__error]: iptFocus === false && error,
            [styles.mobileInput_wrapper__disabled]: disabled,
            [styles.mobileInput_wrapper__active]: show || iptFocus,
        },
        className,
    );

    return (
        <DropdownBtn className={containerClassName} style={style}>
            <Area
                value={selectedAreaCodeKey}
                handleChange={(res) => {
                    if (!res || res?.key === selectedAreaCodeKey) {
                        return;
                    }

                    handleAreaCodeChange?.(res.value, res.key);
                }}
                areaCodeList={areaCodeList}
                mount={mount}
                show={show}
                handleVisibleChange={(res) => {
                    setShow(res);
                }}
                disabled={disabled}
            />
            <div className={styles.mobileInput_splitLine} />

            <Input
                type="number"
                className={styles.mobileInput_phoneNumber}
                maxLength={maxLength}
                disabled={disabled}
                value={value}
                defaultValue={defaultValue}
                onChange={handleIptInput}
                onFocus={handleIptFocus}
                onBlur={handleIptBlur}
                placeholder={placeholder}
            />
        </DropdownBtn>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
