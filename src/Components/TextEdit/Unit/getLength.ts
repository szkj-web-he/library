/**
 * @file get Text length
 * @date 2022-03-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-11
 */

import { Descendant, Node } from "slate";

/**
 * 获取富文本的文字总数
 * @param { Descendant[]} res value
 * @returns {number}
 */
export const getLength = (res: Descendant[]): number => {
    let val = 0;
    if (Node.isNodeList(res)) {
        for (let i = 0; i < res.length; i++) {
            const item = res[i];
            val += Node.string(item).length;
        }
    }
    return val;
};
