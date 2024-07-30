import { AxiosResponse } from "axios";

export type NormalResponse<T> = AxiosResponse<{
    data?: T;
    code: number;
    message: string;
}>;

/**
 * 插件的类型数据
 */
export interface PluginTypeData {
    // 已绑定
    bind: number;
    // 星标
    star: number;
    // 已发布
    publish: number;
    // 未绑定
    notBound: number;
    // 移交记录
    transfer: number;
    //预览
    preview: number;
}

/**
 * 项目管理的类型数据
 */
export interface ProjectManagementTypeData {
    // 全部
    all: number;
    // 星标
    star: number;
    // 已发布
    publish: number;
    // 归档
    archived: number;
}

/**
 * 其它的类型数据
 */
export interface NormalManagementTypeData {
    // 全部
    all: number;
    // 星标
    star: number;
    // 项目相关
    projectRelated: number;
    // 未绑定
    notBound?: number;
}
