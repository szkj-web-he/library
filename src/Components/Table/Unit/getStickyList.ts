/**
 * @file 获取粘性定位的元素的位置
 * @date 2022-03-28
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-28
 */

import { getElKey } from "./getKey";
import styles from "../Title/style.module.scss";

export interface FixedProps {
    value: number;
    className?: string;
}

/**
 * 获取粘性定位的 列表
 */

export const getStickyList = (_ul: HTMLUListElement) => {
    const childList = _ul.children;

    const scrollBody = _ul.parentElement;
    if (!scrollBody) {
        return;
    }

    let left = 0;
    let right = 0;
    const fixedList: Array<null | FixedProps> = [];
    let leftIndex = -1;
    let rightIndex = childList.length;

    /**
     * 过滤出所有为Left的 li的属性
     * 正序
     */
    let index = 0;
    const sum: number[] = [];
    let count = 0;
    for (let i = 0; i < childList.length; i++) {
        const el = childList[i] as HTMLElement;
        const key = getElKey(el);
        if (el.nodeType === 1 && key?.startsWith("table-header_")) {
            if (key.includes("left")) {
                fixedList[index] = { value: left };

                left += el.getBoundingClientRect().width;
                /**
                 * 为什么要加1比较
                 *   因为 这个
                 */
                if (index > leftIndex && el.offsetLeft > count) {
                    leftIndex = index;
                }
            } else {
                fixedList[index] = null;
            }
            ++index;
            sum.push(count);
            count += el.offsetWidth;
        }
    }

    /**
     * 过滤出所有为Right的 li的属性
     * 倒叙
     */
    index = fixedList.length - 1;
    count = 1;
    for (let i = childList.length - 1; i >= 0; i--) {
        const el = childList[i] as HTMLElement;
        const key = getElKey(el);
        if (el.nodeType === 1 && key?.startsWith("table-header_")) {
            if (key.includes("right")) {
                fixedList[index] = { value: right };

                right += el.getBoundingClientRect().width;

                if (el.offsetLeft - 1 < sum[index] - count && index < rightIndex) {
                    rightIndex = index;
                }
            }
            --index;
            ++count;
        }
    }

    const leftData = fixedList[leftIndex];
    const rightData = fixedList[rightIndex];

    if (leftData) {
        leftData.className = styles.table_toRight;
    }
    if (rightData) {
        rightData.className = styles.table_toLeft;
    }

    return fixedList;
};
