/**
 * @file create hash
 * @date 2021-09-12
 * @author xuejie.he
 * @lastModify xuejie.he 2021-09-12
 */

/**
 * 产生一个随机数
 * @param res
 * @returns
 */
const createdRandomNum = (min: number, max: number) => {
    /**
     * 最大值应该为 max + 0.4
     * 最小值应该为 min - 0.4
     */

    const minVal = min - 0.49999999999;
    const maxVal = max + 0.499999999999;

    return Math.random() * (maxVal - minVal) + minVal;
};

/**
 * 制作
 */
const produce = (length: number, upperChar: boolean, specialChar: boolean, name?: string) => {
    let hash = "";

    const asciiData: {
        num: [number, number];
        lowerChar: [number, number];
        upperChar?: [number, number];
        specialChar?: [string, string];
    } = {
        num: [48, 57], //数字
        lowerChar: [97, 122], //小写字母
    };
    if (upperChar) {
        asciiData.upperChar = [65, 90]; //大写字母
    }

    if (specialChar) {
        asciiData.specialChar = ["-", "_"]; //大写字母
    }
    const keys = Object.keys(asciiData) as Array<keyof typeof asciiData>;

    for (let i = 0; i < length; i++) {
        const keyIndex = Math.round(createdRandomNum(0, keys.length - 1)); //产生一个keys的下标

        const key = keys[keyIndex]; //产生的key

        const asciiDataKeyArr = asciiData[key]; //产生的key的value

        if (asciiDataKeyArr) {
            if (key === "specialChar") {
                const val = Math.round(createdRandomNum(0, 1));
                hash += asciiDataKeyArr?.[val];
            } else {
                const val = Math.round(
                    createdRandomNum(asciiDataKeyArr[0] as number, asciiDataKeyArr[1] as number),
                );

                hash += String.fromCharCode(val);
            }
        }
    }

    if (hash.length < length) {
        const timeSamp = `${Date.now()}`;
        for (let i = 0; i < length - hash.length; i++) {
            const index = Math.round(createdRandomNum(0, timeSamp.length - 1));
            const val = timeSamp.substring(index, index + 1);
            hash += val;
        }
    }

    if (name) {
        return `${name}-${hash}`;
    }
    return hash;
};

/**
 *
 * @param {string|undefined} name 生成的hash前缀
 * @param {number} length 除了name 之外，要生成的多少位的hash
 * @param {boolean} upperChar 是否拥有大写字母
 * @param {boolean} upperChar 是否拥有特殊字符
 * @returns {string}
 */
const generatedIds = new Set(); // 用于保存已生成的ID
export const createHash = (
    name?: string,
    length = 10,
    upperChar = true,
    specialChar = false,
): string => {
    let id = produce(length, upperChar, specialChar, name); // 生成新的ID
    while (generatedIds.has(id)) {
        id = produce(length, upperChar, specialChar, name); // 如果ID已存在于集合中，重新生成
    }
    generatedIds.add(id); // 将新生成的ID添加到集合中
    return id;
};
