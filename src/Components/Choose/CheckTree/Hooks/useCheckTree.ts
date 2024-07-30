/**
 * @file 复选树的统一状态管理
 * @date 2023-03-07
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-07
 */

import { useRef } from "react";
import { useUpdateEffect } from "../../../..";
import { initValues } from "../Unit/mapValues";

export enum Action_Type {
    /**
     * 切换item的选中状态
     */
    SwitchItemCheckStatus = "SWITCHITEMCHECKSTATUS",
    /**
     * 删除一个废弃的item
     */
    removeItem = "REMOVEITEM",
}

/**
 * 切换某个item的选中状态
 */
interface SwitchItemCheckStatusAction {
    type: Action_Type.SwitchItemCheckStatus;
    payload: {
        value: boolean;
        id: string;
    };
}

/**
 * 溢出一个item的时候
 */
interface RemoveItemAction {
    type: Action_Type.removeItem;
    payload: {
        id: string;
    };
}

export type CheckTreeAction = SwitchItemCheckStatusAction | RemoveItemAction;

export const useCheckTree = (
    values?: Array<string>,
    handleValuesChange?: (res: Array<string>) => void,
): [(action: CheckTreeAction) => void, React.MutableRefObject<Record<string, boolean>>] => {
    /**
     * 所有item的选中状态
     */
    const checkedDataRef = useRef(initValues(values));

    useUpdateEffect(() => {
        checkedDataRef.current = initValues(values);
    }, [values]);

    /**
     * 看看values有没有变化
     * 变化了就触发handleValuesChange
     */
    const diffValues = () => {
        const data = initValues(values);

        if (JSON.stringify(data) !== JSON.stringify(checkedDataRef.current)) {
            const arr = [];
            for (const key in checkedDataRef.current) {
                const value = checkedDataRef.current[key];
                if (value) {
                    arr.push(key);
                }
            }
            handleValuesChange?.(arr);
        }
    };

    const fn = (action: CheckTreeAction) => {
        switch (action.type) {
            case Action_Type.SwitchItemCheckStatus:
                checkedDataRef.current[action.payload.id] = action.payload.value;
                diffValues();
                break;

            case Action_Type.removeItem:
                delete checkedDataRef.current[action.payload.id];
                diffValues();
                break;
            default:
                break;
        }
    };
    return [fn, checkedDataRef];
};
