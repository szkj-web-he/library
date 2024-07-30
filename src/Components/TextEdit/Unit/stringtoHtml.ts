/**
 * @file 将字符串转化为slate可用的数据
 * @date 2022-07-07
 * @author xuejie.he
 * @lastModify xuejie.he 2022-07-07
 */

import { Descendant, Element as SlateElement, Text } from "slate";
import { colorList } from "../../../DefaultData/TextEditor/colorList";
import { fontSizeList } from "../../../DefaultData/TextEditor/fontSize";
import { otherToRGB } from "../../DataDisplay/ColorPicker/Unit/colorConversion";
import { CustomElement, CustomText } from "../slate";
import { deepCloneData } from "./../../..";

const getFontSize = (style: CSSStyleDeclaration) => {
    const { fontSize } = style;
    if (typeof fontSize === "string") {
        const value = Number(fontSize.replace("px", ""));
        fontSizeList.includes(value);
        return value;
    }
};

const getColor = (style: CSSStyleDeclaration) => {
    const { color } = style;
    const colorVal = color && otherToRGB(color);
    const val = colorVal && `rgb(${colorVal.join(",")})`;
    if (
        val &&
        colorList.some((items) => {
            return items.some((item) => item.includes(val));
        })
    ) {
        return val;
    }
};

const getBackgroundColor = (style: CSSStyleDeclaration) => {
    const b = style.background;
    const bc = style.backgroundColor;
    const bVal = b && typeof b === "string" && `rgb(${otherToRGB(b).join(",")}`;
    const bcVal = bc && `rgb(${otherToRGB(bc).join(",")})`;
    if (
        bVal &&
        colorList.some((items) => {
            return items.some((item) => item.includes(bVal));
        })
    ) {
        return bVal;
    } else if (
        bcVal &&
        colorList.some((items) => {
            return items.some((item) => item.includes(bcVal));
        })
    ) {
        return bcVal;
    }
};

const getStyleProps = (style: undefined | CSSStyleDeclaration, props: CustomText) => {
    const bg = style && getBackgroundColor(style);
    if (bg) {
        props.background = bg;
    }
    const fontSize = style && getFontSize(style);
    if (fontSize) {
        props["font-size"] = fontSize;
    }

    const color = style && getColor(style);
    if (color) {
        props.color = color;
    }

    if (style?.fontWeight.includes("bold") || Number(style?.fontWeight) > 400) {
        props.bold = true;
    }

    if (style?.fontStyle === "italic") {
        props.italic = true;
    }
    if (style?.textDecoration.includes("line-through")) {
        props["line-through"] = true;
    }
    if (style?.textDecoration.includes("underline")) {
        props.underline = true;
    }
    return props;
};

const matchHtml = (
    node: Element,
    container: Descendant[],
    style: undefined | CSSStyleDeclaration,
    props: CustomText,
) => {
    let elementData: CustomElement | null = null;
    if (!node.textContent?.replace(/\n/g, "")) {
        return;
    }
    const attr = deepCloneData(props);
    switch (node.tagName) {
        case "STRONG":
            attr.bold = true;
            break;
        case "B":
            attr.bold = true;
            break;
        case "EM":
            attr.italic = true;
            break;
        case "I":
            attr.italic = true;
            break;
        case "U":
            attr.underline = true;
            break;
        case "DEL":
            attr["line-through"] = true;
            break;
        case "S":
            attr["line-through"] = true;
            break;

        case "IMG":
            elementData = {
                type: "image",
                url: node.getAttribute("src") ?? undefined,
                children: [{ text: "" }],
            };
            container.push(elementData);
            return;
    }

    switch (style?.textAlign && node.textContent) {
        case "left":
            elementData = {
                type: "left-align",
                children: [],
            };

            mapData(node.childNodes, elementData.children, getStyleProps(style, { text: "" }));
            return;
        case "center":
            elementData = {
                type: "center-align",
                children: [],
            };
            mapData(node.childNodes, elementData.children, getStyleProps(style, { text: "" }));
            return;
        case "right":
            elementData = {
                type: "right-align",
                children: [],
            };
            mapData(node.childNodes, elementData.children, getStyleProps(style, { text: "" }));
            return;
    }
    getStyleProps(style, attr);

    const blockElementTag = ["DIV", "UL", "OL", "LI", "P", "H1", "H2", "H3", "H4", "H5", "H6", "P"];
    if (blockElementTag.includes(node.tagName)) {
        const parentEl = node.parentElement;
        if (
            parentEl &&
            blockElementTag.includes(parentEl.tagName) &&
            parentEl.childNodes.length === 1
        ) {
            mapData(node.childNodes, container, getStyleProps(style, { text: "" }));
            return;
        }

        elementData = {
            children: [],
        };

        mapData(node.childNodes, elementData.children, getStyleProps(style, { text: "" }));
        container.push(elementData);

        return;
    }

    mapData(node.childNodes, container, attr);
};

/**
 * 将html str转化维 slate node
 */
export const stringToSlateNodeList = (res: string) => {
    const parsed = new window.DOMParser().parseFromString(res, "text/html");

    if (parsed.body.textContent) {
        const container: Descendant[] = [];
        mapData(parsed.body.childNodes, container);

        return normalize(container);
    } else {
        return [
            {
                children: [
                    {
                        text: "",
                    },
                ],
            },
        ] as Descendant[];
    }
};

const cloneCustomText = (data: CustomText) => {
    const cloneData: Record<string, unknown> = { text: undefined };
    for (const key in data) {
        const keyVal = key as keyof typeof data;

        if (key !== "text") {
            cloneData[keyVal] = data[keyVal];
        }
    }
    return cloneData;
};

const joinData = (res: CustomText[]) => {
    const arr: CustomText[] = [];

    let index = 0;
    let initData = res[index];
    let nextData = res[++index];
    while (nextData) {
        // 这里拼接字符串
        const cInitData = JSON.stringify(cloneCustomText(initData));
        const cNextData = JSON.stringify(cloneCustomText(nextData));

        if (cInitData === cNextData) {
            initData.text += nextData.text;
        } else {
            arr.push(deepCloneData(initData));
            initData = res[index];
        }
        ++index;
        nextData = res[index];
    }
    arr.push(deepCloneData(initData));
    return arr;
};

/**
 * 标准化数据
 */
const normalize = (container: Descendant[]) => {
    const arr: Descendant[] = [];

    let child: CustomText[] | null = null;
    for (let i = 0; i < container.length; i++) {
        const item = container[i];
        if (SlateElement.isElement(item)) {
            if (Array.isArray(child)) {
                arr.push({
                    children: deepCloneData(joinData(child)),
                });
                child = null;
            }
            findChildren(item, arr);
        } else if (Text.isText(item) && item.text.replace(/\n/g, "")) {
            item.text = item.text.replace(/\n/g, "");
            if (Array.isArray(child)) {
                child.push({ ...item });
            } else {
                child = [{ ...item }];
            }
        }
    }
    if (Array.isArray(child)) {
        arr.push({
            children: deepCloneData(joinData(child)),
        });
        child = null;
    }
    return arr;
};

const pushData = (childList: CustomText[], container: Descendant[], el: CustomElement) => {
    const lastEl = container[container.length - 1];

    const currentEl = deepCloneData(joinData(childList));
    if (
        !(
            SlateElement.isElement(lastEl) &&
            lastEl.children.length === 1 &&
            currentEl.length === 1 &&
            !currentEl[0].text.replace(/ /g, "") &&
            JSON.stringify(cloneCustomText(lastEl.children[0] as CustomText)) ===
                JSON.stringify(cloneCustomText(currentEl[0]))
        )
    ) {
        container.push({
            ...el,
            children: currentEl,
        });
    }
};

/**
 * 找children
 */
const findChildren = (el: CustomElement, container: Descendant[]) => {
    let childList: CustomText[] | null = null;

    for (let i = 0; i < el.children.length; i++) {
        const item = el.children[i];

        if (Text.isText(item)) {
            if (item.text.replace(/\n/g, "")) {
                item.text = item.text.replace(/\n/g, "");
                if (Array.isArray(childList)) {
                    childList.push({ ...item });
                } else {
                    childList = [{ ...item }];
                }
            }
        } else if (SlateElement.isElement(item)) {
            if (childList) {
                pushData(childList, container, item);
                childList = null;
            }

            findChildren(item, container);
        }
    }
    if (childList) {
        pushData(childList, container, el);
        childList = null;
    }
};

/**
 * map 数据
 * @param childList
 * @param container
 * @param attr
 */
const mapData = (childList: NodeListOf<ChildNode>, container: Descendant[], attr?: CustomText) => {
    for (let i = 0; i < childList.length; i++) {
        const child = childList[i];
        let style: CSSStyleDeclaration | undefined = undefined;
        if (child instanceof Element) {
            style = window.getComputedStyle(child, null);
        }

        if (child.nodeType === 1 && child instanceof Element) {
            matchHtml(child, container, style, attr ?? { text: "" });
        } else if (child.nodeType === 3 && child.textContent) {
            const styleAttr =
                child.parentElement && window.getComputedStyle(child.parentElement, null);
            let color: undefined | string = undefined;
            let background: undefined | string = undefined;
            if (styleAttr?.background && styleAttr.background === styleAttr?.color) {
                color = styleAttr?.color;
            } else {
                color = styleAttr?.color;
                background = styleAttr?.backgroundColor;
            }

            container.push({
                ...attr,
                color,
                background,
                text: child.textContent,
            });
        }
    }
};
