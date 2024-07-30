/**
 * @file add class
 * @date 2021-11-26
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-26
 */

/**
 * 设置el的class
 * @param el 要操作的dom
 * @param cls 成变成的class
 * @param needRemoveClass 要删除的class
 */
export function setTransitionClass(el: HTMLElement, cls: string, needRemoveClass?: string[]) {
    const removeList: string[] = []; //要删除的class

    const arr = cls.split(/\s+/).filter((item) => !!item); //要成为的class

    /**
     * 遍历要删除的class
     *
     * 剔除
     * 1. 将已存在 dom的class中
     * 2. 不存在要成为的class中
     *
     */
    needRemoveClass?.forEach((item) => {
        if (el.classList.contains(item) && !arr.some((val) => val === item)) {
            removeList.push(item);
        }
    });

    for (let i = 0; i < removeList.length; i++) {
        el.classList.remove(removeList[i]);
    }

    for (let i = 0; i < arr.length; i++) {
        if (!el.classList.contains(arr[i])) {
            el.classList.add(arr[i]);
        }
    }
}
