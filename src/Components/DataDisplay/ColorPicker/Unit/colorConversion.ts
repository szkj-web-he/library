/**
 * @file color conversion
 * @date 2021-08-12
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-12
 */

/**
 *
 * @param {number} h 0~360
 * @param {number} s 0~100
 * @param {number} l 0~100
 * @returns {[number,number,number]} rgb [0~255,0~255,0~255]
 */
export const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    s /= 100;
    l /= 100;
    let [r, g, b] = [0, 0, 0];

    const c = (1 - Math.abs(2 * l - 1)) * s;

    const _h = h / 60;

    const x = c * (1 - Math.abs((_h % 2) - 1));

    if (_h >= 0 && _h < 1) {
        r = c;
        g = x;
        b = 0;
    } else if (_h >= 1 && _h < 2) {
        r = x;
        g = c;
        b = 0;
    } else if (_h >= 2 && _h < 3) {
        r = 0;
        g = c;
        b = x;
    } else if (_h >= 3 && _h < 4) {
        r = 0;
        g = x;
        b = c;
    } else if (_h >= 4 && _h < 5) {
        r = x;
        g = 0;
        b = c;
    } else if (_h >= 5 && _h < 6) {
        r = c;
        g = 0;
        b = x;
    }

    const m = l - c / 2;

    r = (r + m) * 255;
    g = (g + m) * 255;
    b = (b + m) * 255;
    return [r, g, b] as [number, number, number];
};

export const rgbTo16Hex = (arr: number[]): string => {
    return `#${[...arr]
        .map((val) => (val > 15 ? val.toString(16) : `0${val.toString(16)}`))
        .join("")}`;
};
// `#${[...arr].map((val) => (val > 15 ? val.toString(16) : `0${val.toString(16)}`)).join('')}`;

/**
 *
 * @param {string} str hex
 * @returns {[number,number,number]} rgb [0~255,0~255,0~255]
 */
export const hexToRgb = (str: string): [number, number, number] => {
    const value = str.replace("#", "");
    const rgb: [number, number, number] = [0, 0, 0];
    if (value.length === 6) {
        for (let i = 0; i < 3; i++) {
            rgb[i] = parseInt(value.slice(i * 2, i * 2 + 2), 16);
        }
    } else if (value.length === 3) {
        const arr = value.split("");
        for (let i = 0; i < 3; i++) {
            rgb[i] = parseInt(`${arr[i]}${arr[i]}`, 16);
        }
    } else {
        console.error(`${str} failed!`);
    }

    return rgb;
};

/**
 *
 * @param {number} r 0~255
 * @param {number} g 0~255
 * @param {number} b 0~255
 * @returns {[number,number,number]} [0~360,0~100,0~100]
 */

export const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const apart = max - min;
    let [h, s] = [0, 0];
    const l = (max + min) / 2;
    if (apart === 0) {
        h = 0;
        s = 0;
    } else {
        s = apart / (1 - Math.abs(2 * l - 1));
        if (max === r) {
            h = 60 * (((g - b) / apart) % 6);
        } else if (max === g) {
            h = 60 * ((b - r) / apart + 2);
        } else {
            h = 60 * ((r - g) / apart + 4);
        }
    }
    if (h < 0) {
        h += 360;
    }

    return [h, s * 100, l * 100];
};

/**
 *
 * @param {string} color
 * @returns { [number, number, number] | void} rgb [0~255,0~255,0~255]
 */

export const otherToRGB = (color: string): [number, number, number] => {
    let str = "";
    let arr: string[] = [];

    if (/hsla?/gi.test(color)) {
        str = color.replace(/(hsla?|\(|\))/g, "");
        arr = str.split(",");
        return hslToRgb(Number(arr[0]), Number(arr[1]), Number(arr[2]));
    } else if (color.startsWith("#")) {
        return hexToRgb(color);
    } else if (/rgba?/gi.test(color)) {
        str = color.replace(/(rgba?|\(|\))/g, "");
        arr = str.split(",");
        return arr.slice(0, 3).map((index) => Number(index)) as [number, number, number];
    } else {
        return [0, 0, 0];
    }
};

/**
 *
 * @param {number} rgbR 0~255
 * @param {number} rgbG 0~255
 * @param {number} rgbB 0~255
 * @returns {[number,number,number]} hsv  [0~360,0~100,0~100]
 */

export const rgbToHsv = (rgbR: number, rgbG: number, rgbB: number): [number, number, number] => {
    const r = rgbR / 255;
    const g = rgbG / 255;
    const b = rgbB / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const apart = max - min;

    let [h, s, v] = [0, 0, max];
    if (apart === 0) {
        h = 0;
        s = 0;
    } else {
        s = apart / max;
        if (max === r) {
            h = 60 * (((g - b) / apart) % 6);
        } else if (max === g) {
            h = 60 * ((b - r) / apart + 2);
        } else {
            h = 60 * ((r - g) / apart + 4);
        }
    }
    if (max === min) {
        s = 0;
    }
    if (max === 0) {
        v = 0;
    }
    if (h < 0) {
        h += 360;
    }

    return [h, s * 100, v * 100];
};

/**
 *
 * @param {number} hsvH 0~360
 * @param {number} hsvS 0~100
 * @param {number} hsvV 0~100
 * @returns {[number,number,number]} rgb [0~255,0~255,0~255]
 */
export function hsvToRgb(hsvH: number, hsvS: number, hsvV: number): [number, number, number] {
    let [r, g, b] = [0, 0, 0];
    const s = hsvS / 100;
    const v = hsvV / 100;
    const c = v * s;

    const h = hsvH / 60;
    const x = c * (1 - Math.abs((h % 2) - 1));

    if (h >= 0 && h < 1) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 1 && h < 2) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 2 && h < 3) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 3 && h < 4) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 4 && h < 5) {
        r = x;
        g = 0;
        b = c;
    } else if (h >= 5 && h < 6) {
        r = c;
        g = 0;
        b = x;
    }

    const m = v - c;

    return [(r + m) * 255, (g + m) * 255, (b + m) * 255] as [number, number, number];
}
