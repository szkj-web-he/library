/**
 * @file 当dom跑到视口外时，要做的事情
 * @date 2023-12-14
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-14
 */

import { forceReflow } from "../../../Common/Transition/Unit/forceReflow";

/**
 * 判断el是不是跑到的视口外
 * @param el
 */
export const resetOutOfViewport = (el: HTMLImageElement) => {
    forceReflow();
    const rect = el.getBoundingClientRect();

    const offset = 200;

    if (rect.left + offset > window.innerWidth) {
        return "right";
    }
    if (rect.right - offset < 0) {
        return "left";
    }
    if (rect.top + offset > window.innerHeight) {
        return "bottom";
    }
    if (rect.bottom - offset < 0) {
        return "top";
    }

    return false;
};
