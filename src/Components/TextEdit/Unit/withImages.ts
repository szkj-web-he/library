/**
 * @file with images
 * @date 2022-03-14
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-14
 */

import i18n from "i18next";
import { Editor, Transforms } from "slate";
import { message } from "../../..";
import { ImageElement } from "../slate";

export const insertImage = (editor: Editor, url: string) => {
    const text = { text: "" };
    const image: ImageElement = { type: "image", url, children: [text] };
    Transforms.insertNodes(editor, image);
};

export const fileToBase = (file: File, callback: (res: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
        if (evt.target?.result && typeof evt.target.result === "string") {
            callback(evt.target.result);
        } else {
            message.auto({
                type: "error",
                content: i18n.language === "cn" ? "上传图片失败！" : `Image upload failed!`,
            });
        }
    };
};

export const withImages = <T extends Editor>(editor: T): T => {
    const { isVoid, isInline } = editor;

    editor.isVoid = (element) => {
        return element.type && ["image", "voidText"].includes(element.type)
            ? true
            : isVoid(element);
    };
    editor.isInline = (element) => {
        return element.type && ["image", "voidText"].includes(element.type)
            ? true
            : isInline(element);
    };

    return editor;
};
