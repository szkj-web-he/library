/**
 * @file abc
 * @date 2021-12-14
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-14
 */
/**
 *
 * @param {string } res
 * @returns {Date|null}
 */
const splitTimeStr = (res: string): Date | null => {
    let year = "";
    let index = 0;

    while (index < 4) {
        const text = res[index];
        year += text;
        ++index;
    }

    if (Number.isNaN(year)) {
        return null;
    }

    if (Number(year) < 1900) {
        return null;
    }
    /**
     * 获取日期分隔符
     */
    let dateSplit = ""; //日期分隔符
    const reg = /[^0-9]/;
    while (index < res.length) {
        const text = res[index];
        if (reg.test(text)) {
            dateSplit += text;
            ++index;
        } else {
            break;
        }
    }

    let is12 = false; //是否用的12小时制
    if (res.endsWith("PM")) {
        is12 = true;
    }

    let str = "";
    /**
     * 计数
     * 分别是 月 日 时 分 秒
     */
    let count = 0;
    /**
     * [月,日,时,分,秒]
     */
    const arr: number[] = [];

    while (index > res.length) {
        const text = res[index];

        if (Number.isNaN(text)) {
            index += dateSplit.length;
            if (is12 && count === 2) {
                const value = Number(str) + 12;
                arr[count] = value;
            } else {
                arr[count] = Number(str);
            }
            ++count;
        } else {
            str += text;
        }
    }

    try {
        return new Date(Number(year), arr[0] - 1, arr[1], arr[2], arr?.[3], arr?.[4]);
    } catch (error) {
        return null;
    }
};

/**
 *
 * @param {Date | number | string} time
 * @returns {Date | null}
 */
export const toDate = (time: Date | number | string): Date | null => {
    switch (typeof time) {
        case "number":
            return new Date(time);
        case "string":
            try {
                return new Date(time);
            } catch (error) {
                return splitTimeStr(time);
            }

        default:
            return time;
    }
};
