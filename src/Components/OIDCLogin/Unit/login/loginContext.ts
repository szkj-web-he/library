/**
 * @file login context
 * @date 2022-08-10
 * @author Cunming Liu
 * @lastModify  2022-08-10
 */

import { createContext, useContext } from "react";

export interface LoginDataProps {
    status: boolean;
    loading: boolean;
}
const defaultLoginData = (): LoginDataProps => ({
    status: false,
    loading: true,
});
export const LoginContext = createContext(defaultLoginData());

/**
 * 获取登录状态
 */
export const useLoginStatus = () => useContext(LoginContext);
