/**
 * @file MagneticEditor
 * @date 2022-02-28
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-28
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useMemo, useState } from "react";
import { Descendant, Editor, Transforms } from "slate";
import { EditableProps } from "slate-react/dist/components/editable";
import { useUpdateEffect } from "../../..";
import { EditorCore } from "../Core";
import { TextEditTool, TextEditToolProps } from "../Tool";
import { EditorContext } from "../Unit/editorContext";
import { initDescendant } from "../Unit/initDescendant";
import { ToolDisableContext } from "../Unit/toolContext";
import { withEditor } from "../Unit/withEditor";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface MagneticEditorProps extends EditableProps {
    /**
     * value of this component
     */
    editorValue?: Descendant[] | string;
    /**
     * Functions that are triggered when the value of the editor changes
     */
    handleValueChange?: (res: Descendant[]) => void;
    /**
     * Toolbar of the text editor
     */
    tool?: React.ReactElement<TextEditToolProps>;

    /**
     *
     * 转发修改富文本内容的方法
     * 修改富文本内容
     * * 当无法监听到editorValue产生变化时
     */
    setContent?:
        | ((res: (res?: Descendant[] | string) => void) => void)
        | React.MutableRefObject<(res?: Descendant[] | string) => void>;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const MagneticEditor: React.FC<MagneticEditorProps> = ({
    editorValue,
    handleValueChange,
    tool,
    setContent,
    readOnly,
    onMouseEnter,
    ...props
}) => {
    MagneticEditor.displayName = "MagneticEditor";
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const editor = useMemo(() => withEditor(), []);

    const [value, setValue] = useState<Descendant[]>(initDescendant(editorValue));

    /**
     * 是否是禁用的
     */
    const [isDisabled, setDisabled] = useState(true);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useUpdateEffect(() => {
        setValue(initDescendant(editorValue));
    }, [editorValue]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const callback = (res?: string | Descendant[]) => {
        const valueList = initDescendant(res);

        Transforms.removeNodes(editor, {
            at: {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, []),
            },
        });
        Transforms.insertNodes(editor, valueList);

        Editor.normalize(editor);
    };

    if (setContent) {
        if (typeof setContent === "function") {
            setContent(callback);
        } else {
            setContent.current = callback;
        }
    }

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <EditorContext editor={editor} value={value} onChange={handleValueChange}>
            <ToolDisableContext.Provider value={isDisabled}>
                {tool ?? <TextEditTool />}
            </ToolDisableContext.Provider>
            <EditorCore
                onMouseEnter={(e) => {
                    onMouseEnter?.(e);
                    if (readOnly) {
                        return;
                    }
                    setDisabled(false);
                }}
                readOnly={readOnly}
                {...props}
            />
        </EditorContext>
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
MagneticEditor.displayName = "MagneticEditor";
