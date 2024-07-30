/**
 * @file 获取文件后缀 和文件名称
 * @date 2023-05-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-05-16
 */

export const getFileName = (name: string) => {
    if (name.includes(".")) {
        const arr = name.split(".");
        arr.pop();

        return arr.length > 1 ? arr.join(".") : arr[0];
    }

    return name;
};

export const getFileSuffix = (name: string) => {
    if (name.includes(".")) {
        const arr = name.split(".");
        const last = arr.pop();

        return last ? `.${last}` : "";
    }
    return "";
};

export const getNameorSuffix = (value: string, type: "name" | "suffix" = "name"): string => {
    if (type === "name") {
        return getFileName(value);
    }

    if (type === "suffix") {
        return getFileSuffix(value);
    }

    return "";
};
