/**
 * @file 用来处理延时切换是否可见的hook
 * @date 2023-03-09
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-09
 */

import { useEffect, useRef } from "react";
import { useLatest } from "./../../../../Hooks/useLatest";

/**
 *
 * @param btnStatus btn的状态 是否hover或者focus
 * @param contentStatus content的状态 是否hover或者focus
 */
export const useDelayChangeVisible = (
    btnStatus: boolean,
    contentStatus: boolean,
    changeFn: (status: boolean) => void,
    delayOnShow = 150,
    delayOnHide = 150,
) => {
    const timer = useRef<number | null>(null);

    const delayOnShowRef = useLatest(delayOnShow);
    const delayOnHideRef = useLatest(delayOnHide);

    const destroy = useRef(false);

    const changeFnRef = useLatest(changeFn);

    useEffect(() => {
        const timerData = timer.current;
        destroy.current = false;
        return () => {
            destroy.current = true;
            timerData && window.clearTimeout(timerData);
        };
    }, []);

    useEffect(() => {
        if (btnStatus || contentStatus) {
            if (timer.current) {
                timer.current && window.clearTimeout(timer.current);
                timer.current = null;
                changeFnRef.current(true);
            } else {
                /**
                 * 如果之前没有计时器
                 */
                timer.current = window.setTimeout(() => {
                    timer.current = null;
                    if (destroy.current) {
                        return;
                    }
                    changeFnRef.current(true);
                }, delayOnShowRef.current);
            }
        } else {
            if (timer.current) {
                timer.current && window.clearTimeout(timer.current);
                timer.current = null;
                changeFnRef.current(false);
            } else {
                /**
                 * 如果之前没有计时器
                 */
                timer.current = window.setTimeout(() => {
                    timer.current = null;
                    if (destroy.current) {
                        return;
                    }
                    changeFnRef.current(false);
                }, delayOnHideRef.current);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [btnStatus, contentStatus]);
};
