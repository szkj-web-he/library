/**
 * @file 获取element的key
 * @date 2022-03-24
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-24
 */

import { getElFiber } from "../../DataDisplay/FixedSizeText/Unit/getElFiber";

export const getElKey = (el: Element) => {
    const fiber = getElFiber(el as HTMLElement);
    if (fiber) {
        return fiber.key;
    }
};
