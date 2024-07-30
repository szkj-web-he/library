/**
 * @file 偏好组织的context
 * @date 2023-08-22
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-22
 */

import { createContext, useContext } from "react";
import { NormalResponse } from "../Type/type";

export interface PreferredOrgReducerProps {
    /**
     * 是否在请求中
     */
    loading: boolean;
    /**
     * 是否为刷新组织列表的行为
     */
    isRefresh?: boolean;
    /**
     *
     */
    data?: {
        data: NormalResponse<{ organization_id: string }>["data"];
        status: number;
    };
}

/**
 * 获取 请求到的偏好组织信息
 */

export const PreferredOrgContext = createContext<PreferredOrgReducerProps>({
    loading: false,
    data: undefined,
});

export const usePreferredOrgReducer = () => useContext(PreferredOrgContext);
