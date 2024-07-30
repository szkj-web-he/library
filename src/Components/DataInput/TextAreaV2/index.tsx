/**
 * @file textarea components
 * @date 2021-08-11
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, startTransition, useEffect, useRef, useState } from "react";
import { nextFrame, useUpdateEffect } from "../../..";
import classNames from "../../../Unit/classNames";
import { styleObjectToString } from "./Unit/styleObjectToString";
import styles from "./style.module.scss";
import { forceReflow } from "./../../Common/Transition/Unit/forceReflow";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

export interface TextAreaV2Props {
    /**
     * width of this component
     */
    width?: string;
    /**
     * width of this component
     */
    height?: string;
    /**
     * className of this component
     */
    className?: string;
    /**
     * onBlur fn
     */
    onBlur?: () => void;
    /**
     * onFocus fn
     */
    onFocus?: () => void;
    /**
     * onInput fn
     */
    onInput?: (res: string) => void;
    /**
     * disabled of this component
     */
    disabled?: boolean;
    /**
     * maxLength of this component
     */
    maxLength?: number;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * onKeyDown fn(res=keyVal)
     */
    onKeyDown?: (res: string) => void;
    /**
     * set style when focus
     */
    focusStyle?: React.CSSProperties;
    /**
     * auto  height
     */
    autoHeight?: boolean;
    /**
     * placeholder of this component
     */
    placeholder?: string;
    /**
     * defaultValue of this component
     */
    defaultValue?: string;
    /**
     * autoFocus of this component
     */
    autoFocus?: boolean;
    /**
     * minLength of this component
     */
    minLength?: number;
    /**
     * readOnly of this component
     */
    readOnly?: boolean;
    /**
     * id of this component
     */
    id?: string;
    /**
     * value of textarea
     */
    value?: string;
    /**
     * Whether to display a prompt for the number of values typed
     */
    isTips?: boolean;
    /**
     * Whether to allow text overflow when out of focus
     */
    textOverflow?: boolean;
}

export const TextAreaV2 = forwardRef<HTMLTextAreaElement, TextAreaV2Props>(
    (
        {
            className,
            onBlur,
            onFocus,
            onInput,
            maxLength,
            style,
            width = "100%",
            height = "100%",
            onKeyDown,
            focusStyle,
            autoHeight,
            defaultValue,
            disabled,
            placeholder,
            autoFocus,
            minLength,
            readOnly,
            id,
            value,
            isTips,
            textOverflow = false,
            ...props
        },
        ref,
    ) => {
        TextAreaV2.displayName = "TextAreaV2";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const textAreaRef = useRef<null | HTMLTextAreaElement>(null);

        /**
         * 当前输入框是否获焦
         */
        const [focus, setFocus] = useState(false);

        const [textAreaHeight, setTextAreaHeight] = useState<number>();
        /**
         * 输入框的 实际 值
         */
        const [realValue, setRealValue] = useState(() => {
            if (defaultValue) {
                return defaultValue;
            } else if (value) {
                return value;
            } else {
                return "";
            }
        });

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useUpdateEffect(() => {
            setRealValue(value ?? "");
        }, [value]);

        /**
         * 1. 失去焦点时
         * 2. 文本溢出需要变点 textOverflow===true
         *
         * to do
         *  1. 监听到输入框的宽高变化时
         *  2.
         *
         */
        useEffect(() => {
            const textareaEl = textAreaRef.current;
            /**
             * 是否溢出
             */
            let isOverflow: boolean | null = null;

            /**
             * 计时器
             */
            const timer: { current: null | number } = { current: null };
            /**
             * 生命周期是否结束
             */
            let isEnd = false;

            const setTextValue = (text: string) => {
                if (textareaEl) {
                    textareaEl.value = `${text}...`;
                    forceReflow();
                }
            };

            /**
             *
             * @param splitNumber 分界线
             * @returns
             */
            const textDiff = (splitNumber: number) => {
                if (!textareaEl) {
                    //没有获取到输入框dom
                    return;
                }

                if (textareaEl.scrollHeight > textareaEl.clientHeight) {
                    /**
                     * 做了处理，这次溢出
                     */

                    if (isOverflow || isOverflow === null) {
                        /**
                         * 上次时溢出
                         */
                        isOverflow = true;
                        const index = splitNumber - 1;
                        setTextValue(realValue.slice(0, index));
                        /**
                         * 延时执行
                         */
                        void nextFrame(() => {
                            if (isEnd) {
                                return;
                            }

                            textDiff(index);
                        }, timer);
                    } else if (isOverflow === false) {
                        /**
                         * 上次没溢出
                         */
                        isOverflow = null;
                        setTextValue(realValue.slice(0, splitNumber - 1));
                    }
                    return;
                }

                /**
                 * 当前没溢出
                 */
                if (isOverflow) {
                    /**
                     * 上一次溢出了
                     */
                    isOverflow = null;
                    return;
                }

                /**
                 * 上一次没溢出
                 */

                const index = splitNumber + 1;

                if (index < realValue.length) {
                    isOverflow = false;

                    /**
                     * 当前的文字长度 小于 所有文字的长度
                     */
                    setTextValue(realValue.slice(0, index));
                    /**
                     * 延时执行
                     */
                    void nextFrame(() => {
                        if (isEnd) {
                            return;
                        }

                        textDiff(index);
                    }, timer);
                } else {
                    isOverflow = null;
                    /**
                     * 当前的文字长度 大于 等于 所有文字的长度
                     */
                    textareaEl.value = realValue;
                }
            };

            const main = () => {
                if (!textareaEl) {
                    //没有获取到输入框dom
                    return;
                }
                textareaEl.value = realValue;
                isOverflow = null;
                if (textareaEl.scrollHeight > textareaEl.clientHeight) {
                    const splitLength =
                        (textareaEl.clientHeight / textareaEl.scrollHeight) *
                        textareaEl.value.length;

                    setTextValue(realValue.slice(0, splitLength));
                    textDiff(splitLength);
                }
            };

            let observer: ResizeObserver | null = null;
            if (textareaEl && !focus && textOverflow) {
                observer = new ResizeObserver(main);
                observer.observe(textareaEl);
                startTransition(main);
                return () => {
                    textareaEl && observer?.unobserve(textareaEl);
                    isEnd = true;
                    timer.current && window.cancelAnimationFrame(timer.current);
                };
            }
        }, [focus, textOverflow, realValue]);

        /**
         * 1. 失去焦点时
         * 2. autoHeight === true
         *
         * to do
         *  1. 监听到输入框的宽高变化时
         *  2.
         */
        useEffect(() => {
            const textareaEl = textAreaRef.current;

            let cloneNode: null | HTMLTextAreaElement = null;

            let timer: null | number = null;
            const main = () => {
                timer && window.clearTimeout(timer);
                if (!textareaEl) {
                    return;
                }
                textareaEl.value = realValue;
                cloneNode = textareaEl.cloneNode() as HTMLTextAreaElement;

                const elStyle = window.getComputedStyle(textareaEl, null);
                if (textareaEl.parentElement) {
                    textareaEl.parentElement.appendChild(cloneNode);
                } else {
                    document.body.appendChild(cloneNode);
                }

                cloneNode.setAttribute(
                    "style",
                    `${styleObjectToString(
                        elStyle,
                    )}height:2px;left:0;top:0;position:absolute;opacity:0;overflow:hidden`,
                );
                cloneNode.value = realValue;
                forceReflow();
                timer = window.setTimeout(() => {
                    timer = null;
                    if (!cloneNode) {
                        return;
                    }
                    setTextAreaHeight(cloneNode.scrollHeight);
                    cloneNode?.remove();
                });
            };

            let observer: ResizeObserver | null = null;
            if (textareaEl && !focus && autoHeight) {
                observer = new ResizeObserver(main);
                observer.observe(textareaEl);
                startTransition(main);
                return () => {
                    textareaEl && observer?.unobserve(textareaEl);
                    cloneNode?.remove();
                    timer && window.clearTimeout(timer);
                };
            }
        }, [focus, autoHeight, realValue]);

        /**
         * 如果既不需要autoHeight
         * 也不需要溢出变点
         */
        useEffect(() => {
            const textareaEl = textAreaRef.current;

            if (!focus && !autoHeight && !textOverflow && textareaEl) {
                textareaEl.value = realValue;
            }
        }, [focus, autoHeight, textOverflow, realValue]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            const keyVal = e.key;
            if (keyVal === "Escape") {
                textAreaRef.current?.blur();
            }
            onKeyDown?.(keyVal);
        };

        const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
            e.currentTarget.value = realValue;
            onFocus?.();
            setFocus(true);
        };

        const handleBlur = () => {
            onBlur?.();
            setFocus(false);
        };

        const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const el = e.currentTarget;
            const val = el.value;
            setRealValue(val);
            onInput?.(val);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={classNames(styles.textAreaV2_wrap, className, {
                    [`${styles.textAreaV2_wrap__disabled}`]: disabled,
                })}
                style={Object.assign(
                    {},
                    { width },
                    { height: textAreaHeight ? "auto" : height },
                    focus ? focusStyle || { borderColor: "#478DA5" } : {},
                )}
            >
                <textarea
                    style={{
                        ...style,
                        height: textAreaHeight,
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    minLength={minLength}
                    readOnly={readOnly}
                    id={id}
                    ref={(el) => {
                        textAreaRef.current = el;
                        if (typeof ref === "function") {
                            ref(el);
                        } else if (ref !== null) {
                            (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                        }
                    }}
                    maxLength={maxLength || undefined}
                    className={classNames(styles.textAreaV2_textarea, {
                        [styles.textAreaV2_overflow]: !focus && (textOverflow || autoHeight),
                    })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                    {...props}
                />
                {isTips && Number(maxLength) > 0 && (
                    <div className={styles.textAreaV2_tips}>
                        {realValue.length}/{maxLength}
                    </div>
                )}
            </div>
        );
    },
);

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
TextAreaV2.displayName = "TextAreaV2";
