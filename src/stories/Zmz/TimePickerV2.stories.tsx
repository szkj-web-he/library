/**
 * @file
 * @date 2022-08-24
 * @author
 * @lastModify 2022-08-24
 */
import { Meta, StoryObj } from "@storybook/react";
import { TimePickerV2 } from "../../Components/Zmz/TimePickerV2";

export default {
    title: "Zmz/TimePickerV2",
    component: TimePickerV2,
} as Meta;

type Story = StoryObj<typeof TimePickerV2>;

export const DefaultSample: Story = {};

export const Format: Story = {
    args: {
        format: "h-mm-s",
        use12Hours: true,
    },
};

export const Use12Hours: Story = {
    args: {
        use12Hours: true,
    },
};

export const ExtraFooter: Story = {
    args: {
        extraFooter: <button>ok</button>,
    },
};
