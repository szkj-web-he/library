/**
 * @file
 * @date 2022-05-20
 * @author
 * @lastModify  2022-05-20
 */
import { StoryObj, Meta } from "@storybook/react";
import { Keyword } from "../../Components/Zmz/Keyword";
export default {
    title: "Zmz/Keyword",
    component: Keyword,
} as Meta;

type Story = StoryObj<typeof Keyword>;

export const DefaultKeywordSample: Story = {
    args: {
        animationTime: 0,
        // defaultKeywords: [{ value: "Official" }],
    },
};
