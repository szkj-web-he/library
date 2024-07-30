/**
 * @file with editor
 * @date 2022-03-15
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-15
 */

import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { withHtml } from "./withHtml";
import { withImages } from "./withImages";
import { withMaxLength } from "./withMaxLength";
import { withPoint } from "./withPoint";

interface withEditorProps {
    maxLength?: number;
}

const initProps = (): withEditorProps => ({});

export const withEditor = (props = initProps()) => {
    const editor = withHtml(
        withImages(withReact(withPoint(withMaxLength(withHistory(createEditor()))))),
    );

    if (props.maxLength) {
        const e = editor;
        e.maxLength = props.maxLength;
        return e;
    }
    return editor;
};
