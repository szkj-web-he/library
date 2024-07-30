/**
 * @file EditorContext
 * @date 2022-07-07
 * @author xuejie.he
 * @lastModify xuejie.he 2022-07-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef } from "react";
import { Descendant, Editor, Transforms } from "slate";
import { Slate } from "slate-react";
import { CustomEditor } from "../slate";
import { useLatest } from "./../../../Hooks/useLatest";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface EditorContextProps {
    editor: CustomEditor;

    value: Descendant[];

    children: React.ReactNode;

    onChange?: ((value: Descendant[]) => void) | undefined;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const EditorContext: React.FC<EditorContextProps> = ({
    editor,
    value,
    children,
    onChange,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     * slate返回的数据
     */
    const slateDataRef = useRef<Array<Descendant>>();

    const editorRef = useLatest(editor);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const valStr = JSON.stringify(value);
        if (JSON.stringify(slateDataRef.current) !== valStr) {
            Transforms.removeNodes(editorRef.current, {
                at: {
                    anchor: Editor.start(editorRef.current, []),
                    focus: Editor.end(editorRef.current, []),
                },
            });
            Transforms.insertNodes(editorRef.current, value);

            Editor.normalize(editorRef.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Slate
            editor={editor}
            value={value}
            onChange={(newValue) => {
                slateDataRef.current = newValue;
                /**
                 * slate返回的数据
                 */
                const val = JSON.stringify(newValue);
                /**
                 * 用户设置的数据
                 */
                const customVal = JSON.stringify(value);

                if (customVal !== val) {
                    onChange?.(newValue);
                }
            }}
        >
            {children}
        </Slate>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
