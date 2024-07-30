/**
 * @file table component
 * @date 2021-08-23
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    forwardRef,
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
import { changeArrData } from "../Unit/changeArrData";
import { BodyColsProps, getColumnProps, HeaderColProps } from "../Unit/getColumnProps";
import { FixedProps } from "../Unit/getStickyList";
import { TableContextProvider } from "../Unit/tableContext";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ColumnTable = forwardRef<HTMLDivElement, TableProps>(
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
            onHeaderRow,
            onRow,
            ...props
        },
        ref,
    ) => {
        ColumnTable.displayName = "ColumnTable";
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
            id.current = createHash("ColumnTable");
        }, []);

        useLayoutEffect(() => {
            const columnProps = getColumnProps(children);

            if (columnProps.bodyCols.length || columnProps.headerCols) {
                setBodyCols(columnProps.bodyCols);
                setHeaderCols(columnProps.headerCols);
            }
        }, [children]);

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

        const handleDragChange = useCallback(
            (oldIndex: number, newIndex: number) => {
                setBodyCols(changeArrData(bodyCols, oldIndex, newIndex));
                setHeaderCols(changeArrData(headerCols, oldIndex, newIndex));
            },
            [bodyCols, headerCols],
        );

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

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
                }}
            >
                <div
                    className={className}
                    style={Object.assign({}, style, width && { width }, height && { height })}
                    ref={ref}
                    {...props}
                >
                    <TableHeader
                        height={titleHeight}
                        columns={headerCols}
                        defaultScrollLeft={scrollPosition?.x ?? 0}
                        border={border}
                        handleDragChange={handleDragChange}
                        onHeaderRow={onHeaderRow}
                    />
                    <TableBody
                        height={bodyHeightVal}
                        border={border}
                        dataList={dataList}
                        nullElement={nullElement}
                        columns={bodyCols}
                        rowsHeight={rowsHeight}
                        rowClassName={rowClassName}
                        onRow={onRow}
                        loading={loading}
                        defaultScrollTop={scrollPosition?.y ?? 0}
                        loadingElement={loadingElement}
                        defaultScrollLeft={scrollPosition?.x ?? 0}
                    />
                </div>
            </TableContextProvider.Provider>
        );
    },
);

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
ColumnTable.displayName = "ColumnTable";
