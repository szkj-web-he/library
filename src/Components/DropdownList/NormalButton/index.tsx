/**
 * @file 普通的btn，icon或者是文本btn
 * @date 2023-03-01
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { DropdownBtn, Icon } from "../../..";
import classNames from "../../../Unit/classNames";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface NormalBtnForDropdownProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "disable"> {
    /**
     * 是否有dropdown的icon
     * 如果有在左边还是在右边
     * * 默认值为 undefined
     */
    dropdownIcon?: "left" | "right";

    /**
     * 内容
     */
    children?: React.ReactNode;

    /**
     * 是否为活跃的
     */
    active?: boolean;
    /**
     * 是否为禁用的
     */
    disable?: boolean;
    /**
     *
     */
    disableTips?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
/**
 * @bate 开始公测
 * 可能会因为新功能的添加而做出调整
 */
const Temp: ForwardRefRenderFunction<HTMLDivElement | null, NormalBtnForDropdownProps> = (
    { className, children, dropdownIcon, active, disable, ...props },
    ref,
) => {
    let content = <></>;

    if (dropdownIcon) {
        /**
         * dropdownIcon
         */
        const dropdownWrap: React.ReactNode = (
            <div
                className={classNames(
                    styles.normalBtnForDropdown_iconContainer,
                    styles[`normalBtnForDropdown_${dropdownIcon}`],
                )}
            >
                <Icon type="dropdown" className={styles.normalBtnForDropdown_icon} />
            </div>
        );
        if (dropdownIcon === "left") {
            content = (
                <>
                    {dropdownWrap}
                    {children}
                </>
            );
        } else {
            content = (
                <>
                    {children}
                    {dropdownWrap}
                </>
            );
        }
    } else {
        content = <>{children}</>;
    }
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <DropdownBtn
            className={classNames(styles.normalBtnForDropdown_wrapper, className, {
                [styles.normalBtnForDropdown_active]: active,
                [styles.normalBtnForDropdown_disable]: disable,
            })}
            ref={ref}
            {...props}
        >
            {content}
        </DropdownBtn>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export const NormalBtnForDropdown = forwardRef(Temp);
