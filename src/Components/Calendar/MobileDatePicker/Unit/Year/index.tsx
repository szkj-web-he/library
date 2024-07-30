/**
 * @file 年
 * @date 2023-06-13
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { VerticalScrollPicker, VerticalScrollPickerEvents } from "../VerticalScrollPicker";
import styles from "./style.module.scss";
import Item from "../Item";
import { deepCloneData } from "../../../../../Unit/deepCloneData";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 选中的年
     */
    value: string;
    /**
     * 当年发生变化时
     */
    handleChange: (value: string) => void;
    /**
     * 当移动状态发生变化时
     */
    handleMoveStatusChange: (status: boolean) => void;
    /**
     * 移动状态
     */
    isMove: boolean;
    /**
     * 是否可见
     */
    show: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    value,
    handleChange,
    handleMoveStatusChange,
    isMove,
    show,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [list, setList] = useState<Array<number>>(() => {
        const year = Number(value);
        const arr: Array<number> = [];
        for (let i = year - 30; i < year + 30; i++) {
            arr.push(i);
        }
        return arr;
    });

    const scrollData = useRef({
        offsetHeight: 0,
        scrollTop: 0,
        scrollHeight: 0,
    });

    const event = useRef<VerticalScrollPickerEvents>({
        scrollTo: () => undefined,
        termination: () => undefined,
        init: () => undefined,
    });

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        if (!isMove) {
            if (scrollData.current.scrollTop < 5 * scrollData.current.offsetHeight) {
                setList((pre) => {
                    const first = pre[0];
                    const arr = deepCloneData(pre);
                    for (let i = first - 1; i >= first - 20; i--) {
                        arr.unshift(i);
                    }
                    return arr;
                });
            } else if (
                scrollData.current.scrollHeight - scrollData.current.scrollTop <
                5 * scrollData.current.offsetHeight
            ) {
                setList((pre) => {
                    const last = pre[pre.length - 1];
                    const arr = deepCloneData(pre);
                    for (let i = last + 1; i <= last + 20; i++) {
                        arr.push(i);
                    }
                    return arr;
                });
            }
        }
    }, [isMove]);

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

    const handleScroll = (res: {
        offsetHeight: number;
        scrollTop: number;
        scrollHeight: number;
    }) => {
        scrollData.current = res;
    };

    const dataEl = () => {
        return list.map((item) => {
            return { content: <Item key={item} content={item} unit="年" />, id: `${item}` };
        });
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <VerticalScrollPicker
            viewHeight={"3.2rem"}
            records={dataEl()}
            className={styles.mobileDatePicker_year}
            onScroll={handleScroll}
            value={value}
            ref={event}
            handleChange={handleChange}
            handleScrollStart={() => {
                handleMoveStatusChange(true);
            }}
            handleScrollEnd={() => {
                handleMoveStatusChange(false);
            }}
        />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
