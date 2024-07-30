/**
 * @file 预览的单个图片
 * @date 2023-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { startTransition, useEffect, useRef, useState } from "react";
import { Icon, Skeleton, classNames, useEventListener, useGetSet, useLatest } from "../../../../..";
import imgFailed from "../../../../../Assets/images/icon_imgFailed.png";
import { LoadingStatus } from "../../../../../DefaultData/Utils/loadStatus";
import { useDrag } from "../../../../../Hooks/useDrag";
import { useImgTransform } from "../../Hooks/useImgTransform";
import { resetOutOfViewport } from "../../Unit/resetOutOfViewport";
import { ImageProps } from "../../Unit/type";
import Tools from "../Tools";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 图片列表
     */
    imgList?: Array<ImageProps | null>;
    /**
     * 当图片切换时
     */
    handleImgSwitch?: (to: number, from?: number) => void;
    /**
     * 开始的下标
     */
    startIndex?: number;
    /**
     * 关闭
     */
    close: () => void;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ imgList, handleImgSwitch, startIndex, close }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     * 当前展示的第几张图片
     */
    const [getActiveIndex, setActiveIndex] = useGetSet(startIndex ?? 0);
    /**
     * 图片
     */
    const imgRef = useRef<HTMLImageElement | null>(null);
    /**
     * 图片 的 transform属性
     */
    const [imgData, transformData, transformDispatch] = useImgTransform(getActiveIndex, imgList);

    /**
     * 上一次的点位
     */
    const point = useRef({
        x: 0,
        y: 0,
    });

    /**
     * 修改全局样式
     */
    const styleRef = useRef<HTMLStyleElement | null>(null);

    /**
     * 拖拽状态
     */
    const [isDrag, setIsDrag] = useState(false);

    /**
     * 最新的handleImgSwitch
     */
    const handleImgSwitchRef = useLatest(handleImgSwitch);

    /**
     * 图片加载状态
     */
    const [status, setStatus] = useState<LoadingStatus>("pending");

    /**
     * 最新的close
     */
    const closeRef = useLatest(close);

    /**
     * 拖拽事件
     */
    const [handleMouseDown] = useDrag(
        (e) => {
            // 开始拖拽
            setIsDrag(true);
            styleRef.current?.remove();

            point.current = {
                x: e.pageX,
                y: e.pageY,
            };

            const styleEl = document.createElement("style");
            styleEl.innerHTML = `
            * {
                cursor: pointer !important;
            }
            `;
            document.head.appendChild(styleEl);

            styleRef.current = styleEl;
        },
        (e) => {
            // 拖拽中
            e.preventDefault();

            const moveX = e.pageX - point.current.x;
            const moveY = e.pageY - point.current.y;
            point.current = {
                x: e.pageX,
                y: e.pageY,
            };
            transformDispatch.move(moveX, moveY);
        },
        () => {
            setIsDrag(false);
            styleRef.current?.remove();
            styleRef.current = null;
            // 拖拽结束
        },
        () => {
            setIsDrag(false);
            styleRef.current?.remove();
            styleRef.current = null;
            // 拖拽取消
        },
    );

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /**
     * 当拖拽结束后
     * 判断图片是否在视口之外
     * 如果是
     * 要还原位置
     */
    useEffect(() => {
        let timer: null | number = null;
        (() => {
            if (isDrag) {
                return;
            }
            startTransition(() => {
                timer = window.setTimeout(() => {
                    timer = null;
                    if (imgRef.current && resetOutOfViewport(imgRef.current)) {
                        transformDispatch.restPosition();
                    }
                }, 100);
            });
        })();
        return () => {
            timer && window.clearTimeout(timer);
        };
    }, [isDrag, transformDispatch]);

    /**
     * 设置开始的下标
     */
    useEffect(() => {
        handleImgSwitchRef.current?.(startIndex ?? 0, getActiveIndex());
        setActiveIndex(startIndex ?? 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startIndex]);

    /**
     * 当展示的图片下标发生变化时
     */
    const activeIndex = getActiveIndex();
    useEffect(() => {
        setStatus("pending");
    }, [activeIndex]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * 镜像的值
     */
    const mirrorVal = () => {
        if (typeof transformData?.isMirror === "boolean") {
            return transformData.isMirror ? -1 : 1;
        }
        return 1;
    };

    /**
     * 当上一张点击时
     */
    const handlePreClick = (count = -1) => {
        if (activeIndex + count < 0 || !imgList?.length) {
            return;
        }

        const data = imgList[activeIndex + count];
        if (data?.isVisible) {
            handleImgSwitch?.(activeIndex + count, activeIndex);
            setActiveIndex(activeIndex + count);
            return;
        }

        handlePreClick(count - 1);
    };

    /**
     * 当下一张点击时
     */
    const handleNextClick = (count = 1) => {
        if (!imgList || activeIndex + count > imgList.length - 1) {
            return;
        }
        const data = imgList[activeIndex + count];
        if (data?.isVisible) {
            handleImgSwitch?.(activeIndex + count, activeIndex);
            setActiveIndex(activeIndex + count);
            return;
        }
        handleNextClick(count + 1);
    };

    /**
     * 监听键盘 按下事件
     *
     * 执行手势
     * ← => 上一张
     * → => 下一张
     */
    useEventListener(
        "keydown",
        (e) => {
            const key = e.key;

            if (key === "ArrowRight") {
                //下一张
                e.preventDefault();

                handleNextClick();

                return;
            }
            if (key === "ArrowLeft") {
                //上一张
                e.preventDefault();

                handlePreClick();
                return;
            }
        },
        { current: document },
        { passive: false },
    );

    /**
     * 监听键盘 按下事件
     *
     * 执行手势
     * Esc => 关闭
     */
    useEventListener("keyup", (e) => {
        const key = e.key;

        if (key === "Escape") {
            closeRef.current();
            return;
        }
    });

    /**
     * 判断是否还有上一张
     */
    const hasPre = () => {
        let status = false; //默认没有上一张

        if (!imgList?.length) {
            return;
        }

        for (let i = activeIndex - 1; i >= 0; ) {
            if (imgList[i]?.isVisible) {
                status = true;
                i = -1;
            } else {
                --i;
            }
        }
        return status;
    };

    /**
     * 判断是否还有下一张
     */
    const hasNext = () => {
        let status = false; //默认没有上一张

        if (!imgList?.length) {
            return;
        }

        for (let i = activeIndex + 1; i < imgList.length; ) {
            if (imgList[i]?.isVisible) {
                status = true;
                i = imgList.length;
            } else {
                ++i;
            }
        }
        return status;
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <>
            <div className={styles.imageViewer_pages}>
                {activeIndex + 1}/{imgList?.length ?? 1}
            </div>

            <div
                className={styles.imageViewer_close}
                onClick={() => {
                    close();
                }}
            >
                <Icon type="close" className={styles.imageViewer_closeIcon} />
            </div>

            {imgList?.length && imgList.length > 1 ? (
                <>
                    <div
                        className={classNames(
                            styles.imageViewer_preImgBtn,
                            styles.imageViewer_switchBtn,
                            {
                                [styles.imageViewer_switchBtn__disabled]: !hasPre(),
                            },
                        )}
                        onClick={() => {
                            handlePreClick();
                        }}
                    >
                        <Icon type="open" className={styles.imageViewer_preIcon} />
                    </div>
                    <div
                        className={classNames(
                            styles.imageViewer_nextImgBtn,
                            styles.imageViewer_switchBtn,
                            {
                                [styles.imageViewer_switchBtn__disabled]: !hasNext(),
                            },
                        )}
                        onClick={() => {
                            handleNextClick();
                        }}
                    >
                        <Icon type="open" className={styles.imageViewer_nextIcon} />
                    </div>
                </>
            ) : undefined}

            {status === "pending" ? (
                <Skeleton variant="img" className={styles.imageViewer_loading} />
            ) : undefined}
            <div
                style={{
                    transform: `scale3d(${transformData?.scale?.x ?? 1},${
                        transformData?.scale?.y ?? 1
                    },${transformData?.scale?.z ?? 1}) translate(${transformData?.x ?? 0}px,${
                        transformData?.y ?? 0
                    }px)`,
                }}
                className={styles.imageViewer_imgContainer}
            >
                <div
                    className={styles.imageViewer_imgContainer}
                    style={{
                        transform: `rotate(${transformData?.rotate}deg)`,
                    }}
                >
                    <img
                        src={imgData?.previewSrc ?? imgData?.src}
                        className={styles.imageViewer_img}
                        style={{
                            transform: `scaleX(${mirrorVal()})`,
                        }}
                        onLoad={() => {
                            setStatus("success");
                        }}
                        onError={(e) => {
                            if (imgData?.urlOnError) {
                                e.currentTarget.src = imgData.urlOnError;
                            } else {
                                e.currentTarget.src = imgFailed;
                            }
                            setStatus("failed");
                        }}
                        alt=""
                        ref={imgRef}
                        draggable={true}
                        onMouseDown={handleMouseDown}
                    />
                </div>
            </div>

            <Tools
                isDownload={imgData?.isDownload ?? true}
                dispatch={transformDispatch}
                transform={transformData}
                url={imgData?.previewSrc ?? imgData?.src}
            />
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
