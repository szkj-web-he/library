/**
 * @file tableContext
 * @date 2022-03-23
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-23
 */

import { createContext, useContext } from "react";
import { TableRowDataProps } from "../Main/Unit/type";

import { BodyColsProps, HeaderColProps } from "./getColumnProps";
import { FixedProps } from "./getStickyList";

interface TableContextProps {
    /**
     * 是否固定
     */
    fixed?: Array<FixedProps | null>;
    /**
     *
     */
    setFixed: (res: Array<FixedProps | null>) => void;
    whoScroll: { current: null | "header" | "body" };
    fixedRef: { current: undefined | Array<FixedProps | null> };
    id: string;

    bodyCols?: Array<BodyColsProps>;
    headerCols?: Array<HeaderColProps>;
    border?: boolean;
    nullElement?: React.ReactElement;
    loading?: boolean;
    loadingElement?: React.ReactNode;
    rowsHeight?: string;
    scrollPosition?: {
        x?: number;
        y?: number;
    };
    headerHeight?: string;
    dataList?: Array<TableRowDataProps>;
    setBodyCols?: React.Dispatch<React.SetStateAction<BodyColsProps[]>>;
    setHeaderCols?: React.Dispatch<React.SetStateAction<HeaderColProps[]>>;
    custom?: true;
    bodyHeight?: string;
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

const tableContextData = (): TableContextProps => ({
    setFixed: () => undefined,
    whoScroll: { current: null },
    fixedRef: { current: undefined },
    id: "",
});

export const TableContextProvider = createContext(tableContextData());

export const useTableContext = () => useContext(TableContextProvider);
