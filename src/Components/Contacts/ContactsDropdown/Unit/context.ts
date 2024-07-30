/**
 * @file 有关下拉框的展示状态
 * @date 2023-06-17
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-17
 */

import { createContext, useContext } from "react";

export const VisibleContext = createContext(true);

export const useContactsVisible = () => useContext(VisibleContext);
