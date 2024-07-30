/**
 * @file cut image
 * @date 2021-06-18
 * @author xuejie.he
 * @lastModify xuejie.he 2021-06-18
 */
import { createImage } from "./createImage";

/**
 *
 * @param {number} x :start X
 * @param {number} y :start Y
 * @param {number} width :oval width
 * @param {number} height :oval height
 * @param {number} ctx : canvas context
 */

export function oval(
    x: number,
    y: number,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D | null,
): void {
    // var kappa = 0.5522848;
    const kappa = 0.5555555555555555;

    const ox = (width / 2) * kappa, // control point offset horizontal
        oy = (height / 2) * kappa, // control point offset vertical
        xe = x + width, // x-end
        ye = y + height, // y-end
        xm = x + width / 2, // x-middle
        ym = y + height / 2; // y-middle
    if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        ctx.closePath();
    }
}

interface CutImageResultProps {
    file: Blob | null;
    url?: string;
}

/**
 *
 * @param {string} url
 * @param {width: number;height: number;x: number;y: number;} pixelCrop cur image data
 * @returns {Promise}
 */
export const cutImage = async (
    url: string,
    imgPosition: { width: number; height: number; x: number; y: number },
    containerSize: { width: number; height: number },
): Promise<CutImageResultProps | undefined> => {
    const img = await createImage(url);
    const c = document.createElement("canvas");
    c.width = containerSize.width;
    c.height = containerSize.height;
    const ctx = c.getContext("2d");

    if (ctx) {
        ctx.drawImage(img, imgPosition.x, imgPosition.y, imgPosition.width, imgPosition.height);
        return new Promise((resolve: (value: CutImageResultProps) => void) => {
            img.remove();

            c.toBlob((file) => {
                const url = c.toDataURL("image/png");
                resolve({ file, url });
                c.remove();
            });
        });
    }
};
