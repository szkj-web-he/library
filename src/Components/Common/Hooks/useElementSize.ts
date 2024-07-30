/**
 * @file  通过克隆节点来获取宽高
 * @date 2023-02-02
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-02
 */
import { MutableRefObject, useRef } from "react";
import { useStateCallback } from "../../..";
import { forceReflow } from "../Transition/Unit/forceReflow";
import styles from "../Transition/style.module.scss";

export const useElementSize = (
    ref: MutableRefObject<HTMLDivElement | null>,
): [
    string[] | null,
    MutableRefObject<() => Promise<HTMLDivElement | undefined>>,
    MutableRefObject<() => Promise<unknown>>,
] => {
    /**
     *
     */
    const [classList, setClassList] = useStateCallback<null | string[]>(null);

    /**
     * 延时器
     */
    const timer = useRef<number | null>(null);

    /**
     * 是否在获取宽高中
     */
    const isPending = useRef(false);

    /**
     * 获取克隆节点的尺寸
     */
    const getCloneElementSize = useRef(() => {
        return new Promise<undefined | HTMLDivElement>((resolve) => {
            timer.current && window.clearTimeout(timer.current);
            const el = ref.current;
            if (!el) {
                resolve(undefined);
                return;
            }
            isPending.current = true;
            setClassList([styles.transition_r__hidden], () => {
                forceReflow();
                timer.current = window.setTimeout(() => {
                    resolve(el);
                });
            });
        });
    });

    /**
     * 获取完成后
     */
    const finish = useRef(async () => {
        return new Promise((resolve) => {
            timer.current && window.clearTimeout(timer.current);
            if (!isPending.current) {
                resolve(undefined);
                return;
            }

            isPending.current = false;
            const el = ref.current;
            if (!el) {
                resolve(undefined);
                return;
            }

            setClassList(null, () => {
                forceReflow();
                timer.current = window.setTimeout(() => {
                    resolve(undefined);
                });
            });
        });
    });

    return [classList, getCloneElementSize, finish];
};
