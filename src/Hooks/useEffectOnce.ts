/**
 * @file useEffect只执行一次
 * @date 2023-05-11
 * @author xuejie.he
 * @lastModify xuejie.he 2023-05-11
 */

import { useEffect, useRef } from 'react';

type Hook = typeof useEffect;

const createEffectOnce: (hook: Hook) => Hook = (hook) => {
    return (effect, deps) => {
        const count = useRef(0);
        hook(() => {
            count.current = 0;
        }, []);

        hook(() => {
            if (!count.current) {
                ++count.current;
                return effect();
            }
        }, deps);
    };
};
export const useEffectOnce = createEffectOnce(useEffect);
