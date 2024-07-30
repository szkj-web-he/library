/**
 * @file with max length
 * @date 2022-04-20
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-20
 */
/**
 * 限制输入
 * 当文字长度达到maxLength时 不再可以输入
 */

import { Editor, Node } from "slate";
import { getLength } from "./getLength";

export const withMaxLength = <T extends Editor>(editor: T): T => {
    const { apply } = editor;

    editor.apply = (op) => {
        const { maxLength, children } = editor;

        let leftLength = 0;
        let currentLength = 0;

        if (op.type !== "set_selection") {
            editor.noSelection = undefined;
        }
        switch (op.type) {
            case "set_selection":
                apply(op);
                return;

            case "insert_node":
                if (maxLength) {
                    leftLength = getLength(children);
                    currentLength = Node.string(op.node).length;
                    if (leftLength + currentLength > maxLength) {
                        return;
                    }
                }

                apply(op);
                return;

            case "insert_text":
                if (maxLength) {
                    leftLength = getLength(children);
                    if (leftLength + op.text.length > maxLength) {
                        apply(op);
                        apply({
                            type: "remove_text",
                            path: op.path,
                            offset: op.offset,
                            text: op.text,
                        });
                        return;
                    }
                }

                apply(op);

                return;

            default:
                apply(op);
                return;
        }
    };

    return editor;
};
