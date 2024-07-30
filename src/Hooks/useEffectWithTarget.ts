/**
 * @file
 * @date 2022-12-07
 * @author mingzhou.zhang
 * @lastModify  2022-12-07
 */

import { useEffect } from "react";
import { createEffectWithTarget } from "./createEffectWithTarget";

export const useEffectWithTarget = createEffectWithTarget(useEffect);
