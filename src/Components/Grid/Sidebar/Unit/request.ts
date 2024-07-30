/**
 * @file
 * @date 2023-08-29
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-29
 */

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getJwtKey } from "../../../..";
import mainDomain from "../../../OIDCLogin/Api/mainDomain";
import { message } from "../../../..";
import i18next from "i18next";

const service = axios.create({
    baseURL: mainDomain, // api base_url
});

// request interceptors
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const jwt = localStorage.getItem(getJwtKey());
        if (jwt) {
            config.headers = Object.assign({}, config.headers, {
                ["DR-AUTH"]: jwt,
            });
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// response interceptors
service.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        return error;
    },
);

/**
 *
 * response的预处理
 * 模糊处理
 *
 * 除了成功
 * 就是失败
 */

const processingResponse = <T>(result: AxiosResponse<T>): AxiosResponse<T> | undefined => {
    if (axios.isAxiosError(result)) {
        if (result.code === "ERR_CANCELED") {
            //请求被取消

            return undefined;
        }

        if (result.code && ["ETIMEDOUT", "ECONNABORTED", "ERR_NETWORK"].includes(result.code)) {
            // 请求超时
            message.auto({
                type: "error",
                content:
                    i18next.language === "cn"
                        ? "请求超时，请稍后重试"
                        : "Request timed out, please try again later",
            });
            return undefined;
        }

        return result.response;
    }

    return result;
};

export const request = async <T extends AxiosResponse, D = AxiosRequestConfig<unknown>>(
    params: AxiosRequestConfig<D>,
) => {
    return new Promise<AxiosResponse<T["data"]> | undefined>((resolve, reject) => {
        try {
            service
                .request(params)
                .then((res) => {
                    resolve(processingResponse(res));
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
};
