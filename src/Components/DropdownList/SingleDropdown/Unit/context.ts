/**
 * @file radio dropdown的context
 * @date 2023-02-28
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-28
 */

import { createContext, MutableRefObject } from "react";
import { useContext } from "react";

interface SingleDropdownContextProps {
    /**
     * 设置uuid
     */
    setUUid: (res: string | number) => void;
    /**
     * 当前选中的Uuid
     */
    currentUUid?: string | number;
    /**
     * 修改可见状态
     */
    changeVisibleFn: MutableRefObject<React.Dispatch<React.SetStateAction<boolean>> | undefined>;
    /**
     * 每个item的line height
     */
    lineHeight?: string;
    /**
     * 是否被打开
     */
    open?: boolean;
    /**
     *
     */
    uuidToChild: MutableRefObject<Record<string, React.ReactNode> | undefined>;
    /**
     * 是否禁用
     */
    disable: boolean;
}

export const SingleDropdownContext = createContext<SingleDropdownContextProps>({
    setUUid: () => undefined,
    currentUUid: undefined,
    changeVisibleFn: { current: undefined },
    lineHeight: undefined,
    uuidToChild: { current: undefined },
    disable: false,
});

export const useSingleDropdownContext = () => useContext(SingleDropdownContext);
