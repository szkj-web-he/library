/**
 * @file LockedEditor
 * @date 2022-02-28
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-28
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    forwardRef,
    ReactElement,
    startTransition,
    useEffect,
    useRef,
    useState,
} from "react";
import { Descendant } from "slate";
import { EditableProps } from "slate-react/dist/components/editable";
import { useUpdateEffect } from "../../..";
import classNames from "../../../Unit/classNames";
import { getLength } from "../Unit/getLength";
import { initDescendant } from "../Unit/initDescendant";
import styles from "./styles.module.scss";
import Main, { ForwardEvents } from "./Unit/main";
import Tool from "./Unit/tool";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface LockedEditorProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * value of this component
     */
    editorValue?: Descendant[] | string;
    /**
     * Functions that are triggered when the value of the editor changes
     */
    handleValueChange?: (res: Descendant[]) => void;

    /**
     * max length of this component
     */
    maxLength?: number;
    /**
     * Text Editor Core
     */
    core?: ReactElement<EditableProps>;
    /**
     * Rich Text Editor Toolbar
     */
    tool?: Array<
        | "font-size"
        | "|"
        | "bold"
        | "italic"
        | "underline"
        | "line-through"
        | "color"
        | "background"
        | "left-align"
        | "center-align"
        | "right-align"
        | "copy"
        | "img"
        | React.ReactNode
    >;
    /**
     * Whether to show the word count column
     */
    showTotal?: boolean;
    /**
     *
     * 转发修改富文本内容的方法
     * 修改富文本内容
     * * 当无法监听到editorValue产生变化时
     */
    setContent?:
        | ((res: (res?: Descendant[] | string) => void) => void)
        | React.MutableRefObject<(res?: Descendant[] | string) => void>;
    /**
     * 是否只读
     */
    readonly?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

export const LockedEditor = forwardRef<HTMLDivElement, LockedEditorProps>(
    (
        {
            editorValue,
            maxLength,
            showTotal = false,
            className,
            handleValueChange,
            core,
            onMouseEnter,
            tool,
            readonly,
            setContent,
            ...props
        },
        ref,
    ) => {
        LockedEditor.displayName = "LockedEditor";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const [value, setValue] = useState(initDescendant(editorValue));

        const [valLength, setValLength] = useState(0);

        /**
         * 是否是禁用的
         */
        const [isDisabled, setDisabled] = useState(true);

        const editorEvents = useRef<ForwardEvents>({
            setContent: (res) => {
                setValue(initDescendant(res));
            },
        });

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useUpdateEffect(() => {
            setValue(initDescendant(editorValue));
        }, [editorValue]);

        useEffect(() => {
            if (showTotal) {
                startTransition(() => {
                    setValLength(getLength(value));
                });
            }
        }, [value, showTotal]);
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const toolEl = <Tool data={tool} disable={isDisabled} />;
        if (setContent) {
            if (typeof setContent === "function") {
                setContent(editorEvents.current.setContent);
            } else {
                setContent.current = editorEvents.current.setContent;
            }
        }
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={classNames(styles.lockedEditor_wrapper, className, {
                    [styles.lockedEditor_total]: showTotal,
                })}
                onMouseEnter={(e) => {
                    onMouseEnter?.(e);
                    if (readonly) {
                        return;
                    }
                    setDisabled(false);
                }}
                ref={ref}
                {...props}
            >
                <Main
                    value={value}
                    handleValueChange={handleValueChange}
                    maxLength={maxLength}
                    core={core}
                    tool={toolEl}
                    ref={editorEvents}
                    readonly={readonly}
                />

                {showTotal ? (
                    <div className={styles.lockedEditor_textLength}>
                        字数： {valLength}
                        {maxLength ? `/ ${maxLength}` : ""}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        );
    },
);

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
LockedEditor.displayName = "LockedEditor";
