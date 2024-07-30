/**
 * @file TableTitle
 * @date 2022-03-23
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { ScrollComponent } from "../../..";
import { ScrollProps } from "../Unit/getScroll";
import { useTableContext } from "../Unit/tableContext";
import HeaderContent from "./Unit/content";
import styles from "./style.module.scss";
import { getStickyList } from "../Unit/getStickyList";
import { findScrollContainer } from "../Unit/findScroll";
import { HeaderColProps } from "../Unit/getColumnProps";
import { changeArrData } from "../Unit/changeArrData";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface TableTitleProps extends React.DOMAttributes<HTMLDivElement> {
    /**
     * Columns of props
     */
    columns?: Array<HeaderColProps>;
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
    handleScroll?: (res: {
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
     * border of this component
     */
    border?: boolean;
    /**
     * The event occurs when the end of the drag and drop produces a change in order
     */
    handleDragChange?: (oldIndex: number, newIndex: number) => void;
    /**
     * 设置头部行属性
     */
    onHeaderRow?: (columns: unknown, index: number) => unknown;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const TableHeader = forwardRef<HTMLDivElement, TableTitleProps>(
    (
        {
            columns,
            border,
            defaultScrollLeft,
            handleScroll,
            onMouseDown,
            handleDragChange,
            height,
            className,
            onMouseEnter,
            onWheel,
            onMouseLeave,
            onHeaderRow,
            ...props
        },
        ref,
    ) => {
        TableHeader.displayName = "TableHeader";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const timer = useRef<number>();

        const {
            whoScroll,
            fixedRef,
            setFixed,
            id,
            setHeaderCols,
            headerCols,
            setBodyCols,
            bodyCols,
            custom,
            scrollPosition,
            headerHeight,
            ...contextProps
        } = useTableContext();

        const [ready, setReady] = useState(false);

        const ulRef = useRef<HTMLUListElement | null>(null);

        const hover = useRef(false);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useEffect(() => {
            const _ul = ulRef.current;
            if (!_ul) {
                return;
            }

            const arr = getStickyList(_ul);
            if (arr && JSON.stringify(fixedRef.current) !== JSON.stringify(arr)) {
                fixedRef.current = [...arr];
                setFixed([...fixedRef.current]);
            }
        }, [
            fixedRef,
            ready,
            setFixed,
            columns,
            border,
            defaultScrollLeft,
            handleScroll,
            onMouseDown,
            handleDragChange,
            className,
            props,
        ]);

        useEffect(() => {
            const value = defaultScrollLeft ?? 0;

            findScrollContainer(`tableBody-${id}`, value);
        }, [defaultScrollLeft, id]);

        useEffect(
            () => () => {
                timer.current && window.clearTimeout(timer.current);
            },
            [],
        );

        useLayoutEffect(() => {
            if (setHeaderCols && columns) {
                setHeaderCols?.([...columns]);
            }
        }, [columns, setHeaderCols]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const onDrag = (_old: number, _new: number) => {
            if (setHeaderCols && headerCols) {
                setHeaderCols(changeArrData(headerCols, _old, _new));
            }
            if (setBodyCols && bodyCols) {
                setBodyCols(changeArrData(bodyCols, _old, _new));
            }

            handleDragChange && handleDragChange(_old, _new);
        };

        const handleReady = useCallback((status: boolean) => {
            setReady(status);
        }, []);

        const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
            whoScroll.current = "header";
            onMouseDown?.(e);
        };

        const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
            hover.current = true;
            onMouseEnter?.(e);
        };

        const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
            if (hover.current) {
                whoScroll.current = "header";
            }
            onWheel?.(e);
        };

        const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
            hover.current = false;
            onMouseLeave?.(e);
        };

        const handleScrollChange = (res: ScrollProps) => {
            handleScroll?.(res);
            timer.current && window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => {
                const el = ulRef.current;
                if (el) {
                    const arr = getStickyList(el);
                    if (arr && JSON.stringify(fixedRef.current) !== JSON.stringify(arr)) {
                        fixedRef.current = [...arr];
                        setFixed([...fixedRef.current]);
                    }
                }
            });

            if (whoScroll.current !== "header") {
                return;
            }
            findScrollContainer(`tableBody-${id}`, res.left);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        const classList = [styles.tableHeader_wrapper];

        (border ?? contextProps.border) && classList.push(styles.tableHeader_border);

        return (
            <ScrollComponent
                hidden
                className={classList.join(" ") + (className ? ` ${className}` : "")}
                data-i={`tableHeader-${id}`}
                ref={ref}
                height={height ?? headerHeight}
                onMouseDown={handleMouseDown}
                stopPropagation={false}
                onMouseEnter={handleMouseEnter}
                onWheel={handleMouseWheel}
                onMouseLeave={handleMouseLeave}
                defaultScrollLeft={defaultScrollLeft ?? scrollPosition?.x}
                handleBarChange={handleScrollChange}
                {...props}
            >
                <HeaderContent
                    columns={custom ? headerCols : columns}
                    handleDragChange={onDrag}
                    setReady={handleReady}
                    ref={ulRef}
                    onHeaderRow={onHeaderRow ?? contextProps.onHeaderRow}
                />
            </ScrollComponent>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

TableHeader.displayName = "TableHeader";
