/**
 * @file post message 通讯
 * @date 2023-03-07
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-07
 */

import { MutableRefObject, useId, useLayoutEffect, useRef } from "react";
import { deepCloneData } from "../../../..";
import { useLatest } from "../../../../Hooks/useLatest";
import { useCheckTreePostMsg, useCheckTreeState } from "../Unit/context";
import { getChildStatus } from "../Unit/getChildStatus";
import {
    ChangeCheckStatusFromChildMsg,
    ChangeCheckStatusFromParentMsg,
    ChildMassageEventProps,
    ParentMassageEventProps,
    PostMsgActionType,
} from "../Unit/type";

/**
 * 父子通讯的 自定义方式(非post mssage)
 * @param setChecked
 * @param subChild
 * @param isLeaf 是不是最后一级
 * @returns
 */
export const useMsg = (
    uuid: string,
    setChecked: (res: boolean) => void,
    setChildStatus: (res: 0 | 1 | 2) => void,
    isLeaf: boolean,
): [string, MutableRefObject<string[]>] => {
    /**
     * 通讯id
     */
    const msgId = useId();

    const { pMsgId } = useCheckTreePostMsg();

    const { checkedDataRef } = useCheckTreeState();

    const setCheckedRef = useLatest(setChecked);

    const subChild = useRef<Array<string>>([]);

    const setChildStatusRef = useRef(setChildStatus);

    const uuidRef = useLatest(uuid);

    const isLeafRef = useLatest(isLeaf);

    const pMsgIdRef = useLatest(pMsgId);

    /**
     * 监听父发过来的消息
     */
    useLayoutEffect(() => {
        /**
         * 我接收到了父发过来的消息
         * 我要把这个消息告诉我的子级
         */
        const postMsgToChild = (event: ChangeCheckStatusFromParentMsg) => {
            const msgEvent = new CustomEvent(msgId, {
                detail: deepCloneData(event),
            });
            document.dispatchEvent(msgEvent);
        };

        /**
         * 我接收到了父发过来的消息
         * 我要把这个消息告诉我的父级
         */
        const postMsgToParent = (event: ChangeCheckStatusFromParentMsg) => {
            if (!pMsgIdRef.current) {
                return;
            }
            const msgEvent = new CustomEvent(pMsgIdRef.current, {
                detail: {
                    action: PostMsgActionType.changeParentCheckStatus,
                    value: event.value,
                    isClick: event.isClick,
                    key: uuidRef.current,
                },
            });
            document.dispatchEvent(msgEvent);
        };

        /**
         *
         * 接受到了父级发过来的消息
         *
         * * 数据的流向
         * * 不再是 从点击的位置向两端流
         * * 而是 从点击的位置向下流，到了最下流 再开始一层层的向上流
         *
         * 判断 '我'是不是最后一级
         * 如果是最后一级
         * 则 开始给父发消息
         *
         * 如果不是
         * 就继续向下发送消息
         *
         */

        const fn = (e: Event) => {
            const eventData = (e as CustomEvent<ParentMassageEventProps>).detail;

            switch (eventData.action) {
                case PostMsgActionType.changeChildCheckStatus:
                    // console.log("接收到了父发送过来的消息", uuidRef.current);
                    if (isLeafRef.current) {
                        setCheckedRef.current(eventData.value);
                        postMsgToParent(eventData);
                    } else {
                        postMsgToChild(eventData);
                    }

                    break;
                default:
                    break;
            }
        };
        pMsgId && document.addEventListener(pMsgId, fn);
        return () => {
            pMsgId && document.removeEventListener(pMsgId, fn);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pMsgId, msgId]);

    /**
     * 接收子级发送过来的消息
     */
    useLayoutEffect(() => {
        /**
         * 我接收到了子级发过来的消息
         * 我要把这个消息告诉我的父级
         */
        const postMsgToParent = (event: ChangeCheckStatusFromChildMsg) => {
            if (!pMsgIdRef.current) {
                return;
            }
            const msgEvent = new CustomEvent(pMsgIdRef.current, {
                detail: {
                    action: PostMsgActionType.changeParentCheckStatus,
                    isClick: event.isClick,
                    key: uuidRef.current,
                },
            });
            document.dispatchEvent(msgEvent);
        };

        /**
         * 遍历所有子
         * 看看是不是都选中了
         * 如果都选中了
         */
        const mapChild = (eventData: ChangeCheckStatusFromChildMsg) => {
            if (eventData.isClick && eventData.key) {
                const status = getChildStatus(subChild.current, checkedDataRef.current);
                // console.log("子级", JSON.stringify(subChild.current));
                // console.log("子级的选中状态", JSON.stringify(checkedDataRef.current));
                const value = status === 1;
                // console.log("value", value);
                setChildStatusRef.current(status);
                setCheckedRef.current(value);
                postMsgToParent(eventData);
            }
            /**
             * 暂时没写不是点击的逻辑
             */
        };

        /**
         * 接受到了子级发过来的消息
         */
        const fn = (e: Event) => {
            const eventData = (e as CustomEvent<ChildMassageEventProps>).detail;
            switch (eventData.action) {
                case PostMsgActionType.changeParentCheckStatus:
                    // console.log("接收到了子发送过来的消息", uuidRef.current);
                    mapChild(eventData);
                    break;
                default:
                    break;
            }
        };
        document.addEventListener(msgId, fn);
        return () => {
            document.removeEventListener(msgId, fn);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msgId]);

    return [msgId, subChild];
};
