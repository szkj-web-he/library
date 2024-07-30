/**
 * @file get column props
 * @date 2022-03-23
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-23
 */

import { isValidElement, ReactNode } from "react";
import { Column } from "../../..";
import { readChildElement } from "../../../Unit/readChild";
import { ColumnProps } from "../Column";
import { TableRowDataProps } from "../Main/Unit/type";

export interface BodyColsProps {
    /**
     * 列宽
     */
    width?: string;
    dataIndex: string;
    render?: (rowData: TableRowDataProps) => React.ReactNode;
    fixed?: "left" | "right";
    className?: string;
    style?: React.CSSProperties;
    click?: (rowData: TableRowDataProps, rowIndex: number) => void;
}

export interface HeaderColProps {
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
}

/**
 *
 * @param children
 * @returns
 */

export const getColumnProps = (
    children: ReactNode,
): { bodyCols: Array<BodyColsProps>; headerCols: Array<HeaderColProps> } => {
    const columnName = Column.displayName || Column.name;

    const bodyCols: Array<BodyColsProps> = [];
    const headerCols: Array<HeaderColProps> = [];

    readChildElement(children).forEach((item) => {
        if (isValidElement(item.element) && columnName === item.displayName) {
            const {
                title,
                width,
                dataIndex,
                render,
                fixed,
                isDrag,
                isFixedDrag,
                defaultSort,
                className,
                style,
                callback,
            } = { ...item.element.props } as ColumnProps;
            bodyCols.push({
                width,
                dataIndex,
                render,
                fixed,
                className,
                style,
                click: callback?.click,
            });

            headerCols.push({
                width,
                fixed,
                className,
                style,
                title,
                isDrag,
                isFixedDrag,
                defaultSort,
                sort: callback?.sort,
                drag: callback?.drag,
            });
        }
    });

    return {
        bodyCols,
        headerCols,
    };
};
