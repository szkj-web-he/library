/**
 * @file FontSize
 * @date 2022-03-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useSlateSelector } from "slate-react";
import { Dropdown, DropdownBtn, DropdownContent, Popover } from "../../..";
import { langConfig } from "../../../DefaultData/TextEditor/fontSize";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { isMarkActive } from "../Unit/command";
import { useToolContext, useToolDisable } from "../Unit/toolContext";
import styles from "./style.module.scss";
import { FontSizeList } from "./Unit/sizeList";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface EditorFontSizeProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 活跃时的className
     */
    activeClassName?: string;
    /**
     * 渲染 的回调函数
     */
    render?: (res?: number) => React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const EditorFontSize = forwardRef<HTMLDivElement, EditorFontSizeProps>(
    ({ className, style, render, activeClassName, title, ...props }, ref) => {
        EditorFontSize.displayName = "EditorFontSize";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const { active, isFalse } = useToolContext();

        const fontsize = useSlateSelector((e) => {
            return isMarkActive(e, "font-size") as number | false;
        });

        const { t } = useTranslation();

        //这里添加翻译文件
        useLangConfig("TextEditFontSizeComponent", langConfig);

        const isDisabled = useToolDisable();
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        const classNameVal = classNames(
            styles.editorFontSize_wrap,
            className,
            activeClassName && {
                [activeClassName]: !!fontsize,
            },
        );

        const content = render ? render(fontsize || undefined) : "font size";

        if (isDisabled) {
            return (
                <div {...props} ref={ref} style={style} className={classNameVal}>
                    {content}
                </div>
            );
        }

        return (
            <Dropdown trigger={"click"}>
                <Popover
                    className={styles.editorFontSize_kite}
                    show={!active && !isFalse ? false : undefined}
                    root={
                        <DropdownBtn {...props} ref={ref} style={style} className={classNameVal}>
                            {content}
                        </DropdownBtn>
                    }
                >
                    {title ?? t("TextEditFontSizeComponent.Font Size")}
                </Popover>
                <DropdownContent
                    placement="lb"
                    triangle={{
                        width: "2rem",
                        height: "1rem",
                        color: "#fff",
                    }}
                >
                    <FontSizeList />
                </DropdownContent>
            </Dropdown>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

EditorFontSize.displayName = "EditorFontSize";
