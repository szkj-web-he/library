/**
 * @file 获取所有父节点
 * @date 2023-04-06
 * @author xuejie.he
 * @lastModify xuejie.he 2023-04-06
 */

export const getAllParent = (el: Element) => {
    let node: Element | null = el;

    const elements: Element[] = [];

    while (
        node instanceof Element &&
        typeof node.tagName === "string" &&
        !["BODY", "HTML"].includes(node.tagName)
    ) {
        elements.push(node);
        node = node.parentElement;
    }
    return elements;
};

/**
 * 匹配父节点
 * @param el
 */
export const matchParent = (el: Element, parent: Element) => {
    let node: Element | null = el;
    /***
     * 匹配状态
     *
     */
    let flag = false;

    while (
        node instanceof Element &&
        typeof node.tagName === "string" &&
        !["BODY", "HTML"].includes(node.tagName) &&
        flag === false
    ) {
        if (node === parent) {
            flag = true;
        } else {
            node = node.parentElement;
        }
    }
    return flag;
};
