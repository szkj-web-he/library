/**
 * @file abc
 * @date 2022-03-15
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-15
 */
import i18n from "i18next";
import { Node, Transforms } from "slate";
import { message } from "../../..";
import { isUrl } from "../../../Unit/isUrl";
import { CustomEditor } from "../slate";
import { stringToSlateNodeList } from "./stringtoHtml";
import { fileToBase, insertImage } from "./withImages";

/**
 *
 * @param editor
 * @returns
 */
export const withHtml = <T extends CustomEditor>(editor: T): T => {
    const { insertData } = editor;

    editor.insertData = (data) => {
        const text = data.getData("text/plain");
        const { files } = data;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; ) {
                //3M
                const maxFileSizeB = 3 * 1024 * 1024;
                const file = files[i];
                if (file.size > maxFileSizeB) {
                    message.auto({
                        type: "error",
                        content:
                            i18n.language === "cn"
                                ? "上传文件体积过大！"
                                : "Sorry that this picture is so big!",
                    });
                    i = files.length;
                } else {
                    void fileToBase(file, (url) => {
                        insertImage(editor, url);
                    });
                    ++i;
                }
            }
            return;
        }

        if (isUrl(text)) {
            insertImage(editor, text);
            return;
        }

        const string = data.getData("application/x-slate-fragment");
        if (string) {
            const decodeVal = window.decodeURIComponent(window.atob(string));
            const parsed = JSON.parse(decodeVal) as Node[];
            Transforms.insertFragment(editor, parsed);
            return;
        }
        const html = data.getData("text/html");

        if (html) {
            const fragment = stringToSlateNodeList(html);
            try {
                Transforms.insertFragment(editor, fragment);
            } catch {
                return;
            }

            return;
        }
        insertData(data);
    };

    return editor;
};
