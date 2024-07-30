/**
 * @file action
 * @date 2022-08-10
 * @author Cunming Liu
 * @lastModify  2022-08-10
 */
import { ACTION_TYPE } from "./loginType";

export const setLoginDataAction = (payload: { loginStatus: boolean; isLoading: boolean }) => ({
    type: ACTION_TYPE.SET_LOGIN_DATA,
    payload,
});
