/**
 * @file
 * @date 2023-01-03
 * @author  mingzhou.zhang
 * @lastModify  2023-01-03
 */
import { StoryObj, Meta } from "@storybook/react";
import Introduction from "../../Components/Zmz/Introduction";
import type { IntroductionProps } from "../../Components/Zmz/Introduction";
import { FC, useState } from "react";
// import bg from "../../Assets/images/bg_404.png";
// import bg1 from "../../Assets/images/bg_500.png";
// import bg2 from "../../Assets/images/bg_empty.png";
export default {
    title: "Zmz/Introduction",
    component: Introduction,
} as Meta;

const Template: FC<IntroductionProps> = (args) => {
    const [show, setShow] = useState(false);
    return (
        <Introduction
            {...args}
            show={show}
            customScaleNode={
                <button
                    onClick={() => {
                        setShow(true);
                    }}
                >
                    open
                </button>
            }
            onChange={(state) => {
                if (!state) setShow(state);
            }}
        />
    );
};

type Story = StoryObj<typeof Introduction>;

export const DeliveryTemplate: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "delivery",
        // title: "什么是交付物？",
        // content: `当您创建调研项目之后，便可以在该项目下新建问卷编辑、问卷分发、数据处理、编辑插件等调研任务，这些任务即称为“交付物”。`,
        // linkBtn: `了解4种类型交付物`,
        // src: bg,
    },
};

export const ContractTemplate: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "contract",
    },
};

export const PermissionTemplate: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "permission",
    },
};
