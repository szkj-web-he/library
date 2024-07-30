/**
 * @file 关于dom的hover 提示
 * @date 2023-03-10
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-10
 */

import { ReactNode, startTransition, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getScrollValue, useStateCallback, useUnmount } from "../../..";
import { isDomChild } from "../../../Unit/isDomChild";
import { mountElement } from "../../Cover/Unit/mountEl";
import { isOverflow } from "./Units/isOverflow";
import styles from "./style.module.scss";

interface UseHoverTipsOptions {
    /**
     * 延时展示
     */
    delayShow?: number;
    /**
     * 延时隐藏
     */
    delayHidden?: number;
    /**
     * 是否 当触摸的dom溢出时，再
     * 展示浮动文字
     */
    whenOverflow?: boolean;
    /**
     * x轴偏移属性
     *
     * @param {number} x 原本要设置的x值
     * @returns {number} 新的x值
     */
    offsetX?: (x: number) => number;
    /**
     * y轴偏移属性
     * @param {number} y 原本要设置的y值
     * @returns {number} 新的y值
     */
    offsetY?: (y: number) => number;
}

/**
 * hover出现提示
 * @param {React.ReactNode} content 浮动内容
 * @param {UseHoverTipsOptions} options useHoverTips的参数
 * @returns
 */
export const useHoverTips = (
    content?: React.ReactNode,
    options?: UseHoverTipsOptions,
): [(res: React.MouseEvent) => void, ReactNode] => {
    const tipsRef = useRef<HTMLDivElement | null>(null);

    const domRef = useRef<HTMLElement | null>(null);
    /**
     * 是否展示tip框
     */
    const [show, setShow] = useStateCallback(false);

    const [point, setPoint] = useState<{
        x: number;
        y: number;
    }>();

    /**
     * 延时展示的timer
     */
    const showTimer = useRef<number | null>(null);
    /**
     * 延时隐藏的timer
     */
    const hiddenTimer = useRef<number | null>(null);

    /**
     * 在还没有dom加载好的时候，已经触发了移动时
     * 存储移动后的坐标
     */
    const movePoint = useRef<{
        x: number;
        y: number;
    } | null>(null);

    /**
     * 防止位置溢出
     */
    const autoPosition = (pageX: number, pageY: number) => {
        const rect = tipsRef.current?.getBoundingClientRect();
        if (!rect) {
            movePoint.current = { x: pageX, y: pageY };
            return;
        }

        const scrollData = getScrollValue();
        const boundary = {
            right: scrollData.x + document.documentElement.clientWidth - 8,
            bottom: scrollData.y + document.documentElement.clientHeight - 8,
        };

        const { width, height } = rect;

        let x = pageX;
        let y = pageY + 15;
        if (x + width > boundary.right) {
            x = boundary.right - width;
        }

        if (y + height > boundary.bottom) {
            y = boundary.bottom - height;
        }

        if (options?.offsetX) {
            x = options.offsetX(x);
        }

        if (options?.offsetY) {
            y = options.offsetY(y);
        }

        return { x, y };
    };

    /**
     * 销毁时 清除计时器
     */
    useUnmount(() => {
        showTimer.current && window.clearTimeout(showTimer.current);
        hiddenTimer.current && window.clearTimeout(hiddenTimer.current);
    });

    /**
     * 监听离开事件
     */
    const handleMouseLeave = () => {
        showTimer.current && window.clearTimeout(showTimer.current);
        hiddenTimer.current && window.clearTimeout(hiddenTimer.current);
        hiddenTimer.current = window.setTimeout(() => {
            hiddenTimer.current = null;
            setShow(false, () => {
                setPoint(undefined);
            });
        }, options?.delayHidden);
        domRef.current?.removeEventListener("mousemove", handleMousemove);
        domRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };

    /**
     * 监听mousemove事件
     */
    const handleMousemove = (e: MouseEvent) => {
        startTransition(() => {
            setPoint(autoPosition(e.pageX, e.pageY));
        });
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (!isDomChild(e)) {
            return;
        }

        if (options?.whenOverflow) {
            const overflowStatus = isOverflow(e.currentTarget);
            if (!overflowStatus) {
                return;
            }
        }

        movePoint.current = null;

        showTimer.current && window.clearTimeout(showTimer.current);
        hiddenTimer.current && window.clearTimeout(hiddenTimer.current);

        showTimer.current = window.setTimeout(() => {
            showTimer.current = null;
            setShow(true, () => {
                setPoint(
                    autoPosition(movePoint.current?.x ?? e.pageX, movePoint.current?.y ?? e.pageY),
                );
            });
        }, options?.delayShow);

        domRef.current =
            window.HTMLElement && e.currentTarget instanceof HTMLElement ? e.currentTarget : null;
        domRef.current?.addEventListener("mousemove", handleMousemove);
        domRef.current?.addEventListener("mouseleave", handleMouseLeave);
    };

    /**
     * 当dom发生变化的时候
     */
    const node =
        show && content ? (
            createPortal(
                <div
                    className={styles.tipsContent_wrapper}
                    style={{
                        opacity: show && (point?.x ?? 0) + (point?.y ?? 0) ? 1 : 0,
                        left: `${point?.x ?? 0}px`,
                        top: `${point?.y ?? 0}px`,
                    }}
                    ref={tipsRef}
                >
                    {content}
                </div>,
                mountElement(),
            )
        ) : (
            <></>
        );

    return [handleMouseEnter, node];
};
