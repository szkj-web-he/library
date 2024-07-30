/**
 * @file 改变选中状态
 * @date 2023-03-07
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-07
 */

import { useEffect, useState } from "react";
import { useCheckTreeContext, useCheckTreeState } from "../Unit/context";
import { useLatest } from "./../../../../Hooks/useLatest";
import { Action_Type } from "./useCheckTree";

/**
 * 改变check值的方法
 * @param uuid
 * @param active
 * @returns
 */

export const useChangeCheck = (
    uuid: string,
    active?: boolean,
): [boolean, (status: boolean) => void] => {
    const { values } = useCheckTreeContext();
    /**
     *
     */
    const [checked, setChecked] = useState(active ?? values?.includes(uuid) ?? false);

    const uuidLast = useLatest(uuid);

    const { dispatch } = useCheckTreeState();

    const dispatchRef = useLatest(dispatch);

    useEffect(() => {
        let status = active;

        if (typeof status !== "boolean") {
            status = values?.includes(uuidLast.current) ?? false;
        }

        setChecked(status);
        dispatchRef.current({
            type: Action_Type.SwitchItemCheckStatus,
            payload: {
                id: uuidLast.current,
                value: status,
            },
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, values]);

    const changeFn = (status: boolean) => {
        setChecked(status);
        dispatchRef.current({
            type: Action_Type.SwitchItemCheckStatus,
            payload: {
                id: uuidLast.current,
                value: status,
            },
        });
    };

    return [checked, changeFn];
};
