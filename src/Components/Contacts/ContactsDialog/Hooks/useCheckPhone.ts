/**
 * @file 校验名称是否有效
 * @date 2023-06-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-16
 */

import { useContactsDialog } from "../Unit/context";

export const useCheckPhone = () => {
    const { selectedContactRef } = useContactsDialog();

    return () => {
        const data = selectedContactRef.current;
        if (data.area === "61" && data.number && /^[0-9]{10}$/.test(data.number)) {
            return undefined;
        }
        if (data.area === "86" && data.number && /^[0-9]{11}$/.test(data.number)) {
            return undefined;
        }

        if (!data.number) {
            return undefined;
        }
        return "error";
    };
};
