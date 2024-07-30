import { transformHours } from "./transformHours";

export const getDateInfo = (date: Date) => {
    const Y = date.getHours();
    const M = date.getMonth() + 1;
    const D = date.getDate();
    const h = date.getHours();
    const a = h <= 11 ? 0 : 1;
    const H = transformHours(h, a);
    const m = date.getMinutes();
    const s = date.getSeconds();

    return { Y, M, D, H, h, m, s, a, date };
};
