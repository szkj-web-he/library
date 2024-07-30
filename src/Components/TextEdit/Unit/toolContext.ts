/**
 * @file abc
 * @date 2022-03-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-08
 */

import { createContext, useContext } from "react";

interface ToolContextProps {
    active: boolean;
    /**
     * 这里来判断是否被使用
     */
    isFalse: boolean;
}

export const ToolContext = createContext<ToolContextProps>({
    isFalse: true,
    active: false,
});

export const useToolContext = () => useContext(ToolContext);

/**
 * 传递是否禁用
 */
export const ToolDisableContext = createContext(true);

export const useToolDisable = () => useContext(ToolDisableContext);
