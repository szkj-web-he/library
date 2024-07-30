/**
 * @file
 * @date 2023-12-12
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-12
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useGetSet from "../../../Hooks/UseGetSet";
import { useLatest } from "../../../Hooks/useLatest";
import { CoverCore } from "../../Cover/CoverCore";
import { deepCloneData } from "./../../../Unit/deepCloneData";
import Main from "./Components/Main";
import { ImageItemProps, ImageViewerContext } from "./Context/context";
import { ImageProps } from "./Unit/type";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ImageViewerProps {
    /**
     * 当图片预览的展示状态变化是
     */
    handleVisibleChange?: (to: boolean) => void;
    /**
     * 当切换图片时
     * @param to 当前展示的第一张图片
     * @param from 上一张展示的第几张图片
     */
    handleSwitch?: (to: number, from?: number) => void;
    /**
     * 图片预览的 Image 列表
     */
    children: React.ReactNode;
}

export interface ImageViewerEvents {
    /**
     * 打开
     */
    open: (index: number) => void;
    /**
     * 关闭
     */
    close: () => void;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ImageViewer = forwardRef<ImageViewerEvents | null, ImageViewerProps>(
    ({ handleVisibleChange, handleSwitch, children }, events) => {
        ImageViewer.displayName = "ImageViewer";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        /**
         * 弹框打开状态
         */
        const [open, setOpen] = useState(false);

        /**
         *
         */
        const [getImgList, setImgList] = useGetSet<Array<ImageProps | null> | null>(null);

        /**
         * 最新的handleVisibleChange方法
         */
        const handleVisibleChangeRef = useLatest(handleVisibleChange);

        /**
         * 开始的图片下标
         */
        const [startIndex, setStartIndex] = useState<null | number>(null);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useEffect(() => {
            handleVisibleChangeRef.current?.(open);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [open]);

        useImperativeHandle(events, () => {
            return {
                open: (index) => {
                    setStartIndex(index);
                    setOpen(true);
                },
                close: () => {
                    setOpen(false);
                },
            };
        });

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        /**
         * 传给子节点的方法
         */
        /**
         * Image初始化
         *
         * 用来排序
         * @param 这里的id,标志着 id===Image组件
         */
        const createImg = (id: string, index?: number) => {
            setImgList((pre) => {
                const arr = pre?.length ? [...pre] : [];

                if (typeof index === "number") {
                    arr[index] = {
                        id,
                        isDownload: true,
                    };
                } else {
                    arr.push({
                        id,
                        isDownload: true,
                    });
                }
                return [...arr];
            });
        };

        /**
         * 给Image添加参数
         */
        const editImgParams = (id: string, item: ImageItemProps) => {
            setImgList((pre) => {
                const arr = pre ? [...pre] : [];
                for (let i = 0; i < arr.length; ) {
                    if (arr[i]?.id === id) {
                        arr[i] = {
                            id,
                            ...deepCloneData(item),
                        };
                        i = arr.length;
                    } else {
                        ++i;
                    }
                }
                return arr.length ? [...arr] : null;
            });
        };

        /**
         * 当Image被点击时
         */
        const handleImageClick = (id: string) => {
            const i = getImgList()?.findIndex((item) => item?.id === id);
            if (typeof i === "number" && i >= 0) {
                setStartIndex(i);
                setOpen(true);
                return;
            }
            setStartIndex(null);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <>
                <ImageViewerContext.Provider
                    value={{
                        used: true,
                        createImg,
                        editImgParams,
                        onClick: handleImageClick,
                    }}
                >
                    {children}
                </ImageViewerContext.Provider>
                <CoverCore
                    show={open}
                    removeOnHidden
                    handleBgClick={() => {
                        setOpen(false);
                    }}
                    zIndex={99}
                    className={styles.imageViewer_wrapper}
                >
                    <Main
                        close={() => {
                            setOpen(false);
                        }}
                        imgList={getImgList() ?? undefined}
                        startIndex={startIndex ?? undefined}
                        handleImgSwitch={handleSwitch}
                    />
                </CoverCore>
            </>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
ImageViewer.displayName = "ImageViewer";
