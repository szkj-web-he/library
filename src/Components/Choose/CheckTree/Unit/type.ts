/**
 * @file 复选树的类型文件
 * @date 2023-03-07
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-07
 */

export enum PostMsgActionType {
    /**
     * 改变父级的选中状态
     * 告诉父级 我改变了
     *
     */
    changeParentCheckStatus = "CHANGEPARENTCHECKSTATUS",
    /**
     * 改变子级的选中状态
     */
    changeChildCheckStatus = "CHANGECHILDCHECKSTATUS",
}
/**
 * 从父级发送过来的消息
 * 修改选中状态
 */
export interface ChangeCheckStatusFromParentMsg {
    action: PostMsgActionType.changeChildCheckStatus;
    /**
     * 选中的状态
     */
    value: boolean;
    /**
     * 点击触发的事件
     */
    isClick: boolean;
}

/**
 * 父级发送过来的所有消息
 */
export type ParentMassageEventProps = ChangeCheckStatusFromParentMsg;

/**
 * 从子级发送过来的消息
 * 修改选中状态
 */

export interface ChangeCheckStatusFromChildMsg {
    action: PostMsgActionType.changeParentCheckStatus;
    /**
     * 选中的状态
     */
    value: boolean;
    /**
     * 点击触发的事件
     */
    isClick: boolean;
    /**
     * 哪个子
     */
    key: string | number;
}

/**
 * 子级发送过来的所有消息
 */
export type ChildMassageEventProps = ChangeCheckStatusFromChildMsg;
