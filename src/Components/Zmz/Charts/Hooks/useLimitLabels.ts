/**
 * @file 限制展示的条目
 * @date 2023-12-29
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-29
 */

import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { ChartJS, ChartsProps } from "..";
import { deepCloneData } from "../../../../Unit/deepCloneData";

export const useLimitLabels = (
    chart: MutableRefObject<ChartJS | null>,
    data: ChartsProps["data"],
    labelData: ChartsProps["labelData"],
    dataSets: ChartsProps["dataSets"],
    type: ChartsProps["type"],
    maxLimit: number = 0,
): [
    NonNullable<ChartsProps["data"]>,
    MutableRefObject<NonNullable<ChartsProps["data"]>>,
    Dispatch<SetStateAction<number>>,
] => {
    /**
     * chartjs的参数
     * 带有滚动时的变化参数
     */
    const ref = useRef(data ?? { labels: [], datasets: [] });
    /**
     * 仅初始化的时候声明了一边
     * 为什么要何 wheel的时候 区分开
     *
     * setChartData会导致chart重新渲染，那不是 想要的动画
     * 在wheel的时候只想做更新的操作
     *
     */
    const [chartData, setChartData] = useState(data ?? { labels: [], datasets: [] });
    /**
     * chartjs是否准备好
     * chartjs对象一变化，就递增
     */
    const [isCount, setIsCount] = useState(0);

    /**
     * 初始化data数据
     */
    useLayoutEffect(() => {
        let value: NonNullable<ChartsProps["data"]>;
        if (data) {
            value = deepCloneData({ ...data });
        } else {
            value = deepCloneData({ labels: [...labelData], datasets: [...dataSets] });
        }

        (() => {
            if (["doughnut", "pie", "polarArea", "radar"].includes(type) || maxLimit === 0) {
                return;
            }

            if (value.labels) {
                value.labels = deepCloneData(value.labels.slice(0, maxLimit));

                for (let i = 0; i < value.datasets.length; i++) {
                    value.datasets[i].data = deepCloneData(
                        value.datasets[i].data.slice(0, maxLimit),
                    );
                }
            }
        })();

        ref.current = deepCloneData(value);

        setChartData(deepCloneData(value));
    }, [data, labelData, dataSets, type, maxLimit]);

    /**
     * 限制展示内容
     *
     */
    useLayoutEffect(() => {
        let startIndex = 0;

        /**
         * 设置参数
         */
        const setData = (type: "add" | "remove") => {
            if (!chart.current) {
                return;
            }

            let value: NonNullable<ChartsProps["data"]>;
            if (data) {
                value = deepCloneData({ ...data });
            } else {
                value = deepCloneData({ labels: [...labelData], datasets: [...dataSets] });
            }

            if (value.labels) {
                ref.current.labels = deepCloneData(
                    value.labels.slice(startIndex, startIndex + maxLimit),
                );
                for (let i = 0; i < value.datasets.length; i++) {
                    ref.current.datasets[i].data = deepCloneData(
                        value.datasets[i].data.slice(startIndex, startIndex + maxLimit),
                    );
                }
            }

            if (type === "add") {
                //新增
                const index = startIndex + maxLimit - 1;
                chart.current.data.labels?.push(value.labels?.[index]);

                for (let i = 0; i < value.datasets.length; i++) {
                    const dataVal = value.datasets?.[i].data[index];
                    chart.current.data.datasets[i].data.push(dataVal);
                }
                chart.current?.update();

                //删除
                chart.current.data.labels?.shift();
                for (let i = 0; i < value.datasets.length; i++) {
                    chart.current.data.datasets[i].data.shift();
                }
                chart.current?.update();
                return;
            }
            if (type === "remove") {
                //新增
                chart.current.data.labels?.unshift(value.labels?.[startIndex]);
                for (let i = 0; i < value.datasets.length; i++) {
                    const dataVal = value.datasets?.[i].data[startIndex];
                    chart.current.data.datasets[i].data.unshift(dataVal);
                }
                chart.current?.update();

                // 删除
                chart.current.data.labels?.pop();
                for (let i = 0; i < value.datasets.length; i++) {
                    chart.current.data.datasets[i].data.pop();
                }
                chart.current?.update();

                return;
            }
        };

        /**
         * 当滚轮滚动的时候
         * @param e
         */
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const length = data?.labels?.length ?? labelData.length;
            if (e.deltaY > 0) {
                if (startIndex + 1 > length - maxLimit) {
                    return;
                }

                ++startIndex;
                setData("add");
                return;
            }

            if (e.deltaY < 0) {
                if (startIndex - 1 < 0) {
                    return;
                }

                --startIndex;
                setData("remove");
                return;
            }
        };

        if (["doughnut", "pie", "polarArea", "radar"].includes(type) || maxLimit === 0) {
            return;
        }
        const node = chart.current?.canvas;
        if (!node) {
            return;
        }

        node.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            node.removeEventListener("wheel", handleWheel);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, labelData, dataSets, type, maxLimit, isCount]);

    return [chartData, ref, setIsCount];
};
