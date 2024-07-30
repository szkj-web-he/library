/**
 * @file item
 * @date 2023-06-08
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { MutableRefObject, useEffect, useRef } from "react";
import { useLatest } from "../../../../../Hooks/useLatest";
import classNames from "../../../../../Unit/classNames";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    children: React.ReactNode;

    parent: MutableRefObject<HTMLDivElement | null>;

    style?: React.CSSProperties;
    /**
     * 当item和视口的交叉发生变化的时候
     *
     * 是否相交
     */
    handleChange: (status: boolean) => void;

    /**
     * 是否活跃
     */
    active: boolean;

    /**
     * 当item被点击时
     * 要移动的值
     */
    onClick: (margin?: number) => void;

    /**
     * 通讯id
     */
    msgId: string;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    children,
    parent,
    style,
    handleChange,
    active,
    msgId,
    onClick,
    ...props
}) => {
    Temp.displayName = "VerticalScrollPickerItem";
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const handleChangeRef = useLatest(handleChange);

    const ref = useRef<HTMLDivElement | null>(null);

    const onClickRef = useLatest(onClick);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const fn = (res: IntersectionObserverEntry[]) => {
            const data = res[0].intersectionRatio;
            handleChangeRef.current(data >= 0.6);
        };

        const observer = new IntersectionObserver(fn, {
            root: parent.current?.parentElement,
            rootMargin: "0px",
            threshold: [0.6],
        });
        const node = ref.current;
        node && observer.observe(node);
        return () => {
            node && observer.unobserve(node);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const node = ref.current;

        const handleMove = () => {
            handleTouchCancel();
        };

        const handleTouchend = () => {
            onClickRef.current();
            handleTouchCancel();
        };

        const handleTouchCancel = () => {
            document.removeEventListener("touchmove", handleMove);
            document.removeEventListener("touchend", handleTouchend);
            document.removeEventListener("touchcancel", handleTouchCancel);
        };

        const handleTouchStart = () => {
            document.addEventListener("touchmove", handleMove);
            document.addEventListener("touchend", handleTouchend);
            document.addEventListener("touchcancel", handleTouchCancel);
        };

        const bind = () => {
            node?.addEventListener("touchstart", handleTouchStart);
        };

        const unBind = () => {
            node?.removeEventListener("touchstart", handleTouchStart);
            handleTouchCancel();
        };

        document.addEventListener(`start-${msgId}`, unBind);
        document.addEventListener(`end-${msgId}`, bind);

        return () => {
            document.removeEventListener(`start-${msgId}`, unBind);
            document.removeEventListener(`end-${msgId}`, bind);
            node?.removeEventListener("touchstart", handleTouchStart);
            handleTouchCancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msgId]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={classNames(styles.verticalScrollPicker_item, {
                [styles.verticalScrollPicker_itemActive]: active,
            })}
            style={style}
            ref={ref}
            {...props}
        >
            {children}
        </div>
    );
};
Temp.displayName = "VerticalScrollPickerItem";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
