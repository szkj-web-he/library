/**
 * @file slate数据转化为react element
 * @date 2022-07-02
 * @author xuejie.he
 * @lastModify xuejie.he 2022-07-02
 */

import { createElement } from "react";
import { Descendant, Element as SlateElement, Node, Text } from "slate";
import { BlockProps, EmptyText, MarkProps } from "./command";
import { mapSlateData } from "./toHtml";
import { deepCloneData } from "./../../../Unit/deepCloneData";

interface DescendantToReactNodeProps {
    value: Descendant[] | string;

    exclude?: Array<MarkProps | BlockProps>;

    maxLength?: number;
}

/**
 * 将slate数据转化为react node
 */
export const descendantToReactNode = ({
    value,
    exclude,
    maxLength,
}: DescendantToReactNodeProps) => {
    if (Node.isNodeList(value)) {
        return createElement(
            "div",
            { style: { whiteSpace: "pre-wrap", overflowWrap: "break-word" } },
            mapSlateData({
                value,
                exclude,
                maxLength,
                length: { current: 0 },
            }),
        );
    }

    let reactNode: React.ReactNode = null;
    try {
        const data = JSON.parse(value);
        if (data && Node.isNodeList(value)) {
            reactNode = createElement(
                "div",
                { style: { whiteSpace: "pre-wrap", overflowWrap: "break-word" } },
                mapSlateData({
                    value: data,
                    exclude,
                    maxLength,
                    length: { current: 0 },
                }),
            );
        }
    } catch (error) {
        reactNode = createElement(
            "text",
            typeof value === "object" ? JSON.stringify(value) : value,
        );
    }
    return reactNode;
};

/**
 * 开始递归过滤
 */
const startFilterDescendant = (
    res: DescendantToReactNodeProps & { currentLength: { current: number } },
) => {
    const data: Descendant[] = [];
    for (let i = 0; i < res.value.length; ) {
        const item = deepCloneData(res.value[i]);
        if (typeof res.maxLength === "number" && res.currentLength.current >= res.maxLength) {
            i = res.value.length;
        } else if (SlateElement.isElement(item)) {
            /**
             * 当 当前节点为slate element时
             */

            if (item.type && res.exclude?.includes(item.type)) {
                /**
                 * 当 当前节点的类型为要提出的类型时
                 */
            } else {
                data.push({
                    ...item,
                    children: startFilterDescendant({
                        value: item.children,
                        maxLength: res.maxLength,
                        exclude: res.exclude,
                        currentLength: res.currentLength,
                    }) as EmptyText[],
                });
            }
            ++i;
        } else if (res.exclude?.some((key) => (item as Record<string, unknown>)[key])) {
            /**
             * 当 当前文本的类型为要提出的类型时
             */
            ++i;
        } else if (Text.isText(item)) {
            const cLength = Node.string(item).length;
            if (
                typeof res.maxLength === "number" &&
                cLength + res.currentLength.current >= res.maxLength
            ) {
                data.push({
                    ...item,
                    text: item.text.slice(0, res.maxLength - res.currentLength.current),
                });

                res.currentLength.current = res.maxLength;
                i = res.value.length;
            } else {
                res.currentLength.current += cLength;
                data.push(item);
                ++i;
            }
        } else {
            ++i;
        }
    }
    return data;
};

/**
 * 过滤数据
 */
export const filterDescendant = (res: DescendantToReactNodeProps) => {
    const currentLength = { current: 0 };
    return startFilterDescendant({ ...res, ...{ currentLength } });
};
