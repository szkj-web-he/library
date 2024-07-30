/**
 * @file
 * @date 2022-12-20
 * @author mingzhou.zhang
 * @lastModify  2022-12-20
 */

import { useMemo, useRef } from "react";
import { isDev, isFunction } from "../Unit/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
) => ReturnType<T>;

export function useMemoizedFn<T extends noop>(fn: T) {
    if (isDev && !isFunction(fn)) {
        console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
    }

    const fnRef = useRef<T>(fn);

    fnRef.current = useMemo(() => fn, [fn]);

    const memoizedFn = useRef<PickFunction<T>>();

    if (!memoizedFn.current) {
        memoizedFn.current = function (this, ...args) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return fnRef.current.apply(this, args);
        };
    }

    return memoizedFn.current as T;
}
