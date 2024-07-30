/**
 * @file 找滚动容器
 * @date 2022-03-30
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-30
 */

/**
 *
 * @param { string } id 唯一标志
 * @param { number } value scroll Value
 * @returns {void}
 */

export const findScrollContainer = (id: string, value: number): void => {
    const scrollBodyChild = document.querySelector(`[data-i=${id}]`)?.children;
    if (!scrollBodyChild) {
        return;
    }
    for (let i = 0; i < scrollBodyChild.length; ) {
        const item = scrollBodyChild[i];
        const className = item.getAttribute("class");
        if (className?.includes("scroll_scrollBody")) {
            item.scrollTo({
                left: value,
            });
            i = scrollBodyChild.length;
        } else {
            ++i;
        }
    }
};
