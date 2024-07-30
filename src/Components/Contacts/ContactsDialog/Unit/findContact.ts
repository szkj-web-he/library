/**
 * @file 从联系人列表里找出对应的联系人
 * @date 2023-06-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-16
 */

import { deepCloneData } from "../../../..";
import { ContactProps } from "./type";

export const findContact = (contacts: ContactProps[], name: string) => {
    let data: null | ContactProps = null;
    for (let i = 0; i < contacts.length; ) {
        const item = contacts[i];
        if (item.name === name) {
            data = deepCloneData(item);
            i = contacts.length;
        } else {
            ++i;
        }
    }
    return data
        ? {
              name: data.name,
              email: data.contact.email,
              area: data.contact.area,
              country: data.contact.country,
              number: data.contact.number,
          }
        : null;
};

/**
 * 从联系人列表里找到指定的联系人的下标
 * @param contacts
 * @param name
 * @returns
 */
export const findContactIndex = (contacts: ContactProps[], name: string) => {
    let index = -1;
    for (let i = 0; i < contacts.length; ) {
        const item = contacts[i];
        if (item.name === name) {
            index = i;
            i = contacts.length;
        } else {
            ++i;
        }
    }
    return index;
};
