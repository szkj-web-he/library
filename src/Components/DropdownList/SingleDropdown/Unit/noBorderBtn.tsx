/**
 * @file 单选下拉的无边框按钮
 * @date 2023-03-08
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { ForwardRefRenderFunction } from "react";
import { NormalBtnForDropdown } from "../../NormalButton";
import { useSingleDropdownContext } from "./context";
import { forwardRef } from "react";
import { useHoverTips } from "../../TipsContainer/useTips";
import { isNullOrUndefined } from "../../../../Unit/utils";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "disable"> {
    /**
     * 是否有dropdown的icon
     * 如果有在左边还是在右边
     * * 默认值为 undefined
     */
    dropdownIcon?: "left" | "right";
    /**
     * 重写content
     *
     * * 默认是  child[uuid] 也就是每个item的children
     */
    contentRender?: (
        uuid?: string | number,
        child?: Record<string, React.ReactNode>,
    ) => React.ReactNode;
    /**
     * 禁用时的文字提示
     */
    tipsOnDisable?: React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: ForwardRefRenderFunction<HTMLDivElement | null, TempProps> = (
    { contentRender, tipsOnDisable, onMouseEnter, onMouseMove, ...props },
    ref,
) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { open, disable, currentUUid, uuidToChild } = useSingleDropdownContext();

    const [toShowTips, tipsContent] = useHoverTips(tipsOnDisable);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    let content: React.ReactNode = undefined;
    if (contentRender) {
        /**
         * 重写 content的方法
         */
        content = contentRender?.(currentUUid, uuidToChild.current);
    } else {
        /**
         * 没有的话
         *  就不组件完成内容的渲染
         */
        content = isNullOrUndefined(currentUUid) ? undefined : uuidToChild.current?.[currentUUid];
    }
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <NormalBtnForDropdown
                active={open}
                disable={disable}
                {...props}
                ref={(el) => {
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        ref.current = el;
                    }
                }}
                onMouseEnter={(e) => {
                    if (disable) {
                        toShowTips(e);
                    }
                    onMouseEnter?.(e);
                }}
                onMouseMove={(e) => {
                    if (disable) {
                        toShowTips(e);
                    }
                    onMouseMove?.(e);
                }}
            >
                {content}
            </NormalBtnForDropdown>
            {tipsContent}
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default forwardRef(Temp);
