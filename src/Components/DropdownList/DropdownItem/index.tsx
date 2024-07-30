/**
 * @file
 * @date 2023-02-28
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-28
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, ForwardRefRenderFunction } from "react";
import classNames from "../../../Unit/classNames";
import styles from "./style.module.scss";
import { useEffect } from "react";
import { useSingleDropdownContext } from "../SingleDropdown/Unit/context";
import { useHoverTips } from "../TipsContainer/useTips";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 子内容
     */
    children?: React.ReactNode;
    /**
     * 每个下拉项的唯一标识
     * 这个和 dropdown list的 value相对应
     * 如果相同 则标识为选中
     * * 必传
     */
    uuid: string | number;
    /**
     * 禁用时的文字提示
     */
    tipsOnDisable?: React.ReactNode;
    /**
     * 是否禁用
     */
    disable?: boolean;
    /**
     * 是否只读
     */
    readonly?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
/**
 * @bate 开始公测
 * 可能会因为新功能的添加而做出调整
 */
export const Temp: ForwardRefRenderFunction<HTMLDivElement | null, DropdownItemProps> = (
    {
        children,
        className,
        uuid,
        style,
        onClick,
        tipsOnDisable,
        disable,
        onMouseEnter,
        onMouseMove,
        readonly,
        ...props
    },
    ref,
) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { setUUid, currentUUid, changeVisibleFn, lineHeight, uuidToChild } =
        useSingleDropdownContext();

    const [toShowTips, tipsContent] = useHoverTips(tipsOnDisable);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        uuidToChild.current = Object.assign({}, { ...uuidToChild.current }, { [uuid]: children });
        return () => {
            delete uuidToChild.current?.[uuid];
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, uuid]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <div
                className={classNames(styles.dropdownItem_wrapper, className, {
                    [styles.dropdownItem_active]: currentUUid === uuid,
                    [styles.dropdownItem_disable]: disable,
                })}
                ref={(el) => {
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        ref.current = el;
                    }
                }}
                onClick={(e) => {
                    onClick?.(e);
                    if (disable || readonly) {
                        return;
                    }
                    setUUid(uuid);
                    changeVisibleFn.current?.(false);
                }}
                style={{
                    ...style,
                    lineHeight,
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
                {...props}
            >
                {children}
            </div>
            {tipsContent}
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export const DropdownItem = forwardRef(Temp);
