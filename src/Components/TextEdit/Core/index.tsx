/**
 * @file Editor Core
 * @date 2022-02-28
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-28
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { startTransition, useCallback, useId } from "react";
import { Editor, Range } from "slate";
import { Editable, useSlateStatic } from "slate-react";
import {
    EditableProps,
    RenderElementProps,
    RenderLeafProps,
} from "slate-react/dist/components/editable";
import { MarkProps, setRichMark } from "../Unit/command";
import { Leaf } from "../Unit/leaf";
import { Render } from "../Unit/render";
import { useLatest } from "./../../../Hooks/useLatest";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const EditorCore: React.FC<EditableProps> = ({
    renderElement,
    renderLeaf,
    className,
    onMouseUp,
    ...props
}) => {
    EditorCore.displayName = "EditorCore";

    const editor = useSlateStatic();

    const cLeafFn = useLatest(renderLeaf);
    const cElementFn = useLatest(renderElement);

    const keyId = useId();

    const handleMouseUp = () => {
        startTransition(() => {
            const { noSelection, selection } = editor;
            const nullSelection = noSelection?.selection;

            if (
                selection &&
                Range.isCollapsed(selection) &&
                nullSelection &&
                JSON.stringify(nullSelection) === JSON.stringify(selection)
            ) {
                const key = Object.keys(noSelection.type)[0] as MarkProps;
                const val = noSelection.type[key];
                if (val) {
                    if (["font-size", "color", "background"].includes(key)) {
                        setRichMark(
                            editor,
                            key as "font-size" | "color" | "background",
                            val as "string | number",
                        );
                    } else {
                        Editor.addMark(editor, key, true);
                    }
                } else {
                    Editor.removeMark(editor, key);
                }
            } else {
                editor.setNoSelectionData();
            }
        });
    };

    const renderElementFn = useCallback((res: RenderElementProps) => {
        return (
            <>
                {cElementFn.current?.(res) || null}
                <Render {...res} />
            </>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderLeafFn = useCallback((res: RenderLeafProps) => {
        return (
            <>
                {cLeafFn.current?.(res) || null}
                <Leaf {...res} />
            </>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Editable
            {...props}
            className={styles.editor_wrap + (className ? ` ${className}` : "")}
            renderElement={renderElementFn}
            key={keyId}
            onMouseUp={(e) => {
                handleMouseUp();
                onMouseUp?.(e);
            }}
            renderLeaf={renderLeafFn}
        />
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
EditorCore.displayName = "EditorCore";
