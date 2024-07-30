/**
 * @file
 * @date 2021-08-30
 * @author xuejie.he
 * @lastModify mingzhou.zhang 2022-05-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import styles from "./style.module.scss";

import { LoadingComponent, addEventList, removeEventList, EventParams } from "../../../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface CropperProps {
    /**
     * img src of this component
     */
    image?: string;
    /**
     * zoom of this component
     */
    zoom?: number;
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
    onImagePositionChange?: (x: number, y: number) => void;
    /**
     * max zoom of this component
     */
    maxZoom?: number | "auto";
    /**
     * min zoom of this component
     */
    minZoom?: number;
    /**
     * handle zoom change
     */
    onZoomChange?: (zoom: number) => void;
    /**
     * crop shape
     */
    cropShape: "round" | "rect";
    /**
     * zoom step
     */
    zoomStep?: number;
    /**
     * handle img size change
     */
    handleSizeChange?: (width: number, height: number) => void;
    /**
     * handle crop size change
     */
    getCropSize?: (width: number, height: number) => void;
    /**
     * When maxZomm is auto, the maxZoom value is obtained
     */
    getMaxZoom?: (res: number) => void;
    /**
     * crop position of this component
     */
    cropPosition?: {
        x: number | "auto";
        y: number | "auto";
    };
}

export type CropperHandle = {
    getAfterZoomPositon: (oldZoom: number, newZoom: number) => { x: number; y: number };
};
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Cropper = forwardRef<CropperHandle, CropperProps>(
    (
        {
            image,
            zoom = 1,
            cropSize,
            onImagePositionChange,
            getCropSize,
            maxZoom = "auto",
            minZoom = 1,
            onZoomChange,
            cropShape,
            zoomStep = 0.1,
            handleSizeChange,
            getMaxZoom,
            cropPosition,
        },
        ref,
    ) => {
        Cropper.displayName = "Cropper";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const mouseStatus = useRef({
                mouseDown: {
                    x: 0,
                    y: 0,
                },
                init: {
                    x: 0,
                    y: 0,
                },
                status: false,
            }),
            imgRef = useRef<HTMLImageElement | null>(null),
            containerRef = useRef<HTMLDivElement | null>(null);

        const [readyStatus, setReadyStatus] = useState(false);

        const [localMaxZoom, setLocalMaxZoom] = useState(1);
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useImperativeHandle(ref, () => ({
            getAfterZoomPositon(oldZoom: number, newZoom: number) {
                const img = imgRef.current;
                const container = containerRef.current;
                if (img && container) {
                    return {
                        x: mouseStatus.current.init.x + (img.offsetWidth / 2) * (oldZoom - newZoom),
                        y:
                            mouseStatus.current.init.y +
                            (img.offsetHeight / 2) * (oldZoom - newZoom),
                    };
                } else {
                    return {
                        x: 0,
                        y: 0,
                    };
                }
            },
        }));

        useEffect(() => {
            if (maxZoom === "auto") {
                const node = imgRef.current;
                if (node) {
                    const clientWidth = node.clientWidth;
                    const clientHeight = node.clientHeight;
                    const naturalWidth = node.naturalWidth;
                    const naturalHeight = node.naturalHeight;
                    const wMax = Math.ceil(naturalWidth / clientWidth);
                    const hMax = Math.ceil(naturalHeight / clientHeight);
                    const max = Math.max(wMax, hMax);
                    setLocalMaxZoom(max > 1 ? max : 1);
                    getMaxZoom && getMaxZoom(max > 1 ? max : 1);
                }
            } else {
                setLocalMaxZoom(maxZoom);
                getMaxZoom && getMaxZoom(maxZoom);
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [readyStatus, maxZoom]);

        useEffect(() => {
            if (containerRef.current) {
                getCropSize &&
                    getCropSize(
                        containerRef.current.offsetWidth,
                        containerRef.current.offsetHeight,
                    );
            }
        }, [getCropSize]);

        useEffect(() => {
            let timer: null | number = null;
            const fn = () => {
                const imgNode = imgRef.current;
                const containerNode = containerRef.current;

                if (imgNode && containerNode && readyStatus) {
                    const x =
                        cropPosition && typeof cropPosition.x === "number"
                            ? cropPosition.x
                            : containerNode.offsetWidth / 2 - (imgNode.offsetWidth * zoom) / 2;
                    const y =
                        cropPosition && typeof cropPosition.y === "number"
                            ? cropPosition.y
                            : containerNode.offsetHeight / 2 - (imgNode.offsetHeight * zoom) / 2;
                    mouseStatus.current.init = {
                        x,
                        y,
                    };

                    const left = -imgNode.offsetWidth * zoom,
                        right = containerNode.offsetWidth,
                        top = -imgNode.offsetHeight * zoom,
                        bottom = containerNode.offsetHeight;

                    if (mouseStatus.current.init.x < left) {
                        mouseStatus.current.init.x = left;
                    } else if (mouseStatus.current.init.x > right) {
                        mouseStatus.current.init.x = right;
                    }
                    if (mouseStatus.current.init.y < top) {
                        mouseStatus.current.init.y = top;
                    } else if (mouseStatus.current.init.y > bottom) {
                        mouseStatus.current.init.y = bottom;
                    }

                    handleSizeChange &&
                        imgRef.current &&
                        handleSizeChange(
                            imgRef.current.offsetWidth * zoom,
                            imgRef.current.offsetHeight * zoom,
                        );
                    onImagePositionChange &&
                        onImagePositionChange(
                            mouseStatus.current.init.x,
                            mouseStatus.current.init.y,
                        );
                } else {
                    timer = window.requestAnimationFrame(fn);
                }
            };
            fn();
            return () => {
                timer && window.cancelAnimationFrame(timer);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [readyStatus, zoom, cropPosition]);

        useEffect(() => {
            const events: EventParams[] = [
                {
                    type: "mousemove",
                    listener: (e) => {
                        if (mouseStatus.current.status) {
                            const [moveX, moveY] = [
                                (e as MouseEvent).pageX - mouseStatus.current.mouseDown.x,
                                (e as MouseEvent).pageY - mouseStatus.current.mouseDown.y,
                            ];
                            mouseStatus.current.mouseDown.x = (e as MouseEvent).pageX;
                            mouseStatus.current.mouseDown.y = (e as MouseEvent).pageY;
                            mouseStatus.current.init.x += moveX;
                            mouseStatus.current.init.y += moveY;
                            const imgNode = imgRef.current;
                            const containerNode = containerRef.current;
                            let [top, right, bottom, left] = [0, 0, 0, 0];
                            if (imgNode && containerNode) {
                                left = -imgNode.offsetWidth * zoom;
                                right = containerNode.offsetWidth;
                                top = -imgNode.offsetHeight * zoom;
                                bottom = containerNode.offsetHeight;
                            }

                            if (mouseStatus.current.init.x < left) {
                                mouseStatus.current.init.x = left;
                            } else if (mouseStatus.current.init.x > right) {
                                mouseStatus.current.init.x = right;
                            }
                            if (mouseStatus.current.init.y < top) {
                                mouseStatus.current.init.y = top;
                            } else if (mouseStatus.current.init.y > bottom) {
                                mouseStatus.current.init.y = bottom;
                            }

                            onImagePositionChange &&
                                onImagePositionChange(
                                    mouseStatus.current.init.x,
                                    mouseStatus.current.init.y,
                                );
                        }
                    },
                    option: false,
                },
                {
                    type: "mouseup",
                    listener: () => {
                        mouseStatus.current.status = false;
                    },
                    option: false,
                },
            ];
            addEventList(window, events);
            return () => {
                removeEventList(window, events);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [zoom]);

        useEffect(() => {
            const node = imgRef.current;
            const fn = (e: WheelEvent) => {
                e.preventDefault();
                let zoomVal: number;
                const [x, y] = [e.offsetX, e.offsetY];
                let mainZoom = zoom;
                if (e.currentTarget) {
                    const transformStyle = window.getComputedStyle(
                        e.currentTarget as HTMLImageElement,
                    ).transform;
                    mainZoom = Number(transformStyle.replace(/(matrix|\(|\))/g, "").split(",")[0]);
                }
                if (e.deltaY > 0) {
                    // zoom out
                    zoomVal = mainZoom - zoomStep;
                    if (zoomVal < minZoom) {
                        zoomVal = minZoom;
                    }
                } else {
                    // zoom in
                    zoomVal = mainZoom + zoomStep;
                    if (zoomVal > localMaxZoom) {
                        zoomVal = localMaxZoom;
                    }
                }

                const left = mouseStatus.current.init.x + x * mainZoom - x * zoomVal;
                const top = mouseStatus.current.init.y + y * mainZoom - y * zoomVal;

                mouseStatus.current.init = {
                    x: left,
                    y: top,
                };

                onImagePositionChange && onImagePositionChange(left, top);

                if (isFinite(zoomVal)) {
                    zoomVal = Math.round(zoomVal * 100) / 100;
                } else {
                    zoomVal = Math.ceil(zoomVal * 100) / 100;
                }

                onZoomChange && onZoomChange(zoomVal);
            };
            if (node) {
                node.addEventListener("wheel", fn, { passive: false });
                return () => {
                    node.removeEventListener("wheel", fn);
                };
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [localMaxZoom, minZoom, zoom, zoomStep]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        const handleMouseDown = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
            mouseStatus.current.status = true;
            mouseStatus.current.mouseDown = {
                x: e.pageX,
                y: e.pageY,
            };
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div className={styles.cropper_wrapper}>
                <div
                    className={styles.cropper_imgContainer}
                    ref={containerRef}
                    style={{
                        ...cropSize,
                    }}
                >
                    <img
                        src={image}
                        draggable={false}
                        alt=""
                        onLoad={() => {
                            setReadyStatus(true);
                        }}
                        ref={imgRef}
                        className={styles.cropper_img}
                        onMouseDown={handleMouseDown}
                        style={{
                            transform: `translate(${
                                cropPosition ? cropPosition.x : mouseStatus.current.init.x
                            }px,${
                                cropPosition ? cropPosition.y : mouseStatus.current.init.y
                            }px) scale(${zoom})`,
                        }}
                    />
                </div>
                {readyStatus ? (
                    <div
                        className={styles[`cropper_${cropShape}`]}
                        style={{
                            ...cropSize,
                        }}
                    />
                ) : (
                    <LoadingComponent width="5rem" height="5rem" color="#478da5" type="bars" />
                )}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Cropper.displayName = "Cropper";
