/**
 * @file getOverflowStatus
 * @date 2022-01-07
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-07
 */

/**
 *
 * @param {HTMLElement} el
 * @returns {boolean}
 */
export const getOverflowStatus = (el: HTMLElement): boolean => {
    return el.scrollHeight > el.clientHeight;
};
