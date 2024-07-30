/**
 * @file 转码
 * @date 2022-07-01
 * @author xuejie.he
 * @lastModify xuejie.he 2022-07-01
 */

/**
 * 要转化的文字
 * 转为16进制
 */
export const encode = (res: string) => {
    if (res) {
        let enStr = "";
        for (let i = 0; i < res.length; i++) {
            enStr += `--u${res.charCodeAt(i).toString(16)}`;
        }
        return enStr;
    }

    return res;
};

/**
 *要还原的转化为16进制的文字
 */
export const decode = (res: string) => {
    if (res.includes("--u")) {
        let deStr = "";
        const arr = res.split("--u");
        for (let i = 0; i < arr.length; i++) {
            deStr += String.fromCharCode(parseInt(`${parseInt(arr[i], 16)}`, 10));
        }
        return deStr;
    }
    return res;
};
