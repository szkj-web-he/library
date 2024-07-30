/**
 * @file Charts stories
 * @date 2022-7-5
 * @author mingzhou.zhang
 * @lastModify mingzhou.zhang 2022-7-5
 */
import { StoryObj, Meta } from "@storybook/react";
import { ChartDataset, ScatterDataPoint, ChartType } from "chart.js";
import { Charts, ChartsProps, ExtendOption } from "../../Components/Zmz/Charts";
import { FC, useState } from "react";
const commonBarLabels = [
    "Legend1Legend1Legend1Legend1Legend1Legend1Legend1Legend1Legend1Legend1Legend1Legend1Legend1Legend1",
    "Legend2Legend2Legend2Legend2Legend2Legend2Legend2Legend2Legend2Legend2Legend2Legend2Legend2Legend2",
    "Legend3Legend3Legend3Legend3Legend3Legend3Legend3Legend3Legend3Legend3Legend3Legend3Legend3Legend3Legend3",
    "Legend4Legend4Legend4Legend4Legend4Legend4Legend4Legend4Legend4Legend4Legend4Legend4Legend4Legend4Legend4Legend4",
    "Legend5Legend5Legend5Legend5Legend5Legend5Legend5Legend5Legend5Legend5Legend5Legend5",
    "Legend6",
    "Legend7",
    "Legend8",
    "Legend9",
    "Legend10",
    "Legend11",
    "Legend12",
    "Legend13",
    "Legend14",
    "Legend15",
    "Legend16",
    "Legend17",
    "Legend18",
    "Legend19",
    "Legend20",
];
const commonBarData = [
    {
        label: "图例1",
        data: commonBarLabels.map((_, index) => {
            if (index === 0 || index === 3) {
                return null;
            } else {
                return Math.ceil(Math.random() * 1200);
            }
        }),
        backgroundColor: "rgb(35, 120, 255)",
        maxBarThickness: 8,
    },
    {
        label: "图例2",
        data: commonBarLabels.map(() => Math.ceil(Math.random() * 1200)),
        backgroundColor: "rgb(0, 196, 255)",
        maxBarThickness: 8,
    },
    {
        label: "图例3",
        data: commonBarLabels.map(() => Math.ceil(Math.random() * 1200)),
        backgroundColor: "rgb(0, 205, 157)",
        maxBarThickness: 8,
    },
    {
        label: "图例4",
        data: commonBarLabels.map(() => Math.ceil(Math.random() * 1200)),
        backgroundColor: "rgb(106, 206, 20)",
        maxBarThickness: 8,
    },
    {
        label: "图例5",
        data: commonBarLabels.map(() => Math.ceil(Math.random() * 1200)),
        backgroundColor: "rgb(250, 201, 22)",
        maxBarThickness: 8,
    },
];

/**
 * ChartS component
 *
 */
export default {
    title: "Zmz/Charts",
    component: Charts,
} as Meta;

const typeList: ChartType[] = [
    "bar",
    "bubble",
    "doughnut",
    "line",
    "pie",
    "polarArea",
    "radar",
    "scatter",
];

// const labels = ["January", "February", "March", "April", "May", "June", "July"];
// const dataList = [
//     {
//         label: "Dataset 1",
//         data: labels.map(() => Math.ceil(Math.random() * 500)),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//         label: "Dataset 2",
//         data: labels.map(() => Math.ceil(Math.random() * 500)),
//         backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
// ];
// const barLabels = ["January", "February", "March"];

// const barDataList = [
//     {
//         label: "# of Votes",
//         data: barLabels.map(() => Math.ceil(Math.random() * 1000)),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
// ];

const Template: FC<ChartsProps> = (args) => {
    const [type, setType] = useState<ChartType>();
    const [data, setData] = useState(args.dataSets);
    const [option, setOption] = useState(args.options);
    const [labledata, setLabledata] = useState(args.labelData);

    return (
        <div>
            <Charts
                {...args}
                dataSets={data}
                labelData={labledata}
                type={type ? type : args.type}
                options={option}
            />
            <input
                list="choice-type"
                onChange={(e) => {
                    const value = e.target.value as ChartType;
                    if (typeList.includes(value)) {
                        setType(value);
                    }
                }}
            />
            <datalist id="choice-type">
                {typeList.map((item, index) => (
                    <option key={index} value={item} />
                ))}
            </datalist>
            <button
                onClick={(e) => {
                    console.log(e);
                    const labelData = labledata.map((item, index) => {
                        if (typeof item === "string" && item.includes("Legend")) {
                            return `图例${index}`;
                        } else {
                            return `Legend${index}`;
                        }
                    });
                    type !== "pie" &&
                        data.forEach((item, index) => {
                            if (item.label?.includes("Legend")) {
                                item.label = `图例${index}`;
                            } else {
                                item.label = `Legend${index}`;
                            }
                        });
                    setLabledata(labelData);
                    type !== "pie" && setData([...data]);
                }}
            >
                change Language
            </button>
            <button
                onClick={() => {
                    setOption({
                        ...option,
                        indexAxis: "y",
                    });
                }}
            >
                set options
            </button>
        </div>
    );
};

type Story = StoryObj<ChartsProps>;

/**
 * ChartS component
 *
 */

// export const ChartSample = Template.bind({});
// ChartSample.args = {
//     type: "bar",
//     width: "300",
//     height: "400",
// };

/**
 * vertical bar chart
 * more detail see https://www.chartjs.org/docs/latest/charts/bar.html
 */

const BaseVerticalLabelData = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const BaseVerticalBarChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        width: 1000,
        height: 500,
        type: "bar",
        labelData: BaseVerticalLabelData,
        dataSets: [
            {
                label: "回答次数",
                data: BaseVerticalLabelData.map((_, index) => {
                    if (index === 0 || index === 3) {
                        return null;
                    } else {
                        return Math.ceil(Math.random() * 50);
                    }
                }),
                backgroundColor: "rgb(35, 120, 255)",
                // maxBarThickness: 18,
            },
        ],
        options: {
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        // label: function (context) {
                        //     console.log(context);
                        //     return "";
                        // },
                    },
                },
                legend: {
                    position: "right",
                    maxWidth: 100,
                },
                arbitraryLine: {
                    position: "max",
                    lineColor: "black",
                    thickness: 15,
                },
            },
        },
    },
};

/**
 * group vertical bar chart
 */
export const GroupVerticalBarChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "bar",
        labelData: commonBarLabels,
        dataSets: commonBarData,
        maxLimit: 8,
        options: {
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y: {
                    grid: {
                        drawBorder: false,
                    },
                },
            },
            plugins: {
                legend: {
                    position: "right",
                    labels: {
                        textAlign: "center",
                    },
                },
                arbitraryLine: {
                    lineColor: "red",
                    position: "average",
                },
            },
        },
    },
};

/**
 * stack vertical bar chart
 */
export const StackVerticalBarChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "bar",
        labelData: commonBarLabels,
        dataSets: commonBarData.map((item) => {
            item.maxBarThickness = 100;
            return item;
        }),
        options: {
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
            },
            plugins: {
                // arbitraryLine: {
                //     lineColor: "blue",
                //     stacked: true,
                //     position: "min",
                // },
            },
        },
    },
};

/**
 * stack vertical percent bar chart
 */

const randomNums = (count: number) => {
    const randomList = Array(count)
        .fill(1)
        .map(() => Number((Math.random() * 100).toFixed(0)));
    const total = randomList.reduce((previous, item) => previous + item, 0);

    const percentList = randomList.map((item) => Number(((item / total) * 100).toFixed(0)));
    return percentList;
};

const disrupt = (leng: number, count: number) => {
    // list.sort(function () {
    //     return 0.5 - Math.random();
    // });
    const list: number[][] = Array(leng).fill(1);
    for (let i = 0; i < leng; i++) {
        const percentList = randomNums(count);
        for (let j = 0; j < list.length; j++) {
            !Array.isArray(list[j]) && (list[j] = []);
            list[j].push(percentList[j]);
        }
    }

    return list;
};
const randomList = disrupt(commonBarLabels.length, commonBarData.length);

export const StackVerticalPercentBarChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "bar",
        labelData: commonBarLabels,
        dataSets: structuredClone(commonBarData).map((item, index) => {
            item.data = randomList[index];
            return item;
        }),
        options: {
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    max: 100,
                    stacked: true,
                    ticks: {
                        callback: (val, index, ticks) => {
                            // ticks[ticks.length - 1].value;
                            console.log(val, index, ticks);
                            return `${val}%`;
                        },
                    },
                },
            },
        },
    },
};

/**
 * stack vertical line bar chart
 */
export const StackVerticalLineBarChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "bar",
        labelData: commonBarLabels,
        dataSets: structuredClone(commonBarData).map((item, index) => {
            if (index === 0) {
                const options = item as ChartDataset;
                options.type = "line";
                options.borderColor = "rgb(35, 120, 255)";
            }
            return item;
        }),
        options: {
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
            },
        },
    },
};

/**
 * horizontal Bar Chart
 */
export const HorizontalBarChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "bar",
        labelData: BaseVerticalLabelData,
        dataSets: [
            {
                label: "回答次数",
                data: BaseVerticalLabelData.map(() => Math.ceil(Math.random() * 50)),
                backgroundColor: "rgb(35, 120, 255)",
                maxBarThickness: 18,
            },
        ],
        options: {
            indexAxis: "y",
            scales: {
                y: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                x: {
                    grid: {
                        drawBorder: false,
                    },
                },
            },
            plugins: {
                arbitraryLine: {
                    lineColor: "blue",
                    stacked: true,
                    position: "min",
                    lineType: "dash",
                    // direction: "vertical",
                },
            },
        },
    },
};

/**
 * group horizontal Bar Chart
 */
export const GroupHorizontalBarChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "bar",
        labelData: commonBarLabels,
        dataSets: structuredClone(commonBarData),
        maxLimit: 7,
        options: {
            indexAxis: "y",
            scales: {
                y: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                x: {
                    grid: {
                        drawBorder: false,
                    },
                },
            },
            plugins: {
                arbitraryLine: {
                    lineColor: "green",
                    direction: "vertical",
                    position: "max",
                    lineType: "dash",
                },
            },
        },
    },
};

/**
 * stack horizontal Bar Chart
 */
export const StackHorizontalBarChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "bar",
        labelData: commonBarLabels,
        dataSets: structuredClone(commonBarData),
        options: {
            indexAxis: "y",
            scales: {
                y: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                    stacked: true,
                },
                x: {
                    grid: {
                        drawBorder: false,
                    },
                    stacked: true,
                },
            },
        },
    },
};

/**
 * stack horizontal percent bar chart
 */
export const StackHorizontalPercentBarChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "bar",
        labelData: commonBarLabels,
        dataSets: structuredClone(commonBarData).map((item, index) => {
            item.data = randomList[index];
            return item;
        }),
        options: {
            indexAxis: "y",
            scales: {
                x: {
                    max: 100,
                    stacked: true,
                    ticks: {
                        callback: function (val, index, ticks) {
                            // ticks[ticks.length - 1].value;
                            console.log(val, index, ticks);
                            return `${val}%`;
                        },
                    },
                },
                y: {
                    stacked: true,
                },
            },
        },
    },
};

/**
 * line chart
 */
export const LineChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "line",
        labelData: commonBarLabels,
        dataSets: structuredClone(commonBarData).map((item) => {
            const options = item as ChartDataset;
            options.borderColor = options.backgroundColor;
            return item;
        }),
        options: {
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y: {
                    grid: {
                        drawBorder: false,
                    },
                },
            },
        },
    },
};

/**
 * area chart
 */
export const AreaChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "line",
        labelData: commonBarLabels,
        dataSets: structuredClone(commonBarData).map((item) => {
            const options = item as ChartDataset<"line">;
            options.fill = true;
            options.borderColor = options.backgroundColor;
            options.backgroundColor = (options.backgroundColor as string).replace(
                /rgb\((\d+.*)\)/,
                (_, p1) => {
                    return `rgba(${p1 as string}, .3)`;
                },
            );
            return options;
        }),
        options: {
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y: {
                    grid: {
                        drawBorder: false,
                    },
                },
            },
        },
    },
};

/**
 * stack area chart
 */
export const StackAreaChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "line",
        labelData: commonBarLabels,
        dataSets: structuredClone(commonBarData).map((item) => {
            const options = item as ChartDataset<"line">;
            options.fill = true;
            options.borderColor = options.backgroundColor;
            options.backgroundColor = (options.backgroundColor as string).replace(
                /rgb\((\d+.*)\)/,
                (_, p1) => {
                    return `rgba(${p1 as string}, .3)`;
                },
            );
            return options;
        }),
        options: {
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y: {
                    stacked: true,
                    grid: {
                        drawBorder: false,
                    },
                },
            },
        },
    },
};

/**
 * pie chart
 */
export const PieChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "pie",
        labelData: commonBarLabels.slice(0, 2),
        dataSets: structuredClone(commonBarData as ChartDataset<"pie">[]).reduce(
            (pervious, item, index) => {
                if (index === 0) {
                    pervious[0].data = [];
                    pervious[0].backgroundColor = [];
                    pervious[0].borderColor = [];
                }

                if (
                    Array.isArray(pervious[0].backgroundColor) &&
                    Array.isArray(pervious[0].borderColor) &&
                    (index === 1 || index === 2)
                ) {
                    pervious[0].data.push(item.data[index]);
                    pervious[0].backgroundColor.push(item.backgroundColor);
                    pervious[0].borderColor.push(item.backgroundColor);
                }

                pervious[0].hoverOffset = 4;
                pervious[0].offset = 10;
                return pervious;
            },
            [{}] as ChartDataset<"pie">[],
        ),
        options: {
            maintainAspectRatio: false,
            layout: {
                // padding: 70,
            },
            plugins: {
                legend: {
                    position: "right",
                    labels: {
                        textAlign: "center",
                    },
                },
                tooltip: {},
            },
            // onHover(event, elements, chart) {
            //     elements.length && console.log(event, elements, chart);
            //     const { ctx } = chart;
            //     if (elements.length) {
            //         const data = elements[0];
            //         const { element } = data;
            //         const { x: cx, y: cy } = element;
            //         const { x: tx, y: ty } = element.tooltipPosition();
            //         const halfWidth = cx;
            //         const halfHeight = cy;

            //         const x = 2 * tx - cx;
            //         const y = 2 * ty - cy;
            //         // draw line
            //         const xLine = x >= halfWidth ? x + 20 : x - 20;
            //         const yLine = y >= halfHeight ? y + 20 : y - 20;

            //         const extraLine = x >= halfWidth ? 10 : -10;

            //         ctx.save();
            //         ctx.beginPath();
            //         ctx.moveTo(x, y);
            //         ctx.arc(x, y, 2, 0, 2 * Math.PI, true);
            //         ctx.fill();
            //         ctx.moveTo(x, y);
            //         ctx.lineTo(xLine, yLine);
            //         ctx.lineTo(xLine + extraLine, yLine);
            //         // ctx.fillStyle = dataset.backgroundColor[index];
            //         ctx.strokeStyle = "black";
            //         ctx.stroke();

            //         // text
            //         const textPosition = x >= halfWidth ? "left" : "right";
            //         const plusPixel = x >= halfWidth ? 5 : -5;
            //         ctx.textAlign = textPosition;
            //         ctx.textBaseline = "middle";
            //         ctx.fillStyle = "black";
            //         ctx.fillText("1", xLine + extraLine + plusPixel, yLine);
            //         // `${(((datas as number[])[index] / sum) * 100).toFixed(2)}%`,
            //         ctx.restore();
            //     }
            // },
        },
    },
};

/**
 * doughnut chart
 */
export const DoughnutChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "doughnut",
        labelData: commonBarLabels,
        dataSets: structuredClone(commonBarData as ChartDataset<"doughnut">[]).reduce(
            (pervious, item, index) => {
                if (index === 0) {
                    pervious[0].data = [];
                    pervious[0].backgroundColor = [];
                    pervious[0].borderColor = [];
                    // pervious[0].
                }

                if (
                    Array.isArray(pervious[0].backgroundColor) &&
                    Array.isArray(pervious[0].borderColor)
                ) {
                    pervious[0].data.push(item.data[index]);
                    pervious[0].backgroundColor.push(item.backgroundColor);
                    pervious[0].borderColor.push(item.backgroundColor);
                }
                return pervious;
            },
            [{}] as ChartDataset<"doughnut">[],
        ),
        options: {
            maintainAspectRatio: false,
            cutout: "90%",
        } as ExtendOption,
    },
};

/**
 * scatter chart
 */
export const ScatterChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "scatter",
        labelData: structuredClone(commonBarLabels).splice(2),
        dataSets: structuredClone(commonBarData).filter((item: ChartDataset<"scatter">, index) => {
            if (index < 2) {
                item.data = item.data.map((item) => {
                    const num = item as number;
                    return {
                        x: Math.ceil(Math.random() * num),
                        y: Math.ceil(Math.random() * num),
                    } as ScatterDataPoint;
                });
                item.borderColor = item.backgroundColor;
                return true;
            }
            return false;
        }),
        options: {
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y: {
                    stacked: true,
                    grid: {
                        drawBorder: false,
                    },
                },
            },
        },
    },
};

/**
 * bubble chart
 */
export const BubbleChart: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "bubble",
        labelData: structuredClone(commonBarLabels).splice(1),
        dataSets: structuredClone(commonBarData).filter((item: ChartDataset<"scatter">, index) => {
            if (index < 1) {
                item.data = item.data.map((item) => {
                    const num = item as number;
                    return {
                        x: Math.ceil(Math.random() * num),
                        y: Math.ceil(Math.random() * num),
                        r: Math.ceil(Math.random() * 30),
                    } as ScatterDataPoint;
                });
                item.borderColor = item.backgroundColor;
                return true;
            }
            return false;
        }),
        options: {
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y: {
                    stacked: true,
                    grid: {
                        drawBorder: false,
                    },
                },
            },
        },
    },
};
