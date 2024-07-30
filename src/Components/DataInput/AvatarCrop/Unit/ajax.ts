/**
 * @file ajax file
 * @date 2021-09-23
 * @author xuejie.he
 * @lastModify xuejie.he 2021-09-23
 */

import { getJwtKey } from "../../../..";

export interface AjaxProps {
    url: string;
    method: "get" | "post" | "delete" | "put" | "head";
    headers?: Record<string, string>;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
    data?: Record<string | number, unknown>;
    complete?: (response: XMLHttpRequest) => void;
}
/**
 *
 * @param {AjaxProps} config
 * @returns {XMLHttpRequest}
 */

export const ajaxRequest = (config: AjaxProps): XMLHttpRequest => {
    const ajax: XMLHttpRequest = new XMLHttpRequest();

    const fn = (response: XMLHttpRequest): void => {
        const data = (response as unknown as Record<string | number, unknown>)
            .currentTarget as XMLHttpRequest;
        if (data.DONE === data.readyState) {
            config.complete?.(data);
        }
    };

    ajax.open(config.method.toUpperCase(), config.url);
    if (config.responseType) {
        ajax.responseType = config.responseType;
    }

    ajax.timeout = config.timeout ?? 3000;

    ajax.onreadystatechange = fn as unknown as (this: XMLHttpRequest, ev: Event) => never;
    const jwt = window.localStorage.getItem(getJwtKey());
    if (jwt) {
        ajax.setRequestHeader("dr-auth", jwt);
    }

    for (const key in config.headers) {
        ajax.setRequestHeader(key, config.headers[key]);
    }

    let str = "";
    const deconstruction = (data: Record<string | number, unknown>) => {
        for (const key in data) {
            if (typeof data[key] === "object") {
                deconstruction(data[key] as Record<string | number, unknown>);
            }
            if (str) {
                str += "&";
            }
            str += `${key}=${window.encodeURIComponent(data[key] as string | number | boolean)}`;
        }
    };
    if (config.data) {
        deconstruction(config.data);
    }
    ajax.send(str);

    return ajax;
};
