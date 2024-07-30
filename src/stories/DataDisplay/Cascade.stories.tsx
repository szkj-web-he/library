/**
 * @file AvatarList storybook
 * @date 2020-09-07
 * @author Andy
 * @lastModify Andy 2020-09-07
 */
import { Meta, StoryObj } from "@storybook/react";
import { Cascade } from "../../Components/DataDisplay/Cascade";
import { cascadeSet } from "../../DefaultData/DataDisplay/cascade";

/**
 * Cascade component
 *
 */
export default {
    title: "DataDisplay/Cascade",
    component: Cascade,
} as Meta;

type Story = StoryObj<typeof Cascade>;

/**
 *QuestionList component
 *
 */
export const CascadeSample: Story = {
    args: {
        itemSet: cascadeSet,
        width: "16rem",
    },
};
