/**
 * @file 获取transform的每个值
 * @date 2022-05-27
 * @author xuejie.he
 * @lastModify xuejie.he 2022-05-27
 */

export const getTransformAttr = (el: Element) => {
    const attr = window.getComputedStyle(el, null).transform;

    if (attr.includes("matrix")) {
        const attrArr = attr.replace(/(matrix|[()])/g, "").split(",");
        return {
            scaleX: Number(attrArr[0]),
            skewY: Number(attrArr[1]),
            skewX: Number(attrArr[2]),
            scaleY: Number(attrArr[3]),
            translateX: Number(attrArr[4]),
            translateY: Number(attrArr[5]),
        };
    } else {
        return null;
    }
};
