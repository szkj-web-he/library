/**
 * @file 传递消息的类型说明
 * @date 2023-03-08
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-08
 */

export enum DropdownMsgType {
    changeDisable = "CHANGEDISABLE",
    click = "CLICK",
    focus = "FOCUS",
    blur = "BLUR",
    mouseenter = "MOUSEENTER",
    mouseleave = "MOUSELEAVE",
    contextmenu = "CONTEXTMENU",
    initBtn = "INITBTN",
    isClick = "ISCLICK",
}

/**
 * 改变禁用状态
 */
export interface ChangeDisable {
    /**
     * 事件名称
     */
    event: DropdownMsgType.changeDisable;
    /**
     * 禁用值
     */
    disable: boolean;
}

/**
 * 左击事件
 */
export interface ClickEvent {
    /**
     * 事件名称
     */
    event: DropdownMsgType.click;
    /**
     * btn的身份id
     */
    id: string;
}

/**
 * 获焦事件
 */
export interface FocusEvent {
    /**
     * 事件名称
     */
    event: DropdownMsgType.focus;
    /**
     * btn的身份id
     */
    id: string;
}

/**
 * 失去焦点事件
 */
export interface BlurEvent {
    /**
     * 事件名称
     */
    event: DropdownMsgType.blur;
    /**
     * btn的身份id
     */
    id: string;
}

/**
 * 右击事件
 */
export interface ContextmenuEvent {
    /**
     * 事件名称
     */
    event: DropdownMsgType.contextmenu;
    /**
     * btn的身份id
     */
    id: string;
}

/**
 * 鼠标移入事件
 */
export interface MouseenterEvent {
    /**
     * 事件名称
     */
    event: DropdownMsgType.mouseenter;
    /**
     * btn的身份id
     */
    id: string;
}

/**
 * 鼠标移出事件
 */
export interface MouseleaveEvent {
    /**
     * 事件名称
     */
    event: DropdownMsgType.mouseleave;
    /**
     * btn的身份id
     */
    id: string;
}

/**
 * 初始化btn
 */
export interface InitBtnEvent {
    /**
     * 事件名称
     */
    event: DropdownMsgType.initBtn;
    /**
     * btn的身份id
     */
    id: string;
}

/**
 * 发送btn是否可以点击的状态
 */
export interface BtnIsClickEvent {
    /**
     * 事件名称
     */
    event: DropdownMsgType.isClick;
    /**
     * btn的触发下拉事件是否 是下拉类型
     */
    value: boolean;
}
