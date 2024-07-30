/**
 * @file 处理从btn传过来的hover事件
 * @date 2023-03-08
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-08
 */

import { useEffect, useRef, useState } from "react";
import { useDropdownMsgId } from "../../Dropdown";
import { DropdownMsgType, MouseenterEvent, MouseleaveEvent } from "../../DropdownBtn/Unit/type";
import { useLatest } from "./../../../../Hooks/useLatest";
import { joinMsgId } from "./../../DropdownBtn/Unit/joinStr";

export const useBtnHover = (
    needToDo: boolean,
    show: boolean,
    btnDisable: boolean,
    setBtnId: (res: string) => void,
    eventId?: string,
): boolean => {
    const msgId = useDropdownMsgId();

    const btnDisableRef = useLatest(btnDisable);

    const showRef = useLatest(show);

    const setBtnIdRef = useLatest(setBtnId);

    /**
     * 鼠标是不是在btn上
     *
     * 值会被disable影响
     */
    const [hover, setHover] = useState(false);

    /**
     * 鼠标是不是真的在btn上
     *  值不会被disable影响
     */
    const hoverRef = useRef(false);

    const needToDoRef = useLatest(needToDo);

    useEffect(() => {
        /**
         * 接收 从btn那里传过来的 click事件
         */
        const handleMouseEnter = (data: MouseenterEvent) => {
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
                    setHover(false);
                }
            } else {
                setHover(true);

                setBtnIdRef.current(data.id);
            }
        };

        const handleMouseLeave = () => {
            setHover(false);
        };

        const fn = (e: Event) => {
            const detailData = (e as CustomEvent<MouseenterEvent | MouseleaveEvent>).detail;
            if (detailData.event === DropdownMsgType.mouseenter) {
                if (needToDoRef.current) {
                    handleMouseEnter(detailData);
                }
                hoverRef.current = true;
            } else if (detailData.event === DropdownMsgType.mouseleave) {
                if (needToDoRef.current) {
                    handleMouseLeave();
                }
                hoverRef.current = false;
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
        if (needToDo) {
            if (btnDisable) {
                setHover(false);
            } else {
                setHover(hoverRef.current);
            }
        }
    }, [btnDisable, needToDo]);

    return hover;
};
