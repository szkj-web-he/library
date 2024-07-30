import { hslToRgb } from "../../Components/DataDisplay/ColorPicker/Unit/colorConversion";

const subList = (h: number) => {
    let s: number;
    const arr: number[] = [];
    if (h === 360) {
        s = 0;
        const rate = 100 / 6;
        for (let i = 100; i > 0; ) {
            arr.push(i);
            i -= rate;
        }
        arr.push(0);
    } else {
        s = 100;
        for (let i = 80; i >= 20; ) {
            arr.push(i);
            i -= 10;
        }
    }

    return arr.map((item) => {
        const color = hslToRgb(h, s, item).map((val) => Math.round(val));
        const rgb = `rgb(${color.join(",")})`;
        return rgb;
    });
};

export const colorList = [360, 60, 120, 180, 240, 300, 0].map((h) => subList(h));
