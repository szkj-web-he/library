/**
 * @file starList
 * @date 2021-11-16
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-16
 */

/**
 *
 * @param {number} total Total number of stars
 * @param {number} value How many stars are currently going to be bright
 * @returns {Array<0 | 1 | 0.5>}
 */
export const brightStar = (total: number, value: number): Array<0 | 1 | 0.5> => {
    const arr: Array<0 | 1 | 0.5> = [];
    for (let i = 0; i < total; i++) {
        if (value - i > 0.5) {
            arr.push(1);
        } else if (value - i > 0) {
            arr.push(0.5);
        } else {
            arr.push(0);
        }
    }
    return arr;
};
