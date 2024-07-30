/**
 * @file 获取子级的状态
 * @date 2023-03-07
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-07
 */
/**
 * 获取所有子级的状态
 *
 * 0 全没选
 * 1 全选
 * 2 有选的
 *
 * 如果allCheck === true
 * 表示全选
 * 如果allNoCheck===true
 * 表示全未选
 *
 * 都不是 就是
 * 有选中的值
 */
export const getChildStatus = (subChild: string[], checkedData: Record<string, boolean>) => {
    /**
     * 全选
     */
    let allCheck = true;
    /**
     * 全没有选中
     */
    let allNoCheck = true;

    for (let i = 0; i < subChild.length; i++) {
        const item = subChild[i];
        if (checkedData[item]) {
            allNoCheck = false;
        } else {
            allCheck = false;
        }
    }

    if (allCheck) {
        return 1;
    }

    if (allNoCheck) {
        return 0;
    }
    return 2;
};
