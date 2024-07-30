/**
 * @file 对话框组的context
 * @date 2023-02-06
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-06
 */
import { createContext, useContext } from "react";
import { dialogGroupActiveProps } from "./type";

interface DialogGroupContextProps {
    activeIndex: dialogGroupActiveProps;
    startIndex: number;
    show: boolean;
    /**
     * 当DialogItem过渡结束时的回调
     */
    handleTransitionEnd: (status: boolean) => void;
    /**
     * 当DialogItem过渡取消时的回调
     */
    handleTransitionCancel: (status: boolean) => void;
}
export const DialogGroupContext = createContext<DialogGroupContextProps>({
    activeIndex: { isAnimate: false },
    startIndex: 0,
    show: false,
    handleTransitionEnd: () => undefined,
    handleTransitionCancel: () => undefined,
});

export const useDialogGroupContext = () => useContext(DialogGroupContext);
