/**
 * @file
 * @date 2022-07-27
 * @author
 * @lastModify 2022-07-27
 */
import { Meta, StoryObj } from "@storybook/react";
import { ErrorV2 } from "../../Components/Zmz/ErrorV2";

export default {
    title: "Zmz/ErrorV2",
    component: ErrorV2,
} as Meta;

type Story = StoryObj<typeof ErrorV2>;

export const Error400: Story = {
    args: {
        type: "404",
    },
};

export const Error500: Story = {
    args: {
        type: "500",
    },
};

export const ErrorEmpty: Story = {
    args: {
        type: "empty",
    },
};
