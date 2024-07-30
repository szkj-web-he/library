/**
 * @file copy command
 * @date 2022-03-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-08
 */

/**
 *
 * @param {string} text 要复制的文本
 * @returns {Promise<| string| {type: 'error'; message: string;}>}
 */
export const copyCommand = (
    text?: string,
): Promise<
    | string
    | {
          type: "error";
          message: string;
      }
> =>
    new Promise((resolve, reject) => {
        const selection = document.getSelection();
        if (text) {
            const str = selection?.toString();
            if (navigator.clipboard) {
                void navigator.clipboard.writeText(text).then(() => {
                    resolve(text);
                });
            } else if (document.execCommand) {
                const fn =
                    str === text
                        ? () => {
                              document.execCommand("copy");
                          }
                        : () => {
                              const ipt = document.createElement("input");
                              document.body.appendChild(ipt);
                              ipt.style.position = "absolute";
                              ipt.style.zIndex = "-99";
                              ipt.style.opacity = "0";
                              ipt.value = text;
                              ipt.select();
                              document.execCommand("copy");
                          };
                void Promise.resolve(fn()).then(() => {
                    resolve(text);
                });
            } else {
                reject({
                    type: "error",
                    message: "没有相应的复制API",
                });
            }
        } else if (selection && selection.type === "Range") {
            const str = selection.toString();
            if (navigator.clipboard) {
                void navigator.clipboard.writeText(str).then(() => {
                    resolve(str);
                });
            } else if (document.execCommand) {
                const fn = () => {
                    document.execCommand("copy");
                };

                void Promise.resolve(fn()).then(() => {
                    resolve(str);
                });
            } else {
                reject({
                    type: "error",
                    message: "没有相应的复制API",
                });
            }
        } else {
            reject({
                type: "error",
                message: "没有要复制的文本",
            });
        }
    });
