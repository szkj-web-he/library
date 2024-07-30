/**
 * @file login type
 * @date 2022-08-10
 * @author Cunming Liu
 * @lastModify  2022-08-10
 */
export enum ACTION_TYPE {
    SET_LOGIN_DATA = 'SET_LOGIN_DATA',
}
export interface SetLoginDataAction {
    type: ACTION_TYPE.SET_LOGIN_DATA;
    payload: {
        loginStatus: boolean;
        isLoading: boolean;
    };
}
export type LoginAction = SetLoginDataAction;
