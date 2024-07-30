/**
 * @file
 * @date 2021-09-13
 * @author xuejie.he
 * @lastModify mingzhou.zhang 2022-05-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useMemo, useRef, useState } from "react";
import { Button } from "../../../../..";

import { useTranslation } from "react-i18next";
import { Slider } from "../../../Slider";
import { Cropper, CropperHandle } from "../Cropper";
import { cutImage } from "../cutImage";
import styles from "./style.module.scss";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface CutImgProps {
    /**
     * img src of this component
     */
    imageSrc?: string;
    /**
     * zoom of this component
     */
    zoom: number;
    /**
     * Zoom Increases and decreases the value
     */
    zoomStep: number;
    /**
     * crop position of this component
     */
    cropPosition?: {
        x: number | "auto";
        y: number | "auto";
    };
    /**
     * crop size of this component
     */
    cropSize: {
        width: string;
        height: string;
    };
    /**
     * handle Img position change
     */
    handleCropPositionChange?: (x: number, y: number) => void;
    /**
     * max zoom of this component
     */
    maxZoom: number | "auto";
    /**
     * min zoom of this component
     */
    minZoom: number;
    /**
     * handle zoom change
     */
    handleZoomChange?: (res: number) => void;
    /**
     * crop shape of this component
     */
    cropShape: "round" | "rect";
    /**
     * Re-select the picture button click event
     */
    handleResetClick?: () => void;
    /**
     * Confirm button click event
     */
    handleConfirmClick?: () => void;
    /**
     * handle img change
     */
    handleImgChange?: (file: Blob, base64?: string) => void;
    /**
     * Customize the confirm button
     */
    confirm?: React.ReactNode;
    /**
     *Customize the reset button
     */
    reset?: React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const CutImg: React.FC<CutImgProps> = ({
    imageSrc,
    zoom,
    zoomStep,
    cropPosition,
    cropSize,
    handleCropPositionChange,
    maxZoom,
    minZoom,
    handleZoomChange,
    cropShape,
    handleResetClick,
    handleConfirmClick,
    handleImgChange,
    confirm,
    reset,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { t } = useTranslation();

    const [localMaxZoom, setLocalMaxZoom] = useState(3);
    const imgSize = useRef({
        width: 0,
        height: 0,
    });
    const cropSizePixel = useRef({
        width: 0,
        height: 0,
    });
    const cropperRef = useRef<CropperHandle>(null);
    const perviousSilderBarVal = useRef(zoom);

    const sliderBarVal = useMemo(() => {
        const distance = localMaxZoom - minZoom;
        const value = zoom - minZoom;
        return value / distance;
    }, [localMaxZoom, minZoom, zoom]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    // listen zoomIn/zoomOut btn click
    const changeZoom = (action: "zoomIn" | "zoomOut") => {
        let value = zoom;
        switch (action) {
            case "zoomIn":
                value = zoom + zoomStep;
                break;
            case "zoomOut":
                value = zoom - zoomStep;
                break;
        }
        if (value < minZoom) {
            value = minZoom;
        } else if (value > localMaxZoom) {
            value = localMaxZoom;
        }
        if (zoom !== value) {
            if (cropperRef.current) {
                const { x, y } = cropperRef.current.getAfterZoomPositon(zoom, value);
                handleCropPositionChange && handleCropPositionChange(x, y);
                handleZoomChange && handleZoomChange(value);
            }
        }
    };

    const showCroppedImage = async () => {
        if (imageSrc) {
            const imageData = await cutImage(
                imageSrc,
                {
                    ...imgSize.current,
                    x: cropPosition && typeof cropPosition.x === "number" ? cropPosition.x : 0,
                    y: cropPosition && typeof cropPosition.y === "number" ? cropPosition.y : 0,
                },
                cropSizePixel.current,
            );

            if (imageData?.file) {
                handleImgChange && handleImgChange(imageData.file, imageData.url);
            }
        }
        handleConfirmClick && handleConfirmClick();
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <div className={styles.cutImg_wrapper}>
                <div className={styles.cutImg_content}>
                    <Cropper
                        ref={cropperRef}
                        image={imageSrc}
                        zoom={zoom}
                        zoomStep={zoomStep}
                        cropPosition={cropPosition}
                        cropSize={cropSize}
                        onImagePositionChange={(x, y) => {
                            if (
                                cropPosition &&
                                x !== cropPosition.x &&
                                y !== cropPosition.y &&
                                handleCropPositionChange
                            ) {
                                handleCropPositionChange(x, y);
                            }
                        }}
                        handleSizeChange={(width, height) => {
                            imgSize.current = {
                                width,
                                height,
                            };
                        }}
                        maxZoom={maxZoom}
                        minZoom={minZoom}
                        getMaxZoom={(res) => {
                            if (res !== maxZoom) {
                                setLocalMaxZoom(res);
                            }
                        }}
                        getCropSize={(width, height) => {
                            cropSizePixel.current = {
                                width,
                                height,
                            };
                        }}
                        onZoomChange={(res) => {
                            if (res !== zoom) {
                                handleZoomChange && handleZoomChange(res);
                            }
                        }}
                        cropShape={cropShape}
                    />
                </div>
                <div className={styles.cutImg_sliderContainer}>
                    <button
                        className={styles.cutImg_zoomOut}
                        onClick={() => {
                            changeZoom("zoomOut");
                        }}
                    >
                        -
                    </button>
                    <div className={styles.cutImg_sliderContent}>
                        <Slider
                            key={`slider${localMaxZoom}`}
                            handleChange={(value) => {
                                const distance = localMaxZoom - minZoom;
                                const val = minZoom + distance * value;
                                if (zoom !== val) {
                                    if (cropperRef.current) {
                                        const { x, y } = cropperRef.current.getAfterZoomPositon(
                                            perviousSilderBarVal.current,
                                            localMaxZoom * value,
                                        );
                                        handleCropPositionChange && handleCropPositionChange(x, y);
                                    }
                                    handleZoomChange && handleZoomChange(val);
                                }
                                perviousSilderBarVal.current = localMaxZoom * value;
                            }}
                            value={sliderBarVal}
                        />
                    </div>
                    <button
                        className={styles.cutImg_zoomIn}
                        onClick={() => {
                            changeZoom("zoomIn");
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className={styles.cutImg_btnList}>
                <div onClick={handleResetClick}>
                    {reset ?? (
                        <div className={styles.cutImg_resetBtn} tabIndex={-1}>
                            {t("AvatarCropComponent.Reset")}
                        </div>
                    )}
                </div>

                <div onClick={showCroppedImage}>
                    {confirm ?? (
                        <Button
                            width="8.9rem"
                            height="3.2rem"
                            label={t("AvatarCropComponent.Confirm")}
                            type="primary"
                            className={styles.cutImg_confirmBtn}
                        />
                    )}
                </div>
            </div>
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
