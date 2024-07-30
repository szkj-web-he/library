/**
 * @file 下拉框和input的之间的通讯
 * @date 2023-06-14
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-14
 */

import { createContext, useContext } from "react";
import { MobileDatePickerProps } from "..";

interface ContextProps
    extends Pick<MobileDatePickerProps, "placeholder" | "disabled" | "handleClearClick"> {
    /**
     * 打开下拉框
     */
    toOpen: () => void;
    /**
     * 输入框的值
     */
    value?: string;
    /**
     * 展开状态
     */
    show: boolean;
}

export const Context = createContext<ContextProps>({
    toOpen: () => undefined,
    value: undefined,
    placeholder: undefined,
    disabled: undefined,
    handleClearClick: undefined,
    show: false,
});

export const useMobileDatePicker = () => useContext(Context);
