/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file utils
 * @date 2022-05-07
 * @author mingzhou.zhang
 * @lastModify  2022-05-31
 */
import type { DependencyList } from "react";

import { toDiv } from "../Components/Zmz/UploadPicture/Unit/math";

/**
 * 转换 必选属性 为 非必选属性
 */
export type PartialByKeys<T, K extends keyof T> = {
    [P in K]?: T[P];
} & Pick<T, Exclude<keyof T, K>>;

/**
 * 转换 非必选属性 为 必选属性
 */
export type RequireByKeys<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: T[P];
};

/**
 * 判断是否为null或undefined
 */
export function isNullOrUndefined(x: unknown): x is null | undefined {
    return x === null || x === undefined;
}
/**
 * 判断是否不为null或undefined
 */
export function isNotNullOrUndefined<T>(x: T): x is Exclude<T, null | undefined> {
    return !isNullOrUndefined(x);
}
/**
 * 排除属性方法
 * @param obj 操作对象
 * @param fields 排除属性 数组
 * @returns 返回一个 已排除后 的对象
 */
export function omit<T extends object, K extends keyof T>(obj: T, fields: K[]): Omit<T, K> {
    const clone = { ...obj };

    if (Array.isArray(fields)) {
        fields.forEach((key) => {
            delete clone[key];
        });
    }

    return clone;
}
/**
 * 选择属性方法
 * @param obj 操作对象
 * @param fields 选择属性 数组
 * @returns 返回一个 只包含选择属性 的对象
 */
export function pick<T extends object, K extends keyof T>(obj: T, fields: K[]): Pick<T, K> {
    const clone = { ...obj };

    Object.keys(clone).forEach((item) => {
        const flag = fields.find((items) => items === item);
        !flag && delete clone[item as keyof T];
    });

    return clone;
}
/**
 * 转换文件大小为对应单位
 * @param size 文件大小
 * @returns 经过转换后的字符串
 */
export function sizeUnitConversion(size: number) {
    const MB = 1024 * 1024 * 1;
    const GB = MB * 1024 * 1;
    if (!size) {
        return `${size.toFixed(1)}M`;
    }
    if (toDiv(size, MB) >= 1000) {
        return `${toDiv(size, GB).toFixed(2)}G`;
    } else {
        return `${toDiv(size, MB).toFixed(2)}M`;
    }
}
/**
 * 返回设备类型
 * @returns 返回值为 "tablet" | "mobile" | "desktop"
 */
export function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua,
        )
    ) {
        return "mobile";
    }
    return "desktop";
}

/**
 * 推断某个类型 是否具有推断属性
 * @param toCheck 需要判断类型的值
 * @param toCheckProperty 推断类型的属性
 * @returns 布尔值
 */
export function isExist<T>(toCheck: T, toCheckProperty: keyof T): toCheck is T {
    return toCheck[toCheckProperty] !== undefined;
}

/**
 * 判断是否为对象
 * @param value 判断值
 * @returns 布尔值
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObjct = (value: unknown): value is Record<any, any> =>
    value !== null && typeof value === "object";
/**
 * 判断是否为函数
 * @param value 判断值
 * @returns 布尔值
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (value: unknown): value is Function => typeof value === "function";
/**
 * 判断是否为字符串
 * @param value 判断值
 * @returns 布尔值
 */
export const isString = (value: unknown): value is string => typeof value === "string";
/**
 * 判断是否为布尔值
 * @param value 判断值
 * @returns 布尔值
 */
export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";
/**
 * 判断是否为数值
 * @param value 判断值
 * @returns 布尔值
 */
export const isNumber = (value: unknown): value is number => typeof value === "number";
/**
 * 判断是否为undefined
 * @param value 判断值
 * @returns 布尔值
 */
export const isUndef = (value: unknown): value is undefined => typeof value === "undefined";
/**
 * 开发环境是否为development
 */
export const isDev = process.env.NODE_ENV === "development";
/**
 * 运行环境是否为浏览器
 */
export const isBrower = !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
);

/**
 * 深度对比数组
 * @param oldDeps 第一个数组
 * @param deps 第二个数组
 * @returns 布尔值
 */
export const depsAreSame = (oldDeps: DependencyList, deps: DependencyList): boolean => {
    if (oldDeps === deps) return true;
    if (oldDeps.length !== deps.length) return false;
    for (let i = 0; i < oldDeps.length; i++) {
        if (!Object.is(oldDeps[i], deps[i])) return false;
    }
    return true;
};

/**
 * 获取offset值
 * @param node 目标对象
 * @returns `{ left: number, top: number }`
 */
export const getOffset = (node: Element) => {
    const box = node.getBoundingClientRect();
    const docElem = document.documentElement;

    // < ie8 不支持 win.pageXOffset, 则使用 docElem.scrollLeft
    return {
        left:
            box.left +
            (window.pageXOffset || docElem.scrollLeft) -
            (docElem.clientLeft || document.body.clientLeft || 0),
        top:
            box.top +
            (window.pageYOffset || docElem.scrollTop) -
            (docElem.clientTop || document.body.clientTop || 0),
    };
};

/**
 * 获取document宽高
 * @returns `{width: number, height: number}`
 */
export const getClientSize = () => {
    const width = document.documentElement.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight;

    return {
        width,
        height,
    };
};
