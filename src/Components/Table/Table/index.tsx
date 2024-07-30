/**
 * @file table component
 * @date 2021-08-23
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, isValidElement, ReactElement, ReactNode } from "react";
import { TableHeader } from "../Title";
import { TableBody } from "../Main";
import { ColumnProps } from "../Column";
import { ColumnTable } from "../ColumnTable";
import { CustomTable } from "../CustomTable";
import { readChildElement } from "../../../Unit/readChild";
import { TableRowDataProps } from "../Main/Unit/type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 行数据列表
     * 键值对
     * 列通过这些数据进行渲染
     */
    dataList?: TableRowDataProps[];
    /**
     * column list
     */
    columns?: Array<ColumnProps>;
    /**
     * width of this component
     */
    width?: string;
    /**
     * height of this component
     */
    height?: string;
    /**
     * border of this component
     */
    border?: boolean;
    /**
     * Content displayed when there is no data
     */
    nullElement?: ReactElement;
    /**
     * Is loading
     */
    loading?: boolean;
    /**
     * What is displayed while it is loading
     */
    loadingElement?: ReactNode;
    /**
     * children of this component
     */
    children: React.ReactNode;
    /**
     * table title height
     */
    titleHeight?: string;
    /**
     * table content height
     */
    bodyHeight?: string;
    /**
     *  Height of each row
     */
    rowsHeight?: string;
    /**
     * Sets the scroll bar position
     */
    scrollPosition?: {
        x?: number;
        y?: number;
    };
    /**
     * 表格行的类名
     */
    rowClassName?: (record: TableRowDataProps, index: number) => string;
    /**
     * 设置头部行属性
     */
    onHeaderRow?: (columns: unknown, index: number) => unknown;
    /**
     * 设置行属性
     */
    onRow?: (record: TableRowDataProps, index: number) => React.OlHTMLAttributes<HTMLUListElement>;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Table = forwardRef<HTMLDivElement, TableProps>(
    (
        {
            dataList,
            width,
            height,
            className,
            style,
            border = true,
            nullElement,
            loading = false,
            loadingElement,
            children,
            rowsHeight,
            scrollPosition,
            columns,
            titleHeight = "4.6rem",
            ...props
        },
        ref,
    ) => {
        Table.displayName = "Table";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const arr = readChildElement(children);

        const tableBodyName = TableBody.displayName || TableBody.name;
        const TableHeaderName = TableHeader.displayName || TableHeader.name;

        if (
            arr.some((item) => {
                return isValidElement(item.element)
                    ? [tableBodyName, TableHeaderName].includes(item.displayName)
                    : false;
            })
        ) {
            return (
                <CustomTable
                    ref={ref}
                    dataList={dataList}
                    width={width}
                    height={height}
                    className={className}
                    style={style}
                    border={border}
                    nullElement={nullElement}
                    loading={loading}
                    loadingElement={loadingElement}
                    rowsHeight={rowsHeight}
                    scrollPosition={scrollPosition}
                    columns={columns}
                    titleHeight={titleHeight}
                    {...props}
                >
                    {children}
                </CustomTable>
            );
        }

        return (
            <ColumnTable
                ref={ref}
                dataList={dataList}
                width={width}
                height={height}
                className={className}
                style={style}
                border={border}
                nullElement={nullElement}
                loading={loading}
                loadingElement={loadingElement}
                rowsHeight={rowsHeight}
                scrollPosition={scrollPosition}
                columns={columns}
                titleHeight={titleHeight}
                {...props}
            >
                {children}
            </ColumnTable>
        );
    },
);

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Table.displayName = "Table";
