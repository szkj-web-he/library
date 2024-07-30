/**
 * @file image标签
 * @date 2023-12-12
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-12
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon, Skeleton, Transition, classNames, useLatest } from "../../..";
import imgFailed from "../../../Assets/images/icon_imgFailed.png";
import { LoadingStatus } from "../../../DefaultData/Utils/loadStatus";
import { languageConfig } from "../../../DefaultData/Zmz/image";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import { useImageViewer } from "../ImageViewer/Context/context";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ImageComponentProps
    extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> {
    /**
     * 图片名称
     */
    name?: string;
    /**
     * 图片链接
     */
    src?: string;
    /**
     * 预览时，要展示的图片链接
     *
     * 预览时的链接等级排序
     *
     * previewSrc ?? src ?? urlOnError
     */
    previewSrc?: string;
    /**
     * 当图片加载失败的时候要展示的图片链接
     * 和nodeOnError只能选其一
     */
    urlOnError?: string;
    /**
     * 当图片加载失败的时候要展示的节点
     * 和urlOnError只能选其一
     */
    nodeOnError?: React.ReactNode;
    /**
     * 禁用
     * 当预览时，它不可见
     *
     * 说明
     * 禁用时，它不可以点击的，但是，可以通过点击在同一个<ImageViewer>节点下切换到此image
     */
    disabled?: boolean;
    /**
     * 只读
     * 不可以点击
     *
     * 说明
     * 只读时，它不可以点击的，但是，可以通过点击在同一个<ImageViewer>节点下切换到此image
     * 且它是可见的
     */
    readonly?: boolean;
    /**
     * 当图片加载失败时
     */
    handleError?: () => void;
    /**
     * 当被hover时要展示的内容
     *
     * 被ImageViewer包裹时有效
     */
    nodeOnHover?: React.ReactNode;
    /**
     * 是否可以下载
     * * 默认是true
     */
    isDownload?: boolean;
    /**
     * 是否是不可见的
     * 这个和display:"none"不一样
     * 它标志着，react.createElement都不会触发
     * * 默认是true
     */
    isVisible?: boolean;
    /**
     * 预览时的图片下标
     * 默认是 通过 <Image>的加载顺序进行排序
     * 从0开始
     */
    index?: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ImageComponent: React.FC<ImageComponentProps> = ({
    name,
    src,
    urlOnError,
    nodeOnError,
    disabled,
    readonly,
    loading,
    alt,
    className,
    onLoad,
    previewSrc,
    nodeOnHover,
    isDownload = true,
    isVisible = true,
    index,
    ...props
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     * 图片加载状态
     */
    const [status, setStatus] = useState<LoadingStatus>(isVisible ? "pending" : "success");

    /**
     * hover状态
     *
     *  * 不会被disabled,readonly影响
     */
    const hoverRef = useRef<boolean>(false);

    /**
     * hover状态
     *
     * 会被disabled,readonly影响
     */
    const [hover, setHover] = useState<boolean>(false);

    /**
     *
     */
    const { used, createImg, editImgParams, onClick: toOpen } = useImageViewer();
    /**
     * 最新的createImg
     */
    const createImgRef = useLatest(createImg);
    /**
     * 最新的editImgParams
     */
    const editImgParamsRef = useLatest(editImgParams);
    /**
     * 翻译
     */
    const { t } = useTranslation();
    /**
     * 添加配置文件
     */
    useLangConfig("ImageComponent", languageConfig);
    /**
     * 创建标识
     */
    const id = useId();
    /**
     * image element
     */
    const imgEl = useRef<HTMLImageElement | null>(null);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /**
     * 当src发生变化时
     * 重置status的状态
     */
    useLayoutEffect(() => {
        setStatus(isVisible ? "pending" : "success");
    }, [src, isVisible]);

    /**
     * 给ImageViewer发送消息
     */
    useLayoutEffect(() => {
        createImgRef.current(id, index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, index]);

    /**
     * 修改存在ImageViewer里的数据
     */
    useEffect(() => {
        editImgParamsRef.current(id, {
            src,
            urlOnError,
            previewSrc,
            name,
            isDownload,
            isVisible: !disabled,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, previewSrc, src, urlOnError, name, disabled, isDownload]);

    /**
     * 当取消只读，禁用时
     * 还原选中状态
     */
    useEffect(() => {
        (() => {
            if (readonly || disabled) {
                setHover(false);
                return;
            }
            setHover(hoverRef.current);
        })();
    }, [readonly, disabled]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /**
     * 当图片加载失败时
     */
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const el = e.currentTarget;
        if (urlOnError) {
            el.src = urlOnError;
        } else {
            el.src = imgFailed;
        }
        setStatus("failed");
    };

    /**
     * 当图片点击时
     */
    const handleImageClick = () => {
        if (readonly || disabled) {
            return;
        }
        toOpen(id);
    };

    /**
     * 当图片鼠标移入时
     */
    const handleMouseEnter = () => {
        hoverRef.current = true;
        if (readonly || disabled) {
            return;
        }
        setHover(true);
    };

    /**
     * 当图片鼠标移出时
     */
    const handleMouseLeave = () => {
        hoverRef.current = false;
        setHover(false);
    };

    /**
     * 当鼠标移上去的时候
     * 需要展示的内容
     */
    const hoverContent = () => {
        if (nodeOnHover) {
            return nodeOnHover;
        }

        return (
            <div className={styles.imageComponent_hoverTipsDefault}>
                <Icon type="eyeOpen" className={styles.imageComponent_hoverTipsIcon} />
                <span className={styles.imageComponent_hoverTipsText}>
                    {t("ImageComponent.preview")}
                </span>
            </div>
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    if (!isVisible) {
        return <></>;
    }
    if (status === "failed" && nodeOnError) {
        return <>{nodeOnError}</>;
    }

    return (
        <div
            className={styles.imageComponent_wrapper}
            onClick={handleImageClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {status === "pending" ? (
                <div className={styles.imageComponent_loading}>
                    <Skeleton variant="img" width="100%" height="100%" />
                </div>
            ) : undefined}
            <img
                src={src}
                alt={alt ?? name ?? ""}
                onLoad={(e) => {
                    setStatus("success");
                    onLoad?.(e);
                }}
                ref={imgEl}
                onError={handleImageError}
                className={classNames(styles.imageComponent_img, className)}
                loading={loading ?? "lazy"}
                {...props}
            />
            <Transition
                show={hover && used && status !== "pending"}
                className={styles.imageComponent_hoverTips}
                animationType="fade"
            >
                {hoverContent()}
            </Transition>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
