/**
 * @file radio Context
 * @date 2022-01-17
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-17
 */

import { createContext, useContext } from "react";

interface RadioContextProps {
    disabled?: boolean;
    value: number | string | undefined;
    setValue: (res: number | string | undefined) => void;
    isGroup: boolean;
    required: boolean;
}
const RadioContextData = () => {
    return {
        value: undefined,
        setValue: () => undefined,
        isGroup: false,
        required: true,
    };
};

export const RadioContext = createContext<RadioContextProps>(RadioContextData());
export const useRadioContext = (): RadioContextProps => useContext(RadioContext);
