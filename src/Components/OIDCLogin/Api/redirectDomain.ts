/**
 * @file redirect Domain
 * @date 2022-08-10
 * @author Cunming Liu
 * @lastModify  2022-08-10
 */
import mainDomain, { openIDConnectService1 } from "./mainDomain";
export type ProjectType = keyof typeof projectTypeMap;
let redirectToSignInPage = "";

// let projectType: projectType = 'profile';
const projectTypeMap = {
    profile: "profile",
    dashboard: "dashboard",
    "project-manager": "project-mgmt",
    qeditor: "qeditor",
    "qeditor-dashboard": "qdashboard",
    "survey-dist": "dist",
    "data-proc": "data-proc",
    "plugins ide": "plg-sys",
    marketplace: "market",
    "data-collection": "datacoll",
    community: "community",
    website: "website",

    "trade-agreement": "trade",
    "data-assets-entry": "assets",
};
// const origin = window.location.origin;
// const regExp = /^https?:\/\/([^.]+)\./;
// const matchValue = origin.match(regExp)?.[1];
// projectType = convertSmallHumpName(matchValue ?? 'dashboard') as projectType;
const getRedirectToSignIn = (projectType: ProjectType, language: string) => {
    let appParams = "";
    switch (process.env.NODE_ENV) {
        // npm start 本地开发环境
        case "development": {
            appParams = `app=${String(projectTypeMap[projectType])}-v2-dev&lang=${language}`;
            redirectToSignInPage = `${mainDomain}${openIDConnectService1}/entry?${appParams}`;
            break;
        }
        // npm run buildV1 生产测试环境 (development test)
        case "v1_dev": {
            appParams = `app=${String(projectTypeMap[projectType])}-v1-dev&lang=${language}`;
            redirectToSignInPage = `${mainDomain}${openIDConnectService1}/entry?${appParams}`;
            break;
        }
        // npm run buildV2 生产测试环境 (development test)
        case "v2_dev": {
            appParams = `app=${String(projectTypeMap[projectType])}-v2-dev&lang=${language}`;
            redirectToSignInPage = `${mainDomain}${openIDConnectService1}/entry?${appParams}`;
            break;
        }
        // npm run testV2 测试环境, 线上稳定版
        case "v2_test": {
            appParams = `app=${String(projectTypeMap[projectType])}-v2-test&lang=${language}`;
            redirectToSignInPage = `${mainDomain}${openIDConnectService1}/entry?${appParams}`;
            break;
        }
        // 线上生产环境, 正式版本
        case "production": {
            appParams = `app=${String(projectTypeMap[projectType])}-v2-stable&lang=${language}`;
            redirectToSignInPage = `${mainDomain}${openIDConnectService1}/entry?${appParams}`;
            break;
        }
        // 其他环境
        default: {
            appParams = `app=${String(projectTypeMap[projectType])}-v2-dev&lang=${language}`;
            redirectToSignInPage = `${mainDomain}${openIDConnectService1}/entry?${appParams}`;
            break;
        }
    }
    return {
        redirectToSignInPage,
        appParams,
    };
};
export { getRedirectToSignIn };
