/**
 * @file dropdown的 globalClick
 * @date 2022-10-20
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-20
 */

import { useEffect, useRef } from "react";
import { TriggerProps } from "../Unit/type";
import { useLatest } from "./../../../Hooks/useLatest";
import useLayoutEventListener from "./../../../Hooks/useLayoutEventListener";

export const useDropdownClick = (
    needToDo: boolean,
    visible: boolean,
    btnIsClick: boolean,
    callback: () => void,
    eventName?: TriggerProps | TriggerProps[],
) => {
    const timer = useRef<number | null>(null);

    const destroy = useRef(false);

    const callbackRef = useLatest(callback);

    useEffect(() => {
        destroy.current = false;
        return () => {
            destroy.current = true;
            timer.current && window.clearTimeout(timer.current);
        };
    }, []);

    const clickFn = () => {
        if (!needToDo) {
            /**
             * 不需要内部做交互的话
             */
            return;
        }

        if (!visible) {
            /**
             * 如果下拉框没有展开的不做全局点击事件的监听
             */
            return;
        }
        if (eventName?.includes("click") || eventName?.includes("contextmenu") || btnIsClick) {
            timer.current && window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => {
                timer.current = null;
                if (destroy.current) {
                    return;
                }
                callbackRef.current();
            });
        }
    };

    useLayoutEventListener("click", clickFn, { current: document }, true);
    useLayoutEventListener("contextmenu", clickFn, { current: document }, true);

    return timer;
};
