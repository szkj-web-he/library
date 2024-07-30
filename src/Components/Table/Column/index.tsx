/**
 * @file
 * @date 2021-09-29
 * @author xuejie.he
 * @lastModify xuejie.he 2021-09-29
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { TableRowDataProps } from "../Main/Unit/type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface ColumnProps {
    /**
     * title of this column
     */
    title: React.ReactNode;
    /**
     * width of this column
     */
    width?: string;
    /**
     * Data subscript  of this column
     */
    dataIndex: string;
    /**
     * render of column
     */
    render?: (rowData: TableRowDataProps) => React.ReactNode;
    /**
     * Is it fixed
     */
    fixed?: "left" | "right";
    /**
     * Can be dragged
     */
    isDrag?: boolean;
    /**
     * Is it acceptable to change seats?
     */
    isFixedDrag?: boolean;
    /**
     * Default sort state
     */
    defaultSort?: "asc" | "des" | "default";
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;

    /**
     * Event callback
     * click => row data click fn
     */
    callback?: {
        click?: (rowData: TableRowDataProps, rowIndex: number) => void;
        sort?: (sort: "asc" | "des") => void;
        drag?: (res: string[]) => void;
    };
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Column: React.FC<ColumnProps> = () => {
    Column.displayName = "Column";
    return <></>;
};
Column.displayName = "Column";

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
