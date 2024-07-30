/**
 * @file to fixed
 * @date 2022-02-26
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-26
 */

/**
 * 保留了几位小数
 * Retain decimals
 * @param {number} val  The original number to be changed
 * @param {number} decimalsLength How many decimal places to keep
 * @returns {number}
 */

export const toFixedNumber = (val: number, decimalsLength = 0): number =>
    Number(val.toFixed(decimalsLength));
