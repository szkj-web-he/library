/**
 * @file descendant 转化成Html
 * @date 2022-07-02
 * @author xuejie.he
 * @lastModify xuejie.he 2022-07-02
 */
import React, { createElement } from "react";
import { Descendant, Text, Element } from "slate";
import { CustomElement, CustomText } from "../slate";
import { BlockProps, MarkProps } from "./command";

export interface CommonProps {
    exclude?: Array<MarkProps | BlockProps>;

    maxLength?: number;

    deep?: number;

    length: { current: number };
}

/**
 * map的统一方法
 */
interface MapSlateDataProps extends CommonProps {
    value: Descendant[];
}

export const mapSlateData = ({
    value,
    exclude,
    maxLength,
    deep = 0,
    length,
}: MapSlateDataProps) => {
    return value.map((item, index) => {
        if (Text.isText(item)) {
            return slateTextToHtml({
                exclude,
                text: item,
                deep: deep + 1,
                maxLength,
                length,
                index,
            });
        } else if (Element.isElement(item)) {
            return slateElementToHtml({
                exclude,
                element: item,
                deep: deep + 1,
                maxLength,
                length,
                index,
            });
        }
    });
};

/**
 * element节点转化
 */

interface SlateElementToHtmlProps extends CommonProps {
    element?: CustomElement;

    deep: number;

    index: number;
}

export const slateElementToHtml = ({
    exclude,
    element,
    maxLength,
    deep,
    index,
    length,
}: SlateElementToHtmlProps): React.ReactElement | null => {
    if (element?.type && exclude && exclude.includes(element.type)) {
        return null;
    }

    const children = element?.children
        ? mapSlateData({
              value: element.children,
              exclude,
              maxLength,
              deep,
              length,
          })
        : null;

    switch (element?.type) {
        // case "quote":
        //     return createElement(
        //         "blockquote",
        //         { key: `${deep ?? 0}-${index}_elementBlockquote` },
        //         children,
        //     );
        // case "pre":
        //     return createElement(
        //         "pre",
        //         { key: `${deep ?? 0}-${index}_elementPre` },
        //         createElement("code", null, children),
        //     );
        // case "bulleted-list":
        //     return createElement("ul", { key: `${deep ?? 0}-${index}_elementUl` }, children);
        // case "heading-one":
        //     return createElement("h1", { key: `${deep ?? 0}-${index}_elementH1` }, children);
        // case "heading-two":
        //     return createElement("h2", { key: `${deep ?? 0}-${index}_elementH2` }, children);
        // case "heading-three":
        //     return createElement("h3", { key: `${deep ?? 0}-${index}_elementH3` }, children);
        // case "heading-four":
        //     return createElement("h4", { key: `${deep ?? 0}-${index}_elementH4` }, children);
        // case "heading-five":
        //     return createElement("h5", { key: `${deep ?? 0}-${index}_elementH5` }, children);
        // case "heading-six":
        //     return createElement("h6", { key: `${deep ?? 0}-${index}_elementH6` }, children);
        // case "list-item":
        //     return createElement("li", { key: `${deep ?? 0}-${index}_elementLi` }, children);
        // case "numbered-list":
        //     return createElement("ol", { key: `${deep ?? 0}-${index}_elementOl` }, children);
        // case "link":
        //     return createElement(
        //         "a",
        //         {
        //             href: element.url,
        //             key: `${deep ?? 0}-${index}_elementLink`,
        //         },
        //         children,
        //     );
        case "left-align":
            return createElement(
                "div",
                {
                    style: {
                        textAlign: "left",
                    },
                    key: `${deep ?? 0}-${index}_elementLeftAlign`,
                },
                children,
            );

        case "right-align":
            return createElement(
                "div",
                {
                    style: {
                        textAlign: "right",
                    },
                    key: `${deep ?? 0}-${index}_elementRightAlign`,
                },
                children,
            );
        case "center-align":
            return createElement(
                "div",
                {
                    style: {
                        textAlign: "center",
                    },
                    key: `${deep ?? 0}-${index}_elementCenterAlign`,
                },
                children,
            );
        case "image":
            return createElement(
                "div",
                {
                    style: {
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexFlow: "row nowrap",
                    },
                    contentEditable: false,
                    key: `${deep ?? 0}-${index}_elementSpan`,
                },
                [
                    children,
                    createElement("img", {
                        src: element.url,
                        style: { boxShadow: "none", display: "block", maxWidth: "600px" },
                        key: `${deep ?? 0}-${index}_elementImg`,
                        alt: "",
                    }),
                ],
            );

        case "voidText":
            return createElement(
                "span",
                {
                    style: { color: element.color, backgroundColor: "transparent" },
                    key: `${deep ?? 0}-${index}_elementVoidText`,
                },
                [element.content, children],
            );

        default:
            return createElement("div", { key: `${deep ?? 0}-${index}_elementSpan` }, children);
    }
};

/**
 * 文本节点转化
 */
interface SlateTextToHtmlProps extends CommonProps {
    text: CustomText;
    index: number;
}

export const slateTextToHtml = ({
    exclude,
    text,
    maxLength,
    length,
    index,
    deep,
}: SlateTextToHtmlProps) => {
    const keys: Array<MarkProps> = [];
    for (const key in text) {
        const keyVal = key as MarkProps;
        if (text[keyVal]) {
            keys.push(keyVal);
        }
    }

    if (
        !text?.text ||
        (exclude && keys.some((item) => exclude.includes(item))) ||
        (maxLength && length.current > maxLength)
    ) {
        return null;
    }

    let content = text.text;

    if (maxLength && length.current + content.length > maxLength) {
        content = content.substring(0, maxLength - length.current);

        length.current = maxLength;
    } else {
        length.current += content.length;
    }

    let child: React.ReactElement | string = content;
    if (text?.bold) {
        child = createElement("strong", null, child);
    }

    if (text?.italic) {
        child = createElement("em", null, child);
    }

    if (text?.underline) {
        child = createElement("u", null, child);
    }

    if (text?.["line-through"]) {
        child = createElement("del", null, child);
    }

    // if (text?.code) {
    //     child = createElement("code", null, child);
    // }

    const style: React.CSSProperties = {};

    if (text?.["font-size"]) {
        const value = text["font-size"];
        style.fontSize = `${value}px`;
    }

    if (text?.color) {
        const value = text.color;
        style.color = value;
    }

    if (text?.background) {
        const value = text.background;
        style.backgroundColor = value;
    }
    return createElement("span", { style, key: `${deep ?? 0}-${index}_textSpan` }, child);
};
