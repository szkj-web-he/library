/**
 * @file 关于手机端dialog的type
 * @date 2023-06-13
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-13
 */

export interface MobileDialogProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 主体的className
     */
    bodyClassName?: string;
    /**
     * 主体的style
     */
    bodyStyle?: React.CSSProperties;
    /**
     * 是否可见
     * * 默认值为false
     */
    show?: boolean;
    /**
     * 点击关闭按钮的点击事件
     */
    onCloseClick?: (isEsc?: true) => void;
    /**
     * 隐藏的时候删除节点
     * * 默认值 false
     */
    removeOnHidden?: boolean;
    /**
     * 遮罩层的zIndex
     * * 默认值99
     */
    zIndex?: number;
    /**
     * 内容
     */
    children?: React.ReactNode;
}

export interface MobileDialogEvents {
    /**
     * 打开日期输入框
     * @returns
     */
    open: () => void;
    /**
     * 关闭日期输入框
     */
    close: () => void;
}
