/**
 * @file content
 * @date 2022-03-25
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-25
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import classNames from "../../../../Unit/classNames";
import { useTableContext } from "../../Unit/tableContext";
import styles from "../style.module.scss";
import { TableRowDataProps } from "./type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface TempProps {
    columns?: Array<{
        width?: string;
        dataIndex: string;
        render?: (rowData: TableRowDataProps) => React.ReactNode;
        fixed?: "left" | "right";
        className?: string;
        style?: React.CSSProperties;
        click?: (rowData: TableRowDataProps, rowIndex: number) => void;
    }>;
    /**
     * data list
     */
    dataList?: TableRowDataProps[];
    /**
     * Height of each row
     */
    rowsHeight?: string;
    /**
     * 表格行的类名
     */
    rowClassName?: (record: TableRowDataProps, index: number) => string;
    /**
     * 设置行属性
     */
    onRow?: (record: TableRowDataProps, index: number) => React.OlHTMLAttributes<HTMLUListElement>;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Temp: React.FC<TempProps> = ({
    columns,
    dataList,
    rowsHeight = "7rem",
    rowClassName,
    onRow,
}) => {
    const { fixed } = useTableContext();

    if (!columns) return <></>;

    let left = 0;
    let right = columns.length - 1;
    for (let i = 0; i < columns.length; i++) {
        const item = columns[i];
        if (item.fixed === "left" && left < i) {
            left = i;
        } else if (item.fixed === "right" && right > i) {
            right = i;
        }
    }
    /**
     * 遍历行
     */
    return (
        <>
            {(dataList ?? []).map((data, index) => {
                const rowClassname = rowClassName?.(data, index);
                const handler = onRow?.(data, index);
                return (
                    <ul
                        key={`tableRow_${index}}`}
                        {...handler}
                        className={classNames(
                            styles.tableBody_rowItem,
                            rowClassname,
                            handler?.className,
                        )}
                        style={{
                            ...handler?.style,
                            height: rowsHeight,
                        }}
                    >
                        {/*  遍历列 */}
                        {columns.map((item, n) => {
                            /**
                             * 列的 值
                             */
                            let value: React.ReactNode = "";
                            if (item.render) {
                                value = item.render(data);
                            } else if (item.dataIndex in data) {
                                const keyVal = item.dataIndex;
                                value = data[keyVal]?.toString
                                    ? data[keyVal]?.toString()
                                    : undefined;
                            }
                            /**
                             * 列 的class
                             */
                            const itemClass = [styles.tableBody_col];

                            item.fixed && itemClass.push(styles.tableBody_sticky);
                            const fixedClass = fixed?.[n]?.className;

                            if (fixedClass) {
                                itemClass.push(fixedClass);
                            }

                            /**
                             * 列 的style
                             */
                            let itemStyle: React.CSSProperties = {};

                            if (item.style) {
                                itemStyle = Object.assign({}, itemStyle, item.style);
                            }

                            const fixedData = fixed?.[n];
                            if (item.fixed && fixedData) {
                                itemStyle = Object.assign({}, itemStyle, {
                                    [item.fixed]: `${fixedData.value}px`,
                                });
                                fixedData.className && itemClass.push(fixedData.className);
                            }

                            return (
                                <li
                                    key={`tableCol_${item.dataIndex}__${index}-${n}`}
                                    className={
                                        itemClass.join(" ") +
                                        (item.className ? ` ${item.className}` : "")
                                    }
                                    style={itemStyle}
                                    onClick={() => {
                                        item.click?.(data, index);
                                    }}
                                >
                                    <div
                                        className={styles.tableBody_colContainer}
                                        style={item.width ? { width: item.width } : {}}
                                    >
                                        {value}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                );
            })}
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
