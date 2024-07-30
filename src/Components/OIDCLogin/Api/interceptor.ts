/**
 * @file request
 * @date 2022-08-10
 * @author Cunming Liu
 * @lastModify  2022-08-10
 */
import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders } from "axios";
import { getLanguage, notice } from "../../..";
import { getJwtKeyForEnv, removeUrl } from "../Unit/Utils";
import mainDomain from "./mainDomain";

let service: AxiosInstance = axios;

const globalData = {
    isAli: false,
    routeKey: "redirect_route",
};

const initService = () => {
    service = axios.create({
        baseURL: mainDomain,
        timeout: 10000,
    });
    //request interceptors
    service.interceptors.request.use(
        (config) => {
            const jwtKey = getJwtKeyForEnv();
            const jwt = window.localStorage.getItem(`${jwtKey}`);
            if (jwt) {
                (config.headers as AxiosRequestHeaders)["DR-AUTH"] = jwt;
            }
            if (window.navigator.onLine === false) {
                void getLanguage().then((language) => {
                    throw new axios.Cancel(
                        language === "en"
                            ? "The network status is not good, please check your network"
                            : "网络状态不好，请检查您的网络",
                    );
                });
            }
            return config;
        },
        (error: AxiosError) => {
            console.log("request error-->", error); // for debug
            return error;
        },
    );
    //respondent interceptors
    service.interceptors.response.use(
        (config) => {
            return config;
        },
        (error: AxiosError) => {
            if (axios.isCancel(error)) {
                void getLanguage().then((language) => {
                    error.message &&
                        notice.error({
                            title: language === "en" ? "Error" : "错误",
                            description: error.message,
                        });
                });
            } else {
                return (error as unknown as Record<string, object>).response;
            }
            return error;
        },
    );
};

/**
 * 初始化重定向的Key
 */
export const initRedirectKey = (res: string) => {
    globalData.routeKey = res;
};

/**
 * 添加重定向链接
 */
export const setRedirectRoute = () => {
    const path = removeUrl(window.location.pathname, true);
    localStorage.setItem(globalData.routeKey, path + window.location.search);
};

export { service, initService };
