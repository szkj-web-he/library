/**
 * @file 处理从btn传过来的初始化btn id事件
 * @date 2023-03-08
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-08
 */

import { useLayoutEffect, useState } from "react";
import { useDropdownMsgId } from "../../Dropdown";
import { BtnIsClickEvent, DropdownMsgType } from "../../DropdownBtn/Unit/type";
import { joinMsgId } from "./../../DropdownBtn/Unit/joinStr";

export const useBtnIsClick = (eventId?: string): boolean => {
    const msgId = useDropdownMsgId();

    /**
     * btn 是不是点击类事件
     */
    const [btnIsClickEvent, setBtnIsClickEvent] = useState(false);

    useLayoutEffect(() => {
        /**
         * 接收 从btn那里传过来的 click事件
         */
        const fn = (e: Event) => {
            const detailData = (e as CustomEvent<BtnIsClickEvent>).detail;

            if (detailData.event === DropdownMsgType.isClick) {
                setBtnIsClickEvent(detailData.value);
            }
        };

        document.addEventListener(joinMsgId(msgId, eventId), fn);
        return () => {
            document.removeEventListener(joinMsgId(msgId, eventId), fn);
        };
    }, [eventId, msgId]);

    return btnIsClickEvent;
};
