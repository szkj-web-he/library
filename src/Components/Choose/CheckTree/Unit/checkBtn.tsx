/**
 * @file 复选按钮
 * @date 2023-03-07
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef } from "react";
import { Icon } from "../../../..";
import classNames from "../../../../Unit/classNames";
import styles from "../style.module.scss";
import { useCheckTreePostMsg, useCheckTreeState } from "./context";
import { toAnimate } from "./toAnimate";
import { PostMsgActionType } from "./type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    hasSubItem: boolean;
    /**
     * id
     */
    uuid: string;
    /**
     * 是否禁用
     */
    disable: boolean;
    /**
     * 当活跃状态被改变时
     */
    handleStatusChange: (res: boolean) => void;
    /**
     * 通讯id
     */
    msgId: string;
    /**
     * 当前是否被选中
     */
    checked: boolean;

    /**
     * 子集选中的状态
     */
    childStatus: 0 | 1 | 2;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    uuid,
    disable,
    handleStatusChange,
    msgId,
    checked,
    hasSubItem,
    childStatus,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { checkedDataRef } = useCheckTreeState();

    const { pMsgId } = useCheckTreePostMsg();
    /**
     * 只要执行动画的dom节点
     */
    const checkRef = useRef<SVGSVGElement | null>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */

    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /**
     * 给父发送消息
     *
     * 告诉父级
     * '我'的展示状态被改变了
     */
    const postMessageToParent = (status: boolean) => {
        if (!pMsgId) {
            /**
             * 如果没有父级
             * 就没必要发送消息
             */
            return;
        }
        const msgEvent = new CustomEvent(pMsgId, {
            detail: {
                action: PostMsgActionType.changeParentCheckStatus,
                /**
                 * "我"的身份
                 */
                key: uuid,
                /**
                 * 选中的状态
                 */
                value: status,
                /**
                 * 点击触发的事件
                 */
                isClick: true,
            },
        });
        // console.log(" ");
        // console.log("发消息给父", uuid);
        document.dispatchEvent(msgEvent);
    };

    /**
     * 给子发送消息
     *
     * 告诉子级
     * 你们都得是我设置的这个状态(status)
     */
    const postMessageToChild = (status: boolean) => {
        const msgEvent = new CustomEvent(msgId, {
            detail: {
                action: PostMsgActionType.changeChildCheckStatus,
                /**
                 * 选中的状态
                 */
                value: status,
                /**
                 * 点击触发的事件
                 */
                isClick: true,
            },
        });
        // console.log(" ");
        // console.log("发消息给子");
        document.dispatchEvent(msgEvent);
    };

    const handleClick = () => {
        if (disable) {
            return;
        }

        const status = !checkedDataRef.current[uuid];

        if (checkRef.current) {
            toAnimate(checkRef.current, status);
        }

        if (hasSubItem) {
            postMessageToChild(status);
        } else {
            /**
             * 组件通讯
             */
            handleStatusChange(status);

            postMessageToParent(status);
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    const isActive = () => {
        if (checked) {
            return styles.checkTreeItem_checkBtnActive;
        }

        if (childStatus === 2) {
            return styles.checkTreeItem_checkBtnActive__half;
        }
        return undefined;
    };

    return (
        <div
            className={classNames(styles.checkTreeItem_checkBtn, isActive())}
            onClick={handleClick}
        >
            <Icon type="checkboxEmpty" className={styles.checkTreeItem_noActiveIcon} />
            <Icon type="checkboxSolid" className={styles.checkTreeItem_activeIcon} ref={checkRef} />
            <Icon type="writer" className={styles.checkTreeItem_halfActiveIcon} />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
