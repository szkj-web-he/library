/**
 * @file LoadingV2 storybook
 * @date 2022-4-18
 * @author mingzhou.zhang
 * @lastModify mingzhou.zhang 2022-4-18
 */
import { StoryObj, Meta } from "@storybook/react";
import { useState, useEffect, FC } from "react";
import { LoadingV2, LoadingV2Props } from "../../Components/Zmz/LoadingV2";
/**
 * LoadingV2 component
 *
 */
export default {
    title: "Zmz/LoadingV2",
    component: LoadingV2,
} as Meta;

const Template: FC<LoadingV2Props> = (args) => {
    const [state, setState] = useState("");
    const [percent, setPercent] = useState(0);
    const [fillState, setFillState] = useState("start");
    useEffect(() => {
        if (fillState !== "stop") {
            setTimeout(() => {
                if (percent < 100) setPercent(percent + 1);
                else setPercent(0);
            }, 500);
        }
    }, [percent, fillState]);

    return (
        <div>
            <LoadingV2 percent={percent} content={state} {...args} />
            <button
                style={{ marginRight: 10 }}
                onClick={() => {
                    state ? setState("") : setState("datareachable");
                }}
            >
                切换文字
            </button>
            <button
                onClick={() => {
                    console.log(fillState !== "stop" ? "stop" : "start");
                    fillState !== "stop" ? setFillState("stop") : setFillState("start");
                }}
            >
                暂停/继续
            </button>
        </div>
    );
};

type Story = StoryObj<typeof LoadingV2>;
/**
 * LoadingV2 component
 *
 */
export const LoadingV2Sample: Story = {
    render: () => <Template />,
};
