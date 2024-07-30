/**
 * @file avatarGroup的context
 * @date 2023-02-27
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-27
 */
import { createContext, useContext } from "react";

export const AvatarGroupParams = createContext<{
    margin?: number;
}>({
    margin: undefined,
});

export const useAvatarGroupParams = () => useContext(AvatarGroupParams);
