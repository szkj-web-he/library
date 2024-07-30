/**
 * @file CheckGroup
 * @date 2022-01-17
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { CheckProps } from "../Check";
import { CheckContext } from "./Unit/context";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface CheckGroupProps {
    /**
     * defaultValue of this component
     */
    defaultValue?: (string | number)[];
    /**
     *  disabled of this component
     */
    disabled?: boolean;
    /**
     * value of this component
     */
    value?: (string | number)[] | null;
    /**
     * onChange of this component
     */
    onChange?: (res: (string | number)[] | null) => void;
    /**
     * children of this component
     */
    children?: React.ReactElement<CheckProps> | React.ReactElement<CheckProps>[];
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const CheckGroup: React.FC<CheckGroupProps> = ({
    defaultValue,
    disabled,
    value,
    onChange,
    children,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [val, setVal] = useState(() => {
        const val = defaultValue || value;
        return val ?? null;
    });

    const count = useRef(0);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        if (count.current && JSON.stringify(value) !== JSON.stringify(val)) {
            setVal(value ?? null);
        }
        ++count.current;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <CheckContext.Provider
            value={{
                disabled,
                value: val,
                isGroup: true,
                setValue: (res) => {
                    if (JSON.stringify(res) !== JSON.stringify(val)) {
                        onChange && onChange(res);
                        setVal(res);
                    }
                },
            }}
        >
            {children}
        </CheckContext.Provider>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
