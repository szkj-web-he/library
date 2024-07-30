/**
 * @file MarkButton
 * @date 2022-03-03
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-03
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useSlateSelector, useSlateStatic } from "slate-react";
import { Popover } from "../../..";
import { langConfig } from "../../../DefaultData/TextEditor/blockBtn";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { BlockProps, isBlockActive, toggleBlock } from "../Unit/command";
import { useToolContext, useToolDisable } from "../Unit/toolContext";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface BlockButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 组件的 block command
     */
    format: BlockProps;
    /**
     * 活跃时的className
     */
    activeClassName?: string;
    /**
     * 渲染 的回调函数
     */
    render?: (res?: boolean) => React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const BlockButton = forwardRef<HTMLDivElement, BlockButtonProps>(
    ({ render, format, className, style, title, activeClassName, ...props }, ref) => {
        BlockButton.displayName = "BlockButton";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const editor = useSlateStatic();

        const { active, isFalse } = useToolContext();

        const isActive = useSlateSelector((e) => {
            return isBlockActive(e, format);
        });

        const { t } = useTranslation();

        //这里添加翻译文件
        useLangConfig("TextEditBlockBtnComponent", langConfig);

        const isDisabled = useToolDisable();
        /* <------------------------------------ **** STATE END **** ------------------------------------ */

        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const handleMouseDown = (event: React.MouseEvent) => {
            event.preventDefault();

            toggleBlock(editor, format);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        const content = (
            <div
                className={classNames(
                    styles.blockButton_wrap,
                    className,
                    activeClassName && { [activeClassName]: isActive },
                )}
                ref={ref}
                style={Object.assign({}, style)}
                onMouseDown={handleMouseDown}
                {...props}
            >
                {render ? render(isActive) : format}
            </div>
        );

        if (isDisabled) {
            return content;
        }
        return (
            <Popover
                className={styles.blockButton_kite}
                show={!active && !isFalse ? false : undefined}
                root={content}
            >
                {title ?? t(`TextEditBlockBtnComponent.${format}`)}
            </Popover>
        );
    },
);
BlockButton.displayName = "BlockButton";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
