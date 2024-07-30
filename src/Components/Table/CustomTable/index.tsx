/**
 * @file CustomTable
 * @date 2022-03-30
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-30
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    forwardRef,
    isValidElement,
    useCallback,
    useInsertionEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { createHash } from "../../..";
import { TableBody } from "../Main";
import { TableProps } from "../Table";
import { TableHeader } from "../Title";
import { BodyColsProps, HeaderColProps } from "../Unit/getColumnProps";
import { FixedProps } from "../Unit/getStickyList";
import { TableContextProvider } from "../Unit/tableContext";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const CustomTable = forwardRef<HTMLDivElement, TableProps>(
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
            bodyHeight,
            titleHeight = "4.6rem",
            rowClassName,
            onRow,
            onHeaderRow,
            ...props
        },
        ref,
    ) => {
        CustomTable.displayName = "CustomTable";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const [bodyCols, setBodyCols] = useState<Array<BodyColsProps>>([]);

        const [headerCols, setHeaderCols] = useState<Array<HeaderColProps>>([]);

        const [fixed, setFixed] = useState<Array<FixedProps | null>>();

        const fixedRef = useRef<Array<FixedProps | null>>();

        const whoScroll = useRef<null | "header" | "body">(null);

        const id = useRef<string>();
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        useInsertionEffect(() => {
            id.current = createHash("customTable");
        }, []);

        useLayoutEffect(() => {
            const bodyCols: Array<BodyColsProps> = [];
            const headerCols: Array<HeaderColProps> = [];

            if (columns?.length) {
                for (let i = 0; i < columns.length; i++) {
                    const item = columns[i];
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
                    } = item;
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
                    setBodyCols(bodyCols);
                    setHeaderCols(headerCols);
                }
            }
        }, [columns]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const handleFixedChange = useCallback((res: Array<FixedProps | null>) => {
            setFixed([...res]);
        }, []);

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        const arr = Array.isArray(children) ? [...children] : [children];

        const tableBodyName = TableBody.displayName || TableBody.name;
        const TableHeaderName = TableHeader.displayName || TableHeader.name;

        const headerEl = arr.find((item: React.ReactNode) => {
            if (isValidElement(item)) {
                const reactEl = item.type as React.FC;
                const name = reactEl.displayName ?? reactEl.name;
                return TableHeaderName === name;
            } else {
                return false;
            }
        });

        const bodyEl = arr.find((item: React.ReactNode) => {
            if (isValidElement(item)) {
                const reactEl = item.type as React.FC;
                const name = reactEl.displayName ?? reactEl.name;
                return tableBodyName === name;
            } else {
                return false;
            }
        });

        let bodyHeightVal = "";
        if (bodyHeight) {
            bodyHeightVal = bodyHeight;
        } else if (titleHeight) {
            bodyHeightVal = `calc(100% - ${titleHeight})`;
        }

        return (
            <TableContextProvider.Provider
                value={{
                    fixed,
                    setFixed: handleFixedChange,
                    whoScroll,
                    fixedRef,
                    id: id.current ?? "",

                    //以下属性 仅在custom的状态下生效
                    dataList,
                    bodyCols,
                    headerCols,
                    setBodyCols,
                    setHeaderCols,
                    border,
                    nullElement,
                    loading,
                    loadingElement,
                    rowsHeight,
                    scrollPosition,
                    headerHeight: titleHeight,
                    custom: true,
                    bodyHeight: bodyHeightVal,
                    rowClassName,
                    onRow,
                    onHeaderRow,
                }}
            >
                <div
                    className={className}
                    style={Object.assign({}, style, width && { width }, height && { height })}
                    ref={ref}
                    {...props}
                >
                    {headerEl}
                    {bodyEl}
                </div>
            </TableContextProvider.Provider>
        );
    },
);

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
CustomTable.displayName = "CustomTable";
