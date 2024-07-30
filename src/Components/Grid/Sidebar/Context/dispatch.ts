/**
 * @file 有关侧边栏的所有的事件
 * @date 2023-08-22
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-22
 */

import { createContext, useContext } from "react";
import { Org } from "../Type/org";
import { NormalResponse } from "../Type/type";
import { AssetsType } from "./assetsType";

interface DispatchContextProps {
    /**
     * 发送获取组织列表的请求
     * @param {boolean} isRefresh 是否是刷新的行为
     * @param {(res?: NormalResponse<{ organizations: Array<Org> }>) => void} callback 请求结束的回调
     * @returns
     */
    requestOrgList: (
        isRefresh?: boolean,
        callback?: (res?: NormalResponse<{ organizations: Array<Org> }>) => void,
    ) => void;
    /**
     * 发送获取偏好组织的请求
     * @param {boolean} isRefresh 是否是刷新的行为
     * @param {(res?: NormalResponse<{organization_id: string }>) => void} callback 请求结束的回调
     * @returns
     */
    requestPreferredOrg: (
        isRefresh?: boolean,
        callback?: (res?: NormalResponse<{ organization_id: string }>) => void,
    ) => void;
    /**
     * 发送修改偏好组织的请求
     * @param {string} id 偏好组织的id
     * @param {(res?: NormalResponse<{organization_id: string }>) => void} callback 请求结束的回调
     * @returns
     */
    requestUpdatePreferredOrg: (
        id: string,
        callback?: (res?: NormalResponse<undefined>) => void,
    ) => void;
    /**
     * 赋值选中的组织
     * @param {string} orgId 选中的组织id
     * @returns
     */
    setSelectedOrg: (orgId: string) => void;
    /**
     * 修改当前选中的侧边栏的类型
     * @param {AssetsType} type 当前侧边栏选中的类型
     * @returns
     */
    setActiveAssetsType: (type: AssetsType) => void;
}

export const DispatchContext = createContext<DispatchContextProps>({
    requestOrgList: () => undefined,
    requestPreferredOrg: () => undefined,
    requestUpdatePreferredOrg: () => undefined,
    setSelectedOrg: () => undefined,
    setActiveAssetsType: () => undefined,
});

export const useSidebarDispatch = () => useContext(DispatchContext);
