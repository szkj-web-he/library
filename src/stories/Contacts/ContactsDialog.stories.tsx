/**
 * @file 联系人对话框组件
 * @date 2023-06-17
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-17
 */

import { Meta, StoryObj } from "@storybook/react";
import { ContactsDialog } from "../../Components/Contacts/ContactsDialog";

export default {
    title: "Contacts/ContactsDialog",
    component: ContactsDialog,
} as Meta;

type Story = StoryObj<typeof ContactsDialog>;

export const ContactsArg: Story = {
    args: {},
};
