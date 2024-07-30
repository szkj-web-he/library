/**
 * @file createImage
 * @date 2021-06-18
 * @author xuejie.he
 * @lastModify xuejie.he 2021-06-18
 */
/**
 *
 * @param {string} url of img src
 * @returns {Promise<HTMLImageElement>}
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
    // eslint-disable-next-line no-undef
    new Promise((resolve: (value: HTMLImageElement) => void, reject) => {
        const image = new Image();

        image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
        image.onload = () => {
            resolve(image);
        };
        image.onerror = (error) => {
            reject(error);
        };

        // document.body.appendChild(image);
    });
