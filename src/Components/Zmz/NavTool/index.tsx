/**
 * @file
 * @date 2022-12-08
 * @author mingzhou.zhang
 * @lastModify  2022-12-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */

import {
    HTMLAttributes,
    forwardRef,
    useImperativeHandle,
    useInsertionEffect,
    useState,
} from "react";
import { Icon, Kite, useEventListener } from "../../..";
import { useLatest } from "../../../Hooks/useLatest";
import classNames from "../../../Unit/classNames";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface NavToolProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * 当点击 "回到顶部" 时，哪个滚动元素需要被滚动
     */
    target?: HTMLElement;
    /**
     * 当超过多少像素的时候，可以出现 "回到顶部" 这个按钮
     * * 默认是 窗口大小
     */
    limitHeight?: number;
    /**
     *
     */
    mode?: "static" | "fixed";

    /**
     * 资源加载结果反馈
     */
    handleFinally?: (status: "success" | "error") => void;
}

/**
 * 转发事件
 */
interface EventProps {
    /**
     * 打开客服系统
     * 前提是必须静态资源加载完成
     */
    toOpen: () => void;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const NavTool = forwardRef<EventProps, NavToolProps>(
    (
        {
            className,
            target,
            limitHeight = window.innerHeight,
            mode = "static",
            handleFinally,
            ...props
        },
        event,
    ) => {
        NavTool.displayName = "NavTool";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        /**
         * 回到顶部的按钮是否可见
         */
        const [backTopShow, setBackTopShow] = useState(false);
        /**
         * hover状态
         */
        const [chatTipsShow, setChatTipsShow] = useState(false);

        /**
         * 客服系统api的资源加载状态
         */
        const [status, setStatus] = useState<"success" | "error">();

        const finallyFn = useLatest(handleFinally);

        useInsertionEffect(() => {
            if (window.clinkWebchatOptions === undefined) {
                window.clinkWebchatOptions = {
                    options: {},
                };
            }
            window.clinkWebchatOptions.options = {
                accessId: "5d3cee11-6df8-4224-8d17-415762f1bb3f",
                language: "zh_CN",
            };
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://webchat-bj.clink.cn/webchat.js?v=${Date.now()}`;
            document.body.appendChild(script);

            const successFn = () => {
                setStatus("success");
                finallyFn.current?.("success");
            };

            const errorFn = () => {
                setStatus("error");
                finallyFn.current?.("success");
            };

            script.addEventListener("load", successFn);
            script.addEventListener("error", errorFn);
            return () => {
                script.removeEventListener("load", successFn);
                script.removeEventListener("error", errorFn);
            };
        }, []);

        useEventListener(
            "scroll",
            (e) => {
                const el = e.currentTarget;
                if (el instanceof HTMLElement) {
                    const top = el.scrollTop;

                    if (top > limitHeight) {
                        setBackTopShow(true);
                    } else {
                        setBackTopShow(false);
                    }
                }
            },
            { current: target ?? null },
            true,
        );

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        /**
         * 打开客服
         */
        const handleOpenClick = () => {
            window.ClinkChatWeb?.openSessionWindow();
        };

        useImperativeHandle(event, () => {
            return {
                toOpen: handleOpenClick,
            };
        });

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        const backTopBtn = () => {
            if (backTopShow) {
                return (
                    <div
                        className={styles.nav_tool_backtop}
                        onClick={() => {
                            (target ?? window).scrollTo({
                                behavior: "smooth",
                                top: 0,
                            });
                        }}
                    >
                        <Icon type="top" />
                    </div>
                );
            }
        };

        if (status === "success") {
            return (
                <div className={styles.nav_tool_container}>
                    <div className={styles.nav_tool_inner}>
                        <div
                            className={
                                className ??
                                classNames(styles.nav_tool, {
                                    [`${styles.nav_tool_fixed}`]: mode === "fixed",
                                })
                            }
                            {...props}
                        >
                            <Kite
                                show={chatTipsShow}
                                direction={"horizontal"}
                                placement={"lc"}
                                triangle={{ width: ".5rem", height: ".5rem", offset: { x: -10 } }}
                                root={
                                    <div
                                        className={styles.nav_tool_chat}
                                        onClick={handleOpenClick}
                                        onMouseEnter={() => {
                                            setChatTipsShow(true);
                                        }}
                                        onMouseLeave={() => {
                                            setChatTipsShow(false);
                                        }}
                                    >
                                        {chatTipsShow ? (
                                            <Icon type="Chat" />
                                        ) : (
                                            <Icon type="Chat02" />
                                        )}
                                    </div>
                                }
                            >
                                <div className={styles.nav_tool_chat_tooltips}>
                                    <Icon type="smile" />
                                    <span>让我们在线交谈吧！</span>
                                </div>
                            </Kite>

                            {backTopShow && backTopBtn()}
                        </div>
                    </div>
                </div>
            );
        }

        return <></>;
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
NavTool.displayName = "NavTool";
