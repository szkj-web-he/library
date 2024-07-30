/**
 * @file GeneralInput storybook
 * @date 2020-09-04
 * @author Andy
 * @lastModify Andy 2020-09-04
 */
import { Meta, StoryObj } from "@storybook/react";
import { GeneralInput } from "../../Components/DataInput/GeneralInput";

/**
 * General Input component
 *
 */
export default {
    title: "DataInput/GeneralInput",
    component: GeneralInput,
} as Meta;

type Story = StoryObj<typeof GeneralInput>;
/**
 * GeneralInput component
 *
 */
export const General: Story = {
    args: {},
};

/**
 * GeneralInput component with placeholder
 *
 */
export const GeneralWithPlacerHolder: Story = {
    args: { placeholder: "Placeholder here" },
};
