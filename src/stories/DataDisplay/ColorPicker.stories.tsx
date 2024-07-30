/**
 * @file
 * @date 2021-08-12
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-12
 */
import { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "../../Components/DataDisplay/ColorPicker";

export default {
    title: "DataDisplay/ColorPicker",
    component: ColorPicker,
} as Meta;

type Story = StoryObj<typeof ColorPicker>;

export const ColorPickerSample: Story = {
    args: {},
};
