/**
 * @file avatar crop
 * @date 2021-08-26
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingComponent } from "../../..";
import { languageConfig } from "../../../DefaultData/DataInput/avatarCrop";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import styles from "./style.module.scss";
import { ajaxRequest } from "./Unit/ajax";
import { CutImg } from "./Unit/CutImg";
import { SelectImage } from "./Unit/SelectImage";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface AvatarCropProps {
    /**
     *  cut shape
     */
    cropShape?: "round" | "rect";
    /**
     * get image function
     */
    handleImgChange?: (res: Blob | null, base64?: string) => void;
    /**
     * get image function
     */
    handleConfirmClick?: () => void;
    /**
     * get image function
     */
    handleResetClick?: () => void;
    /**
     * max file size/M
     */
    maxFileSize?: number;
    /**
     * msg of file input
     */
    inputMsg?: string;
    /**
     * Cut shape Size
     */
    cropSize?: {
        width: string;
        height: string;
    };
    /**
     * max zoom value
     */
    maxZoom?: number | "auto";
    /**
     * min zoom value
     */
    minZoom?: number;
    /**
     * default zoom value
     */
    defaultZoom?: number;
    /**
     * zoom change/unit
     */
    step?: number;
    /**
     * set default img link
     * *The link must be within the domain name
     */
    defaultLink?: string;
    /**
     * Original image change event
     */
    handleOriginalImage?: (res: File | null) => void;
    /**
     * img position
     */
    cropPosition?: {
        x: number | "auto";
        y: number | "auto";
    };
    /**
     * handle img position
     */
    handleCropPositionChange?: (x: number, y: number) => void;
    /**
     * handle zoom change
     */
    handleZoomChange?: (res: number) => void;
    /**
     * Customize the confirm button
     */
    confirm?: React.ReactNode;
    /**
     *Customize the reset button
     */
    reset?: React.ReactNode;
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * 是否禁用图片缓存
     */
    isDisabledCache?: boolean;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const AvatarCrop: React.FC<AvatarCropProps> = ({
    maxZoom = "auto",
    minZoom = 0.1,
    defaultZoom = 1,
    handleImgChange,
    handleConfirmClick,
    handleResetClick,
    maxFileSize = 3,
    cropShape = "round",
    step = 0.1,
    cropSize = {
        width: "15rem",
        height: "15rem",
    },
    inputMsg,
    defaultLink,
    handleOriginalImage,
    cropPosition = {
        x: "auto",
        y: "auto",
    },
    handleCropPositionChange,
    handleZoomChange,
    className,
    style,
    confirm,
    isDisabledCache,
    reset,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    // this state will store the image when user uploard
    const [imageSrc, setImageSrc] = useState("");
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    /**
     * 这里加入翻译文件
     */
    useLangConfig("AvatarCropComponent", languageConfig);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        let request: XMLHttpRequest | null = null;
        if (defaultLink) {
            let url = defaultLink;
            if (isDisabledCache) {
                if (url.includes("?")) {
                    url += `&${Date.now()}`;
                } else {
                    url += `?${Date.now()}`;
                }
            }
            setLoading(true);
            request = ajaxRequest({
                method: "get",
                responseType: "blob",
                url,
                complete: (res) => {
                    if (res.status === 200) {
                        const url = URL.createObjectURL(res.response as Blob);
                        setImageSrc(url);
                    }
                    setLoading(false);
                },
            });
        } else {
            setImageSrc("");
        }
        return () => {
            request?.abort();
        };
    }, [defaultLink, isDisabledCache]);

    useEffect(
        () => () => {
            imageSrc && URL.revokeObjectURL(imageSrc);
        },
        [imageSrc],
    );

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <div
            className={
                className
                    ? `${styles.avatarCrop_container} ${className}`
                    : styles.avatarCrop_container
            }
            style={style}
        >
            <h3 className={styles.avatarCrop_title}>{t("AvatarCropComponent.Upload Photoes")}</h3>
            {loading && (
                <div className={styles.avatarCrop_loading}>
                    <LoadingComponent width="5rem" height="5rem" color="#478da5" type="bars" />
                </div>
            )}
            {imageSrc ? (
                <CutImg
                    imageSrc={imageSrc}
                    zoom={defaultZoom}
                    zoomStep={step}
                    cropPosition={cropPosition}
                    cropSize={cropSize}
                    handleCropPositionChange={handleCropPositionChange}
                    maxZoom={maxZoom}
                    minZoom={minZoom}
                    handleZoomChange={handleZoomChange}
                    cropShape={cropShape}
                    confirm={confirm}
                    reset={reset}
                    handleResetClick={handleResetClick}
                    handleConfirmClick={handleConfirmClick}
                    handleImgChange={handleImgChange}
                />
            ) : (
                <SelectImage
                    maxFileSize={maxFileSize}
                    handleChange={handleOriginalImage}
                    inputMsg={inputMsg ?? t("AvatarCropComponent.Upload Profile Image")}
                />
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
