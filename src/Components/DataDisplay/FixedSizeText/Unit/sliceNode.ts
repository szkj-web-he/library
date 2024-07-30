/**
 * @file 截切节点
 * @date 2023-01-10
 * @author xuejie.he
 * @lastModify xuejie.he 2023-01-10
 */
/**
 * 浅克隆
 */
const cloneNode = (el: Node) => {
    return el.cloneNode(false);
};

/**
 * 从 dom中拿到第length之前的所有节点
 */
export const sliceNode = (el: HTMLElement, length: number) => {
    const start = { current: 0 };
    const container = cloneNode(el) as HTMLElement;
    findChildNode({
        el,
        container,
        maxLength: length,
        index: start,
    });
    document.body.append(container);
    const text = container.innerHTML;
    container.remove();
    return text;
};

interface FindChildNodeProps {
    /**
     * 遍历当前这个节点的child nodes
     */
    el: ChildNode;
    /**
     * 新的children nodes 容器
     */
    container: Node;
    /**
     * 截止的下表
     */
    maxLength: number;
    /**
     * 当前的下标
     */
    index: { current: number };
}

/**
 * 找子节点
 */
const findChildNode = ({ el, container, maxLength, index }: FindChildNodeProps) => {
    for (let i = 0; i < el.childNodes.length; ) {
        if (index.current >= maxLength) {
            i = el.childNodes.length;
            return;
        }

        const child = el.childNodes[i];
        if (child instanceof Text) {
            const text = child.textContent ?? "";

            if (index.current + text.length > maxLength) {
                const val = text.slice(0, maxLength - index.current);
                container.appendChild(document.createTextNode(val));
                index.current += val.length;
                i = el.childNodes.length;
            } else {
                index.current += text.length;
                const cloneText = cloneNode(child);
                container.appendChild(cloneText);
                ++i;
            }
        } else if (child) {
            const node = cloneNode(child);
            container.appendChild(node);
            findChildNode({
                el: child,
                container: node,
                maxLength,
                index,
            });
            ++i;
        }
    }
};
