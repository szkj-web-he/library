/**
 * @file RadioGroup.stories file
 * @date 2022-01-17
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-17
 */

import { Meta, StoryObj } from "@storybook/react";
import { Check } from "../../Components/Choose/Check";
import { CheckGroup } from "../../Components/Choose/CheckGroup";

export default {
    title: "Choose/CheckGroup",
    component: CheckGroup,
} as Meta;

type Story = StoryObj<typeof CheckGroup>;

export const DefaultSample: Story = {
    render: (args) => {
        return (
            <CheckGroup {...args}>
                <Check value={""}>{""}</Check>
                <Check value={1}>1</Check>
            </CheckGroup>
        );
    },
    args: {
        value: [""],
        onChange: (res) => {
            console.log({ res });
        },
    },
};

export const BoxSample: Story = {
    render: (args) => {
        return (
            <CheckGroup {...args}>
                <Check type="solid" value={2}>
                    2
                </Check>
                <Check type="solid" value={1}>
                    1
                </Check>
                <Check value={"2"}>2</Check>
                <Check value={"1"}>1</Check>
            </CheckGroup>
        );
    },
    args: {
        value: [1, "1"],
        onChange: (res) => {
            console.log({ res });
        },
    },
};

export const DisableSample: Story = {
    render: (args) => {
        return (
            <CheckGroup {...args}>
                <Check type="solid" value={2}>
                    2
                </Check>
                <Check type="solid" value={1}>
                    1
                </Check>
                <Check value={"2"}>2</Check>
                <Check value={"1"}>1</Check>
            </CheckGroup>
        );
    },
    args: {
        value: [1, "1"],
        disabled: true,
        onChange: (res) => {
            console.log({ res });
        },
    },
};
