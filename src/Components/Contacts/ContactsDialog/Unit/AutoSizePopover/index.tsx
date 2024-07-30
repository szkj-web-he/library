/**
 * @file
 * @date 2023-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2023-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { FC } from "react";
import styles from "./style.module.scss";
import classNames from "../../../../../Unit/classNames";
import { Dropdown, DropdownContent } from "../../../../..";
import { Direction } from "../../../../Common/Kite/Unit/type";
import { OffsetProps, Placement } from "../../../../Common/Unit/type";
import { defaultAttr } from "../../../../DataDisplay/Popover/Unit/defaultAttr";
import { DropdownProps } from "../../../../Common/Dropdown";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface AutoSizePopoverProps {
    btn: React.ReactNode;
    /**
     * children
     */
    children?: React.ReactNode;
    /**
     * width : The width of the box where the triangle is located
     * height : The width of the box where the triangle is located
     * color : Triangle color
     * offset : Triangle offset
     */
    triangle?: {
        width: string;
        height: string;
        color?: string;
    };
    /**
     * Where to put it in root
     */
    placement?: Placement;
    /**
     * The direction of the main axis
     */
    direction?: Direction;
    /**
     * where to mount
     */
    mount?: Element;
    /**
     * 延时展示
     * 默认为0ms
     */
    delayShow?: number;
    /**
     * 延时隐藏
     * 默认为150ms
     */
    delayHidden?: number;
    /**
     * show of popover
     */
    show?: boolean;
    /**
     *
     * 当可视状态改变时 触发
     *
     */
    handleVisibleChange?: (res: boolean) => void;
    /**
     * body className
     */
    bodyClassName?: string;
    /**
     * 当为disable为true的时候
     * hover无效
     */
    disable?: boolean;
    /**
     * ontransitionEnd callback
     * 当下拉框的过渡动画结束时
     */
    handleTransitionEnd?: () => void;
    /**
     * ontransitionStart callback
     * 当下拉框的过渡动画开始时
     */
    handleTransitionStart?: () => void;
    /**
     * ontransitionCancel callback
     * 当下拉框的过渡动画取消时
     */
    handleTransitionCancel?: () => void;
    /**
     * 偏移值
     */
    offset?: OffsetProps;
    /**
     *
     */
    trigger?: DropdownProps["trigger"];
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const AutoSizePopover: FC<AutoSizePopoverProps> = ({
    btn,
    bodyClassName,
    direction = "horizontal",
    placement = "rc",
    delayShow = 200,
    delayHidden = 150,
    children,
    handleTransitionEnd,
    handleTransitionStart,
    handleTransitionCancel,
    ...props
}) => {
    AutoSizePopover.displayName = "AutoSizePopover";
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const offsetAttr = defaultAttr(placement, direction);

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Dropdown
            direction={direction}
            placement={placement}
            delayOnShow={delayShow}
            delayOnHide={delayHidden}
            animate="fade"
            triangle={offsetAttr.triangle}
            offset={offsetAttr.offset}
            {...props}
        >
            {btn}
            <DropdownContent
                bodyClassName={classNames(styles.autoSizePopover_body, bodyClassName)}
                handleTransitionEnd={handleTransitionEnd}
                handleTransitionStart={handleTransitionStart}
                handleTransitionCancel={handleTransitionCancel}
            >
                {children}
            </DropdownContent>
        </Dropdown>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
AutoSizePopover.displayName = "AutoSizePopover";
