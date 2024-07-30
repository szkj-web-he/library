/**
 * @file 选中的组织
 * @date 2023-08-23
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-23
 */

import { createContext, useContext } from "react";
import { Org } from "../Type/org";

/**
 * 获取 选中的组织
 */

export const SelectedOrgContext = createContext<Org | null>(null);

export const useSelectedOrg = () => useContext(SelectedOrgContext);
