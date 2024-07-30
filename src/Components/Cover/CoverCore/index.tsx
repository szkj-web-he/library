/**
 * @file 遮罩层通用组件
 * @date 2023-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useRef, useState } from "react";
import PortalTemp from "../../Common/Portal/Unit/portalTemp";
import Main from "./Unit/main";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface CoverCoreProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 是否可见
     * * 默认值为false
     */
    show?: boolean;
    /**
     * 内容
     */
    children?: React.ReactNode;
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
     * 当背景被点击时
     */
    handleBgClick?: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const CoverCore = forwardRef<HTMLDivElement | null, CoverCoreProps>(
    ({ show, removeOnHidden, children, ...props }, ref) => {
        CoverCore.displayName = "CoverCore";
        /***
         * 记录上一次的show的状态
         */
        const showRef = useRef<{
            from?: boolean;
            to?: boolean;
        }>({
            from: undefined,
            to: undefined,
        });

        /**
         * 过渡动画是否结束
         */
        /**
         * 背景
         */

        const [bgTransitionEnd, setBgTransitionEnd] = useState<boolean>();

        /**
         * 弹框
         */
        const [mainTransitionEnd, setMainTransitionEnd] = useState<boolean>();

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        {
            if (show !== showRef.current.to) {
                showRef.current = {
                    from: showRef.current.to,
                    to: show,
                };

                if (showRef.current.from === true && showRef.current.to === false) {
                    setBgTransitionEnd(false);
                    setMainTransitionEnd(false);
                }
            }
        }

        /**
         * 当背景的过渡动画结束
         */
        const handleBgTransitionEnd = (status: boolean) => {
            if (removeOnHidden) {
                if (status === false) {
                    setBgTransitionEnd(true);
                } else {
                    setBgTransitionEnd(undefined);
                }
            }
        };

        /**
         * 当弹框的过渡动画结束
         */
        const handleMainTransitionEnd = (status: boolean) => {
            if (removeOnHidden) {
                if (status === false) {
                    setMainTransitionEnd(true);
                } else {
                    setMainTransitionEnd(undefined);
                }
            }
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        const node = (
            <PortalTemp>
                <Main
                    ref={ref}
                    handleTransitionEnd={(res, status: boolean) => {
                        if (res === "bg") {
                            handleBgTransitionEnd(status);
                            return;
                        }

                        if (res === "main") {
                            handleMainTransitionEnd(status);
                            return;
                        }
                    }}
                    show={show}
                    {...props}
                >
                    {children}
                </Main>
            </PortalTemp>
        );

        /**
         * 为可见的时候
         * dom节点一直存在
         */
        if (show) {
            return <>{node}</>;
        }

        /**
         * 初次不创建
         */
        if (showRef.current.from === undefined && showRef.current.to === false) {
            return <></>;
        }

        if (removeOnHidden) {
            /**
             * 为不可见的时候
             */

            if (mainTransitionEnd && bgTransitionEnd) {
                /**
                 * 看看过渡是否结束
                 * 如果结束 且是变为不可见的过渡动画
                 * 则需要删除节点
                 */

                return <></>;
            }
            return <>{node}</>;
        }
        /**
         * 如果在隐藏的时候不需要删除节点
         */
        return <>{node}</>;
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
CoverCore.displayName = "CoverCore";
