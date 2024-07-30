/**
 * @file  将文件后缀转换为 对应的icon图标
 * @date 2023-03-15
 * @author mingzhou.zhang
 * @lastModify  2023-03-15
 */
import IconType from "../Components/Icon/Unit/customFontIcon";

// 转换icon返回类型
export type ReturnIconType = keyof typeof IconType;

const iconList = {
    audioFile: ["wav", "mp3", "midi", "ogg", "vqf"],
    zip: ["rar", "zip", "arj", "z", "lzh", "jar"],
    animationFile: ["mov", "rm", "swf", "avi", "wmv", "amv", "mp4", "vob"],
    executableFile: ["exe", "com"],
    graphicFile: [
        "webp",
        "gif",
        "bmp",
        "tif",
        "psd",
        "cdr",
        "pcd",
        "dxf",
        "eps",
        "ai",
        "raw",
        "wmf",
        "svg",
    ],
    languageFile: [
        "eot",
        "html",
        "css",
        "dtd",
        "xml",
        "jsp",
        "php",
        "asp",
        "c",
        "obj",
        "wki",
        "bas",
        "java",
        "lib",
    ],
    fillPicture: ["bmp", "jpg", "png", "gif", "pcx", "tga", "exif", "fpx"],
    tsx: ["tsx"],
    jsx: ["jsx"],
    js: ["js"],
    ts: ["ts"],
    sass: ["scss", "sass"],
    CSSfile: ["css"],
    json: ["json"],
    font: ["ttf", "otf", "woff", "woff2"],
    batchProcessingFile: ["bat", "cmd"],
    systemFile: ["iso", "int", "sys", "adt", "dll"],
    word: ["doc", "docx"],
    pdf: ["pdf"],
    excel: ["xls", "xlsx"],
    powerPoint: ["ppt", "pptx"],
    imageFile: ["img", "ima", "vhd", "map"],
};

/**
 * 将文件后缀转换为 对应的icon图标
 * @param type 文件类型
 * @returns 对应的icon图标
 */
export function getIconType(type: string): ReturnIconType {
    let matchType = "";
    Object.keys(iconList).forEach((key) => {
        if (matchType) {
            return;
        }
        const k = key as keyof typeof iconList;
        if (iconList[k].includes(type.toLocaleLowerCase())) {
            matchType = k;
        }
    });
    return matchType ? (matchType as ReturnIconType) : "textFile";
}
