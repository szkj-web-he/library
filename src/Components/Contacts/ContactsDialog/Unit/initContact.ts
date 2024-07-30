/**
 * @file 初始化联系人
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */

import { ContactsDialogProps } from "..";
import { SelectedContact } from "./context";

export const initContact = (value: ContactsDialogProps["value"]): SelectedContact => {
    if (value?.length) {
        const item = value[0];
        return {
            type: "edit",
            name: item.name,
            email: item.contact.email,
            area: item.contact.area,
            country: item.contact.country,
            number: item.contact.number,
            key: Date.now(),
        };
    }

    return {
        type: "add",
        name: "",
        key: Date.now(),
    };
};
