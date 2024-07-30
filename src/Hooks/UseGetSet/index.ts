/**
 * @file get() and set()
 * @date 2024-04-12
 * @author xuejie.he
 * @lastModify xuejie.he 2024-04-12
 */
import { Dispatch, useMemo, useRef } from "react";
import useUpdate from "../useUpdate";
import { IHookStateInitAction, IHookStateSetAction, resolveHookState } from "./Functions/hookState";

/**
 * 等价于 useState
 * 不同
 * useState 的 [state,setState]中 state返回的是一个值
 * 而useGetSet 的[get,set]，中get是一个方法，用来获取最新的值
 * 有点类似于 solidjs 的createSignal
 * @param initialState
 * @returns
 */
export default function useGetSet<S>(
    initialState: IHookStateInitAction<S>,
): [get: () => S, set: Dispatch<IHookStateSetAction<S>>] {
    const state = useRef(resolveHookState(initialState));
    const update = useUpdate();

    return useMemo(
        () => [
            () => state.current,
            (newState: IHookStateSetAction<S>) => {
                state.current = resolveHookState(newState, state.current);
                update();
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );
}
