/**
 * @file 处理从btn传过来的初始化btn id事件
 * @date 2023-03-08
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-08
 */

import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";
import { useLatest } from "../../../../Hooks/useLatest";
import { useDropdownContext, useDropdownMsgId } from "../../Dropdown";
import { DropdownMsgType } from "../../DropdownBtn/Unit/type";
import { InitBtnEvent } from "./../../DropdownBtn/Unit/type";

export const useInitBtnId = (): [
    string | undefined,
    Dispatch<SetStateAction<string | undefined>>,
] => {
    const msgId = useDropdownMsgId();

    const [btnId, setBtnId] = useState<string>();

    const btnIdRef = useLatest(btnId);

    const { btn } = useDropdownContext();

    useLayoutEffect(() => {
        /**
         * 接收 从btn那里传过来的 click事件
         */
        const fn = (e: Event) => {
            const detailData = (e as CustomEvent<InitBtnEvent>).detail;

            if (
                detailData.event === DropdownMsgType.initBtn &&
                !(btnIdRef.current && btn.current[btnIdRef.current])
            ) {
                setBtnId(detailData.id);
            }
        };

        document.addEventListener(msgId, fn);
        return () => {
            document.removeEventListener(msgId, fn);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msgId]);

    return [btnId, setBtnId];
};
