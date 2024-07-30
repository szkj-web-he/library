/**
 * @file 联系人的context
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */

import { createContext, useContext } from "react";
import { ContactProps } from "./type";

export interface SelectedContact {
    type: "add" | "edit";
    name: string;
    email?: string;
    area?: string;
    country?: string;
    number?: string;
    key: number;
}

interface ContextProps {
    /**
     * 联系人
     */
    contacts?: Array<ContactProps>;
    /**
     * 联系人
     */
    contactsRef: React.MutableRefObject<Array<ContactProps> | undefined>;
    /**
     * 选中的联系人
     */
    selectedContact: SelectedContact;
    /**
     * 选中的联系人
     */
    selectedContactRef: React.MutableRefObject<SelectedContact>;
}

export const Context = createContext<ContextProps>({
    contacts: undefined,
    selectedContact: {
        type: "add",
        name: "",
        key: 1,
    },
    selectedContactRef: {
        current: {
            type: "add",
            name: "",
            key: 1,
        },
    },
    contactsRef: {
        current: undefined,
    },
});

export const useContactsDialog = () => useContext(Context);

/******* 联系人的通讯密钥 *********/
export const ContactsMsgId = createContext("");
export const useContactsMsgId = () => useContext(ContactsMsgId);
