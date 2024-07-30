/**
 * @file type loading
 * @date 2021-07-19
 * @author xuejie.he
 * @lastModify xuejie.he 2021-07-19
 */
import { StoryObj, Meta } from "@storybook/react";
import { LoadingComponent } from "../../Components/Loading/LoadingComponent";

/**
 * Loading component
 *
 */
export default {
    title: "Loading/LoadingComponent",
    component: LoadingComponent,
} as Meta;

type Story = StoryObj<typeof LoadingComponent>;

/**
 * Loading component
 *
 */

export const BlankLoading: Story = {
    args: {
        type: "blank",
    },
};

export const BarsLoading: Story = {
    args: {
        type: "bars",
    },
};

export const BubblesLoading: Story = {
    args: {
        type: "bubbles",
    },
};

export const CubesLoading: Story = {
    args: {
        type: "cubes",
    },
};

export const CylonLoading: Story = {
    args: {
        type: "cylon",
    },
};

export const SpinLoading: Story = {
    args: {
        type: "spin",
    },
};

export const SpinningBubblesLoading: Story = {
    args: {
        type: "spinningBubbles",
    },
};

export const SpokesLoading: Story = {
    args: {
        type: "spokes",
    },
};

export const RollerLoading: Story = {
    args: {
        type: "roller",
    },
};

export const RiceLoading: Story = {
    args: {
        type: "rice",
    },
};
