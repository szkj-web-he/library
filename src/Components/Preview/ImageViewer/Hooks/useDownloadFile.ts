/**
 * @file 下载文件
 * @date 2023-12-14
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-14
 */

import { useRef, useState } from "react";
import { useUnmount } from "../../../../Hooks/useUnmount";
import { ajaxRequest } from "../../../DataInput/AvatarCrop/Unit/ajax";

/**
 *
 * @param {string} url 下载链接
 * @param {string|undefined} name 文件名称
 */
export const downloadFile = (url: string, name?: string) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;

    let downloadName = name;
    if (!downloadName) {
        let str = url;
        if (url.includes("?")) {
            str = url.split("?")[0];
        }
        const arr = str.split("/");
        downloadName = arr[arr.length - 1];
    }
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

/**
 * 下载文件
 * @returns
 */
export const useDownloadFile = (): [
    (url?: string, name?: string) => XMLHttpRequest | undefined,
    boolean,
] => {
    /**
     * 请求对象
     */
    const request = useRef<null | XMLHttpRequest>(null);
    /**
     * 加载状态
     */
    const [loading, setLoading] = useState(false);

    /**
     * 销毁时
     * 终止请求
     */
    useUnmount(() => {
        request.current?.abort();
    });

    /**
     * 下载回调
     * @param {string|undefined} url 下载链接
     * @param {string|undefined} name 文件名称
     * @returns
     */
    const fn = (url?: string, name?: string) => {
        if (!url) {
            return;
        }
        setLoading(true);
        request.current = ajaxRequest({
            method: "get",
            responseType: "blob",
            url,
            complete: (res) => {
                if (res.status === 200) {
                    const url = URL.createObjectURL(res.response as Blob);
                    downloadFile(url, name);
                    URL.revokeObjectURL(url);
                }
                setLoading(false);
            },
        });
        return request.current;
    };

    return [fn, loading];
};
