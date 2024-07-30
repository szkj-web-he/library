export const transformHours = (h: number, a?: number) => {
    if (typeof a === "number") {
        return a === 0 ? (h === 12 ? 0 : h > 12 ? h - 12 : h) : h === 12 ? 12 : h < 12 ? h + 12 : h;
    } else {
        return h > 11 ? (h - 12 === 0 ? 12 : h - 12) : h === 0 ? 12 : h;
    }
};
