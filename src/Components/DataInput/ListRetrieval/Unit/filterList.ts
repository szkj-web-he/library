/**
 * @file 过滤数据
 * @date 2023-07-07
 * @author xuejie.he
 * @lastModify xuejie.he 2023-07-07
 */

interface DataProps {
    [key: string]: DataProps | string | null | number | boolean | undefined;
}

/**
 * 将字符串转化为正则
 */

export const transformStr = (str: string) => {
    let transformKeywordStr = "";

    for (let i = 0; i < str.length; i++) {
        const item = str.slice(i, i + 1);
        if (/[a-z0-9_]/i.test(item)) {
            transformKeywordStr += item;
        } else {
            transformKeywordStr += `\\${item}`;
        }
    }

    return new RegExp(transformKeywordStr, "ig");
};

/**
 * 获取键的值
 */
export const getKeyVal = <T>(data: T, key?: string | Array<string>): string | undefined => {
    if (typeof data !== "object" || !key) {
        return String(data);
    }

    const record = data as DataProps;

    if (typeof key === "string") {
        return record[key]?.toString();
    }

    let val: DataProps | undefined | string | number | null | boolean = record;
    let index = 0;
    while (typeof val === "object" && index < key.length) {
        val = val?.[key[index]];
        ++index;
    }
    if (val) {
        return val.toString();
    }
    return undefined;
};

/**
 * 过滤列表
 * @param list 数据源
 * @param key list的单挑数据中的那个键需要进行匹配
 * @param searchVal 搜索框的值
 */
export const filterList = <T>(list: Array<T>, key?: string | Array<string>, searchVal?: string) => {
    if (!searchVal) {
        return list;
    }

    let arr: Array<T> | null = null;

    const reg = transformStr(searchVal);

    for (let i = 0; i < list.length; i++) {
        const item = list[i];

        const keyVal = getKeyVal(item, key);
        if (keyVal && reg.test(keyVal)) {
            if (arr === null) {
                arr = [item];
            } else {
                arr.push(item);
            }
        }
    }
    return arr;
};
