/**
 * @file 有关表格的type
 * @date 2023-03-25
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-25
 */

/**
 * 某个数据的键值(一般类型)
 */
type ItemCommonType = string | number | null | undefined | boolean;
/**
 * 某个数据的键值(复杂类型)
 */
export type ItemComplicatedData = Record<string, ItemCommonType>;

/**
 * 某一行的数据
 */
export type TableRowDataProps = Record<
    string,
    ItemCommonType | ItemComplicatedData | Array<ItemComplicatedData>
>;

/**
 * 列的参数
 */

export interface TableColumn {
    /**
     * 列宽
     */
    width?: string;
    /**
     * 行数据的键
     */
    dataIndex: string;
    /**
     * 重写item的回调
     * @param rowData 行的数据
     * @returns reactNode
     */
    render?: (rowData: TableRowDataProps) => React.ReactNode;
    /**
     * 是否固定
     * 固定到左边还是右边
     */
    fixed?: "left" | "right";
    /**
     * 列的className
     */
    className?: string;
    /**
     * 列的style
     */
    style?: React.CSSProperties;
    /**
     * 列的点击回调
     * @param rowData 行的数据
     * @param rowIndex 行的下标
     * @returns
     */
    click?: (rowData: TableRowDataProps, rowIndex: number) => void;
    /**
     * 列 头
     */
    title: React.ReactNode;
    /**
     * 当前列是否可以套拽
     */
    isDrag?: boolean;
    /**
     *
     */
    isFixedDrag?: boolean;
    /**
     * 当前列的排序方式
     * 默认排序方式
     */
    defaultSort?: "asc" | "des" | "default";
    /**
     * 排序方式改变的回调函数
     */
    sort?: (sort: "asc" | "des") => void;
    /**
     * 排序方式改变的回调函数
     */
    drag?: (res: string[]) => void;
}
