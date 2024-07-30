/**
 * @file 裁剪图片
 * @date 2023-01-09
 * @author xuejie.he
 * @lastModify xuejie.he 2023-01-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import { deepCloneData, getScrollValue, Icon } from "../../../../..";
import useEventListener from "../../../../../Hooks/useEventListener";
import { useLatest } from "../../../../../Hooks/useLatest";
import { mul, sub, sum, toDiv } from "../math";
import { MovePointParams, PointProp, useDrag } from "./../../../../../Hooks/useDrag";
import { forceReflow } from "./../../../../Common/Transition/Unit/forceReflow";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface CutProps extends Partial<CutSuccessProps> {
    /**
     * 是不是正在剪切中
     */
    isPending: boolean;
    /**
     * 失败时的 消息
     */
    errorMsg?: string;
}

export interface CutSuccessProps {
    /**
     * 成功的时候返回的 file
     */
    file: File;
    /**
     * 成功的时候返回的 base64
     */
    base64: string;
}

export interface CutEventProps {
    /**
     *
     * @returns
     */
    toCut: () => Promise<CutSuccessProps>;
    /**
     * 取消裁剪
     */
    cancelCut: () => void;
}

interface TempProps {
    /**
     * 图片信息
     */
    imgData?: {
        url: string;
        name: string;
        type: string;
    };
    /**
     * 是否可以预览
     */
    isPreview: boolean;
    /**
     * 重新选择按钮的点击事件
     *
     * 这里还待完善
     *
     * 在重新选择图片的时候没有报错提示了
     *
     */
    restClick: () => void;

    /**
     * 裁剪的回调
     * @param res
     * @returns
     */
    handleCut: (res: CutProps) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.ForwardRefRenderFunction<CutEventProps | undefined, TempProps> = (
    { imgData, isPreview, restClick, handleCut },
    eventRef,
) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [attr, setAttr] = useState<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>();

    const zoomRef = useRef(1);

    const attrRef = useRef<typeof attr>();

    const imgRef = useRef<HTMLImageElement | null>(null);

    const isHover = useRef(false);

    const globalClass = useRef<HTMLStyleElement>();

    const pointData = useRef<PointProp>();

    const [isDrag, setIsDrag] = useState(false);

    const movePoint = useRef<{ x: number; y: number }>();

    const { t } = useTranslation();

    const delayTimer = useRef<number>();

    const destroyRef = useRef(false);

    /**
     * 所有的放大，所有 都要基于这个开始的图片尺寸
     */
    const initSize = useRef<{
        width: number;
        height: number;
    }>();

    /**
     * handleCut的ref
     */
    const handleCutRef = useLatest(handleCut);

    /**
     * imgData的 ref
     */
    const imgDataRef = useLatest(imgData);

    /**
     * 取消切剪
     */
    const stopCutFn = useRef<() => void>();
    /**
     *
     */
    const cutFn = useRef<(callback: (res: string | CutSuccessProps) => void) => void>();
    /**
     * 拖拽的原始
     */
    const ref = useRef<HTMLDivElement | null>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        destroyRef.current = false;
        return () => {
            destroyRef.current = true;
        };
    }, []);

    /**
     * 拖拽开始
     */
    const handleDragStart = (e: PointProp) => {
        setIsDrag(true);
        delayTimer.current && window.clearTimeout(delayTimer.current);
        pointData.current = deepCloneData(e);

        globalClass.current = document.createElement("style");
        globalClass.current.innerHTML = `
                *{
                    cursor:pointer !important;
                }import { useLatest } from './../../../../../Hooks/useLatest';

                `;
        document.head.append(globalClass.current);
    };
    /**
     * 拖拽中
     */
    const handleDrag = (res: MovePointParams) => {
        res.preventDefault();
        delayTimer.current && window.clearTimeout(delayTimer.current);
        delayTimer.current = window.setTimeout(() => {
            delayTimer.current = undefined;

            const imgEl = imgRef.current;
            const el = ref.current;
            const point = pointData.current;
            if (!imgEl || !el || !point || destroyRef.current) {
                return;
            }

            const imgRect = imgEl.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            /**
             * 向右 为 +
             * 向左 为-
             */
            const moveX = sub(res.pageX, point.pageX);
            /**
             * 向下 为+
             * 向上 为-
             */
            const moveY = sub(res.pageY, point.pageY);
            let x = attrRef.current?.x ?? 0;
            let y = attrRef.current?.y ?? 0;

            if (sum(imgRect.left, moveX) > elRect.left) {
                x = sub(x, sub(imgRect.left, elRect.left));
            } else if (sum(imgRect.right, moveX) < elRect.right) {
                x = sum(x, sub(elRect.right, imgRect.right));
            } else {
                x = sum(x, moveX);
            }

            if (sum(imgRect.top, moveY) > elRect.top) {
                //如果图片的顶部 小于 视口的顶部
                y = sub(y, sub(imgRect.top, elRect.top));
            } else if (sum(imgRect.bottom, moveY) < elRect.bottom) {
                /**
                 * 如果图片的底部 小于 视口的底部
                 */
                y = sum(y, sub(elRect.bottom, imgRect.bottom));
            } else {
                y = sum(y, moveY);
            }

            pointData.current = {
                pageX: res.pageX,
                pageY: res.pageY,
                clientX: res.clientX,
                clientY: res.clientY,
            };
            const value = {
                x,
                y,
                width: attrRef.current?.width ?? 0,
                height: attrRef.current?.height ?? 0,
            };

            attrRef.current = deepCloneData(value);

            setAttr(deepCloneData(value));
        });
    };
    /**
     * 拖拽结束
     */
    const handleDragEnd = useCallback(() => {
        delayTimer.current && window.clearTimeout(delayTimer.current);
        globalClass.current?.remove();
        globalClass.current = undefined;
        setIsDrag(false);
    }, []);

    const [handleMouseDown] = useDrag(handleDragStart, handleDrag, handleDragEnd, handleDragEnd);

    /**
     * 缩放
     */
    const toScale = (zoom: number, imgEl: HTMLImageElement, offsetX: number, offsetY: number) => {
        if (!initSize.current) {
            return;
        }
        let x = attrRef.current?.x ?? 0;
        let y = attrRef.current?.y ?? 0;

        const width = mul(zoom, initSize.current.width);
        const height = mul(zoom, initSize.current.height);

        /**
         * 宽度扩大了多少
         */
        const widthScale = toDiv(width, imgEl.offsetWidth);
        /**
         * 高度扩大了多少
         */
        const heightScale = toDiv(height, imgEl.offsetHeight);

        x = sub(x, sub(mul(widthScale, offsetX), offsetX));
        y = sub(y, sub(mul(heightScale, offsetY), offsetY));

        return {
            x,
            y,
            width,
            height,
        };
    };

    /**
     * 缩小
     */
    const toShrink = (
        imgEl: HTMLImageElement,
        el: HTMLDivElement,
        offsetX: number,
        offsetY: number,
    ) => {
        const zoom = sub(zoomRef.current, 0.1);

        /**
         * 如果缩放倍数小于1
         * 不允许缩放
         */
        if (zoom < 1) {
            return;
        }

        const scaleData = toScale(zoom, imgEl, offsetX, offsetY);
        if (!scaleData) {
            //这里如果没有缩放的数据  那逻辑可能就在加载图片的时候出现了问题
            return;
        }
        const { width, height } = scaleData;

        let { x, y } = scaleData;

        imgEl.style.width = `${width}px`;
        imgEl.style.height = `${height}px`;
        imgEl.style.transform = `translate(${x}px,${y}px)`;

        forceReflow();

        const imgRect = imgEl.getBoundingClientRect();
        const containerRect = el.getBoundingClientRect();

        const minX = sub(x, sub(imgRect.left, containerRect.left));
        const minY = sub(y, sub(imgRect.top, containerRect.top));

        if (containerRect.top < imgRect.top) {
            //顶部太小

            const margin = sub(imgRect.top, containerRect.top);

            y = sub(imgRect.bottom, margin) < containerRect.bottom ? minY : sub(y, margin);
        } else if (containerRect.bottom > imgRect.bottom) {
            //底部太小

            const margin = sub(containerRect.bottom, imgRect.bottom);

            y = sum(imgRect.top, margin) > containerRect.top ? minY : sum(y, margin);
        }

        if (containerRect.left < imgRect.left) {
            //左侧太小
            const margin = sub(imgRect.left, containerRect.left);

            x = sub(imgRect.right, margin) < containerRect.right ? minX : sub(x, margin);
        } else if (containerRect.right > imgRect.right) {
            //右侧太小

            const margin = sub(containerRect.right, imgRect.right);

            x = sum(imgRect.left, margin) > containerRect.left ? minX : sum(x, margin);
        }

        imgEl.style.transform = `translate(${x}px, ${y}px) `;

        const value = {
            x,
            y,
            width,
            height,
        };

        attrRef.current = deepCloneData(value);
        zoomRef.current = zoom;
        setAttr(() => {
            return deepCloneData(value);
        });
    };

    /**
     * 放大
     */
    const toEnlarge = (imgEl: HTMLImageElement, offsetX: number, offsetY: number) => {
        const zoom = sum(zoomRef.current, 0.1);
        const scaleData = toScale(zoom, imgEl, offsetX, offsetY);
        if (!scaleData) {
            //这里如果没有缩放的数据  那逻辑可能就在加载图片的时候出现了问题
            return;
        }

        zoomRef.current = zoom;
        attrRef.current = {
            width: scaleData.width,
            height: scaleData.height,
            x: scaleData.x,
            y: scaleData.y,
        };

        setAttr(deepCloneData(attrRef.current));
    };

    /**
     * 当图片获焦
     * 滚轮滚动时
     * 进行放大缩小
     */
    const handleWheel = (e: WheelEvent) => {
        if (!isHover.current) {
            return;
        }
        const imgEl = imgRef.current;
        const el = ref.current;
        if (!imgEl || !el) {
            return;
        }
        e.preventDefault();

        const scrollData = getScrollValue();
        const rect = imgEl.getBoundingClientRect();
        const offsetX = e.pageX - (rect.left + scrollData.x);
        const offsetY = e.pageY - (rect.top + scrollData.y);
        if (e.deltaY > 0) {
            //缩小

            toShrink(imgEl, el, offsetX, offsetY);
            return;
        }
        //放大
        toEnlarge(imgEl, offsetX, offsetY);
    };
    useEventListener("wheel", handleWheel, { current: document }, { passive: false });

    /**
     * 当图片获焦
     * 监听键盘事件
     * +  =>  放大
     * -  =>  缩小
     * ↑  => 向上移动
     * ↓  => 向下移动
     * ←  => 向左移动
     * →  => 向右移动
     */
    const handleKeydown = (e: KeyboardEvent) => {
        if (!isHover.current) {
            return;
        }
        const imgEl = imgRef.current;
        const el = ref.current;
        if (!imgEl || !el) {
            return;
        }
        const scrollData = getScrollValue();
        /**
         * 阻止默认行为
         */
        const preventDefaultFn = () => {
            e.preventDefault();
        };

        /**
         * 获取rect
         */

        const imgRect = imgEl.getBoundingClientRect();
        const containerRect = el.getBoundingClientRect();

        switch (e.code) {
            case "ArrowUp":
                //↑
                preventDefaultFn();

                setAttr(() => {
                    let y = sub(attrRef.current?.y ?? 0, 1);
                    if (sub(imgRect.bottom, 1) < containerRect.bottom) {
                        y = attrRef.current?.y ?? 0;
                    }
                    const value = {
                        x: attrRef.current?.x ?? 0,
                        y,
                        width: attrRef.current?.width ?? 0,
                        height: attrRef.current?.height ?? 0,
                    };
                    attrRef.current = deepCloneData(value);
                    return deepCloneData(value);
                });
                break;
            case "ArrowRight":
                // →
                preventDefaultFn();
                setAttr(() => {
                    let x = sum(attrRef.current?.x ?? 0, 1);
                    if (sum(imgRect.left, 1) > containerRect.left) {
                        x = attrRef.current?.x ?? 0;
                    }
                    const value = {
                        x,
                        y: attrRef.current?.y ?? 0,
                        width: attrRef.current?.width ?? 0,
                        height: attrRef.current?.height ?? 0,
                    };
                    attrRef.current = deepCloneData(value);
                    return deepCloneData(value);
                });
                break;
            case "ArrowDown":
                //↓
                preventDefaultFn();
                setAttr(() => {
                    let y = sum(attrRef.current?.y ?? 0, 1);

                    if (sum(imgRect.top, 1) > containerRect.top) {
                        y = attrRef.current?.y ?? 0;
                    }

                    const value = {
                        x: attrRef.current?.x ?? 0,
                        y,
                        width: attrRef.current?.width ?? 0,
                        height: attrRef.current?.height ?? 0,
                    };
                    attrRef.current = deepCloneData(value);
                    return deepCloneData(value);
                });
                break;
            case "ArrowLeft":
                //←
                preventDefaultFn();
                setAttr(() => {
                    let x = sub(attrRef.current?.x ?? 0, 1);
                    if (sub(imgRect.right, 1) < containerRect.right) {
                        x = attrRef.current?.x ?? 0;
                    }
                    const value = {
                        x,
                        y: attrRef.current?.y ?? 0,
                        width: attrRef.current?.width ?? 0,
                        height: attrRef.current?.height ?? 0,
                    };
                    attrRef.current = deepCloneData(value);
                    return deepCloneData(value);
                });
                break;
            case "NumpadAdd":
                //+

                if (movePoint.current) {
                    preventDefaultFn();
                    toEnlarge(
                        imgEl,
                        movePoint.current.x - (imgRect.left + scrollData.x),
                        movePoint.current.y - (imgRect.top + scrollData.y),
                    );
                }
                break;
            case "NumpadSubtract":
                //-
                if (movePoint.current) {
                    preventDefaultFn();
                    toShrink(
                        imgEl,
                        el,
                        movePoint.current.x - (imgRect.left + scrollData.x),
                        movePoint.current.y - (imgRect.top + scrollData.y),
                    );
                }
                break;
            default:
                break;
        }
    };

    useEventListener("keydown", handleKeydown, { current: document });

    useLayoutEffect(() => {
        setIsDrag(false);
        attrRef.current = undefined;
        setAttr(undefined);
        return () => {
            handleDragEnd();
            pointData.current = undefined;
            initSize.current = undefined;
        };
    }, [handleDragEnd, imgData]);

    useEffect(() => {
        let destroy = false;
        let isPending = false;
        let canvas: HTMLCanvasElement | null = null;
        let img: HTMLImageElement | null = null;
        let timer: null | number = null;

        const cancel = () => {
            isPending = false;

            handleCutRef.current({
                isPending,
                errorMsg: "cancel",
            });
            return;
        };

        /**
         * 裁剪函数
         */
        cutFn.current = (callback: (res: string | CutSuccessProps) => void, isBtnClick = false) => {
            timer && window.clearTimeout(timer);

            const imgEl = imgRef.current;

            if (!imgEl) {
                callback("没有获取到img标签");
                return;
            }

            const container = ref.current;
            if (!container) {
                callback("没有获取到容器标签");
                return;
            }

            canvas = document.createElement("canvas");

            const ctx = canvas.getContext("2d");

            if (!ctx) {
                callback("不支持画布");
                return;
            }

            const containerRect = container.getBoundingClientRect();
            const imgRect = imgEl.getBoundingClientRect();

            canvas.width = containerRect.width;
            canvas.height = containerRect.height;
            img = document.createElement("img");

            img.setAttribute("style", `width:${imgRect.width}px;height:${imgRect.height}`);
            img.src = imgEl.src;

            /**
             * 当图片加载好时
             */
            img.onload = () => {
                if (destroy && !isBtnClick) {
                    callback("cancel");
                    return;
                }

                if (!img || !canvas) {
                    callback("节点丢失");
                    return;
                }

                ctx.drawImage(img, attr?.x ?? 0, attr?.y ?? 0, imgRect.width, imgRect.height);
                canvas.toBlob((blob) => {
                    if (destroy && !isBtnClick) {
                        callback("cancel");
                        return;
                    }

                    if (!img || !canvas) {
                        callback("节点丢失");
                        return;
                    }

                    if (blob && imgDataRef.current) {
                        const url = canvas.toDataURL(imgDataRef.current.type);
                        const file = new File([blob], imgDataRef.current.name, {
                            type: imgDataRef.current.type,
                        });
                        callback({
                            file,
                            base64: url,
                        });
                    } else {
                        callback("转化失败");
                        return;
                    }
                    img.remove();
                    canvas.remove();
                }, imgDataRef.current?.type);
            };

            img.onerror = () => {
                if (destroy && !isBtnClick) {
                    callback("cancel");
                    return;
                }
                callback("图片加载失败");
            };
        };

        /**
         * 主体函数
         */
        const mainFn = () => {
            timer = window.setTimeout(() => {
                if (destroy) {
                    cancel();
                    return;
                }
                cutFn.current?.((res) => {
                    isPending = false;
                    if (typeof res === "string") {
                        handleCutRef.current({
                            isPending,
                            errorMsg: res,
                        });
                    } else {
                        handleCutRef.current({
                            isPending,
                            file: res.file,
                            base64: res.base64,
                        });
                    }
                });
            }, 50);
        };

        stopCutFn.current = () => {
            destroy = true;
            timer && window.clearTimeout(timer);
            if (isPending) {
                cancel();
            }
            img?.remove();
            canvas?.remove();
        };

        if (attr && isPreview) {
            isPending = true;
            handleCutRef.current({
                isPending,
            });
            mainFn();
        }

        return () => {
            stopCutFn.current?.();
            stopCutFn.current = undefined;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attr, isPreview]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    //鼠标移入
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        isHover.current = true;
        movePoint.current = {
            x: e.pageX,
            y: e.pageY,
        };
    };

    //鼠标移出
    const handleMouseLeave = () => {
        isHover.current = false;
        movePoint.current = undefined;
    };
    /**
     * 在容器上移动时
     */
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        movePoint.current = {
            x: e.pageX,
            y: e.pageY,
        };
    };

    /**
     * 转发 剪切图片
     */
    useImperativeHandle(eventRef, () => ({
        toCut: () => {
            return new Promise(
                (resolve: (res: CutSuccessProps) => void, reject: (errorMsg: string) => void) => {
                    if (cutFn.current) {
                        cutFn.current((res) => {
                            if (typeof res === "string") {
                                reject(res);
                            } else {
                                resolve(res);
                            }
                        });
                    } else {
                        reject("代码有问题");
                    }
                },
            );
        },
        cancelCut: () => {
            stopCutFn.current?.();
        },
    }));

    /**
     * 获取视口的中点
     * 相对于图片来说
     */
    const getCenterPoint = (imgEl: HTMLImageElement, el: HTMLDivElement) => {
        const imgRect = imgEl.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        return {
            offsetX: Math.abs(sub(sum(elRect.left, toDiv(elRect.width, 2)), imgRect.left)),
            offsetY: Math.abs(sub(sum(elRect.top, toDiv(elRect.height, 2)), imgRect.top)),
        };
    };

    /**
     * 当缩小按钮被点击时
     */
    const handleShrinkClick = () => {
        const imgEl = imgRef.current;
        const el = ref.current;
        if (!imgEl || !el) {
            return;
        }
        const { offsetX, offsetY } = getCenterPoint(imgEl, el);
        toShrink(imgEl, el, offsetX, offsetY);
    };
    /**
     * 当放大按钮被点击时
     */
    const handleEnlargeClick = () => {
        const imgEl = imgRef.current;
        const el = ref.current;
        if (!imgEl || !el) {
            return;
        }
        const { offsetX, offsetY } = getCenterPoint(imgEl, el);
        toEnlarge(imgEl, offsetX, offsetY);
    };

    /**
     * 当图片加载成功的时候
     */
    const handleImgReady = () => {
        const imgEl = imgRef.current;
        if (!imgEl) {
            return;
        }

        const { naturalWidth, naturalHeight } = imgEl;

        if (naturalWidth < naturalHeight) {
            imgEl.style.height = "auto";
            imgEl.style.width = "100%";
        } else {
            imgEl.style.height = "100%";
            imgEl.style.width = "auto";
        }
        zoomRef.current = 1;

        setAttr(() => {
            forceReflow();

            const data = {
                x: 0,
                y: 0,
                width: imgEl.offsetWidth,
                height: imgEl.offsetHeight,
            };
            initSize.current = {
                width: imgEl.offsetWidth,
                height: imgEl.offsetHeight,
            };
            attrRef.current = deepCloneData(data);
            return deepCloneData(data);
        });
    };

    const isGray_shrink = zoomRef.current <= 1;

    /**
     * 如果可以预览
     */
    const previewNode = () => {
        return (
            <>
                <div className={styles.cutPicture_imgView} />

                <div className={styles.cutPicture_gridHorizontalLine1} />
                <div className={styles.cutPicture_gridHorizontalLine2} />
                <div className={styles.cutPicture_gridVerticalLine1} />
                <div className={styles.cutPicture_gridVerticalLine2} />
            </>
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={styles.cutPicture_wrapper}
            style={imgData ? undefined : { display: "none" }}
        >
            <div
                className={
                    styles.cutPicture_imgContainer + (isDrag ? ` ${styles.cutPicture_active}` : "")
                }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onMouseDown={(e) => {
                    handleMouseDown(e);
                }}
                ref={ref}
            >
                <div className={styles.cutPicture_imgContent}>
                    <img
                        src={imgData?.url}
                        alt=""
                        className={styles.cutPicture_img}
                        draggable={false}
                        ref={imgRef}
                        onLoad={handleImgReady}
                        style={{
                            transform: `translate(${attr?.x ?? 0}px,${attr?.y ?? 0}px)`,
                            width: attr ? `${attr.width}px` : "auto",
                            height: attr ? `${attr.height}px` : "auto",
                        }}
                    />
                    {isPreview ? previewNode() : <></>}
                </div>
            </div>

            <div className={styles.cutPicture_tool}>
                <div className={styles.cutPicture_restBtn} onClick={restClick}>
                    {`${t("UploadPictureComponent.Reset")}`}
                </div>
                <div className={styles.cutPicture_rightTool}>
                    <Icon
                        type="union1"
                        className={
                            styles.cutPicture_shrink +
                            (isGray_shrink ? ` ${styles.cutPicture_shrinkGray}` : "")
                        }
                        onClick={handleShrinkClick}
                    />
                    <Icon
                        type="addition"
                        className={styles.cutPicture_enlarge}
                        onClick={handleEnlargeClick}
                    />
                </div>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default forwardRef(Temp);
