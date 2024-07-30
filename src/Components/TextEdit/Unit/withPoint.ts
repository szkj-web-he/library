/**
 * @file withPoint
 * @date 2022-04-19
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-19
 */

import { Editor } from "slate";
import { deepCloneData } from "../../..";
import { PointProps } from "../slate";

/**
 * 记录点位
 * 当在工具栏上取消选中某个状态的时候
 * 鼠标重复点击相同的位置时要做的事情
 *  将要实现的功能：
 *      记录上一次的状态,保持取消的行为
 */

export const withPoint = <T extends Editor>(editor: T): T => {
    const e = editor;

    e.setNoSelectionData = (res?: PointProps) => {
        e.noSelection = res
            ? {
                  selection: deepCloneData(res.selection),
                  type: res.type,
              }
            : undefined;
    };

    return e;
};
