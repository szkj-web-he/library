/**
 * @file 后台管理类的context
 * @date 2023-08-22
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-22
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useLayoutEffect, useMemo, useState } from "react";
import { useGetSet, useLoginStatus } from "../../../../..";
import { deepCloneData } from "../../../../../Unit/deepCloneData";
import { baseName } from "../../../../OIDCLogin/Api/mainDomain";
import { AssetsType, AssetsTypeContext } from "../../Context/assetsType";
import { DispatchContext } from "../../Context/dispatch";
import { OrgReducerContext, OrgReducerProps } from "../../Context/orgReducer";
import { PreferredOrgContext, PreferredOrgReducerProps } from "../../Context/preferredOrgReducer";
import { SelectedOrgContext } from "../../Context/selectedOrg";
import { Org } from "../../Type/org";
import { NormalResponse } from "../../Type/type";
import { request } from "../request";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    children?: React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ children }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     * 请求到的组织数据
     */
    const [getOrg, setOrg] = useGetSet<OrgReducerProps>({ loading: true });
    /**
     * 请求到的偏好组织
     */

    const [getPreferredOrg, setPreferredOrg] = useGetSet<PreferredOrgReducerProps>({
        loading: true,
    });
    /**
     * 选中的组织
     */
    const [getSelectedOrg, setSelectedOrg] = useGetSet<Org | null>(null);
    /**
     * 资源类型
     */
    const [type, setType] = useState<AssetsType | null>(null);

    const dispatch = useMemo(() => {
        /**
         * 修改 组织列表的reducer
         */
        const changeOrgListReducer = (res: OrgReducerProps) => {
            if (res.data?.data.data?.organizations?.length) {
                const selectedOrg = getSelectedOrg();
                const preferredOrg = getPreferredOrg();
                /**
                 * 设置选中的组织
                 * 如果没有设置选中的组织的时候
                 * 才会触发
                 */
                if (!selectedOrg && preferredOrg.data?.data.data?.organization_id) {
                    setSelectedOrg(
                        res.data?.data.data?.organizations.find(
                            (item) => item.id === preferredOrg.data?.data.data?.organization_id,
                        ) ?? null,
                    );
                }

                setOrg({
                    loading: res.loading,
                    isRefresh: res.isRefresh,
                    data: {
                        data: res.data.data,
                        status: res.data.status,
                    },
                });
            } else {
                const orgData = getOrg();
                setOrg({
                    ...orgData,
                    loading: res.loading,
                    isRefresh: res.isRefresh,
                });
            }
        };

        /**
         * 修改偏好组织的reducer
         */
        const changePreferredOrgReducer = (res: PreferredOrgReducerProps) => {
            /**
             * 如果请求到偏好组织
             */
            if (res.data?.data?.data?.organization_id) {
                const id = res.data.data.data.organization_id;

                const selectedOrg = getSelectedOrg();

                const orgData = getOrg();
                /**
                 * 设置选中的组织
                 * 如果没有设置选中的组织的时候
                 * 才会触发
                 */
                if (!selectedOrg && orgData.data?.data.data?.organizations.length) {
                    setSelectedOrg(
                        orgData.data.data.data.organizations.find((item) => item.id === id) ?? null,
                    );
                }
                /**
                 * 保存数据
                 */
                setPreferredOrg({
                    loading: res.loading,
                    isRefresh: res.isRefresh,
                    data: {
                        data: res.data.data,
                        status: res.data.status,
                    },
                });
            } else {
                const preferredOrg = getPreferredOrg();
                /**
                 * 如果没有
                 */
                setPreferredOrg({
                    ...preferredOrg,
                    loading: res.loading,
                    isRefresh: res.isRefresh,
                });
            }
        };

        /**
         * 请求组织列表
         */
        const requestOrgList = (
            isRefresh?: boolean,
            callback?: (res?: NormalResponse<{ organizations: Array<Org> }>) => void,
        ) => {
            changeOrgListReducer({ loading: true, isRefresh });

            request<NormalResponse<{ organizations: Array<Org> }>>({
                method: "post",
                url: `/query/centre${baseName}/profile/org/role/by_user`,
            })
                .then((res) => {
                    callback?.(res);
                    if (!res) {
                        changeOrgListReducer({ loading: false, isRefresh });
                        return;
                    }
                    changeOrgListReducer({
                        loading: false,
                        isRefresh,
                        data: {
                            data: res.data,
                            status: res.status,
                        },
                    });
                })
                .catch(() => {
                    callback?.();
                    changeOrgListReducer({ loading: false, isRefresh });
                });
        };

        /**
         * 请求偏好组织
         */
        const requestPreferredOrg = (
            isRefresh?: boolean,
            callback?: (res?: NormalResponse<{ organization_id: string }>) => void,
        ) => {
            changePreferredOrgReducer({ loading: true, isRefresh });
            request<NormalResponse<{ organization_id: string }>>({
                method: "post",
                url: `/user${baseName}/preferred_org/get`,
            })
                .then((res) => {
                    callback?.(res);
                    if (!res) {
                        changePreferredOrgReducer({ loading: false, isRefresh });
                        return;
                    }
                    changePreferredOrgReducer({
                        loading: false,
                        isRefresh,
                        data: {
                            data: res.data,
                            status: res.status,
                        },
                    });
                })
                .catch(() => {
                    callback?.();
                    changePreferredOrgReducer({ loading: false, isRefresh });
                });
        };

        /**
         * 发送修改偏好组织的请求
         */
        const requestUpdatePreferredOrg = (
            id: string,
            callback?: (res?: NormalResponse<undefined>) => void,
        ) => {
            request<NormalResponse<undefined>, { organization_id: string }>({
                method: "post",
                url: `/user${baseName}/preferred_org/set`,
                data: {
                    organization_id: id,
                },
            })
                .then((res) => {
                    if (!res) {
                        callback?.();
                        return;
                    }

                    if (res.data.code === 200100) {
                        requestPreferredOrg(true, () => {
                            callback?.(res);
                        });
                    } else {
                        callback?.(res);
                    }
                })
                .catch(() => {
                    callback?.();
                });
        };

        return {
            requestOrgList,
            requestPreferredOrg,
            requestUpdatePreferredOrg,
            /**
             * 修改选中的组织
             */
            setSelectedOrg: (res: string) => {
                const orgData = getOrg();

                const orgs = orgData.data?.data.data?.organizations;
                if (orgs?.length) {
                    for (let i = 0; i < orgs.length; ) {
                        const item = orgs[i];
                        if (item.id === res) {
                            const selectedOrg = getSelectedOrg();

                            if (
                                !selectedOrg ||
                                JSON.stringify(item) !== JSON.stringify(selectedOrg)
                            ) {
                                setSelectedOrg(deepCloneData(item));
                            }
                            i = orgs.length;
                        } else {
                            ++i;
                        }
                    }
                }
            },
            setActiveAssetsType: (res: typeof type) => {
                setType(res);
            },
        };
    }, [getOrg, getPreferredOrg, getSelectedOrg, setOrg, setPreferredOrg, setSelectedOrg]);

    /**
     * 获取用户登录状态
     */
    const status = useLoginStatus();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useLayoutEffect(() => {
        if (status.loading === false && status.status) {
            dispatch.requestOrgList();
            dispatch.requestPreferredOrg();
        }
    }, [status.loading, status.status, dispatch]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <DispatchContext.Provider value={dispatch}>
            <PreferredOrgContext.Provider value={getPreferredOrg()}>
                <OrgReducerContext.Provider value={getOrg()}>
                    <SelectedOrgContext.Provider value={getSelectedOrg()}>
                        <AssetsTypeContext.Provider value={type}>
                            {children}
                        </AssetsTypeContext.Provider>
                    </SelectedOrgContext.Provider>
                </OrgReducerContext.Provider>
            </PreferredOrgContext.Provider>
        </DispatchContext.Provider>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
