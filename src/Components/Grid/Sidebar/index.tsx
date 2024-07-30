/**
 * @file Sidebar
 * @date 2022-01-05
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-05
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useRef } from "react";
import { languageConfig } from "../../../DefaultData/Grid/sidebar";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { useProjectContext } from "../../OIDCLogin/Unit/projectContext";
import { useSidebarDispatch } from "./Context/dispatch";
import { NormalManagementTypeData, PluginTypeData, ProjectManagementTypeData } from "./Type/type";
import { AssetsTypeEvents } from "./Unit/AssetsType";
import Normal from "./Unit/NormalLabel";
import OrgTemp from "./Unit/Org";
import Plugin from "./Unit/PluginLabel";
import Project from "./Unit/ProjectLabel";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 活跃的组织
     */
    activeOrg?: string;
    /**
     * 类型数据
     * 分3大类
     *
     * 插件系统
     * 1.已绑定 bind  2.星标 star  3.已发布 publish  4.已完成 completed  5.移交记录 transfer 6.预览 preview
     *
     * 项目管理系统
     * 1. 全部 all  2.星标 star 3.已发布 publish 4.归档 archived
     *
     * 其它系统
     * 1. 全部 all 2.星标 star 3.项目相关 projectRelated  4.未绑定 notBound
     *
     *
     * loading 为，数据请求中
     */
    typeData?: PluginTypeData | ProjectManagementTypeData | NormalManagementTypeData | "loading";

    /**
     * 身份
     *
     * client ==> 甲方
     * supplier ==> 乙方
     *
     * 在
     * '表单分发'、'表单编辑'、'数据处理'的项目时有效
     */
    ide?: "client" | "supplier";
    /**
     * 默认选中的类型
     */
    type?: keyof PluginTypeData | keyof ProjectManagementTypeData | keyof NormalManagementTypeData;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Sidebar = forwardRef<HTMLDivElement | null, SidebarProps>(
    ({ className, typeData, activeOrg, ide, ...props }, ref) => {
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const { setSelectedOrg } = useSidebarDispatch();
        /**
         * 这里加入翻译文件
         */
        useLangConfig("GridSidebar", languageConfig);

        const project = useProjectContext();

        const labelEvents = useRef<AssetsTypeEvents | null>(null);
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /**
         * 监听 activeOrg的变化
         */
        useEffect(() => {
            if (activeOrg) {
                setSelectedOrg(activeOrg);
            }
        }, [activeOrg, setSelectedOrg]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        const typeEl = () => {
            if (project === "plugins ide") {
                return <Plugin ref={labelEvents} data={typeData} />;
            }
            if (project === "project-manager") {
                return <Project ref={labelEvents} data={typeData} />;
            }
            return <Normal ref={labelEvents} data={typeData} ide={ide} />;
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div ref={ref} className={classNames(styles.sidebar_wrap, className)} {...props}>
                <OrgTemp />
                {typeEl()}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Sidebar.displayName = "Sidebar";
