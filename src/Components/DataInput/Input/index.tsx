/**
 * @file 带有清空按钮的输入框
 * @date 2023-06-07
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { DropdownBtn, Icon, message } from "../../..";
import { useLatest } from "../../../Hooks/useLatest";
import classNames from "../../../Unit/classNames";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onInput"> {
    /**
     * width of current component
     */
    width?: string;
    /**
     * height of current component
     */
    height?: string;
    /**
     * disabled of this component
     */
    disabled?: boolean;
    /**
     * 当输入框的值发生变化时
     */
    onChange?: (res: string) => void;
    /**
     * 输入框的值
     */
    value?: string;
    /**
     * 当前输入框是否输入有误
     */
    isError?: boolean;
    /**
     * 在输入框之前添加节点
     */
    beforeNode?: React.ReactNode;
    /**
     * 在输入框之后添加节点
     */
    afterNode?: React.ReactNode;
    /**
     * 是否隐藏清除按钮
     */
    hiddenClearIcon?: boolean;

    /**
     * 当用户按下enter的时候
     */
    onEnter?: (res: string) => void;

    /**
     * 限制数字输入的时候的白名单
     *  * 默认剔除了所有特殊字符、中文、英文
     */
    include?: Array<string> | RegExp;
}

export interface InputEvents {
    /**
     * 获焦
     * @returns
     */
    focus: () => void;
    /**
     * 失焦
     * @returns
     */
    blur: () => void;
    /**
     * 清空
     */
    clear: () => void;
    /**
     * 改变input的值
     */
    setValue: (value: string) => void;
    /**
     * 获取input的值
     */
    getValue: () => string;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Input = forwardRef<InputEvents | null, InputProps>(
    (
        {
            width,
            height,
            defaultValue,
            disabled = false,
            onChange,
            onBlur,
            onFocus,
            onKeyDown,
            className,
            hiddenClearIcon = false,
            style,
            isError,
            value,
            maxLength,
            beforeNode,
            afterNode,
            type = "text",
            onCompositionStart,
            onCompositionEnd,
            onPaste,
            onDrop,
            include,
            onEnter,
            ...props
        },
        events,
    ) => {
        Input.displayName = "Input";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const cRef = useRef<null | HTMLInputElement>(null);

        const [hover, setHover] = useState(false);

        const [focus, setFocus] = useState(false);

        const [val, setVal] = useState(value);

        /**
         * defaultValue变化的次数
         */
        const defaultValueChangeCount = useRef(0);

        /**
         * 最新的default value
         */
        const defaultValueRef = useLatest(defaultValue);
        /**
         * 在输入非英文的时候临时存储下来的input值
         */
        const compositionVal = useRef<string | null>(null);
        /**
         * 合成阶段 的选区
         */
        const compositionRange = useRef<[number, number] | null>(null);
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useEffect(() => {
            if (defaultValueChangeCount.current) {
                setVal(value);
                if (cRef.current) {
                    cRef.current.value = value ?? "";
                }
            } else if (!defaultValueRef.current) {
                setVal(value);
                if (cRef.current) {
                    cRef.current.value = value ?? "";
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value]);

        useEffect(() => {
            ++defaultValueChangeCount.current;
        }, [defaultValue]);

        useImperativeHandle(events, () => {
            return {
                focus: () => {
                    setFocus(true);
                    cRef.current?.focus();
                },
                blur: () => {
                    setFocus(false);
                    cRef.current?.blur();
                },
                clear: () => {
                    setVal(undefined);
                    onChange?.("");
                    if (cRef.current) {
                        cRef.current.value = "";
                    }
                },
                setValue: (value: string) => {
                    setVal(value);
                    onChange?.(value);
                    if (cRef.current) {
                        cRef.current.value = value;
                    }
                },
                getValue() {
                    return cRef.current?.value.trim() ?? "";
                },
            };
        });
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        /**
         * 当前这个字符，是否可以录入输入框
         */
        const isEnter = (keyVal: string) => {
            if (include instanceof RegExp) {
                if (include.test(keyVal)) {
                    return true;
                }
            } else if (include instanceof Array) {
                if (include.some((item) => item === keyVal)) {
                    return true;
                }
            }

            const reg = /[0-9]/;

            return reg.test(keyVal);
        };

        /**
         * 当键盘按下时
         *
         * 1. Esc 失焦
         * 2. Enter 触发onEnter事件
         * 3. 当输入框类型为number的时候，只能输入数字
         */
        const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            onKeyDown?.(e);

            /**
             * 限制只能输入数字
             */
            const keyVal = e.key;

            if (keyVal === "Escape") {
                cRef.current?.blur();
            }

            if (keyVal === "Enter") {
                onEnter?.(e.currentTarget.value.trim());
            }

            if (type === "number") {
                if (keyVal.length > 1 || e.ctrlKey || e.altKey) {
                    return;
                }
                const status = isEnter(e.key);
                if (!status) {
                    e.preventDefault();
                    return;
                }
            }
        };
        /**
         * 当开始双拼的时候
         * 记录双拼的文字
         */
        const handleCompositionStart = (e: React.CompositionEvent<HTMLInputElement>) => {
            onCompositionStart?.(e);

            if (
                typeof e.currentTarget.selectionStart === "number" &&
                typeof e.currentTarget.selectionEnd === "number"
            ) {
                compositionRange.current = [
                    e.currentTarget.selectionStart,
                    e.currentTarget.selectionEnd,
                ];
            } else {
                compositionRange.current = null;
            }
            compositionVal.current = e.currentTarget.value;
        };

        /**
         * 当双拼结束的时候
         * 1. 当输入框类型为number的时候，只能输入数字
         */
        const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
            onCompositionEnd?.(e);
            if (maxLength && e.data.length + (compositionVal.current?.length ?? 0) >= maxLength) {
                compositionVal.current = null;
                compositionRange.current = null;
                return;
            }

            if (type !== "number") {
                compositionVal.current = null;
                compositionRange.current = null;
                return;
            }

            if (!compositionRange.current) {
                compositionVal.current = null;
                return;
            }
            /**
             * 数字输入框的逻辑
             */

            let text = "";
            for (let i = 0; i < e.data.length; i++) {
                const item = e.data[i];
                const status = isEnter(item);
                if (status) {
                    text += item;
                }
            }

            const startVal =
                compositionVal.current?.substring(0, compositionRange.current[0]) ?? "";
            const endVal = compositionVal.current?.substring(compositionRange.current[1]) ?? "";
            e.currentTarget.value = `${startVal}${text}${endVal}`;

            compositionRange.current = null;
            compositionVal.current = null;
            const val = e.currentTarget.value.trim();
            setVal(val);
            onChange?.(val);
        };
        /**
         * 当文字粘贴的时候
         * 要判断是否有剔除的字符
         * 如果有
         * 就不允许粘贴
         */
        const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
            onPaste?.(e);
            if (type !== "number") {
                return;
            }
            const str = e.clipboardData.getData("text/plain");

            for (let i = 0; i < str.length; i++) {
                const text = str[i];
                const status = isEnter(text);
                if (!status) {
                    message.bottom({
                        content: "有违规字符，无法粘贴",
                    });
                    e.preventDefault();
                    return;
                }
            }
        };

        /**
         * 当文字拖拽到输入框内的时候
         * 要判断是否有剔除的字符
         * 如果有
         * 就不允许拖拽
         */
        const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
            onDrop?.(e);
            if (type !== "number") {
                return;
            }

            const str = e.dataTransfer.getData("text/plain");

            for (let i = 0; i < str.length; i++) {
                const text = str[i];
                const status = isEnter(text);
                if (!status) {
                    message.bottom({
                        content: "有违规字符，无法粘贴",
                    });
                    e.preventDefault();
                    return;
                }
            }
        };

        /**
         * 当输入框改变时
         */
        const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.currentTarget.value.trim();
            if (compositionRange.current) {
                return;
            }

            setVal(val);
            onChange?.(val);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <DropdownBtn
                style={Object.assign({}, { width, height }, style)}
                className={classNames(styles.input_wrapper, className, {
                    [styles.input_disabled]: disabled,
                    [styles.input_active]: focus,
                    [styles.input_noClear]: hiddenClearIcon,
                    [styles.input_error]: isError,
                })}
                onMouseEnter={() => {
                    if (!disabled) {
                        setHover(true);
                    }
                }}
                onMouseLeave={() => {
                    setHover(false);
                }}
            >
                {beforeNode}
                {/* <------------------------------------ **** SECTION1 START **** ------------------------------------ */}
                <input
                    type={type === "number" ? "text" : type}
                    onKeyDown={handleKeydown}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    ref={cRef}
                    style={{ lineHeight: height }}
                    onChange={handleValueChange}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    className={styles.input_main}
                    onPaste={handlePaste}
                    onDrop={handleDrop}
                    onFocus={(e) => {
                        onFocus?.(e);
                        setFocus(true);
                    }}
                    onBlur={(e) => {
                        onBlur?.(e);
                        setFocus(false);
                    }}
                    {...props}
                />
                {hiddenClearIcon ? undefined : (
                    <Icon
                        type="empty"
                        onMouseDown={(e) => {
                            e.preventDefault();
                        }}
                        className={classNames(styles.input_clearIcon, {
                            [styles.input_active]: val && (hover || focus),
                        })}
                        onClick={() => {
                            if (disabled) {
                                return;
                            }

                            if (cRef.current) {
                                cRef.current.value = "";
                                setVal(undefined);
                                onChange?.("");
                                cRef.current.focus();
                            }
                        }}
                    />
                )}
                {afterNode}
                {/* <------------------------------------ **** SECTION1 END **** ------------------------------------ */}
            </DropdownBtn>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Input.displayName = "Input";
