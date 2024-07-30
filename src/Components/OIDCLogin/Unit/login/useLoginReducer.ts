/**
 * @file use login reducer
 * @date 2022-08-10
 * @author Cunming Liu
 * @lastModify  2022-08-10
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { LoginDataProps } from "./loginContext";
import { LoginAction } from "./loginType";

export const useLoginReducer = (): [LoginDataProps, (action: LoginAction) => void] => {
    const [state, setState] = useState<LoginDataProps>({
        status: false,
        loading: true,
    });

    const isUnLoad = useRef(false);
    useEffect(() => {
        isUnLoad.current = false;
        return () => {
            isUnLoad.current = true;
        };
    });
    const setStateCallback = useCallback((action: LoginAction) => {
        if (isUnLoad.current) {
            return;
        }
        const data = {
            status: false,
            loading: true,
        };
        switch (action.type) {
            case "SET_LOGIN_DATA": {
                data.status = action.payload.loginStatus;
                data.loading = action.payload.isLoading;
                break;
            }
        }
        setState({ ...data });
    }, []);
    return [state, setStateCallback];
};
