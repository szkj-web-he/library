/**
 * @file 对话框组
 * @date 2023-02-01
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useRef } from "react";
import { useRemoveOnHidden } from "../../Common/Hooks/useRemoveOnHidden";
import Portal from "../../Common/Portal/Unit/portalTemp";
import Main from "./Unit/main";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/**
 * 对话框组的参数
 */
export interface DialogGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    /**
     * 是否可见
     * * 默认值为false
     */
    show?: boolean;
    /**
     * 隐藏的时候删除整个组
     * * 默认值 false
     */
    removeOnHidden?: boolean;
    /**
     * 遮罩层的zIndex
     * * 默认值99
     */
    zIndex?: number;
    /**
     * 对话框组的内容
     */
    children?: React.ReactNode;
    /**
     * 当隐藏按钮被点击时
     * 当切换时候的时候
     */
    onChange?: (to: number, from?: number) => void;
    /**
     * 在展示的时候从第几个item开始
     * * 默认是第一个item
     */
    startIndex?: number;
}

/**
 * 对话框组转发的事件
 */

export interface DialogGroupForwardEvents {
    /**
     * 	切换到指定面板, isAnimate = false 时，不使用动画
     * @param index 要跳转到第几个item上
     * @param isAnimate 是否有动画 默认是有
     */

    goTo: (index: number, isAnimate?: boolean) => void;
    /**
     * 切换至下一张幻灯片
     */
    next: () => void;
    /**
     * 切换至下一张幻灯片
     */
    prev: () => void;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

/**
 * @bate 已重写，接轨实际项目
 */
export const DialogGroup = forwardRef<DialogGroupForwardEvents | null, DialogGroupProps>(
    (
        { show = false, zIndex = 99, removeOnHidden = false, children, startIndex, ...props },
        ref,
    ) => {
        DialogGroup.displayName = "DialogGroup";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const [endFn, isInstall] = useRemoveOnHidden(show, removeOnHidden, false);

        // 背景
        const bgTransitionEnd = useRef(false);

        // 弹框
        const mainTransitionEnd = useRef(false);
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const handleEnd = () => {
            if (bgTransitionEnd.current && mainTransitionEnd.current) {
                endFn();
                bgTransitionEnd.current = false;
                mainTransitionEnd.current = false;
            }
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        if (isInstall) {
            return (
                <Portal>
                    <Main
                        handleTransitionEnd={(res) => {
                            if (res === "bg") {
                                bgTransitionEnd.current = true;
                                handleEnd();
                                return;
                            }

                            if (res === "main") {
                                mainTransitionEnd.current = true;
                                handleEnd();
                                return;
                            }
                        }}
                        show={show}
                        zIndex={zIndex}
                        startIndex={startIndex}
                        {...props}
                        ref={ref}
                    >
                        {children}
                    </Main>
                </Portal>
            );
        }
        return <></>;
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

DialogGroup.displayName = "DialogGroup";
