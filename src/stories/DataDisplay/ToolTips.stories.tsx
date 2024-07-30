/**
 * @file ToolTips storybook
 * @date 2020-09-07
 * @author Andy
 * @lastModify Andy 2020-09-07
 */
import { StoryObj, Meta } from "@storybook/react";
import { ToolTips } from "../../Components/DataDisplay/ToolTips";

/**
 * ToolTips component
 *
 */
export default {
    title: "DataDisplay/ToolTips",
    component: ToolTips,
} as Meta;

type Story = StoryObj<typeof ToolTips>;

/**
 * ToolTips component
 *
 */
export const ToolTipsLeftTopBlack: Story = {
    args: {
        type: "LT",
        background: "black",
        content: "I am Left Top",
        height: "7.5rem",
        buttonLabel: "Confirm",
    },
};

export const ToolTipsLeftMiddleBlack: Story = {
    args: {
        type: "LM",
        background: "black",
        content: "I am Left Middle",
        height: "7.5rem",
    },
};

export const ToolTipsLeftBottomBlack: Story = {
    args: {
        type: "LB",
        background: "black",
        content: "I am Left Bottom",
        height: "7.5rem",
    },
};

export const ToolTipsLeftTopWhite: Story = {
    args: {
        type: "LT",
        background: "white",
        content: "I am Left Top",
        height: "7.5rem",
    },
};

export const ToolTipsLeftMiddleWhite: Story = {
    args: {
        type: "LM",
        background: "white",
        content: "I am Left Middle",
        height: "7.5rem",
    },
};

export const ToolTipsLeftBottomWhite: Story = {
    args: {
        type: "LB",
        background: "white",
        content: "I am Left Bottom",
        height: "7.5rem",
    },
};
