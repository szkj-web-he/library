/**
 * @file ResetInput storybook
 * @date 2020-09-04
 * @author Andy
 * @lastModify Andy 2020-09-04
 */
import { StoryObj, Meta } from "@storybook/react";
import { ResetInput } from "../../Components/DataInput/ResetInput";
/**
 * ResetInput component
 *
 */
export default {
    title: "DataInput/ResetInput",
    component: ResetInput,
} as Meta;

type Story = StoryObj<typeof ResetInput>;
/**
 * ResetInput component
 *
 */
export const ResetInputSample: Story = {
    args: {
        onBlur: (res) => {
            console.log("onBlur", res);
        },
        onFocus: (res) => {
            console.log("onFocus", res);
        },
    },
};
