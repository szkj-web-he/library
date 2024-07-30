/**
 * @file PasswordInput storybook
 * @date 2020-09-04
 * @author Andy
 * @lastModify Andy 2020-09-04
 */
import { StoryObj, Meta } from "@storybook/react";
import { PasswordInput } from "../../Components/DataInput/PasswordInput";

/**
 * PasswordInput component
 *
 */
export default {
    title: "DataInput/PasswordInput",
    component: PasswordInput,
} as Meta;

type Story = StoryObj<typeof PasswordInput>;
/**
 * PasswordInput component
 *
 */
export const Password: Story = {};
