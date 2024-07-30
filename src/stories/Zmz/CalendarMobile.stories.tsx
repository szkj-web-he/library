/**
 * @file
 * @date 2022-11-18
 * @author mingzhou.zhang
 * @lastModify  2022-11-18
 */

import { Meta, StoryObj } from "@storybook/react";
import { CalendarMobile } from "../../Components/Zmz/CalendarMobile";

export default {
    title: "Zmz/CalendarMobile",
    component: CalendarMobile,
} as Meta;

type Story = StoryObj<typeof CalendarMobile>;

export const Default: Story = {
    args: {
        onChange(value) {
            console.log(value);
        },
    },
};
