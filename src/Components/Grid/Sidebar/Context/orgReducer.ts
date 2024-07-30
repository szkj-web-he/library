/**
 * @file 有关组织列表的context
 * @date 2023-08-22
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-22
 */

import { createContext, useContext } from "react";
import { Org } from "../Type/org";
import { NormalResponse } from "../Type/type";

export interface OrgReducerProps {
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
        data: NormalResponse<{ organizations: Array<Org> }>["data"];
        status: number;
    };
}

/**
 * 获取 请求到的组织信息
 */

export const OrgReducerContext = createContext<OrgReducerProps>({
    loading: false,
    data: undefined,
});

export const useOrgReducer = () => useContext(OrgReducerContext);
