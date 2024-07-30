/**
 * @file Loading storybook
 * @date 2020-09-07
 * @author Andy
 * @lastModify Andy 2020-09-07
 */
import { StoryObj, Meta } from "@storybook/react";
import { Loading } from "../../Components/Loading/Loading";

/**
 * Loading component
 *
 */
export default {
    title: "Loading/Loading",
    component: Loading,
} as Meta;

type Story = StoryObj<typeof Loading>;

/**
 * Loading component
 */
export const LoadingSample: Story = {};
