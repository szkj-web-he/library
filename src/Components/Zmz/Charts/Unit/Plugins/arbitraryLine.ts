import { Chart, Plugin } from "chart.js";
import { CustomConfig } from "../..";
import { toFixedNumber } from "../../../../DataDisplay/ColorPicker/Unit/toFixedNumber";

export type position = "max" | "min" | "average";

export type ArbitraryLineOptions = SolidLine | DashLine | boolean;

interface Direction {
    direction?: "horizontal" | "vertical";
}
export interface arbitraryLineInterface extends Direction {
    lineType?: "solid" | "dash";
    lineColor?: string;
    position?: position;
    thickness?: number;
    stacked?: boolean;
    textBoxOptions?: TooltipText;
}

type SolidLine = arbitraryLineInterface & { lineType?: "solid" };

type DashLine = arbitraryLineInterface & { lineType?: "dash"; gap?: number; lineWidth?: number };

interface TooltipText extends Direction {
    value?: () => string;
    align?: "start" | "center" | "end";
    backgroundColor?: string;
    textColor?: string;
    textPadding?: number;
    fontSize?: number;
}

/**
 * 水平线文字
 * @param chart 图标实例
 * @param h 水平线值
 * @param textOption 文字配置项
 */
const handleTooltipText = (chart: Chart, h: number, val: number, textOption: TooltipText) => {
    const {
        value = `${val}`,
        align = "start",
        backgroundColor = "#22a6b3",
        textColor = "#fff",
        textPadding = 10,
        fontSize = 12,
        direction = "horizontal",
    } = textOption;
    const {
        ctx,
        chartArea: { top, left, width, height },
    } = chart;

    let startPos = 0;
    let endPos = 0;
    switch (direction) {
        case "vertical":
            {
                switch (align) {
                    case "start":
                        endPos = top;
                        break;
                    case "end":
                        endPos = top + height;
                        break;
                    case "center":
                    default:
                        endPos = top + height / 2;
                }
            }
            break;
        case "horizontal":
        default: {
            switch (align) {
                case "start":
                    startPos = left;
                    break;
                case "end":
                    startPos = left + width;
                    break;
                case "center":
                default:
                    startPos = left + width / 2;
            }
        }
    }

    // calc text
    const callbackVal = typeof value === "string" ? value : value?.();
    const textContentWidth = ctx.measureText(callbackVal).width;
    const textSpace = textContentWidth + textPadding;
    const textHeight = fontSize + textPadding;

    // draw textbox
    ctx.beginPath();
    if (direction === "horizontal") {
        ctx.rect(startPos - textSpace / 2, h - textHeight / 2, textSpace, textHeight);
    } else {
        ctx.rect(h - textSpace / 2, endPos - textHeight / 2, textSpace, textHeight);
    }

    ctx.fillStyle = backgroundColor;
    ctx.fill();
    ctx.restore();

    // draw text
    ctx.font = `${fontSize}px`;
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (direction === "horizontal") {
        ctx.fillText(callbackVal, startPos, h);
    } else {
        ctx.fillText(callbackVal, h, endPos);
    }

    ctx.restore();
};

export const arbitraryLine: Plugin = {
    id: "arbitraryLine",

    beforeDraw(chart, _, options) {
        if (Object.keys(options).length) {
            const { indexAxis } = chart.options;
            const dir = indexAxis === "y" ? "vertical" : "horizontal";
            const opt = options as unknown as SolidLine | DashLine;
            const {
                lineType,
                lineColor = "#22a6b3",
                position = "average",
                thickness = 1,
                direction = dir,
                stacked = false,
                textBoxOptions = {},
            } = opt;
            const { type } = chart.config as CustomConfig;
            if (type !== "line" && type !== "bar") {
                return;
            }
            if (chart.data.datasets.length < 1) {
                return;
            }
            const {
                ctx,
                chartArea: { top, left, width, height },
                scales: { x, y },
            } = chart;
            const { datasets } = chart.data;
            ctx.save();
            // 设置水平线宽度
            ctx.lineWidth = thickness;
            // 设置水平线描边颜色
            ctx.strokeStyle = lineColor;
            ctx.beginPath();
            // 设置虚线
            if (lineType === "dash") {
                const { lineWidth = 10, gap = 10 } = opt;
                ctx.setLineDash([lineWidth, gap]);
            }
            let sum = 0;
            let total = 0;
            let average = 0;
            let legendMax = 0;
            let legendMin = 0;
            let dataMax = 0;
            let dataMin = 0;
            let max: null | number = null;
            let min: null | number = null;
            let minMax = {
                max: 0,
                min: 0,
            };
            if (direction === "horizontal") {
                minMax = x.getMinMax(true);
            } else {
                minMax = y.getMinMax(true);
            }
            // 分组数据 最大分组值 || 数据数组 最大下标值
            minMax.max =
                minMax.max + 1 > datasets[0].data.length ? datasets[0].data.length : minMax.max + 1;
            if (datasets.length > 1) {
                const loopList = datasets[0].data.slice(minMax.min, minMax.max);
                // 多组数据 处理
                if (stacked) {
                    // 堆叠 多组数据
                    loopList.forEach((_, index) => {
                        // 当前偏移下标
                        const curIndex = minMax.min + index;
                        let isAllNull = true;
                        const cTotal = datasets.reduce((pervious, cItem) => {
                            if (cItem.data[curIndex] !== null) {
                                isAllNull = false;
                            }
                            return pervious + (cItem.data[curIndex] as number);
                        }, 0);
                        if (!isAllNull) {
                            sum += cTotal;
                            if (max === null && min === null) {
                                max = cTotal;
                                min = cTotal;
                            }
                            if (max !== null && min !== null) {
                                if (cTotal >= max && !isNaN((max = cTotal))) dataMax = curIndex;
                                if (cTotal <= min && !isNaN((min = cTotal))) dataMin = curIndex;
                            }
                        }
                    });
                    // 一维数组下标为 最后一个图例下标
                    legendMax = datasets.length - 1;
                    legendMin = datasets.length - 1;
                    total = loopList.length;
                } else {
                    // 未堆叠 多组数据
                    loopList.forEach((_, index) => {
                        total += datasets.length;
                        // 当前偏移下标
                        const curIndex = minMax.min + index;
                        datasets.forEach((item, idx) => {
                            if (item.data[curIndex] === null) {
                                return;
                            }
                            const cItem = item.data[curIndex] as number;
                            sum += cItem;
                            if (max === null && min === null) {
                                max = cItem;
                                min = cItem;
                                dataMax = curIndex;
                                dataMin = curIndex;
                            }
                            if (max !== null && min !== null) {
                                if (cItem >= max) {
                                    max = cItem;
                                    dataMax = curIndex;
                                    legendMax = idx;
                                }
                                if (cItem <= min) {
                                    min = cItem;
                                    dataMin = curIndex;
                                    legendMin = idx;
                                }
                            }
                        });
                    });
                }
            } else {
                // 单组数据处理
                sum = datasets[0].data
                    .slice(minMax.min, minMax.max)
                    .reduce((pervious, item, index) => {
                        if (item === null) {
                            return pervious;
                        }
                        const cItem = item as number;
                        if (max === null && min === null) {
                            max = cItem;
                            min = cItem;
                        }
                        if (max !== null && min !== null) {
                            if (cItem >= max && !isNaN((max = cItem))) dataMax = minMax.min + index;
                            if (cItem <= min && !isNaN((min = cItem))) dataMin = minMax.min + index;
                        }
                        return (pervious as number) + cItem;
                    }, 0) as number;
                total = datasets[0].data.length;
            }
            average = sum / total;
            // 水平线容器高度偏移 垂直居中值
            // const offsetY = thickness / 2;
            legendMax = datasets.length > 1 ? legendMax : 0;
            legendMin = datasets.length > 1 ? legendMin : 0;
            // 一维当前图例下标
            const legendIndex = position === "max" ? legendMax : legendMin;
            // 二维当前数据下标
            const dataIndex = position === "max" ? dataMax : dataMin;
            // 当前匹配数据对象
            const curDatasetMeta = chart.getDatasetMeta(legendIndex).data[dataIndex];
            // 是否渲染 文字提示
            // const hasToolTipText = Object.keys(textBoxOptions).length;
            const hasToolTipText = 1;
            // 当前水平线 代表数据值
            let lineVal = 0;
            switch (position) {
                case "average":
                    lineVal = toFixedNumber(average, 2);
                    break;
                case "max":
                    lineVal = max ?? 0;
                    break;
                case "min":
                    lineVal = min ?? 0;
                    break;
            }
            switch (direction) {
                case "vertical":
                    {
                        let xLine = 0;
                        xLine =
                            position === "average" ? x.getPixelForValue(average) : curDatasetMeta.x;
                        ctx.moveTo(xLine, top);
                        ctx.lineTo(xLine, top + height);
                        ctx.stroke();
                        if (hasToolTipText)
                            handleTooltipText(chart, xLine, lineVal, {
                                ...textBoxOptions,
                                direction,
                            });
                    }
                    break;
                case "horizontal":
                default: {
                    let yLine = 0;
                    yLine = position === "average" ? y.getPixelForValue(average) : curDatasetMeta.y;
                    ctx.moveTo(left, yLine);
                    ctx.lineTo(left + width, yLine);
                    ctx.stroke();
                    if (hasToolTipText)
                        handleTooltipText(chart, yLine, lineVal, { ...textBoxOptions, direction });
                }
            }
            ctx.restore();
        }
    },
};
