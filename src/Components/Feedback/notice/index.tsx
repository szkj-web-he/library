/**
 * @file Notice components
 * @date 2021-06-25
 * @author xuejie.he
 * @lastModify xuejie.he 2021-06-25
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useState, useRef } from "react";
import { Icon, Transition } from "../../..";
import { EventParams, addEventList, removeEventList } from "../../..";
import styles from "./style.module.scss";
import { createRoot } from "react-dom/client";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface NoticeProps {
    /**
     * Notification type
     */
    type: "success" | "info" | "warning" | "error";
    /**
     * title of this component
     */
    title: React.ReactNode;
    /**
     * description of this component
     */
    description?: React.ReactNode;
    /**
     * Whether to display Icon
     */
    showIcon?: boolean;
    /**
     * Time(seconds) before auto-dismiss
     */
    duration?: number;

    /**
     * callback
     */
    onClose?: () => void;

    /**
     * confirm
     */
    confirm?: {
        content: React.ReactNode;
    };

    /**
     * cancel
     */
    cancel?: {
        content: React.ReactNode;
    };
    /**
     * auto close
     */
    autoClose?: boolean;
    /**
     * auto close when mouse leave
     */
    closeWhenLeave?: boolean;

    /**
     * onClick
     */
    onClick?: () => void;
    /**
     * start position
     */
    position?: "left" | "right";
    /**
     * mount element
     */
    mount: Element;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Notice = ({
    type,
    duration = 5000,
    title,
    description,
    showIcon = true,
    autoClose = true,
    closeWhenLeave = true,
    onClose,
    confirm,
    cancel,
    onClick,
    position = "right",
    mount,
}: NoticeProps) => {
    const [visible, setVisible] = useState(true);

    const [transitionEnd, setTransitionEnd] = useState(false);

    const [hover, setHover] = useState<boolean>();

    const timer = useRef<number | null>(null);

    const ref = useRef<HTMLDivElement | null>(null);

    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    useEffect(() => {
        let isEnd = false;
        if (transitionEnd && autoClose) {
            timer.current = window.setTimeout(() => {
                if (isEnd) {
                    return;
                }
                setVisible(false);
            }, duration);
        }

        return () => {
            timer.current && window.clearTimeout(timer.current);
            isEnd = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transitionEnd]);

    useEffect(() => {
        let isEnd = false;

        timer.current && window.clearTimeout(timer.current);
        if (hover === false && closeWhenLeave) {
            if (closeWhenLeave) {
                timer.current = window.setTimeout(() => {
                    if (isEnd) {
                        return;
                    }
                    setVisible(false);
                }, 1000);
            }
        }
        return () => {
            timer.current && window.clearTimeout(timer.current);
            isEnd = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hover]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /**
     * handle transitionEnd
     */
    const handleTransitionEnd = () => {
        if (visible) {
            setTransitionEnd(true);
        } else {
            mount.remove();
        }
    };

    useEffect(() => {
        let isEnd = false;
        const node = ref.current;
        const events: EventParams[] = [
            {
                type: "mouseover",
                listener: () => {
                    if (isEnd) {
                        return;
                    }
                    setHover(true);
                },
            },
            {
                type: "mouseout",
                listener: () => {
                    if (isEnd) {
                        return;
                    }
                    setHover(false);
                },
            },
        ];
        if (node) {
            addEventList(node, events);
        }
        return () => {
            isEnd = true;
            node && removeEventList(node, events);
        };
    }, []);

    useEffect(() => {
        const node = ref.current;
        if (onClick && node) {
            node.addEventListener("click", onClick);
            return () => {
                node.removeEventListener("click", onClick);
            };
        }
    }, [onClick]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     *
     * handle the style and icon  for each type
     */
    const getNoticeClassName = (): {
        icon: "successSolid" | "info" | "warning" | "error";
        class: string;
    } => {
        switch (type) {
            case "success":
                return {
                    icon: "successSolid",
                    class: styles[
                        `notice_container__success${position
                            .slice(0, 1)
                            .toUpperCase()}${position.slice(1, position.length)}`
                    ],
                };
            case "info":
                return {
                    icon: "info",
                    class: styles[
                        `notice_container__info${position
                            .slice(0, 1)
                            .toUpperCase()}${position.slice(1, position.length)}`
                    ],
                };
            case "warning":
                return {
                    icon: "warning",
                    class: styles[
                        `notice_container__warning${position
                            .slice(0, 1)
                            .toUpperCase()}${position.slice(1, position.length)}`
                    ],
                };
            case "error":
                return {
                    icon: "error",
                    class: styles[
                        `notice_container__error${position
                            .slice(0, 1)
                            .toUpperCase()}${position.slice(1, position.length)}`
                    ],
                };
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <Transition
            show={visible}
            firstAnimation={true}
            animationType={position === "left" ? "inLeft" : "inRight"}
            handleTransitionEnd={handleTransitionEnd}
            className={getNoticeClassName().class}
            ref={ref}
            removeOnHidden={true}
            cache={false}
        >
            <>
                <Icon
                    className={styles.notice_closeIcon}
                    type="close"
                    title="close"
                    onClick={() => {
                        timer.current && window.clearTimeout(timer.current);
                        setVisible(false);
                        onClose && onClose();
                    }}
                />
                <div className={styles.notice_title}>
                    {showIcon && (
                        <Icon
                            type={getNoticeClassName().icon}
                            className={styles.notice_titleIcon}
                        />
                    )}
                    <div className={styles.notice_titleContent}>{title}</div>
                </div>

                <div className={styles.notice_context}>
                    {showIcon && (
                        <Icon
                            className={styles.notice_contextIcon}
                            type={getNoticeClassName().icon}
                        />
                    )}
                    <div className={styles.notice_contextContent}>{description}</div>
                </div>
                {(confirm || cancel) && (
                    <div
                        className={styles.notice_btnList}
                        onClick={() => {
                            timer.current && window.clearTimeout(timer.current);
                            setVisible(false);
                        }}
                    >
                        {confirm?.content}
                        {cancel?.content}
                    </div>
                )}
            </>
        </Transition>
    );
    /* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
};

export interface NoticeFnProps {
    /**
     * notice title
     */
    title: React.ReactNode;
    /**
     * notice description
     */
    description?: React.ReactNode;

    /**
     * Whether to display Icon
     */
    showIcon?: boolean;

    /**
     * Time(seconds) before auto-dismiss
     */
    duration?: number;
    /**
     * callback
     */
    onClose?: () => void;
    /**
     * confirm
     */
    confirm?: {
        content: React.ReactNode;
    };
    /**
     * cancel
     */
    cancel?: {
        content: React.ReactNode;
    };
    /**
     * auto close
     */
    autoClose?: boolean;
    /**
     * auto close when mouse leave
     */
    closeWhenLeave?: boolean;
    /**
     * onClick
     */
    onClick?: () => void;
    /**
     * start position
     */
    position?: "left" | "right";
}

function createNotification(type: "success" | "info" | "warning" | "error", args: NoticeFnProps) {
    const doc = window.document;
    let node = doc.querySelector(`body > [class*=pop_container__${args.position || "right"}]`);
    if (!node) {
        node = doc.createElement("div");
        node.setAttribute("class", styles[`pop_container__${args.position || "right"}`]);
        doc.body.appendChild(node);
    }
    const div = doc.createElement("div");
    node.appendChild(div);

    const root = createRoot(div);
    root.render(<Notice type={type} {...args} mount={div} />);
}

function success(args: NoticeFnProps): void {
    createNotification("success", args);
}

function info(args: NoticeFnProps): void {
    createNotification("info", args);
}
function warning(args: NoticeFnProps): void {
    createNotification("warning", args);
}
function error(args: NoticeFnProps): void {
    createNotification("error", args);
}

export default {
    success,
    info,
    warning,
    error,
};
