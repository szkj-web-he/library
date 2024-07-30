/**
 * @file 对话框的通用type
 * @date 2023-01-31
 * @author xuejie.he
 * @lastModify xuejie.he 2023-01-31
 */

export type DialogSize = "small" | "regular" | "large";

export interface DialogCommonProps {
    /**
     * 弹框类型
     * * 默认值为 none
     */
    type?: "info" | "warning" | "error" | "none";
    /**
     * 标题
     */
    title?: React.ReactNode;
    /**
     * 描述
     */
    description?: React.ReactNode;
    /**
     * 内容
     */
    children?: React.ReactNode;
    /**
     * 弹窗大小
     * * 默认值为 regular
     */
    size?: DialogSize;
}

/**
 * dialog group
 */
export interface dialogGroupActiveProps {
    from?: number;
    to?: number;
    isAnimate: boolean;
}
