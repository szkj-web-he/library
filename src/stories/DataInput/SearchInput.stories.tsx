/**
 * @file SearchInput storybook
 * @date 2020-09-04
 * @author Andy
 * @lastModify Andy 2020-09-04
 */
import { StoryObj, Meta } from "@storybook/react";
import { SearchInput } from "../../Components/DataInput/SearchInput";

/**
 * SearchInput component
 *
 */
export default {
    title: "DataInput/SearchInput",
    component: SearchInput,
} as Meta;

type Story = StoryObj<typeof SearchInput>;

/**
 * SearchInput component normal
 *
 */
export const SearchNormal: Story = {
    args: {
        changeable: false,
    },
};

/**
 * SearchInput component changeable
 *
 */
export const SearchChangeable: Story = {
    args: {
        changeable: true,
    },
};
