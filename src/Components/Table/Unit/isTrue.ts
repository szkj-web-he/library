/**
 * @file is true
 * @date 2021-08-24
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-24
 */
/**
 * not is null or not is undefined
 * @param {T} val
 * @returns {boolean}
 */

export const isTrue = <T>(val: T): boolean => {
    return val != null;
};
