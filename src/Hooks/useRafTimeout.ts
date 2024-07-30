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
    id: number | NodeJS.Timeout;
}

const setRafTimeout = (callback: () => void, delay = 0): Handle => {
    if (typeof requestAnimationFrame === typeof undefined) {
        return {
            id: setTimeout(callback, delay),
        };
    }

    const handle: Handle = {
        id: 0,
    };

    const startTime = new Date().getTime();

    const loop = () => {
        const current = new Date().getTime();
        if (current - startTime >= delay) {
            callback();
        } else {
            handle.id = requestAnimationFrame(loop);
        }
    };

    handle.id = requestAnimationFrame(loop);
    return handle;
};

const clearRafTimeout = (handle: Handle) => {
    if (typeof cancelAnimationFrame === typeof undefined) {
        return clearTimeout(handle.id);
    }
    cancelAnimationFrame(handle.id as number);
};

const useRafTimeout = (fn: () => void, delay: number | undefined) => {
    const fnRef = useLatest(fn);
    const timerRef = useRef<Handle>();

    useEffect(() => {
        if (!isNumber(delay) || delay < 0) return;
        timerRef.current = setRafTimeout(() => {
            fnRef.current();
        }, delay);
        return () => {
            if (timerRef.current) {
                clearRafTimeout(timerRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delay]);

    return useCallback(() => {
        if (timerRef.current) {
            clearRafTimeout(timerRef.current);
        }
    }, []);
};

export default useRafTimeout;
