/**
 * @file 图片播放器的预览context
 * @date 2023-12-12
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-12
 */

import { createContext, useContext } from "react";

export interface ImageItemProps {
    /**
     * 预览链接
     */
    previewSrc?: string;
    /**
     * 图片链接
     */
    src?: string;
    /**
     * 加载失败时的链接
     */
    urlOnError?: string;
    /**
     * 是否可见
     */
    isVisible?: boolean;
    /**
     * 下载图片时
     * 要展示的名称
     */
    name?: string;
    /**
     * 是否可以下载
     */
    isDownload: boolean;
}

export interface ImageViewerContextProps {
    /**
     * Image初始化
     *
     * 用来排序
     * @param 这里的id,标志着 id===Image组件
     * @param 第几张图片
     */
    createImg: (id: string, index?: number) => void;

    /**
     * 给Image添加参数
     */
    editImgParams: (id: string, item: ImageItemProps) => void;
    /**
     * 当Image被点击时
     */
    onClick: (id: string) => void;
    /**
     * 这个context
     * 是否被使用
     *
     */
    used: boolean;
}

export const ImageViewerContext = createContext<ImageViewerContextProps>({
    createImg: () => undefined,
    editImgParams: () => undefined,
    onClick: () => undefined,
    used: false,
});

export const useImageViewer = () => useContext(ImageViewerContext);
