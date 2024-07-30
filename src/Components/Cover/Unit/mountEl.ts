/**
 * @file 挂载到某个节点
 * @date 2023-01-31
 * @author xuejie.he
 * @lastModify xuejie.he 2023-01-31
 */
export const mountElement = (el?: Element) => {
    if (el) {
        return el;
    }
    let node = document.querySelector("div#r_portal");
    if (!node) {
        node = document.createElement("div");
        node.setAttribute("id", "r_portal");
        document.body.appendChild(node);
    }
    return node;
};
