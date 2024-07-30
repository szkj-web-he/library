/**
 * @file 对话框
 * @date 2023-01-31
 * @author xuejie.he
 * @lastModify xuejie.he 2023-01-31
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, ForwardRefRenderFunction } from "react";
import CommonDialog from "../CommonDialog";
import { CoverCore } from "../CoverCore";
import { DialogCommonProps } from "../Unit/type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface DialogProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
        DialogCommonProps {
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
     * 对话框的按钮
     */
    buttons?: React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: ForwardRefRenderFunction<HTMLDivElement | null, DialogProps> = (
    {
        show = false,
        removeOnHidden,
        children,
        zIndex = 99,
        onCloseClick,
        type = "none",
        title,
        description,
        size = "regular",
        buttons,
        ...props
    },
    ref,
) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    return (
        <CoverCore show={show} removeOnHidden={removeOnHidden} zIndex={zIndex} {...props} ref={ref}>
            <CommonDialog
                type={type}
                title={title}
                description={description}
                size={size}
                closeIcon={true}
                onClose={() => onCloseClick?.()}
                buttons={buttons}
            >
                {children}
            </CommonDialog>
        </CoverCore>
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export const Dialog = forwardRef(Temp);

Dialog.displayName = "Dialog";
