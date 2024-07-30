/**
 * @file utils
 * @date 2022-08-10
 * @author Cunming Liu
 * @lastModify  2022-08-10
 */
import { MutableRefObject } from "react";
import { setRedirectRoute } from "../../Api/interceptor";
import { APIResponse, firstEntryCheck, sessionStateCheck } from "../../Api/login";
import { getRedirectToSignIn, ProjectType } from "../../Api/redirectDomain";
import { setLoginDataAction } from "../login/loginAction";
import { LoginAction, SetLoginDataAction } from "../login/loginType";
import { OIDCRouteProps, OIDCRouteType } from "./type";

/**
 * call entry api
 */
export const firstEntryFnApi = async (
    code: string,
    sessionState: string,
    projectType: ProjectType,
    language: string,
    callback: (res: APIResponse) => void,
) => {
    // if (code && sessionState) {
    // check code and session_state
    const res = await firstEntryCheck({
        code,
        session_state: sessionState,
        projectType,
        language,
    });
    callback(res);
    // }
};
export const firstEntryFnAfterApi = (
    res: APIResponse,
    dispatch: MutableRefObject<(action: SetLoginDataAction) => void>,
) => {
    if (res.status === 200) {
        // Save jwt to localStorage
        const jwtKey = getJwtKeyForEnv();
        window.localStorage.setItem(jwtKey, res.headers["dr-auth"]);
        dispatch.current(
            setLoginDataAction({
                loginStatus: true,
                isLoading: false,
            }),
        );
    } else {
        dispatch.current(
            setLoginDataAction({
                loginStatus: false,
                isLoading: false,
            }),
        );
    }
};

/**
 * check session state
 */
export const checkSessionStateApi = async (callback: (res: APIResponse) => void) => {
    const res = await sessionStateCheck();
    callback(res);
};
export const checkSessionStateAfterApi = (
    res: APIResponse,
    dispatch: MutableRefObject<(action: LoginAction) => void>,
    language: string,
    projectType: ProjectType,
) => {
    if (res.status == 200) {
        dispatch.current(
            setLoginDataAction({
                loginStatus: true,
                isLoading: false,
            }),
        );
        return;
    }
    //The jwt is expired , remove jwt
    const jwtKey = getJwtKeyForEnv();
    window.localStorage.removeItem(jwtKey);

    //存储route到localStorage
    setRedirectRoute();
    //redirect sign in.
    redirectToSignIn(language, projectType);

    dispatch.current(
        setLoginDataAction({
            loginStatus: false,
            isLoading: false,
        }),
    );
};
/**
 *  Convert the underscore command format to a small hump name
 */
export const convertSmallHumpName = function (appName: string) {
    const appNameArr = appName.split("-");
    const appNameArrMap = appNameArr.map((value, index) => {
        if (index > 0) {
            const valueArr = value.split("");
            const valueArrMap = valueArr.map((value, index) => {
                if (index == 0) {
                    return value.toUpperCase();
                }
                return value;
            });
            return valueArrMap.join("");
        }
        return value;
    });
    return appNameArrMap.join("");
};

/**
 * Get JWT keys for different environments
 * @returns jwt key
 */
export const getJwtKeyForEnv = () => {
    let jwtKey = "jwt_development";
    switch (process.env.NODE_ENV) {
        // npm start 本地开发环境
        case "development": {
            jwtKey = "development_jwt";
            break;
        }
        // npm run buildV1 生产测试环境 (development test)
        case "v1_dev": {
            jwtKey = `${process.env.NODE_ENV}_jwt`;
            break;
        }
        // npm run buildV2 生产测试环境 (development test)
        case "v2_dev": {
            jwtKey = `${process.env.NODE_ENV}_jwt`;
            break;
        }
        // npm run testV2 测试环境, 线上稳定版
        case "v2_test": {
            jwtKey = `${process.env.NODE_ENV}_jwt`;
            break;
        }
        // 线上生产环境, 正式版本
        case "production": {
            jwtKey = "production_jwt";
            break;
        }
        // 其他环境
        default: {
            jwtKey = "*_jwt";
            break;
        }
    }
    return jwtKey;
};
export const redirectToSignIn = (language: string, projectType: ProjectType) => {
    window.location.replace(getRedirectToSignIn(projectType, language).redirectToSignInPage);
};

/**
 * 将传过来的路由表转化一下
 */
export const mapRoute = (routes: OIDCRouteType[], parentPath?: string) => {
    let data: OIDCRouteProps = {};

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        let path = route.path || "/";
        if (parentPath) {
            path =
                parentPath.endsWith("/") && path.startsWith("/")
                    ? `${parentPath}${path.replace("/", "")}`
                    : `${parentPath}${path}`;
        }

        if (route.children) {
            data = Object.assign({}, data, mapRoute(route.children, path));
        } else {
            data[path] = route.isPrivate ?? false;
        }
    }
    return data;
};

/**
 * 移除bashName
 */

export const removeUrl = (url: string, needBaseName = false) => {
    const baseName = process.env.BASENAME === "/" ? "" : process.env.BASENAME ?? "";
    const reg = new RegExp(`(${baseName})+`, "g");

    return url.replace(reg, needBaseName ? process.env.BASENAME ?? "" : "") || "/";
};
