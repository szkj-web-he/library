/**
 * @file progress stories
 * @date 2022-04-29
 * @author mingzhou.zhang
 * @lastModify mingzhou.zhang 2022-04-29
 */
import { StoryObj, Meta } from "@storybook/react";
import { FC, useEffect, useState } from "react";
import { Progress, ProgressProps } from "../../Components/Zmz/Progress";

/**
 * TagCard component
 *
 */
export default {
    title: "Zmz/Progress",
    component: Progress,
} as Meta;

const Template: FC<ProgressProps> = (args) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        timer = setTimeout(() => {
            setPercent((previous) => {
                if (previous >= 100) return 0;
                else return previous + 5;
            });
        }, 500);
        return () => {
            timer && clearTimeout(timer);
        };
    }, [percent]);

    return <Progress percent={percent} {...args} />;
};

type Story = StoryObj<typeof Progress>;

/**
 * Progress component
 */
export const ProgressSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        percent: 80,
    },
};
// ProgressSample.args = {
//     percent: 80,
// };
