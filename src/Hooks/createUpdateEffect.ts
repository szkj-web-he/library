/**
 * @file
 * @date 2022-12-20
 * @author mingzhou.zhang
 * @lastModify  2022-12-20
 */

import { useRef } from "react";
import type { useEffect, useLayoutEffect } from "react";

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

export const createUpdateEffect: (hook: EffectHookType) => EffectHookType =
    (hook) => (effect, deps) => {
        const isMounted = useRef(false);

        hook(() => {
            if (isMounted.current) {
                return effect();
            }
            isMounted.current = true;
        }, deps);
    };
