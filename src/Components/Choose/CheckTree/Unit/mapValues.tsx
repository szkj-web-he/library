/**
 * @file 序列化values的数据
 * @date 2023-03-07
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-07
 */

/**
 * 将values转化为 键:boolean的形式
 * 方便后面的运行
 */
export const initValues = (values?: Array<string>) => {
    const data: Record<string, boolean> = {};

    const arr = values ?? [];
    for (let i = 0; i < arr.length; i++) {
        data[arr[i]] = true;
    }
    return data;
};
