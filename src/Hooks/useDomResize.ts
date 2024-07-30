/**
 * @file 监听dom的尺寸变化
 * @date 2023-06-08
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-08
 */

import React, { startTransition, useEffect } from "react";
import { useLatest } from "./useLatest";

/**
 * 监听dom是否可见
 * @param ref 被监听的元素
 * @param callback 当尺寸发生变化时的回调
 * @param dependencyList  useEffect的监听
 */
export const useDomResize = <T extends Element | null>(
    ref: React.MutableRefObject<T>,
    callback: (params?: ResizeObserverEntry[]) => void,
    dependencyList?: React.DependencyList,
) => {
    const callbackRef = useLatest(callback);

    useEffect(
        () => {
            const node = ref.current;
            let observer: ResizeObserver | null = null;

            if (node) {
                observer = new ResizeObserver((res) => {
                    callbackRef.current(res);
                });
                observer.observe(node);
            }

            startTransition(callbackRef.current);

            return () => {
                node && observer?.unobserve(node);
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dependencyList ? [...dependencyList] : [],
    );
};
