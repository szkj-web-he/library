/**
 * @file skeleton loading
 * @date 2021-11-12
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-12
 */
import { StoryObj, Meta } from "@storybook/react";
import { Skeleton } from "../../Components/Loading/Skeleton";

/**
 * Loading component
 *
 */
export default {
    title: "Loading/Skeleton",
    component: Skeleton,
} as Meta;

type Story = StoryObj<typeof Skeleton>;

/**
 * Loading component
 *
 */
export const ImgLoading: Story = {
    args: {
        variant: "img",
        width: "5rem",
        height: "5rem",
    },
};

export const CircleLoading: Story = {
    args: {
        variant: "circle",
        width: "5rem",
        height: "5rem",
    },
};

export const RectLoading: Story = {
    args: {
        variant: "rect",
        width: "5rem",
        height: "1rem",
    },
};
