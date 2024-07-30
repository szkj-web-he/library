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
import { langConfig } from "../../../DefaultData/TextEditor/markButton";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { isMarkActive, MarkProps, toggleMark } from "../Unit/command";
import { useToolContext, useToolDisable } from "../Unit/toolContext";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface MarkButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 渲染 的回调函数
     */
    render?: (res?: boolean) => React.ReactNode;
    /**
     * 组件的mark
     */
    format: MarkProps;
    /**
     * 活跃时的className
     */
    activeClassName?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const MarkButton = forwardRef<HTMLDivElement, MarkButtonProps>(
    ({ render, format, className, style, activeClassName, title, ...props }, ref) => {
        MarkButton.displayName = "MarkButton";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const editor = useSlateStatic();

        const { isFalse, active } = useToolContext();

        const isActive = useSlateSelector((e) => {
            return !!isMarkActive(e, format);
        });

        const { t } = useTranslation();

        //这里添加翻译文件
        useLangConfig("TextEditMarkBtnComponent", langConfig);

        const isDisabled = useToolDisable();
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const handleMouseDown = (event: React.MouseEvent) => {
            event.preventDefault();

            toggleMark(editor, format);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        const content = (
            <div
                className={classNames(
                    styles.markButton_wrap,
                    className,
                    activeClassName && {
                        [activeClassName]: isActive,
                    },
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
                className={styles.markButton_kite}
                show={!active && !isFalse ? false : undefined}
                root={content}
            >
                {title ?? t(`TextEditMarkBtnComponent.${format}`)}
            </Popover>
        );
    },
);
MarkButton.displayName = "MarkButton";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
