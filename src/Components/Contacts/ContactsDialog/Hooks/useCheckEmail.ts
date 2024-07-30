/**
 * @file 验证邮箱
 * @date 2023-06-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-16
 */
import { useContactsDialog } from "../Unit/context";

export const useCheckEmail = () => {
    const { selectedContactRef } = useContactsDialog();

    return () => {
        if (
            !selectedContactRef.current.email ||
            /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/i.test(selectedContactRef.current.email)
        ) {
            return undefined;
        }

        return "error";
    };
};
