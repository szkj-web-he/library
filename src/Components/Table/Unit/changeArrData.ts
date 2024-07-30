/**
 * @file 对调数字的两个下标的位置
 * @date 2022-03-28
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-28
 */

/**
 *
 * @param {Array<T>} arr 原始数组
 * @param { number } _old 原始下标
 * @param { number } _new 要改变成第几个
 * @returns {Array<T>} 改变顺序后的数组
 */
export const changeArrData = <T>(arr: Array<T>, _old: number, _new: number): Array<T> => {
    const newArr: typeof arr = [];
    for (let i = 0; i < arr.length; i++) {
        if (i === _old) {
            newArr.push(arr[_new]);
        } else if (i === _new) {
            newArr.push(arr[_old]);
        } else {
            newArr.push(arr[i]);
        }
    }
    return newArr;
};
