/**
 * @file
 * @date 2023-02-28
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-28
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef } from "react";
import { Icon } from "../../..";
import classNames from "../../../Unit/classNames";
import { DropdownBtn } from "../../Common/DropdownBtn";
import { useHoverTips } from "../TipsContainer/useTips";
import { useSingleDropdownContext } from "../SingleDropdown/Unit/context";
import styles from "./style.module.scss";
import { isNullOrUndefined } from "../../../Unit/utils";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface BorderButtonForDropdownProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "placeholder"> {
    /**
     * 提示文字
     * * 默认值: 请选择...
     */
    placeholder?: React.ReactNode;
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
    /**
     * button的宽度
     */
    width?: string;
    /**
     * button的高度
     */
    height?: string;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
/**
 * @bate 开始公测
 * 可能会因为新功能的添加而做出调整
 */
const Temp: React.ForwardRefRenderFunction<HTMLDivElement | null, BorderButtonForDropdownProps> = (
    {
        placeholder = "请选择",
        className,
        contentRender,
        tipsOnDisable,
        onMouseEnter,
        onMouseMove,
        width,
        height,
        ...props
    },
    ref,
) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { open, currentUUid, uuidToChild, disable } = useSingleDropdownContext();

    const [toShowTips, tipsContent] = useHoverTips(tipsOnDisable);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    let content: React.ReactNode = undefined;
    if (contentRender) {
        content = contentRender?.(currentUUid, uuidToChild.current);
    } else {
        content = isNullOrUndefined(currentUUid) ? undefined : uuidToChild.current?.[currentUUid];
    }

    return (
        <DropdownBtn
            className={classNames(styles.borderButtonForDropdown_wrapper, className, {
                [styles.borderButtonForDropdown_active]: open,
                [styles.borderButtonForDropdown_disable]: disable,
            })}
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
            {...props}
        >
            <div className={styles.borderButtonForDropdown_border} />
            <div
                className={styles.borderButtonForDropdown_main}
                style={{
                    width,
                    height,
                }}
            >
                {content ? (
                    <span className={styles.borderButtonForDropdown_content}>{content}</span>
                ) : (
                    <span className={styles.borderButtonForDropdown_placeholder}>
                        {placeholder}
                    </span>
                )}

                <div className={styles.borderButtonForDropdown_iconContainer}>
                    <Icon type="dropdown" className={styles.borderButtonForDropdown_icon} />
                </div>
            </div>
            {tipsContent}
        </DropdownBtn>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export const BorderButtonForDropdown = forwardRef(Temp);
