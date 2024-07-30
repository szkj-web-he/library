/**
 * @file TagCard storybook
 * @date 2020-10-26
 * @author Andy
 * @lastModify Andy 2020-10-26
 */
import { StoryObj, Meta } from "@storybook/react";
import { TagCard } from "../../Components/DataDisplay/TagCard";

/**
 * TagCard component
 *
 */
export default {
    title: "DataDisplay/TagCard",
    component: TagCard,
} as Meta;

type Story = StoryObj<typeof TagCard>;

/**
 * TagCard component
 *
 */
export const TagCardSample: Story = {
    args: {},
};
