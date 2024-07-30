/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file
 * @date 2022-12-20
 * @author mingzhou.zhang
 * @lastModify  2022-12-20
 */

import { useMemo, useRef } from "react";
import type { SetStateAction } from "react";
import { isExist, isFunction } from "../Unit/utils";
import { useMemoizedFn } from "./useMemoizedFn";
import useUpdate from "./useUpdate";

export interface Options<T> {
    defaultValue?: T;
    defaultValuePropName?: string;
    valuePropName?: string;
    trigger?: string;
}

export type Props = Record<string, any>;

export interface StandardProps<T> {
    value: T;
    defaultValue?: T;
    onChange: (val: T) => void;
}

function useControllableValue<T = any>(
    props: StandardProps<T>,
): [T, (v: SetStateAction<T>) => void];
function useControllableValue<T = any>(
    props?: Props,
    options?: Options<T>,
): [T, (v: SetStateAction<T>, ...args: any[]) => void];
function useControllableValue<T = any>(props: Props = {}, options: Options<T> = {}) {
    const {
        defaultValue,
        defaultValuePropName = "defaultValue",
        valuePropName = "value",
        trigger = "onChange",
    } = options;

    const value = props[valuePropName] as T;
    const isControlled = isExist(props, valuePropName);

    const initialValue = useMemo(() => {
        if (isControlled) {
            return value;
        }

        if (isExist(props, defaultValuePropName)) {
            return props[defaultValuePropName];
        }

        return defaultValue;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stateRef = useRef(initialValue);
    if (isControlled) {
        stateRef.current = value;
    }

    const update = useUpdate();

    function setState(v: SetStateAction<T>, ...args: any[]) {
        const r = isFunction(v) ? v(stateRef.current as T) : v;

        if (!isControlled) {
            stateRef.current = r;
            update();
        }

        if (props[trigger]) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            props[trigger](r, ...args);
        }
    }

    return [stateRef.current, useMemoizedFn(setState)] as const;
}

export default useControllableValue;
