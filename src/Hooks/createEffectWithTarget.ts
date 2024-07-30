/**
 * @file
 * @date 2022-12-07
 * @author mingzhou.zhang
 * @lastModify  2022-12-07
 */

import { DependencyList, EffectCallback, useEffect, useLayoutEffect, useRef } from "react";
import { depsAreSame } from "../Unit/utils";
import { BasicTarget, getTargetElement } from "./useScroll";
import { useUnmount } from "./useUnmount";

export const createEffectWithTarget = (
    useEffectType: typeof useEffect | typeof useLayoutEffect,
) => {
    const useEffectWithTarget = (
        effect: EffectCallback,
        deps: DependencyList,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        target: BasicTarget<any> | BasicTarget<any>[],
    ) => {
        const isInit = useRef(false);

        const lastElement = useRef<(Element | null)[]>([]);
        const lastDeps = useRef<DependencyList>([]);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const unLoad = useRef<any>();

        useEffectType(() => {
            const targets = Array.isArray(target) ? target : [target];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            const els = targets.map((item) => getTargetElement(item));

            if (!isInit.current) {
                isInit.current = true;
                lastElement.current = els;
                lastDeps.current = deps;

                unLoad.current = effect();
                return;
            }

            if (
                els.length !== lastElement.current.length ||
                !depsAreSame(els, lastElement.current) ||
                !depsAreSame(deps, lastDeps.current)
            ) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                unLoad.current?.();

                lastElement.current = els;
                lastDeps.current = deps;
                unLoad.current = effect();
            }
        });

        useUnmount(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            unLoad.current?.();

            isInit.current = false;
        });
    };

    return useEffectWithTarget;
};
