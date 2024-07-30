/**
 * @file 有关资源类型的context
 * @date 2023-08-24
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-24
 */

import { createContext, useContext } from "react";
import { AssetsTypeProps } from "../Unit/AssetsType";

export type AssetsType = Exclude<AssetsTypeProps["value"], undefined>;

export const AssetsTypeContext = createContext<AssetsType | null>(null);

export const useAssetsType = () => useContext(AssetsTypeContext);
