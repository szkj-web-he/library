/**
 * @file
 * @date 2021-04-15
 * @author zhoubin
 * @lastModify  2021-04-15
 */
import { StoryObj, Meta } from "@storybook/react";
import { Error } from "../../Components/Error";

export default {
    title: "Error/Error",
    component: Error,
} as Meta;

type Story = StoryObj<typeof Error>;

/**
 * error style
 */
export const Error404: Story = {
    args: {
        type: "404",
    },
};

/**
 * error style
 */
export const Error500: Story = {
    args: {
        type: "500",
    },
};
