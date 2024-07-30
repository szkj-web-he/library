/**
 * @file FixedSizeText component
 * @date 2021-09-24
 * @author xuejie.he
 * @lastModify xuejie.he 2021-09-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    createElement,
    forwardRef,
    ReactNode,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { flushSync } from "react-dom";
import { createRoot, Root } from "react-dom/client";
import styles from "./style.module.scss";
import { sliceNode } from "./Unit/sliceNode";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface FixedSizeTextProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
    /**
     * 溢出时结尾处要展示的节点
     * 默认值
     * ...
     *
     * * 如果传入的是一个 React Element建议用useMemo包起来
     * * 不然会导致不必要的重新渲染
     * * 如果是string类型 不用
     * * 原因: {a:1} !== {a:1}
     * * 但是 1 === 1;
     */
    nodeOnOverflow?: React.ReactNode;
    /**
     * 文本内容
     *
     * * 同nodeOnOverflow
     */
    content?: React.ReactNode;
    /**
     * 在文本前插入的节点
     * 始终都会展示
     * * 同nodeOnOverflow
     */
    before?: ReactNode;
    /**
     * 在文本后插入的节点
     * 始终都会展示
     *
     * * 同nodeOnOverflow
     */
    after?: ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const FixedSizeText = forwardRef<HTMLDivElement, FixedSizeTextProps>(
    ({ nodeOnOverflow = "...", style, className, content, before, after, ...props }, ref) => {
        FixedSizeText.displayName = "FixedSizeText";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        /**
         * 文本节点
         */
        const textRef = useRef<HTMLSpanElement | null>(null);

        /**
         * body容器
         */
        const wrapRef = useRef<HTMLDivElement | null>(null);

        /**
         * 文本内容
         */

        const textContent = useRef<string>();

        /**
         * 是否展示 nodeOnOverflow的值
         */
        const [visible, setVisible] = useState(() => {
            return false;
        });
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useLayoutEffect(() => {
            const el = wrapRef.current;
            let destroy = false;
            let createReadonlyNode: null | HTMLDivElement = null;
            let root: Root | undefined = undefined;
            let timer: null | number = null;
            /**
             * 重置节点
             * 将文本节点的内容重置赋值为children
             */
            const restNode = () => {
                return new Promise<HTMLElement | null>((resolve, reject) => {
                    const app = createElement(
                        "div",
                        {
                            ref: (ref) => {
                                if (destroy) {
                                    reject();
                                    return;
                                }
                                resolve(ref);
                            },
                            style: {
                                display: "none",
                            },
                        },
                        content,
                    );
                    createReadonlyNode = document.createElement("div");
                    root = createRoot(createReadonlyNode);
                    root.render(app);
                    document.body.appendChild(createReadonlyNode);
                });
            };

            /**
             * 销毁 根据children创建的 节点
             */
            const destroyNode = () => {
                window.setTimeout(() => {
                    root?.unmount();
                    createReadonlyNode?.remove();
                });
            };

            /**
             * 改变文本输入框的html
             */
            const setHtml = (el: HTMLElement, length?: number) => {
                const textEl = textRef.current;
                if (!textEl) {
                    return;
                }
                const htmlStr = length ? sliceNode(el, length) : el.innerHTML;
                textEl.innerHTML = htmlStr;
                textContent.current = htmlStr;
            };

            /**
             * 开始计算是否溢出
             * 判断状态
             */
            const handleChangeFn = () => {
                timer && window.clearTimeout(timer);
                void restNode().then((res) => {
                    const textEl = textRef.current;

                    if (!res || !el || !textEl) {
                        return;
                    }
                    setHtml(res);

                    let offsetHeight = el.offsetHeight;
                    let scrollHeight = el.scrollHeight;

                    /**
                     * 允许滚动高度和可见高度的误差值
                     */
                    const diffVal = 4;

                    if (scrollHeight - diffVal <= offsetHeight) {
                        setVisible(false);
                        destroyNode();
                        return;
                    }
                    /**
                     * 当前状态
                     * 是否为溢出
                     * 1 为溢出
                     * -1 为非溢出
                     * 0 为初始值
                     *
                     * 一定是从溢出的状态变成非溢出 才能终止
                     */

                    let status = 0;

                    const total = res.innerText.length;
                    let length = Math.ceil((offsetHeight / scrollHeight) * total);
                    setHtml(res, length);

                    const main = () => {
                        if (destroy) {
                            destroyNode();
                            return;
                        }
                        offsetHeight = el.offsetHeight;
                        scrollHeight = el.scrollHeight;

                        if (status === 1) {
                            if (scrollHeight - diffVal <= offsetHeight) {
                                destroyNode();
                                return;
                            }
                            status = 1;
                            --length;
                            setHtml(res, length);
                            main();
                            return;
                        }
                        if (scrollHeight - diffVal <= offsetHeight) {
                            status = -1;
                            ++length;
                        } else {
                            status = 1;
                            --length;
                        }
                        setHtml(res, length);
                        main();
                    };
                    flushSync(() => {
                        setVisible(() => {
                            timer = window.setTimeout(() => {
                                timer = null;
                                if (destroy) {
                                    return;
                                }
                                main();
                            });
                            return true;
                        });
                    });
                });
            };

            const resizeFn = (e?: Event) => {
                timer && window.clearTimeout(timer);
                timer = window.setTimeout(
                    () => {
                        timer = null;
                        if (destroy) {
                            return;
                        }
                        handleChangeFn();
                    },
                    e ? undefined : 50,
                );
            };

            resizeFn();
            const observer = new ResizeObserver(handleChangeFn);
            el && observer.observe(el);
            return () => {
                el && observer.unobserve(el);
                destroy = true;
                destroyNode();
                timer && window.clearTimeout(timer);
            };
        }, [nodeOnOverflow, content, before, after]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                {...props}
                className={styles.fixedSizeText_wrap + (className ? ` ${className}` : "")}
                ref={(el) => {
                    wrapRef.current = el;
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                    }
                }}
                style={style}
            >
                {before}

                <span
                    ref={textRef}
                    dangerouslySetInnerHTML={{ __html: textContent.current ?? "" }}
                />
                {visible ? nodeOnOverflow : <></>}

                {after}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
FixedSizeText.displayName = "FixedSizeText";
