/**
 * @file
 * @date 2023-08-31
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-31
 */

/**
 *
 * @param 从react的mouse事件中，判断当前触发的元素，是不是真实dom树
 */
export const isDomChild = (e: React.MouseEvent) => {
    let isChild = false;

    let isStop = false;
    let node = e.target as HTMLElement | null;
    while (node && isStop === false) {
        if (node === e.currentTarget) {
            isChild = true;
            isStop = true;
        } else {
            node = node.parentElement;
            if (node === document.body) {
                isStop = true;
            }
        }
    }
    return isChild;
};
