/**
 * @file Radio Group file
 * @date 2022-01-17
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import useUpdateEffect from "../../../Hooks/useUpdateEffect";
import { RadioProps } from "../Radio";
import { RadioContext } from "./Unit/context";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface RadioGroupProps {
    /**
     * defaultValue of this component
     */
    defaultValue?: string | number;
    /**
     *  disabled of this component
     */
    disabled?: boolean;
    /**
     * value of this component
     */
    value?: string | number | null;
    /**
     * onChange of this component
     */
    onChange?: (res: string | number | null) => void;
    /**
     * children of this component
     */
    children?: React.ReactElement<RadioProps> | React.ReactElement<RadioProps>[];
    /**
     * 是不是必须有一个被选中
     * * 默认为true
     */
    required?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const RadioGroup: React.FC<RadioGroupProps> = ({
    defaultValue,
    disabled,
    value,
    onChange,
    children,
    required = true,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [val, setVal] = useState(() => {
        return defaultValue ?? value;
    });

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useUpdateEffect(() => {
        setVal(value);
    }, [value]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <RadioContext.Provider
            value={{
                disabled,
                value: val ?? undefined,
                isGroup: true,
                setValue: (res) => {
                    onChange?.(res ?? null);
                    setVal(res);
                },
                required,
            }}
        >
            {children}
        </RadioContext.Provider>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
