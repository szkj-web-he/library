/**
 * @file 查找对应的区号
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */

import { MobileInputProps } from "..";
import { onlyCNorAUList } from "../../../../DefaultData/DataInput/MobileInput";
import { deepCloneData } from "../../../../Unit/deepCloneData";

export const findAreaData = (areaList: MobileInputProps["areaCodeList"], value?: string) => {
    const list = areaList ?? onlyCNorAUList;
    if (value) {
        let data: (typeof list)[0] | null = null;
        for (let i = 0; i < list.length; ) {
            const item = list[i];
            if (item.key === value) {
                data = deepCloneData(item);
                i = list.length;
            } else {
                ++i;
            }
        }

        return data;
    }

    return list[0];
};
