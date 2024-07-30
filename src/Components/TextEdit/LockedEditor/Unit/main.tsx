/**
 * @file
 * @date 2023-03-17
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, ReactElement, useImperativeHandle, useMemo } from "react";
import { Editor, Element as SlateElement, Transforms } from "slate";
import { EditableProps } from "slate-react/dist/components/editable";
import {
    Descendant,
    EditorContext,
    EditorCore,
    initDescendant,
    ScrollComponent,
    withEditor,
} from "../../../..";
import styles from "../styles.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 富文本内容
     */
    value: Descendant[];
    /**
     * 当富文本内容发生变化时会触发
     */
    handleValueChange?: (res: Descendant[]) => void;
    /**
     *
     */
    maxLength?: number;
    /**
     * Text Editor Core
     */
    core?: ReactElement<EditableProps>;
    /**
     * 工具栏
     */
    tool: React.ReactNode;
    /**
     * 是否只读
     */
    readonly?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export interface ForwardEvents {
    setContent: (res?: string | Descendant[]) => void;
}

const Temp: React.ForwardRefRenderFunction<ForwardEvents | null, TempProps> = (
    { value, handleValueChange, maxLength, core, tool, readonly },
    ref,
) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const editor = useMemo(
        () =>
            withEditor({
                maxLength,
            }),
        [maxLength],
    );

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useImperativeHandle(ref, () => {
        return {
            setContent: (res) => {
                const cEditorValue = initDescendant(res);

                Transforms.removeNodes(editor, {
                    at: {
                        anchor: Editor.start(editor, []),
                        focus: Editor.end(editor, []),
                    },
                });
                Transforms.insertNodes(editor, cEditorValue);

                Editor.normalize(editor);
            },
        };
    });

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    /**
     * 编辑框部分
     */
    const coreEl = core ?? (
        <ScrollComponent
            className={styles.lockedEditor_scrollComponent}
            bodyClassName={styles.lockedEditor_scrollBody}
        >
            <EditorCore
                placeholder="请在这里输入文章内容"
                className={styles.lockedEditor_editorCore}
                readOnly={readonly}
                onKeyUp={(e) => {
                    const { selection } = editor;

                    if (selection) {
                        const [match] = Array.from(
                            Editor.nodes(editor, {
                                at: Editor.unhangRange(editor, selection),
                                match: (n) =>
                                    !Editor.isEditor(n) &&
                                    SlateElement.isElement(n) &&
                                    n.type === "image",
                            }),
                        );
                        const code = e.key;
                        if (code === "Enter" && !!match) {
                            editor.insertNode({
                                children: [{ text: "" }],
                            });
                        }
                    }
                }}
            />
        </ScrollComponent>
    );
    return (
        <EditorContext editor={editor} value={value} onChange={handleValueChange}>
            {tool}
            {coreEl}
        </EditorContext>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default forwardRef(Temp);
