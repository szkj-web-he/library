/**
 * @file
 * @date 2022-12-27
 * @author mingzhou.zhang
 * @lastModify  2022-12-27
 */

import { useCallback, useEffect, useRef } from "react";
import { isNumber } from "../Unit/utils";
import { useLatest } from "./useLatest";

interface Handle {
    id: number;
}

interface IntervalOptions {
    immediate?: boolean;
}

const setRafInterval = (callback: () => void, delay = 0): Handle => {
    if (typeof requestAnimationFrame === typeof undefined) {
        return {
            id: window.setInterval(callback, delay),
        };
    }
    let start = new Date().getTime();
    const handle = {
        id: 0,
    };
    const loop = () => {
        const current = new Date().getTime();
        if (current - start >= delay) {
            callback();
            start = new Date().getTime();
        }
        handle.id = window.requestAnimationFrame(loop);
    };

    handle.id = window.requestAnimationFrame(loop);
    return handle;
};

const clearRafInterval = (handle: Handle) => {
    if (typeof window.cancelAnimationFrame === typeof undefined) {
        return window.clearInterval(handle.id);
    }
    window.cancelAnimationFrame(handle.id);
};

const useRafInterval = (fn: () => void, delay: number | undefined, options?: IntervalOptions) => {
    const immediate = options?.immediate;

    const fnRef = useLatest(fn);
    const timerRef = useRef<Handle>();

    useEffect(() => {
        if (!isNumber(delay) || delay < 0) return;
        if (immediate) {
            fnRef.current();
        }
        timerRef.current = setRafInterval(() => {
            fnRef.current();
        }, delay);

        return () => {
            if (timerRef.current) {
                clearRafInterval(timerRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delay]);

    return useCallback(() => {
        if (timerRef.current) {
            clearRafInterval(timerRef.current);
        }
    }, []);
};

export default useRafInterval;
