/**
 * @file 判断dom的文本是否溢出
 * @date 2023-12-12
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-12
 */

export const isOverflow = (target: EventTarget & Element) => {
    const el = target as EventTarget &
        Element & {
            offsetWidth?: number;
            scrollWidth?: number;
        };

    if (typeof el?.offsetWidth === "number" && typeof el?.scrollWidth === "number") {
        return el.scrollWidth > el.offsetWidth;
    }
    return false;
};
