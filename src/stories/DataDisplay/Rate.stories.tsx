/**
 * @file rate stories
 * @date 2021-11-16
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-16
 */
import { StoryObj, Meta } from "@storybook/react";
import { Rate } from "../../Components/DataDisplay/Rate";

/**
 * TagCard component
 *
 */
export default {
    title: "DataDisplay/Rate",
    component: Rate,
} as Meta;

type Story = StoryObj<typeof Rate>;

/**
 * TagCard component
 *
 */
export const TagCardSample: Story = {
    args: {
        defaultValue: 2.5,
    },
};
