/**
 * @file 隐藏时删除节点统一管理hook
 * @date 2023-02-03
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-03
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 *
 * @param show {boolean} 是否可见
 * @param removeOnHidden {boolean} 删除时是否隐藏
 * @param cache {boolean} 是否希望缓存节点
 * @returns [过渡结束时要干的事情, 是否安装子组件,show是不是第一次改变]
 */
export const useRemoveOnHidden = (
    /**
     * 是否可见
     */
    show?: boolean,
    /**
     * 删除时是否隐藏
     */
    removeOnHidden?: boolean,
    /**
     * 是否希望缓存节点
     */
    cache?: boolean,
): [() => void, boolean] => {
    /**
     * 统计子组件加载过
     */
    const isReadyRef = useRef(false);
    /**
     * 子组件是否安装
     */
    const [isInstall, setInstall] = useState(false);

    /**
     * 记录上一次的展示状态
     * 如果是从 true --> false的时候
     * 需要做额外的处理
     * 因为 在show变成false的时候，会没有过渡动画，被移除
     */
    const preShow = useRef<boolean>();

    /**
     * 是否在执行过渡动画
     */
    const [isPending, setIsPending] = useState({
        value: false,
        show,
    });

    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */

    /**
     * 设置 组件开始过渡的状态
     */
    useLayoutEffect(() => {
        if (show) {
            setIsPending({
                value: true,
                show,
            });
        } else if (preShow.current) {
            setIsPending({
                value: true,
                show,
            });
        }

        preShow.current = show;
    }, [show]);

    /**
     * 判断子组件是否需要安装
     */
    useEffect(() => {
        const main = () => {
            if (show || !removeOnHidden) {
                setInstall(true);
            } else if (isPending.show === false && isPending.value === false) {
                if (cache) {
                    setInstall(isReadyRef.current);
                } else {
                    setInstall(false);
                }
            }
        };
        main();
    }, [cache, isPending, removeOnHidden, show]);

    /**
     * 赋值 子组件是否已经安装过了
     */
    useEffect(() => {
        if (isInstall) {
            isReadyRef.current = true;
        }
    }, [isInstall]);

    /**
     * 当过渡结束后的回调
     */
    const endFn = () => {
        setIsPending({
            value: false,
            show,
        });
    };

    return [endFn, isInstall];
};
