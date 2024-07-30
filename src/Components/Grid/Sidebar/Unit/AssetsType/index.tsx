/**
 * @file 不同项目，所拥有的不同类型的资源
 * @date 2023-08-21
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import classNames from "../../../../../Unit/classNames";
import {
    NormalManagementTypeData,
    PluginTypeData,
    ProjectManagementTypeData,
} from "../../Type/type";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface AssetsTypeProps {
    value?: keyof PluginTypeData | keyof ProjectManagementTypeData | keyof NormalManagementTypeData;
    data?: PluginTypeData | ProjectManagementTypeData | NormalManagementTypeData | "loading";
}

export interface AssetsTypeEvents {
    /**
     * 改变选中的类型
     */
    change: (type: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={styles.sidebar_assetsTypeWrapper}>{children}</div>
);

const Item: React.FC<{ children: React.ReactNode; active?: boolean; onClick?: () => void }> = ({
    children,
    active,
    onClick,
}) => (
    <div
        className={classNames(styles.sidebar_assetsType__item, {
            [styles.sidebar_assetsType__itemActive]: active,
        })}
        onClick={() => {
            onClick?.();
        }}
    >
        {children}
    </div>
);

export { Item, Wrapper };
