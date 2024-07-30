/**
 * @file 处理从btn传过来的focus事件
 * @date 2023-03-09
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-09
 */

import { useEffect, useRef, useState } from "react";
import { useDropdownContext, useDropdownMsgId } from "../../Dropdown";
import { DropdownMsgType, FocusEvent } from "../../DropdownBtn/Unit/type";
import { useLatest } from "./../../../../Hooks/useLatest";
import { joinMsgId } from "./../../DropdownBtn/Unit/joinStr";
import { BlurEvent } from "./../../DropdownBtn/Unit/type";

export const useBtnFocus = (
    needToDo: boolean,
    show: boolean,
    btnDisable: boolean,
    setBtnId: (res: string) => void,
    btnId?: string,
    eventId?: string,
): boolean => {
    const msgId = useDropdownMsgId();

    const btnDisableRef = useLatest(btnDisable);

    const showRef = useLatest(show);

    const setBtnIdRef = useLatest(setBtnId);

    const btnIdRef = useLatest(btnId);

    const { btn } = useDropdownContext();

    /**
     * btn有没有获取焦点
     *
     * 值会被needToDo影响
     */
    const [focus, setFocus] = useState(false);

    const needToDoRef = useLatest(needToDo);
    /**
     * btn有没有获取焦点
     */
    const focusRef = useRef(false);

    useEffect(() => {
        /**
         * 接收 从btn那里传过来的 focus事件
         */
        const handleFocus = (data: FocusEvent) => {
            /**
             * 事件类型相同时
             *
             * 当btn被禁用
             * 不能展开
             * 可以关闭
             *
             */
            if (btnDisableRef.current) {
                if (showRef.current) {
                    setFocus(false);
                }
            } else {
                setFocus(true);
                setBtnIdRef.current(data.id);
            }
        };

        const handleBlur = () => {
            setFocus(false);
        };

        const fn = (e: Event) => {
            const detailData = (e as CustomEvent<FocusEvent | BlurEvent>).detail;
            if (detailData.event === DropdownMsgType.focus) {
                if (needToDoRef.current) {
                    handleFocus(detailData);
                }
                focusRef.current = true;
            } else if (detailData.event === DropdownMsgType.blur) {
                if (needToDoRef.current) {
                    handleBlur();
                }
                focusRef.current = false;
            }
        };

        const msgName = joinMsgId(msgId, eventId);

        document.addEventListener(msgName, fn);

        return () => {
            document.removeEventListener(msgName, fn);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId, msgId]);

    useEffect(() => {
        /**
         * 当不需要组件内部做交互的时候
         *
         * 判断当前活跃的节点是不是btn
         * 如果是
         * 就让它失焦
         */

        const activeEl = btnIdRef.current && btn.current[btnIdRef.current];
        if (needToDo) {
            setFocus(focusRef.current);
        } else if (activeEl && activeEl === document.activeElement) {
            activeEl.blur();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [needToDo]);

    return focus;
};
