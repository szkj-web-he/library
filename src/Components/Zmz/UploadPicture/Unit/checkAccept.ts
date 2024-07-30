/**
 * @file 校验上传的图片是否等于accept这个属性
 * @date 2023-01-09
 * @author xuejie.he
 * @lastModify xuejie.he 2023-01-09
 */

export const checkAccept = (file: File, accept?: string): boolean => {
    const { type } = file;
    /**
     * 是否是限制内的图片格式
     */

    // file的类型是图片类型
    if (type.startsWith("image/")) {
        const acceptArr = accept?.split(",") ?? [];

        for (let i = 0; i < acceptArr.length; i++) {
            const item = acceptArr[i];
            //accept的值是所有image
            if (item === "image/*" || item === "*") {
                //允许
                return true;
            } else if (item.startsWith("image/")) {
                //accept的设置格式为image/jpeg这样的话,直接比对
                if (item === type) {
                    return true;
                }
            } else {
                /**
                 * accept如果是.png这样的格式的话
                 * 将file type也转化成这样的格式进行比对
                 */

                let typeValue = "";
                if (type === "image/jpeg") {
                    const nameArr = file.name.split(".");
                    typeValue = `.${nameArr[nameArr.length - 1]}`;
                } else if (type === "image/svg+xml") {
                    typeValue = ".svg";
                } else {
                    typeValue = type.replace("image/", ".");
                }

                if (typeValue === item) {
                    return true;
                }
            }
        }
    }
    return false;
};
