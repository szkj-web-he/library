/**
 * @file 一个复选的树
 * @date 2023-03-03
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-03
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { useCheckTree } from "./Hooks/useCheckTree";
import { CheckTreeContext, CheckTreeState } from "./Unit/context";
import CheckTreeItem from "./Unit/item";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface CheckTreeProps {
    /**
     * 内容
     */
    children?: React.ReactNode;
    /**
     * 是否时禁用的
     */
    disable?: boolean;
    /**
     * 选中的item的Id
     */
    values?: Array<string>;
    /**
     * 当选中的values发生变化时
     */
    handleValuesChange?: (res: Array<string>) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
type CheckTreeComponent = React.FC<CheckTreeProps> & { Item: typeof CheckTreeItem };

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const CheckTree: CheckTreeComponent = ({ children, disable, values, handleValuesChange }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [dispatch, checkedDataRef] = useCheckTree(values, handleValuesChange);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <CheckTreeContext.Provider
            value={{
                disable,
                values,
            }}
        >
            <CheckTreeState.Provider
                value={{
                    dispatch,
                    checkedDataRef,
                }}
            >
                {children}
            </CheckTreeState.Provider>
        </CheckTreeContext.Provider>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

CheckTree.Item = CheckTreeItem;
export default CheckTree;
