/**
 * @file EditorCopy
 * @date 2022-03-07
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Editor, Range } from "slate";
import { useSlateSelector, useSlateStatic } from "slate-react";
import { message, Popover } from "../../..";
import { langConfig } from "../../../DefaultData/TextEditor/copy";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { copyCommand } from "../Unit/copy";
import { useToolContext, useToolDisable } from "../Unit/toolContext";
import styles from "./style.module.scss";
import { startTransition } from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface EditorCopyProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    /**
     * 活跃时的className
     */
    activeClassName?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const EditorCopy = forwardRef<HTMLDivElement, EditorCopyProps>(
    ({ children, className, style, title, ...props }, ref) => {
        EditorCopy.displayName = "EditorCopy";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        const editor = useSlateStatic();

        const { isFalse, active } = useToolContext();

        const { t } = useTranslation();

        const isGray = useSlateSelector((e) => {
            const { selection } = e;

            return !selection || Range.isCollapsed(selection) || Editor.string(e, selection) === "";
        });

        //这里添加翻译文件
        useLangConfig("TextEditCopyComponent", langConfig);

        const isDisabled = useToolDisable();
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const handleClick = () => {
            startTransition(() => {
                const { selection } = editor;
                if (selection && !Range.isCollapsed(selection)) {
                    void copyCommand().then((res) => {
                        typeof res === "string" &&
                            message.auto({
                                type: "success",
                                content: t("TextEditCopyComponent.Copy success"),
                            });
                    });
                }
            });
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        const content = (
            <div
                {...props}
                ref={ref}
                style={style}
                className={classNames(className, styles.editorCopy_wrap, {
                    [styles.editorCopy_gray]: isGray,
                })}
                onClick={handleClick}
            >
                {children}
            </div>
        );

        if (isDisabled) {
            return content;
        }

        return (
            <Popover
                className={styles.editorCopy_kite}
                show={!active && !isFalse ? false : undefined}
                root={content}
            >
                {title ?? t("TextEditCopyComponent.Copy")}
            </Popover>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
EditorCopy.displayName = "EditorCopy";
