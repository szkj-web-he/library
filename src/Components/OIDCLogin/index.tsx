/**
 * @file OIDC login
 * @date 2022-08-08
 * @author Cunming Liu
 * @lastModify  2022-08-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    FC,
    useEffect,
    useInsertionEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import { LoadingV2 } from "../..";
import { useLatest } from "./../../Hooks/useLatest";
import { initRedirectKey, initService, setRedirectRoute } from "./Api/interceptor";
import { ProjectType } from "./Api/redirectDomain";
import { LoginContext } from "./Unit/login/loginContext";
import { ACTION_TYPE } from "./Unit/login/loginType";
import { useLoginReducer } from "./Unit/login/useLoginReducer";
import { ProjectContext } from "./Unit/projectContext";
import {
    checkSessionStateAfterApi,
    checkSessionStateApi,
    firstEntryFnAfterApi,
    firstEntryFnApi,
    getJwtKeyForEnv,
    mapRoute,
    redirectToSignIn,
    removeUrl,
} from "./Unit/Utils";
import { OIDCRouteType } from "./Unit/Utils/type";
import ManagementContext from "../Grid/Sidebar/Unit/ManagementContext";
import { isHaveSidebar } from "../../DefaultData/OIDC";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

interface OIDCLoginProps {
    /**
     * children of this component
     */
    children: React.ReactNode;
    /**
     * default language
     * 默认的语言类型
     */
    language?: "en" | "cn";
    /**
     * 项目标识
     * * 必传
     */
    projectType: ProjectType;
    /**
     * When project type is market and cmty,the routes is required.
     */
    routes?: OIDCRouteType[];
    /**
     * In development mode , jwt
     */
    development_jwt?: string;
    /**
     * 存在localStorage里的参数key
     * 目前时针对market和cmty里的项目跳转参数存储做的功能
     * 但可以不仅仅时market和cmty 后续待调整
     * 默认值 redirect_route
     */
    paramsKey?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const OIDCLogin: FC<OIDCLoginProps> = ({
    language,
    projectType,
    routes,
    children,
    development_jwt,
    paramsKey = "redirect_route",
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [loginState, loginDispatch] = useLoginReducer();

    const jwtKey = useMemo(() => {
        return getJwtKeyForEnv();
    }, []);

    const [isPrivate, setIsPrivate] = useState<boolean>();

    /**
     * 需不需要获取登录状态
     */
    const needGetLoginStatus = useLatest(loginState.loading);

    /**
     * 修改登录状态的dispatch
     */
    const loginDispatchRef = useLatest(loginDispatch);

    /**
     * 项目环境
     */
    const projectTypeRef = useLatest(projectType);
    /**
     * 路由表
     */
    const routesRef = useLatest(routes);

    /**
     * 获取项目语言环境
     */
    const languageVal = useMemo(() => {
        return language ?? window.navigator.language === "zh-CN" ? "cn" : "en";
    }, [language]);

    /**
     * 定义项目环境
     */
    useInsertionEffect(() => {
        initService();
    }, []);

    /**
     * 初始化重定向的链接
     */
    useInsertionEffect(() => {
        initRedirectKey(paramsKey);
    }, [paramsKey]);

    /**
     * 添加监听pushState和replaceState的方法
     */
    useInsertionEffect(() => {
        function watchState(action: "pushState" | "replaceState") {
            const raw = window.history[action];

            return function (...args: [unknown, string, string | URL | null | undefined]) {
                const wrapper = raw.apply(window.history, args);

                const e = new CustomEvent(action, {
                    detail: {
                        data: args[0],
                        unused: args[1],
                        url: args[2],
                    },
                });
                window.dispatchEvent(e);
                return wrapper;
            };
        }
        window.history.pushState = watchState("pushState");
        window.history.replaceState = watchState("replaceState");
    }, []);

    /**
     * 在开发环境下，将传入的development_jwt存入到localStorage中
     */
    useInsertionEffect(() => {
        if (process.env.NODE_ENV === "development") {
            development_jwt && window.localStorage.setItem(jwtKey, development_jwt);
        }
    }, [development_jwt, jwtKey]);

    /**
     * 当监听到地址栏发生了变化
     */
    useEffect(() => {
        const watchHistoryChange = () => {
            const path = removeUrl(window.location.pathname);

            if (
                projectTypeRef.current === "community" ||
                projectTypeRef.current === "marketplace"
            ) {
                const routeData = routesRef.current ? mapRoute(routesRef.current) : {};
                setIsPrivate(routeData[path] ?? false);
            }
        };

        window.addEventListener("pushState", watchHistoryChange);
        window.addEventListener("replaceState", watchHistoryChange);
        window.addEventListener("popstate", watchHistoryChange);
        return () => {
            window.removeEventListener("pushState", watchHistoryChange);
            window.removeEventListener("replaceState", watchHistoryChange);
            window.removeEventListener("popstate", watchHistoryChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * 判断路由是否为私有路由吗，私有路由,isPrivate设置为true,公有路由设置为false.
     * 私有路由，需要走OIDC登录流程。
     * 公有路由，则直接跳转到相应的页面。
     */
    useLayoutEffect(() => {
        const pathname = window.location.pathname;
        const url = removeUrl(pathname);

        //Judge project type,
        if (pathname.includes("/login_redirect")) {
            setIsPrivate(undefined);
        } else if (projectType === "community" || projectType === "marketplace") {
            const routeData = routes ? mapRoute(routes) : {};

            setIsPrivate(routeData[url] ?? false);
        } else if (projectType === "website") {
            setIsPrivate(false);
        } else {
            setIsPrivate(true);
        }
    }, [projectType, routes]);
    /**
     * 登录流程
     */
    useLayoutEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const [code, sessionState] = [urlParams.get("code"), urlParams.get("session_state")];
        const refreshFn = () => {
            if (process.env.NODE_ENV === "development") {
                void checkSessionStateApi((res) => {
                    checkSessionStateAfterApi(res, loginDispatchRef, languageVal, projectType);
                });
            } else {
                const jwt = window.localStorage.getItem(`${jwtKey}`);
                if (jwt) {
                    // if jwt exists, check if it is expired or not
                    void checkSessionStateApi((res) => {
                        checkSessionStateAfterApi(res, loginDispatchRef, languageVal, projectType);
                    });
                } else {
                    //如果jwt不存在，或者session过期了，将浏览输入栏上路由和参数存入localStorage

                    setRedirectRoute();

                    redirectToSignIn(languageVal, projectType);
                }
            }
        };

        //如果跳转路由，则调用entry
        if (location.pathname.includes("/login_redirect") && code && sessionState) {
            // 进入重定向的路由  这个时候需要获取jwt

            void firstEntryFnApi(code, sessionState, projectTypeRef.current, languageVal, (res) => {
                firstEntryFnAfterApi(res, loginDispatchRef);
            });

            return;
        }

        if (needGetLoginStatus.current) {
            //如果进入了路由表 需要获取用户登录状态

            if (isPrivate) {
                //如果是私有路由，走登录流程
                refreshFn();
            } else if (isPrivate === false) {
                /**
                 * 不是私有路由
                 * */

                if (window.localStorage.getItem(jwtKey)) {
                    /**
                     * 如果由Jwt
                     * 只做jwt是否有效的判断
                     */
                    void checkSessionStateApi((res) => {
                        if (res.status === 200) {
                            loginDispatchRef.current({
                                type: ACTION_TYPE.SET_LOGIN_DATA,
                                payload: {
                                    loginStatus: true,
                                    isLoading: false,
                                },
                            });
                            return;
                        }

                        window.localStorage.removeItem(jwtKey);
                    });
                }

                /*
                 * 就直接进去
                 */

                loginDispatchRef.current({
                    type: ACTION_TYPE.SET_LOGIN_DATA,
                    payload: {
                        loginStatus: false,
                        isLoading: false,
                    },
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPrivate, jwtKey, languageVal]);
    /**
     * 恢复跳转的URL。
     */
    useLayoutEffect(() => {
        if (loginState.loading === false && location.pathname.includes("/login_redirect")) {
            //Get redirect link from localStorage.
            //If redirect link exists ,redirect to the link.
            //Else redirect to home page.
            const redirectRoute = window.localStorage.getItem(paramsKey);
            if (redirectRoute) {
                window.location.replace(redirectRoute ?? "");
            } else {
                window.location.replace(window.location.href.replace(/\/login_redirect.*/, ""));
            }
            //拼接route后，进行删除redirect route。
            localStorage.removeItem(paramsKey);
        }
    }, [loginState.loading, paramsKey]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const contentEl = () => {
        if (isHaveSidebar[projectType]) {
            return <ManagementContext>{children}</ManagementContext>;
        }
        return children;
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <ProjectContext.Provider value={projectType}>
            <LoginContext.Provider value={loginState}>
                {contentEl()}
                {typeof isPrivate === "boolean" &&
                ((isPrivate && loginState.status) || !isPrivate) ? (
                    <></>
                ) : (
                    <LoadingV2
                        style={{
                            position: "fixed",
                            left: 0,
                            top: 0,
                            width: "100vw",
                            height: "100vh",
                            zIndex: 9999,
                            backgroundColor: "#fff",
                        }}
                    />
                )}
            </LoginContext.Provider>
        </ProjectContext.Provider>
    );
};
export default OIDCLogin;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
