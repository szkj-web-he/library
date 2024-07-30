/**
 * @file login api
 * @date 2022-08-10
 * @author Cunming Liu
 * @lastModify  2022-08-10
 */
import { service } from "./interceptor";
import { authBaseUrl, loginBaseUrl } from "./mainDomain";
import { ProjectType, getRedirectToSignIn } from "./redirectDomain";
export interface APIResponse {
    status: number;
    headers: { "dr-auth": string };
    data: {
        code: number;
        message: string;
        data?: Record<string, unknown>;
    };
}
/**
 * send first entry request
 */
export const firstEntryCheck = (data: {
    code: string;
    session_state: string;
    projectType: ProjectType;
    language: string;
}): Promise<APIResponse> => {
    return service({
        method: "post",
        url: `${loginBaseUrl}/jwt?${
            getRedirectToSignIn(data.projectType, data.language).appParams
        }`,
        data: {
            code: data.code,
            session_state: data.session_state,
        },
    });
};

/**
 * check session state
 */
export const sessionStateCheck = (): Promise<APIResponse> => {
    return service({
        method: "post",
        url: `${authBaseUrl}/session/status`,
    });
};
