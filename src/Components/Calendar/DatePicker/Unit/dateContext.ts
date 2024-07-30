/**
 * @file abc
 * @date 2021-12-16
 * @author xuejie.he
 * @lastModify mingzhou.zhang 2022-4-25
 */

import { createContext, useContext } from "react";

interface DateContextProps {
    /**
     * Input获焦状态
     */
    focus: boolean;
    /**
     * Input获焦状态改变时
     * @param status
     * @returns
     */
    setFocus: (status: boolean) => void;
    /**
     * 时间
     */
    time: Date | null;
    /**
     * 设置时间
     * @param res
     * @returns
     */
    setTime: (res: Date | null) => void;
    /**
     * 禁用
     */
    disabled: boolean;
    /**
     * 最小时间
     */
    minTime?: Date | number | string;
    /**
     * 最大时间
     */
    maxTime?: Date | number | string;
}

const DateContextData = () => ({
    focus: false,
    setFocus: () => undefined,
    time: null,
    setTime: () => undefined,
    disabled: false,
});

export const DateContext = createContext<DateContextProps>(DateContextData());

export const useDateContext = (): DateContextProps => useContext(DateContext);
