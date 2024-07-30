/**
 * @file setSliderLeft
 * @date 2022-02-23
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-23
 */
/**
 * 设置滑块bar的位置
 * @param {HTMLElement} node 滑块bar的顶层父容器
 * @param {number} left  位置
 */
export const setSliderLeft = (node: HTMLElement, left: number) => {
    const bar = node.querySelector("[class*=slider_bar]") as HTMLElement;
    const progress = node.querySelector("[class*=slider_walked]") as HTMLElement;

    if (bar) {
        bar.style.transform = `translateX(${left}px)`;
    }
    if (progress) {
        progress.style.width = `${left}px`;
    }
};
