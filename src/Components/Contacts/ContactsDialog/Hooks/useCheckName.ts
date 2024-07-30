/**
 * @file 校验名称是否有效
 * @date 2023-06-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-16
 */

import { useContactsDialog } from "../Unit/context";

export const useCheckName = () => {
    const { selectedContactRef, contactsRef } = useContactsDialog();

    return () => {
        if (!selectedContactRef.current.name.length) {
            return "null";
        }

        if (contactsRef.current?.some((item) => item.name === selectedContactRef.current.name)) {
            return "repeat";
        }
        return undefined;
    };
};
