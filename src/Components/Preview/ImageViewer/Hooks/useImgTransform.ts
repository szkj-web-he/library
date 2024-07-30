/**
 * @file 图片变化
 * @date 2023-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-13
 */

import { useEffect, useMemo, useState } from "react";
import { mathSub, mathSum, useEventListener, useLatest } from "../../../..";
import { ImageProps } from "../Unit/type";

export interface ImgTransformProps {
    /**
     * x偏移值
     */
    x: number;
    /**
     * x偏移值
     */
    y: number;
    /**
     * 缩放比例
     */
    scale: {
        x: number;
        y: number;
        z: number;
    };
    /**
     * 是否镜像翻转了
     */
    isMirror: boolean;
    /**
     * 旋转
     */
    rotate: number;
}

export interface ImgTransformEvents {
    /**
     * 镜像
     */
    mirror: () => void;
    /**
     * 旋转
     */
    rotate: () => void;
    /**
     * 缩小
     */
    shrink: () => void;
    /**
     * 放大
     */
    enlarge: () => void;
    /**
     * 还原
     */
    reset: () => void;
    /**
     * 移动
     */
    move: (moveX: number, moveY: number) => void;
    /**
     * 还原位置
     */
    restPosition: () => void;
}

export const useImgTransform = (
    getIndex: () => number,
    imgList?: Array<ImageProps | null>,
): [ImageProps | undefined, ImgTransformProps | undefined, ImgTransformEvents] => {
    /**
     * 图片的转化属性
     */
    const [imgTransformData, setImgTransformData] = useState<Record<
        string,
        ImgTransformProps
    > | null>(null);

    /**
     * 最新的imgList
     */
    const imgListRef = useLatest(imgList);

    /**
     * 监听imgList变化，
     * 用id来标识，每个transform的状态
     */
    useEffect(() => {
        setImgTransformData((pre) => {
            if (imgList?.length) {
                let data = { ...pre };
                for (let i = 0; i < imgList.length; i++) {
                    const item = imgList[i];

                    if (!item?.id) {
                        continue;
                    }

                    const oldData = pre?.[item.id];

                    data = {
                        ...data,
                        ...{
                            [item.id]: {
                                x: oldData?.x ?? 0,
                                y: oldData?.y ?? 0,
                                scale: {
                                    x: oldData?.scale.x ?? 1,
                                    y: oldData?.scale.y ?? 1,
                                    z: oldData?.scale.z ?? 1,
                                },
                                rotate: oldData?.rotate ?? 0,
                                isMirror: false,
                            },
                        },
                    };
                }

                return { ...data };
            }
            return null;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imgList]);

    /**
     * 修改transformData
     */
    const dispatch = useMemo<ImgTransformEvents>(() => {
        const getId = (data?: NonNullable<typeof imgTransformData>) => {
            /**
             * 获取当前展示的img的id
             */
            const id = imgListRef.current?.[getIndex()]?.id;

            if (!id || !data?.[id]) {
                /**
                 * 如果没有id
                 * 或者
                 * 没有相关的transform数据
                 * 跳出
                 */
                return null;
            }
            return data[id];
        };

        return {
            /**
             * 镜像
             */
            mirror: () => {
                setImgTransformData((pre) => {
                    const data = getId(pre ?? undefined);
                    if (!data) {
                        return pre;
                    }
                    data.isMirror = !data.isMirror;

                    return pre ? { ...pre } : null;
                });
            },
            /**
             * 旋转
             */
            rotate: () => {
                setImgTransformData((pre) => {
                    const data = getId(pre ?? undefined);
                    if (!data) {
                        return pre;
                    }
                    data.rotate += 90;

                    return pre ? { ...pre } : null;
                });
            },

            /**
             * 缩小
             */
            shrink: () => {
                const fn = (num: number) => {
                    if (mathSub(num, 0.1) >= 1) {
                        return mathSub(num, 0.1);
                    }
                    return num;
                };

                setImgTransformData((pre) => {
                    const data = getId(pre ?? undefined);
                    if (!data) {
                        return pre;
                    }
                    data.scale.x = fn(data.scale.x);
                    data.scale.y = fn(data.scale.y);

                    return pre ? { ...pre } : null;
                });
            },
            /**
             * 放大
             */
            enlarge: () => {
                setImgTransformData((pre) => {
                    const data = getId(pre ?? undefined);
                    if (!data) {
                        return pre;
                    }
                    data.scale.x = mathSum(data.scale.x, 0.1);
                    data.scale.y = mathSum(data.scale.y, 0.1);

                    return pre ? { ...pre } : null;
                });
            },
            /**
             * 还原
             */
            reset: () => {
                setImgTransformData((pre) => {
                    const data = getId(pre ?? undefined);
                    if (!data) {
                        return pre;
                    }
                    data.scale.x = 1;
                    data.scale.y = 1;
                    data.scale.z = 1;
                    data.x = 0;
                    data.rotate = 0;
                    data.y = 0;
                    data.isMirror = false;

                    return pre ? { ...pre } : null;
                });
            },
            /**
             * 移动
             */
            move: (moveX, moveY) => {
                setImgTransformData((pre) => {
                    const data = getId(pre ?? undefined);
                    if (!data) {
                        return pre;
                    }

                    //按缩放比例进行转化
                    const xVal = Math.round(moveX / data.scale.y);
                    const yVal = Math.round(moveY / data.scale.y);

                    data.x += xVal;
                    data.y += yVal;

                    return pre ? { ...pre } : null;
                });
            },
            /**
             * 还原位置
             */
            restPosition: () => {
                setImgTransformData((pre) => {
                    const data = getId(pre ?? undefined);
                    if (!data) {
                        return pre;
                    }

                    data.x = 0;
                    data.y = 0;

                    return pre ? { ...pre } : null;
                });
            },
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getIndex]);

    /**
     * 监听键盘 按下事件
     *
     * 执行收拾
     * + => 放大
     * - => 缩小
     */
    useEventListener(
        "keydown",
        (e) => {
            const key = e.key;

            if (key === "+") {
                //放大

                e.preventDefault();
                dispatch.enlarge();
                return;
            }
            if (key === "-") {
                //缩小
                e.preventDefault();
                dispatch.shrink();
                return;
            }
        },
        { current: document },
        { passive: false },
    );

    /**
     * 监听滚轮事件
     */
    useEventListener(
        "wheel",
        (e) => {
            e.preventDefault();
            const val = e.deltaY;
            if (val < 0) {
                dispatch.enlarge();
                return;
            }
            if (val > 0) {
                dispatch.shrink();
                return;
            }
        },
        undefined,
        { passive: false },
    );

    /**
     * 当前要展示的数据
     */
    const imgData = imgList?.[getIndex()] ?? undefined;

    const transformData = imgData?.id ? imgTransformData?.[imgData.id] : undefined;

    return [imgData, transformData, dispatch];
};
