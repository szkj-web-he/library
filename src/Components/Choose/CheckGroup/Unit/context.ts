/**
 * @file check context
 * @date 2022-01-17
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-17
 */

import { createContext, useContext } from "react";

interface CheckContextProps {
    disabled?: boolean;
    value: (number | string)[] | null;
    setValue: (res: (number | string)[] | null) => void;
    isGroup: boolean;
}
const CheckContextData = () => {
    return {
        value: null,
        setValue: () => undefined,
        isGroup: false,
    };
};

export const CheckContext = createContext<CheckContextProps>(CheckContextData());
export const useCheckContext = (): CheckContextProps => useContext(CheckContext);
