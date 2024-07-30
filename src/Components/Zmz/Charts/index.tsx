/**
 * @file
 * @date 2022-07-05
 * @author
 * @lastModify  2022-07-05
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    ArcElement,
    BarController,
    BarElement,
    BubbleController,
    CategoryScale,
    ChartConfigurationCustomTypesPerDataset,
    Chart as ChartJS,
    ChartOptions,
    ChartType,
    DoughnutController,
    Filler,
    InteractionItem,
    Legend,
    LineController,
    LineElement,
    LinearScale,
    PieController,
    PointElement,
    PolarAreaController,
    RadarController,
    RadialLinearScale,
    ScatterController,
    Tooltip,
} from "chart.js";
import { MouseEvent, forwardRef, useLayoutEffect, useRef, useState } from "react";
import {
    Chart,
    ChartProps,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
} from "react-chartjs-2";
import classNames from "../../../Unit/classNames";
import { PartialByKeys } from "../../../Unit/utils";
import { useLimitLabels } from "./Hooks/useLimitLabels";
import { ArbitraryLineOptions, arbitraryLine } from "./Unit/Plugins/arbitraryLine";
import styles from "./style.module.scss";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export type CustomConfig = ChartConfigurationCustomTypesPerDataset & { type: ChartType };

export type ExtendOption = ChartOptions & {
    plugins?: {
        arbitraryLine?: ArbitraryLineOptions;
    };
};
/**
 * more detail see
 * - https://www.chartjs.org/docs/latest/
 * - https://react-chartjs-2.js.org/
 */
export type ChartsProps = PartialByKeys<ChartProps, "data"> & {
    /**
     * der
     * 图表标签列表
     * charts label list
     * - more detail see https://www.chartjs.org/docs/latest/general/data-structures.html
     */
    labelData: unknown[];
    /**
     * 图表数据列表
     * charts data list
     * - more detail see https://www.chartjs.org/docs/latest/general/data-structures.html
     */
    dataSets: ChartProps["data"]["datasets"];
    /**
     * Get dataset from mouse click event
     * 从鼠标点击事件获取数据集
     */
    onGetDataset?: (dataset: InteractionItem[]) => void;
    /**
     * Get single dataset element from mouse click event
     * 从鼠标单击事件获取单个数据集元素
     */
    onGetElement?: (element: InteractionItem[]) => void;
    /**
     * Get all dataset elements from mouse click event
     * 从鼠标单击事件获取所有数据集元素
     */
    onGetElements?: (elements: InteractionItem[]) => void;
    /**
     * 参数
     */
    options?: ExtendOption;
    /**
     * 一次最多展示多少条数据
     * 仅在type 为bar、bubble、line、scatter时生效
     */
    maxLimit?: number;
};

export { ChartJS };

ChartJS.register(
    LineController,
    BarController,
    RadarController,
    DoughnutController,
    PolarAreaController,
    BubbleController,
    PieController,
    ScatterController,
    LinearScale,
    CategoryScale,
    RadialLinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    arbitraryLine,
);

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Charts = forwardRef<ChartJS | undefined, ChartsProps>(
    (
        {
            type,
            labelData,
            dataSets,
            onGetDataset,
            onGetElement,
            onGetElements,
            className,
            style,
            width,
            height,
            options,
            plugins,
            maxLimit,
            data,
            ...props
        },
        ref,
    ) => {
        Charts.displayName = "Charts";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const chartRef = useRef<ChartJS | null>(null);

        const [dataValue, dataValueRef, setCount] = useLimitLabels(
            chartRef,
            data,
            labelData,
            dataSets,
            type,
            maxLimit,
        );

        /**
         * chartjs的options
         */
        const [chartOptions, setChartOptions] = useState(options);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /**
         * 初始话字体
         */
        useLayoutEffect(() => {
            ChartJS.defaults.font.family = `Roboto, alipuhui, -apple-system, BlinkMacSystemFont, alipuhui, Helvetica,Arial, Calibri, Segoe UI, Ping Fang SC, Microsoft Yahei`;
        }, []);

        /**
         * x轴
         * y轴
         * 文本溢出变点
         */
        useLayoutEffect(() => {
            /**
             * 填充文字
             * 使文字左对齐
             */
            const fillText = (ctx: CanvasRenderingContext2D, text: string, width: number) => {
                let isBreak = false; //是否终止

                const arr = [...text];

                while (isBreak === false) {
                    const textWidth = ctx.measureText(arr.join("")).width;

                    if (textWidth < width - 5) {
                        arr.push(" ");
                    } else {
                        isBreak = true;
                    }
                }

                return arr.join("");
            };

            /**
             * 将文字变成我想要的宽度
             */
            const toWidth = (ctx: CanvasRenderingContext2D, text: string, width: number) => {
                let isBreak = false; //是否终止

                const arr = [...text];

                let remaining = "";

                while (isBreak === false && arr.length) {
                    const textWidth = ctx.measureText(arr.join("")).width;

                    if (textWidth > width) {
                        remaining += arr.pop();
                    } else {
                        isBreak = true;
                    }
                }

                return {
                    displayed: arr.join(""),
                    remaining,
                };
            };

            /**
             * 限制的文字最大宽度
             */
            const maxWidth = 50;

            /**
             * 限制x轴的文字宽度
             */
            const limitY = () => {
                if (options?.scales?.y?.ticks?.callback) {
                    return options;
                }

                const customOptions: typeof options = {
                    ...options,
                    scales: {
                        ...options?.scales,
                        y: {
                            ...options?.scales?.y,
                            ticks: {
                                ...options?.scales?.y?.ticks,
                                callback(this, _, index) {
                                    const text = chartRef.current?.data?.labels?.[index];

                                    if (typeof text === "string") {
                                        const textData = toWidth(this.ctx, text, maxWidth);

                                        if (textData.remaining.length > 1) {
                                            const subTextData = toWidth(
                                                this.ctx,
                                                textData.remaining,
                                                maxWidth,
                                            ); //获取第二行的文本溢出情况

                                            if (subTextData.remaining) {
                                                //溢出

                                                return [
                                                    textData.displayed,
                                                    fillText(
                                                        this.ctx,
                                                        `${
                                                            toWidth(
                                                                this.ctx,
                                                                subTextData.displayed,
                                                                maxWidth - 15,
                                                            ).displayed
                                                        }...`,
                                                        maxWidth,
                                                    ),
                                                ];
                                            }

                                            // 没有溢出
                                            return [
                                                textData.displayed,
                                                fillText(this.ctx, subTextData.displayed, maxWidth),
                                            ];
                                        }
                                        //第一行就没有溢出
                                        return textData.displayed + textData.remaining;
                                    }

                                    return text as string;
                                },
                            },
                        },
                    },
                };
                return customOptions;
            };

            /**
             * 限制x轴的文字
             * @returns
             */
            const limitX = () => {
                if (options?.scales?.x?.ticks?.callback) {
                    return options;
                }

                const customOptions: typeof options = {
                    ...options,
                    scales: {
                        ...options?.scales,
                        x: {
                            ...options?.scales?.x,
                            ticks: {
                                ...options?.scales?.x?.ticks,

                                callback(this, _, index) {
                                    const text = chartRef.current?.data?.labels?.[index];

                                    if (typeof text === "string") {
                                        const textData = toWidth(this.ctx, text, 30);

                                        if (textData.remaining.length > 1) {
                                            return `${textData.displayed}...`;
                                        }
                                        return textData.displayed + textData.remaining;
                                    }

                                    return text as string;
                                },
                            },
                        },
                    },
                };
                return customOptions;
            };

            /**
             * 初始化参数
             */
            const init = (opt: typeof options = {}) => {
                if (!chartRef.current) {
                    return;
                }

                setChartOptions({
                    ...opt,
                    scales: {
                        ...opt.scales,
                        x: {
                            ...opt.scales?.x,
                            display: opt.scales?.x?.display ?? "auto",
                        },
                        y: {
                            ...opt.scales?.y,
                            display: opt.scales?.y?.display ?? "auto",
                        },
                    },
                    plugins: {
                        ...opt.plugins,
                        legend: {
                            ...opt.plugins?.legend,
                            maxWidth: opt.plugins?.legend?.maxWidth
                                ? opt.plugins.legend.maxWidth
                                : 100,
                            maxHeight: opt.plugins?.legend?.maxHeight
                                ? opt.plugins.legend.maxHeight
                                : 100,
                        },
                    },
                });
            };

            /**
             * 主体函数
             */
            const mainFn = () => {
                if (!type) {
                    init(options);
                    return;
                }

                if (["polarArea", "radar", "doughnut", "pie"].includes(type)) {
                    init(options);

                    return;
                }

                if (options?.indexAxis === "y") {
                    init(limitY());
                    return;
                }
                init(limitX());
            };
            mainFn();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dataValue, type, options]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const printDatasetAtEvent = (dataset: InteractionItem[]) => {
            if (!dataset.length) return;
            onGetDataset?.(dataset);
        };

        const printElementAtEvent = (element: InteractionItem[]) => {
            if (!element.length) return;
            onGetElement?.(element);
        };

        const printElementsAtEvent = (elements: InteractionItem[]) => {
            if (!elements.length) return;
            onGetElements?.(elements);
        };

        const handleClick = (event: MouseEvent<HTMLCanvasElement>) => {
            const { current: chart } = chartRef;

            if (!chart) {
                return;
            }

            printDatasetAtEvent(getDatasetAtEvent(chart, event));
            printElementAtEvent(getElementAtEvent(chart, event));
            printElementsAtEvent(getElementsAtEvent(chart, event));
        };
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={classNames(styles.charts_container, className)}
                style={{ ...style, width, height }}
            >
                <Chart
                    {...props}
                    ref={(el) => {
                        setCount((pre) => ++pre);
                        if (typeof ref === "function") {
                            ref(el);
                        } else if (ref) {
                            ref.current = el;
                        }
                        chartRef.current = el ?? null;
                    }}
                    type={type}
                    onClick={handleClick}
                    options={chartOptions}
                    data={dataValueRef.current}
                    plugins={[arbitraryLine, ...(plugins ?? [])]}
                />
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
