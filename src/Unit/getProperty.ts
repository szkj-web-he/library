/**
 * @file 获取json的键值
 * @date 2022-04-03
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-03
 */

/**
 * for key in json的时候常常会报key不属于json的key的问题
 * 这个方法它解决了这个问题
 */
export const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
    return obj[key];
};
