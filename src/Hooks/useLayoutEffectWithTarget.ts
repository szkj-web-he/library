/**
 * @file
 * @date 2022-12-07
 * @author mingzhou.zhang
 * @lastModify  2022-12-07
 */

import { useLayoutEffect } from "react";
import { createEffectWithTarget } from "./createEffectWithTarget";

export const useLayoutEffectWithTarget = createEffectWithTarget(useLayoutEffect);
