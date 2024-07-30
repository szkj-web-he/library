/**
 * @file UnderConstruction stories
 * @date 2021-04-15
 * @author xuejie.he
 * @lastModify  2021-04-15
 */
import { StoryObj, Meta } from "@storybook/react";
import { UnderConstruction } from "../../Components/UnderConstruction";

export default {
    title: "UnderConstruction/UnderConstruction",
    component: UnderConstruction,
} as Meta;

type Story = StoryObj<typeof UnderConstruction>;

/**
 * error style
 */
export const SimpleTemplate: Story = {
    args: {
        style: {
            height: "100vh",
        },
    },
};
