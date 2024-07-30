/**
 * @file main domain
 * @date 2022-08-10
 * @author Cunming Liu
 * @lastModify  2022-08-10
 */

/**
 * 不用关心这个字段
 */
let mainDomain = "";
let loginBaseUrl = "";
let authBaseUrl = "";
let openIDConnectService1 = "";

let baseName = process.env.BASENAME ?? "/v2/dev";

switch (process.env.NODE_ENV) {
    // npm start 本地开发环境
    case "development":
        baseName = "/v2/dev";
        mainDomain = "https://dev-api.datareachable.cn";
        loginBaseUrl = "https://dev-api.datareachable.cn/common/oidc/v2";
        authBaseUrl = "https://dev-api.datareachable.cn/auth/common/v2";
        openIDConnectService1 = "/common/oidc/v2";
        break;

    // npm run buildV1 线上开发环境 (development test, 产品 QA)
    case "v1_dev":
        mainDomain = "https://dev-api.datareachable.cn";
        loginBaseUrl = "https://dev-api.datareachable.cn/common/oidc/v1";
        authBaseUrl = "https://dev-api.datareachable.cn/auth/common/v1";
        openIDConnectService1 = "/common/oidc/v1";
        break;

    // npm run buildV2 线上开发环境 (development test, 产品 QA)
    case "v2_dev":
        mainDomain = "https://dev-api.datareachable.cn";
        loginBaseUrl = "https://dev-api.datareachable.cn/common/oidc/v2";
        authBaseUrl = "https://dev-api.datareachable.cn/auth/common/v2";
        openIDConnectService1 = "/common/oidc/v2";
        break;

    // npm run testV2 测试环境, 开发稳定版
    case "v2_test":
        mainDomain = "https://dev-api.datareachable.cn";
        loginBaseUrl = "https://dev-api.datareachable.cn/common/oidc/v2/test";
        authBaseUrl = "https://dev-api.datareachable.cn/auth/common/v2/test";
        openIDConnectService1 = "/common/oidc/v2/test";
        break;

    // 线上生产环境, 正式版本
    case "production":
        mainDomain = "https://api.datareachable.cn";

        loginBaseUrl = "https://api.datareachable.cn/common/oidc/v2";

        authBaseUrl = "https://api.datareachable.cn/auth/common/v2";

        openIDConnectService1 = "/common/oidc/v2";

        break;

    // 其他环境
    default:
        mainDomain = "https://dev-api.datareachable.cn";
        loginBaseUrl = "https://dev-api.datareachable.cn/common/oidc/v2";
        authBaseUrl = "https://dev-api.datareachable.cn/auth/common/v2";
        openIDConnectService1 = "/common/oidc/v2";
        break;
}

export { loginBaseUrl, authBaseUrl, openIDConnectService1, baseName };

export default mainDomain;
