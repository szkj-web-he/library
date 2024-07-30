/**
 * @file 处理 defaultValue和Value
 * @date 2023-08-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-15
 */

import { Dispatch, useEffect, useRef, useState } from "react";
import { useLatest } from "./useLatest";

export const useDefaultValue = <T>(
    defaultValue: T,
    value: T,
    onChange?: (res?: T) => void,
): [T | null, Dispatch<T | null>] => {
    const [val, setVal] = useState<T | null>(defaultValue ?? value ?? null);

    const changeFn = useLatest(onChange);
    /**
     * 监听val的变化次数
     */
    const count = useRef(-1);

    useEffect(() => {
        count.current = -1;
    }, []);

    useEffect(() => {
        ++count.current;
        if (count.current < 1) {
            setVal(defaultValue ?? value ?? null);
        }
    }, [defaultValue, value]);

    useEffect(() => {
        if (count.current >= 1) {
            setVal(value);
        }
    }, [value]);

    useEffect(() => {
        changeFn.current?.(val ?? undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [val]);

    return [val, setVal];
};
