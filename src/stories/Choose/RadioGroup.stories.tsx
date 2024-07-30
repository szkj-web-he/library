/**
 * @file RadioGroup.stories file
 * @date 2022-01-17
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-17
 */

import { Meta, StoryObj } from "@storybook/react";
import { Radio } from "../../Components/Choose/Radio";
import { RadioGroup } from "../../Components/Choose/RadioGroup";

export default {
    title: "Choose/RadioGroup",
    component: RadioGroup,
} as Meta;

type Story = StoryObj<typeof RadioGroup>;

export const DefaultSample: Story = {
    render: (args) => {
        return (
            <RadioGroup {...args}>
                <Radio value={""}>{""}</Radio>
                <Radio value={1}>1</Radio>
            </RadioGroup>
        );
    },
    args: {
        value: "",
        onChange: (res) => {
            console.log({ res });
        },
    },
};

export const DisableSample: Story = {
    render: (args) => {
        return (
            <RadioGroup {...args}>
                <Radio value={2}>2</Radio>
                <Radio value={1}>1</Radio>
            </RadioGroup>
        );
    },
    args: {
        value: 1,
        disabled: true,
        onChange: (res) => {
            console.log({ res });
        },
    },
};
