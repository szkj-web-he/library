/**
 * @file 复选树的context
 * @date 2023-03-06
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-06
 */
import { createContext, useContext } from "react";
import { CheckTreeAction } from "../Hooks/useCheckTree";

/**
 * 全局参数
 */
interface CheckTreeContextProps {
    /**
     * 是否是禁用的
     */
    disable?: boolean;
    /**
     * 选中的items
     */
    values?: Array<string>;
}

export const CheckTreeContext = createContext<CheckTreeContextProps>({});

export const useCheckTreeContext = () => useContext(CheckTreeContext);

/**
 * 复选树的状态管理
 */
interface CheckTreState {
    checkedDataRef: React.MutableRefObject<Record<string, boolean>>;
    dispatch: (action: CheckTreeAction) => void;
}

export const CheckTreeState = createContext<CheckTreState>({
    checkedDataRef: { current: {} },
    dispatch: () => undefined,
});

export const useCheckTreeState = () => useContext(CheckTreeState);

/**
 * 父子通讯
 */

interface CheckTreePostMsgProps {
    /**
     * 深度
     */
    deep: number;
    /**
     * 父id
     */
    pId: string;
    /**
     * 子节点
     */
    siblings: React.MutableRefObject<string[]>;
    /**
     * 父级的通讯id
     */
    pMsgId?: string;
}

/**
 * 父子通讯的唯一桥梁
 */
export const CheckTreePostMsg = createContext<CheckTreePostMsgProps>({
    deep: 0,
    pId: "-1",
    siblings: { current: [] },
});

export const useCheckTreePostMsg = () => useContext(CheckTreePostMsg);
