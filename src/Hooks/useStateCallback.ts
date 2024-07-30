/**
 * @file 复现class的this.setState(value,callback);
 * @date 2023-11-28
 * @author xuejie.he
 * @lastModify xuejie.he 2023-11-28
 */

import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";

export const useStateCallback = <T>(
    value: T,
): [T, (params: SetStateAction<T>, callback?: () => void) => void] => {
    /**
     * state
     */
    const [state, setState] = useState(value);
    /**
     * 存储回调方法
     */
    const callbackRef = useRef<(() => void) | null>(null);
    /**
     * 这里不能用useLayoutEffect
     *
     * react 18 并发执行，在渲染dom的时候可能会中断渲染， 虽然useLayoutEffect 是同步执行，但是，却可能拿不到dom
     *
     */
    useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current?.();
            callbackRef.current = null;
        }
    }, [state]);

    /**
     * 当改变state的时候
     */
    const handleChangeState = useCallback((params: SetStateAction<T>, callback?: () => void) => {
        /**
         * 赋值callback的方法
         */
        const setCallbackFn = (val: T, pre: T) => {
            if (typeof val === "object") {
                if (Object.is(val, pre)) {
                    callback?.();
                } else {
                    callbackRef.current = callback ?? null;
                }
                return;
            }
            if (val === pre) {
                callback?.();
            } else {
                callbackRef.current = callback ?? null;
            }
        };

        setState((pre) => {
            if (typeof params === "function") {
                const val = (params as (prevState: T) => T)(pre);

                setCallbackFn(val, pre);
                return val;
            }
            setCallbackFn(params, pre);
            return params;
        });
    }, []);

    return [state, handleChangeState];
};
