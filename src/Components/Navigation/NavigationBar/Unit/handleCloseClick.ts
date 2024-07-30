/**
 * @file abc
 * @date 2022-04-13
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-13
 */

export const handleCloseClick = (el: HTMLDivElement | null, fn: () => void) => {
    if (el) {
        el.addEventListener("click", fn, {
            once: true,
        });
    }
};
