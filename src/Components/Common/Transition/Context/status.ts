/**
 * @file 当前过渡状态在哪个阶段
 * @date 2024-07-07
 * @author xuejie.he
 * @lastModify xuejie.he 2024-07-07
 */

import { createContext, useContext } from "react";
import { TransitionStatus } from "../../../../DefaultData/Transition";

export const TransitionStatusContext = createContext<() => TransitionStatus | undefined>(
    () => undefined,
);

export const useTransitionStatus = () => useContext(TransitionStatusContext);
