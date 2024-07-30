/**
 * @file mark editor
 * @date 2022-03-02
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-02
 */
import i18n from "i18next";
import { Editor, Element as SlateElement, Range, Transforms } from "slate";
import { message } from "../../..";
import { CustomText, ImageElement } from "../slate";
import { getLength } from "./getLength";

export type EmptyText = {
    text: string;
};

export type MarkProps =
    | "bold"
    | "italic"
    | "line-through"
    | "underline"
    | "font-size"
    | "color"
    | "background";

export type BlockProps = "left-align" | "right-align" | "center-align" | "image" | "voidText";

/**
 * 反选command
 * 只对应行类 mark
 * @param {BaseEditor} editor 编辑容器
 * @param {MarkProps} format 格式,可以反选的格式
 */
export const toggleMark = (editor: Editor, format: MarkProps): void => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
    setNoSelection(editor, format, !isActive);
};

/**
 * 当时mark是否为活跃状态
 * @param {BaseEditor} editor 编辑容器
 * @param {MarkProps} format 格式,可以反选的格式
 */
export const isMarkActive = (editor: Editor, format: MarkProps) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] : false;
};

/**
 * 当时block command是否为活跃状态
 * @param  {BaseEditor} editor 编辑容器
 * @param {BlockProps} format 格式,可以反选的格式
 * @returns {boolean}
 */
export const isBlockActive = (editor: Editor, format: BlockProps): boolean => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
        Editor.nodes(editor, {
            //等下看看这个
            at: Editor.unhangRange(editor, selection),
            match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
        }),
    );

    return !!match;
};

/**
 * 反选command
 * 只对应块级元素
 * @param {BaseEditor} editor 编辑容器
 * @param {BlockProps} format 格式,可以块级标志
 */
export const toggleBlock = (editor: Editor, format: BlockProps) => {
    const isActive = isBlockActive(editor, format);

    const newProperties = {
        type: isActive ? null : format,
    } as Partial<SlateElement>;
    Transforms.setNodes(editor, newProperties);
};

export type RichMarkProps = "font-size" | "color" | "background" | "img";

const setNoSelection = (editor: Editor, format: MarkProps, val: number | string | boolean) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
        editor.setNoSelectionData({
            selection,
            type: {
                [format]: val,
            } as CustomText,
        });
    }
};

/**
 * 设置非true mark
 * @param {BaseEditor} editor 编辑容器
 * @param {number|string} val
 */
export const setRichMark = (editor: Editor, format: RichMarkProps, val: number | string): void => {
    if (format !== "img") {
        setNoSelection(editor, format, val);
    }
    Editor.addMark(editor, format, val);
};

/**
 * 删除 非true的mark
 * @param {BaseEditor} editor 编辑容器
 */
export const removeRichMark = (editor: Editor, format: RichMarkProps) => {
    if (format !== "img") {
        setNoSelection(editor, format, false);
    }

    Editor.removeMark(editor, format);
};

/**
 * 设置非true mark
 * @param {BaseEditor} editor 编辑容器
 * @param {string} url
 */
export const addImage = (editor: Editor, url: string): void => {
    const { maxLength, children } = editor;

    if (maxLength) {
        const leftLength = getLength(children);
        if (leftLength >= maxLength) {
            message.auto({
                title: "Error!",
                type: "error",
                content:
                    i18n.language === "cn"
                        ? "内容过长，无法插入图片！"
                        : "Content is too long, Unable to insert images!",
            });

            return;
        }
    }

    const text = { text: "" };
    const image: ImageElement = { type: "image", url, children: [text] };
    Transforms.insertNodes(editor, image);
};
