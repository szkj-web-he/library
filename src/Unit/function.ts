/**
 * @file 方法的导出
 * @date 2023-06-19
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-19
 */

import { addZero } from "../Components/Calendar/DatePicker/Unit/dateFormat";
import { addEventList, removeEventList } from "../Components/Common/Kite/Unit/eventListener";
import { nextFrame } from "../Components/Common/Transition/Unit/useAnimationFrame";
import { getJwtKeyForEnv } from "../Components/OIDCLogin/Unit/Utils";
import { isTrue } from "../Components/Table/Unit/isTrue";
import {
    descendantToReactNode,
    filterDescendant,
} from "../Components/TextEdit/Unit/descendantToReactElement";
import { initDescendant } from "../Components/TextEdit/Unit/initDescendant";
import { withEditor } from "../Components/TextEdit/Unit/withEditor";
import Gcode from "qrcode";
import { mul, sub, sum, toDiv } from "../Components/Zmz/UploadPicture/Unit/math";
import { createHash } from "./createHash";
import { deepCloneData } from "./deepCloneData";
import { getLanguage } from "./getPosition";
import { getProperty } from "./getProperty";
import { dataToSheet, sheetToData } from "./sheet";
import * as XLSX from "xlsx";
import { decode, encode } from "./transcode";
import { getDeviceType } from "./utils";

import { setFileName } from "../Components/Zmz/DownloadCard";
import { getLength } from "../Components/TextEdit/Unit/getLength";

import { getIconType } from "./getIconType";

import { getScrollValue } from "../Components/Common/Kite/Unit/getScrollValue";

import * as drUtils from "./utils";
import classNames from "./classNames";
/**
 * 解决部分 ieee 754丢失精度
 *  加
 */
const mathSum = sum;
/**
 * 解决部分 ieee 754丢失精度
 * 减
 */
const mathSub = sub;
/**
 * 解决部分 ieee 754丢失精度
 * 乘
 */
const mathMul = mul;
/**
 * 解决部分 ieee 754丢失精度
 * 除
 */
const mathDiv = toDiv;

const getDescendantLength = getLength;

const getJwtKey = getJwtKeyForEnv;
export {
    Gcode,
    XLSX,
    addEventList,
    /**
     * 转化 1 => 01的方法
     */
    addZero,
    /**
     * 创建一个不会重复的hash
     * 和useId不同的时
     * 它没有特殊字符
     */
    createHash,
    dataToSheet,
    /**
     * 解码
     */
    decode,
    /**
     * 深克隆
     */
    deepCloneData,
    /**
     * 将slatejs的数据转化为ReactNode
     */
    descendantToReactNode,
    drUtils,
    /**
     * 转码
     */
    encode,
    /**
     * 过滤slatejs数据
     */
    filterDescendant,
    /**
     * 获取slatejs的数据的文本长度
     */
    getDescendantLength,
    /**
     * 获取设备状态
     */
    getDeviceType,
    getIconType,
    /**
     * 获取jwt的key
     */
    getJwtKey,
    /**
     * 获取浏览器预览
     */
    getLanguage,
    /**
     * 解决for key in json的时候常常会报key不属于json的key的问题
     */
    getProperty,
    getScrollValue,
    /**
     * 初始化slatejs所要的数据
     */
    initDescendant,
    /**
     * 是否有值
     * 不为null且und
     */
    isTrue,
    mathDiv,
    mathMul,
    mathSub,
    mathSum,
    /**
     * 下几帧执行的方法
     */
    nextFrame,
    /**
     * 移除事件组
     */
    removeEventList,
    setFileName,
    /**
     *
     */
    sheetToData,
    /**
     * 创建slatejs实例
     */
    withEditor,
    /**
     * 拼接className
     */
    classNames,
};
