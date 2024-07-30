/**
 * @file 日
 * @date 2023-06-14
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { RecordProps } from "../../Hooks/useVerticalSlide";
import Item from "../Item";
import { VerticalScrollPicker, VerticalScrollPickerEvents } from "../VerticalScrollPicker";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 日
     */
    value: string;
    /**
     * 年
     */
    year: number;
    /**
     * 月
     */
    month: number;
    /**
     * 当日发生变化时
     */
    handleChange: (res: string) => void;
    /**
     * 年是不是在移动中
     */
    yearIsMove: boolean;
    /**
     * 月是不是在移动中
     */
    monthIsMove: boolean;
    /**
     * 当移动状态发生变化时
     */
    handleMoveStatusChange: (status: boolean) => void;
    /**
     * 移动状态
     */
    isMove: boolean;
    /**
     * 可见状态
     */
    show: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    value,
    year,
    month,
    handleChange,
    yearIsMove,
    monthIsMove,
    handleMoveStatusChange,
    isMove,
    show,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     * 没有移动的年
     */
    const [unmovedYear, setUnmovedYear] = useState<number>();

    /**
     * 没有移动的月
     */
    const [unmovedMonth, setUnmovedMonth] = useState<number>();

    const [list, setList] = useState(() => {
        const end = new Date(year, month, 0).getDate();
        const arr: Array<RecordProps> = [];
        for (let i = 1; i <= end; i++) {
            arr.push({
                id: `${i}`,
                content: <Item content={i} unit="日" />,
            });
        }
        return arr;
    });

    const scrollData = useRef({
        offsetHeight: 0,
        scrollTop: 0,
        scrollHeight: 0,
    });

    /**
     * 纵向滚动组件的转发事件
     */
    const event = useRef<VerticalScrollPickerEvents>({
        scrollTo: () => undefined,
        termination: () => undefined,
        init: () => undefined,
    });

    /**
     * 滚动到我想要的值的状态
     * status => 是否在执行中
     * scrollStatus => 是否在滚动中
     * value => list最后要变成的日期
     */
    const [scrollToPending, setScrollToPending] = useState<{
        status: boolean;
        scrollStatus: boolean;
        value?: number;
    }>({
        status: false,
        scrollStatus: false,
    });

    const valueRef = useRef<string>(value);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        if (yearIsMove === false) {
            setUnmovedYear(year);
        }
    }, [year, yearIsMove]);

    useEffect(() => {
        if (monthIsMove === false) {
            setUnmovedMonth(month);
        }
    }, [month, monthIsMove]);

    useEffect(() => {
        const end = new Date(year, month, 0).getDate();
        if (!isMove) {
            if (Number(valueRef.current) > end) {
                event.current.scrollTo("1");
                setScrollToPending({
                    status: true,
                    scrollStatus: false,
                    value: end,
                });
            } else {
                setList(() => {
                    const arr: Array<RecordProps> = [];
                    for (let i = 1; i <= end; i++) {
                        arr.push({
                            id: `${i}`,
                            content: <Item content={i} unit="日" />,
                        });
                    }
                    return arr;
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unmovedMonth, unmovedYear, isMove]);

    useEffect(() => {
        if (
            scrollToPending.status &&
            typeof scrollToPending.value === "number" &&
            isMove &&
            scrollToPending.scrollStatus === false
        ) {
            setScrollToPending((pre) => ({
                status: true,
                scrollStatus: true,
                value: pre.value,
            }));
        }
    }, [scrollToPending, isMove]);

    useEffect(() => {
        if (
            scrollToPending.status &&
            typeof scrollToPending.value === "number" &&
            isMove === false &&
            scrollToPending.scrollStatus
        ) {
            setScrollToPending((pre) => ({
                status: false,
                scrollStatus: false,
                value: pre.value,
            }));
        }
    }, [scrollToPending, isMove]);

    useEffect(() => {
        const endVal = scrollToPending.value;
        if (
            scrollToPending.scrollStatus === false &&
            scrollToPending.status === false &&
            typeof endVal === "number"
        ) {
            setList(() => {
                const arr: Array<RecordProps> = [];
                for (let i = 1; i <= endVal; i++) {
                    arr.push({
                        id: `${i}`,
                        content: <Item content={i} unit="日" />,
                    });
                }
                return arr;
            });
        }
    }, [scrollToPending]);

    useEffect(() => {
        if (show) {
            event.current.init();
        } else {
            event.current.termination();
        }
    }, [show]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <VerticalScrollPicker
            viewHeight={"3.2rem"}
            records={list}
            value={value}
            handleScrollStart={() => {
                handleMoveStatusChange(true);
            }}
            handleScrollEnd={() => {
                handleMoveStatusChange(false);
            }}
            onScroll={(res) => {
                scrollData.current = res;
            }}
            ref={event}
            className={styles.mobileDatePicker_day}
            handleChange={(res) => {
                handleChange?.(res);
                valueRef.current = res;
            }}
        />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
