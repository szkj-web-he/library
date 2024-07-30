/**
 * @file 联系人下拉框组件
 * @date 2023-06-17
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-17
 */

import { Meta, StoryObj } from "@storybook/react";
import { ContactsDropdown } from "../../Components/Contacts/ContactsDropdown";

export default {
    title: "Contacts/ContactsDropdown",
    component: ContactsDropdown,
} as Meta;

type Story = StoryObj<typeof ContactsDropdown>;

export const DefaultSimple: Story = {
    args: {},
};
