/**
 * @file 初始化 slate node的数据
 * @date 2022-07-23
 * @author xuejie.he
 * @lastModify xuejie.he 2022-07-23
 */

import { Descendant, Node as SlateNode } from "slate";
import { stringToSlateNodeList } from "./stringtoHtml";

export const initDescendant = (value?: Descendant[] | string) => {
    let valueData: Descendant[] = [
        {
            children: [
                {
                    text: "",
                },
            ],
        },
    ];
    if (typeof value === "string") {
        if (value.startsWith("[{")) {
            valueData = JSON.parse(value);
        } else {
            try {
                valueData = stringToSlateNodeList(value);
            } catch (error) {
                //
            }
        }
    } else if (Array.isArray(value) && SlateNode.isNodeList(value)) {
        return [...value];
    }
    return valueData;
};
