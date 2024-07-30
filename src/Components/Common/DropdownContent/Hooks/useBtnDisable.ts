/**
 * @file 监听btn传递过来的disable的改变事件
 * @date 2023-03-08
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-08
 */

import { useLayoutEffect, useState } from "react";
import { useDropdownMsgId } from "../../Dropdown";
import { joinMsgId } from "../../DropdownBtn/Unit/joinStr";
import { ChangeDisable, DropdownMsgType } from "./../../DropdownBtn/Unit/type";

/**
 *
 * @param eventId
 * @returns
 */
export const useBtnDisable = (eventId?: string) => {
    const msgId = useDropdownMsgId();

    const [disable, setDisable] = useState(false);

    useLayoutEffect(() => {
        /**
         * 接收 从btn那里传过来的 click事件
         */
        const fn = (e: Event) => {
            const detailData = (e as CustomEvent<ChangeDisable>).detail;
            if (detailData.event === DropdownMsgType.changeDisable) {
                setDisable(detailData.disable);
            }
        };

        const msgName = joinMsgId(msgId, eventId);

        document.addEventListener(msgName, fn);
        return () => {
            document.removeEventListener(msgName, fn);
        };
    }, [eventId, msgId]);

    return disable;
};
