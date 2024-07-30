/**
 * @file 在鼠标按下时 获取当前元素的left值
 * @date 2022-03-26
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-26
 */

import { getScrollValue } from "../../../..";
import { getElKey } from "../../Unit/getKey";

/**
 * 获取mousedown时的left值
 * @param {HTMLElement} el UL
 * @param {x:number,offsetX:number} value
 * @returns {number}
 */
export const getLeft = (
    el: HTMLElement,
    {
        x,
        offsetX,
    }: {
        x: number;
        offsetX: number;
    },
): number => {
    const rect = el.getBoundingClientRect();
    const scrollData = getScrollValue();

    const left = rect.left + scrollData.x;

    return x - offsetX - left;
};

/**
 * 获取每个 header li的边界
 */

export const getBoundaries = (el: HTMLUListElement) => {
    const childList = el.children;
    const boundaries: Array<{
        left: number;
        right: number;
        fixed: boolean;
    }> = [];
    for (let i = 0; i < childList.length; ) {
        const child = childList[i] as HTMLElement;
        const key = getElKey(child);
        if (child.nodeType === 1 && key && key.includes("table-header_")) {
            const attr = child.getAttribute("data-fixed");
            boundaries.push({
                left: child.offsetLeft,
                right: child.offsetLeft + child.offsetWidth,
                fixed: !!attr,
            });
        }
        ++i;
    }
    return boundaries;
};
