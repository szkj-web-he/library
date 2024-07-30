/**
 * @file 添加item
 * @date 2023-08-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-15
 */

export const pushItem = <T>(item: T, arr: Array<T> | null) => {
    if (Array.isArray(arr)) {
        arr.push(item);
        return arr;
    } else {
        return [item];
    }
};
