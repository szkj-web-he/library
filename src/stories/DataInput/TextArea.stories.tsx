/**
 * @file textarea storybook
 * @date 2020-09-04
 * @author Andy
 * @lastModify Andy 2020-09-04
 */
import { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "../../Components/DataInput/TextArea";

/**
 * textarea component
 *
 */
export default {
    title: "DataInput/TextArea",
    component: TextArea,
} as Meta;

type Story = StoryObj<typeof TextArea>;
/**
 * textarea component
 *
 */
export const TextAreaSample: Story = {
    args: {
        // onChange: () => {
        //     console.log("onChange");
        // },
        // onBlur: () => {
        //     console.log("onBlur");
        // },
        // onFocus: () => {
        //     console.log("onFocus");
        // },
    },
};
