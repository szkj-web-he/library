/**
 * @file 监听dom是否可见
 * @date 2023-06-08
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-08
 */

import { useEffect } from "react";
import { useLatest } from "./useLatest";

/**
 * 监听dom是否可见
 * @param ref 被监听的元素
 * @param callback 当变得可见，或者不可见时的回调
 * @param dependencyList  useEffect的监听
 */
export const useDomDisplay = <T extends Element | null>(
    ref: React.MutableRefObject<T>,
    callback: (show: boolean) => void,
    dependencyList?: React.DependencyList,
) => {
    const callbackRef = useLatest(callback);

    useEffect(
        () => {
            const intersectionObserver = new IntersectionObserver(
                (entries) => {
                    callbackRef.current(entries[0].intersectionRatio > 0);
                },
                {
                    root: null,
                    rootMargin: "0px",
                    threshold: [0.0, 0.1],
                },
            );
            // 开始监听
            const node = ref.current;
            node && intersectionObserver.observe(node);
            return () => {
                node && intersectionObserver.unobserve(node);
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dependencyList ? dependencyList : [],
    );
};
