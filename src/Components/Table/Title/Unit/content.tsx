/**
 * @file Temp
 * @date 2022-03-26
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, HTMLAttributes, useEffect, useRef, useState } from "react";
import { getScrollValue, Icon } from "../../../..";
import classNames from "../../../../Unit/classNames";
import { stopSelect } from "../../../DataInput/Slider/Unit/noSelected";
import { HeaderColProps } from "../../Unit/getColumnProps";
import { useTableContext } from "../../Unit/tableContext";
import styles from "../style.module.scss";
import { getBoundaries, getLeft } from "./getLeft";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TitleTempProps {
    /**
     * Columns of props
     */
    columns?: Array<{
        width?: string;
        fixed?: "left" | "right";
        className?: string;
        style?: React.CSSProperties;
        title: React.ReactNode;
        isDrag?: boolean;
        isFixedDrag?: boolean;
        defaultSort?: "asc" | "des" | "default";
        sort?: (sort: "asc" | "des") => void;
        drag?: (res: string[]) => void;
    }>;

    /**
     * The event occurs when the end of the drag and drop produces a change in order
     */
    handleDragChange?: (oldIndex: number, newIndex: number) => void;
    /**
     *
     */
    setReady: (status: boolean) => void;
    /**
     * 设置头部行属性
     */
    onHeaderRow?: (columns: unknown, index: number) => unknown;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const TitleTemp = forwardRef<HTMLUListElement, TitleTempProps>(
    ({ columns, handleDragChange, setReady, onHeaderRow }, ref) => {
        TitleTemp.displayName = "TitleTemp";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const { fixed } = useTableContext();

        const selectedFn = useRef<typeof document.onselectstart>(null);

        const point = useRef({
            offsetX: 0,
            index: -1,
        });

        const [selectAttr, setSelectAttr] = useState<{
            text: string;
            width: number;
            height: number;
        }>();

        const [transformX, setTransformX] = useState(0);

        const ulRef = useRef<HTMLUListElement | null>(null);

        const boundaries = useRef<
            Array<{
                left: number;
                right: number;
                fixed: boolean;
            }>
        >();

        const replaceIndexRef = useRef<number>();

        const [replaceIndex, setReplaceIndex] = useState(replaceIndexRef.current);
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useEffect(() => {
            setReady(true);
            return () => {
                setReady(false);
            };
        }, [setReady, columns]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const dragMouseMove = (e: MouseEvent) => {
            const _ul = ulRef.current;
            if (!_ul) {
                return;
            }

            const value = getLeft(_ul, {
                x: e.pageX,
                offsetX: point.current.offsetX,
            });

            setTransformX(value);
            if (!boundaries.current) {
                return;
            }
            let n = -1;

            const pointVal = value + point.current.offsetX;
            const boundaryList = boundaries.current;
            if (pointVal < 0) {
                if (boundaryList[0].fixed) {
                    return;
                }
                n = 0;
            } else if (pointVal > boundaries.current[boundaries.current.length - 1].right) {
                if (boundaryList[boundaries.current.length - 1].fixed) {
                    return;
                }
                n = boundaries.current.length - 1;
            } else {
                n = boundaries.current.findIndex(
                    (item) => pointVal >= item.left && pointVal <= item.right && !item.fixed,
                );
            }
            if (n >= 0) {
                replaceIndexRef.current = n;

                setReplaceIndex(replaceIndexRef.current);
            }
        };

        const dragMouseUp = () => {
            document.removeEventListener("mousemove", dragMouseMove);
            document.removeEventListener("mouseup", dragMouseUp);
            document.onselectstart = selectedFn.current;

            if (
                handleDragChange &&
                point.current.index >= 0 &&
                typeof replaceIndexRef.current === "number" &&
                replaceIndexRef.current >= 0 &&
                point.current.index !== replaceIndexRef.current
            ) {
                handleDragChange?.(point.current.index, replaceIndexRef.current);
            }

            point.current = {
                offsetX: 0,
                index: -1,
            };

            setSelectAttr(undefined);
            setTransformX(0);

            boundaries.current = undefined;

            replaceIndexRef.current = undefined;

            setReplaceIndex(replaceIndexRef.current);
        };

        const dragMouseDown = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
            const _ul = ulRef.current;
            if (!_ul) {
                return;
            }

            stopSelect(e, selectedFn, true);

            const el = e.currentTarget;

            const scrollData = getScrollValue();

            point.current = {
                offsetX: e.pageX - (el.getBoundingClientRect().left + scrollData.x),
                index,
            };

            setSelectAttr({
                text: el.innerText,
                width: el.offsetWidth,
                height: el.offsetHeight,
            });

            setTransformX(
                getLeft(_ul, {
                    x: e.pageX,
                    offsetX: point.current.offsetX,
                }),
            );

            boundaries.current = getBoundaries(_ul);

            document.addEventListener("mousemove", dragMouseMove);
            document.addEventListener("mouseup", dragMouseUp);
        };

        const handleColClick = (col: HeaderColProps) => {
            const val = col.defaultSort === "asc" ? "des" : "asc";
            col?.sort?.(val);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        return (
            <ul
                className={styles.tableHeader_list}
                ref={(el) => {
                    ulRef.current = el;
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                    }
                }}
            >
                <div
                    className={styles.tableHeader_dragContext}
                    style={{
                        width: `${selectAttr?.width ?? 0}px`,
                        height: `${selectAttr?.height ?? 0}px`,
                        transform: `translateX(${transformX}px)`,
                    }}
                >
                    <div className={styles.tableHeader_dragContext_text}>{selectAttr?.text}</div>
                </div>
                {(columns ?? []).map((item, index) => {
                    /**
                     * 每个 header列的class
                     */
                    const itemClass = [styles.tableHeader_item];
                    item.fixed && itemClass.push(styles[`tableHeader_sticky`]);
                    item.isDrag && itemClass.push(styles.tableHeader_drag);
                    const fixedClass = fixed?.[index]?.className;

                    const handler = onHeaderRow?.(item, index) as HTMLAttributes<HTMLLIElement>;

                    if (fixedClass) {
                        itemClass.push(fixedClass);
                    }
                    replaceIndex &&
                        index === replaceIndex &&
                        itemClass.push(styles.tableHeader_active);

                    /**
                     * 每个 header列的style
                     */
                    const liStyle: React.CSSProperties = { ...item.style, ...handler?.style };
                    const fixedData = fixed?.[index];
                    if (item.fixed && fixedData) {
                        liStyle[item.fixed] = `${fixedData.value}px`;
                        fixedData.className && itemClass.concat(fixedData.className);
                    }

                    return (
                        <li
                            key={`table-header_${index}${item.fixed ? `${item.fixed} fixed` : ""}`}
                            {...handler}
                            className={classNames(itemClass, item.className, handler?.className)}
                            {...(item.isFixedDrag
                                ? {
                                      "data-fixed": item.isFixedDrag,
                                  }
                                : {})}
                            style={liStyle}
                            onMouseDown={(e) => {
                                if (!item.isDrag) {
                                    return;
                                }
                                dragMouseDown(e, index);
                            }}
                        >
                            {item.isDrag && (
                                <Icon type="move" className={styles.tableHeader_moveIcon} />
                            )}
                            <div
                                className={styles.tableHeader_itemContainer}
                                style={item.width ? { width: item.width } : {}}
                            >
                                <div className={styles.tableHeader_name}>{item.title}</div>
                                {item.defaultSort && (
                                    <div
                                        className={styles.tableHeader_sortContainer}
                                        onMouseDown={(e) => {
                                            e.stopPropagation();
                                        }}
                                        onClick={() => {
                                            handleColClick(item);
                                        }}
                                    >
                                        <Icon
                                            type="dropdown"
                                            className={classNames(styles.tableHeader_upIcon, {
                                                [styles.tableHeader_upIcon__active]:
                                                    item.defaultSort === "asc",
                                            })}
                                        />
                                        <Icon
                                            type="dropdown"
                                            className={classNames(styles.tableHeader_downIcon, {
                                                [styles.tableHeader_downIcon__active]:
                                                    item.defaultSort === "des",
                                            })}
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
TitleTemp.displayName = "TitleTemp";
export default TitleTemp;
