/**
 * @file TableBody
 * @date 2022-03-25
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-25
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { Icon, LoadingComponent, ScrollComponent } from "../../..";
import { findScrollContainer } from "../Unit/findScroll";
import { BodyColsProps } from "../Unit/getColumnProps";
import { ScrollProps } from "../Unit/getScroll";
import { useTableContext } from "../Unit/tableContext";
import styles from "./style.module.scss";
import TableContent from "./Unit/content";
import { TableRowDataProps } from "./Unit/type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface TableBodyProps extends React.DOMAttributes<HTMLDivElement> {
    /**
     * Columns of props
     */
    columns?: Array<BodyColsProps>;
    /**
     * data list
     */
    dataList?: Array<TableRowDataProps>;
    /**
     * border of this component
     */
    border?: boolean;
    /**
     * Content displayed when there is no data
     */
    nullElement?: React.ReactElement;
    /**
     * Is loading
     */
    loading?: boolean;
    /**
     * What is displayed while it is loading
     */
    loadingElement?: React.ReactNode;
    /**
     * width of this component
     */
    width?: string;
    /**
     * width of this component
     */
    height?: string;
    /**
     * handler scroll bar change
     */
    handleBarChange?: (res: {
        left: number;
        top: number;
        scrollHeight: number;
        scrollWidth: number;
        offsetHeight: number;
        offsetWidth: number;
        clientHeight: number;
        clientWidth: number;
    }) => void;
    /**
     * default scrollTop
     */
    defaultScrollTop?: number;
    /**
     * default scrollLeft
     */
    defaultScrollLeft?: number;
    /**
     * className of scroll component wrap
     */
    className?: string;
    /**
     * style of scroll component body
     */
    style?: React.CSSProperties;
    /**
     * className of scroll component body
     */
    bodyClassName?: string;
    /**
     * hidden scrollbar
     */
    hidden?: boolean | { x: boolean; y: boolean };
    /**
     * Is the default position for smooth scrollbars
     */
    isSmooth?: boolean;
    /**
     * Height of each row
     */
    rowsHeight?: string;
    /**
     * 表格行的类名
     */
    rowClassName?: (rowData: TableRowDataProps, index: number) => string;
    /**
     * 设置行属性
     */
    onRow?: (rowData: TableRowDataProps, index: number) => React.OlHTMLAttributes<HTMLUListElement>;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const TableBody = forwardRef<HTMLDivElement, TableBodyProps>(
    (
        {
            columns,
            dataList,
            border,
            nullElement,
            loading,
            loadingElement,
            className,
            rowClassName,
            handleBarChange,
            defaultScrollLeft,
            defaultScrollTop,
            rowsHeight,
            height,
            onMouseDown,
            onMouseEnter,
            onMouseLeave,
            onWheel,
            onRow,
            ...props
        },
        ref,
    ) => {
        TableBody.displayName = "TableBody";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const { whoScroll, id, custom, setBodyCols, scrollPosition, bodyHeight, ...contextProps } =
            useTableContext();

        const scrollLeft = useRef(0);

        const hover = useRef(false);
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useEffect(() => {
            const value = defaultScrollLeft ?? 0;
            scrollLeft.current = value;
            findScrollContainer(`tableHeader-${id}`, value);
        }, [defaultScrollLeft, id]);

        useLayoutEffect(() => {
            if (columns && setBodyCols) {
                setBodyCols(columns);
            }
        }, [columns, setBodyCols]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        const handleScroll = (res: ScrollProps) => {
            handleBarChange?.(res);
            scrollLeft.current = res.left;
            if (whoScroll.current !== "body") {
                return;
            }

            findScrollContainer(`tableHeader-${id}`, res.left);
        };

        const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
            whoScroll.current = "body";
            onMouseDown?.(e);
        };

        const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
            hover.current = true;
            onMouseEnter?.(e);
        };

        const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
            if (hover.current) {
                whoScroll.current = "body";
            }
            onWheel?.(e);
        };

        const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
            hover.current = false;
            onMouseLeave?.(e);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        /**
         * 展示状态
         * 0 => null
         * 1 => loading
         * 2 => 所有数据列表
         */
        let status = 0;

        if (loading ?? contextProps.loading) {
            status = 1;
        } else if ((dataList ?? contextProps.dataList)?.length) {
            status = 2;
        }

        const classNameList = [styles.tableBody_wrapper];
        (border ?? contextProps.border) && classNameList.push(styles.tableBody_border);

        return (
            <ScrollComponent
                ref={ref}
                handleBarChange={handleScroll}
                stopPropagation={false}
                className={classNameList.join(" ") + (className ? ` ${className}` : "")}
                data-i={`tableBody-${id}`}
                height={height ?? bodyHeight}
                {...props}
                defaultScrollLeft={defaultScrollLeft ?? scrollPosition?.x}
                defaultScrollTop={defaultScrollTop ?? scrollPosition?.y}
                onMouseEnter={handleMouseEnter}
                onWheel={handleMouseWheel}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
            >
                <div
                    className={`${styles.tableBody_loading}`}
                    style={status !== 1 ? { display: "none" } : {}}
                >
                    {loadingElement ?? contextProps.loadingElement ?? (
                        <div className={styles.tableBody_defaultLoading}>
                            <LoadingComponent
                                type="roller"
                                color="#828282"
                                height="6.4rem"
                                width="6.4rem"
                                className={styles.tableBody_loadingIcon}
                            />
                        </div>
                    )}
                </div>
                <div
                    className={styles.tableBody_null}
                    style={status !== 0 ? { display: "none" } : {}}
                >
                    {nullElement ?? contextProps.nullElement ?? (
                        <div className={styles.tableBody_defaultNull}>
                            <Icon
                                type="warningTriangle"
                                className={styles.tableComponent_nullIcon}
                            />
                            There is no data available!
                        </div>
                    )}
                </div>
                <div
                    className={styles.tableBody_container}
                    style={status !== 2 ? { display: "none" } : {}}
                >
                    <TableContent
                        columns={custom ? contextProps.bodyCols : columns}
                        dataList={dataList ?? contextProps.dataList}
                        rowsHeight={rowsHeight ?? contextProps.rowsHeight}
                        rowClassName={rowClassName ?? contextProps.rowClassName}
                        onRow={onRow ?? contextProps.onRow}
                    />
                </div>
            </ScrollComponent>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
TableBody.displayName = "TableBody";
