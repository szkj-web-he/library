/**
 * @file EditorColor
 * @date 2022-03-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useSlateSelector, useSlateStatic } from "slate-react";
import { Dropdown, DropdownBtn, DropdownContent, Icon, Popover } from "../../..";
import { langConfig } from "../../../DefaultData/TextEditor/color";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { ColorList } from "../ColorList";
import { isMarkActive, removeRichMark, setRichMark } from "../Unit/command";
import { useToolContext, useToolDisable } from "../Unit/toolContext";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface EditorColorProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 活跃时的className
     */
    activeClassName?: string;
    /**
     * 渲染 的回调函数
     */
    render?: (res?: string) => React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const EditorColor = forwardRef<HTMLDivElement, EditorColorProps>(
    ({ className, style, render, activeClassName, title, ...props }, ref) => {
        EditorColor.displayName = "EditorColor";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const { active, isFalse } = useToolContext();

        const editor = useSlateStatic();

        const colorVal = useSlateSelector((e) => {
            return isMarkActive(e, "color") as string | false;
        });

        const { t } = useTranslation();

        //这里添加翻译文件
        useLangConfig("TextEditColorComponent", langConfig);

        const isDisabled = useToolDisable();
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const handleClick = (colorValue: string) => {
            setRichMark(editor, "color", colorValue);
        };

        const removeColor = () => {
            removeRichMark(editor, "color");
        };
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        const classNameVal = classNames(
            styles.editorColor_wrap,
            className,
            activeClassName && {
                [activeClassName]: !!colorVal,
            },
        );

        const content = render ? render(colorVal || undefined) : "color";

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
                    className={styles.editorColor_kite}
                    show={!active && !isFalse ? false : undefined}
                    root={
                        <DropdownBtn {...props} ref={ref} style={style} className={classNameVal}>
                            {content}
                        </DropdownBtn>
                    }
                >
                    {title ?? t("TextEditColorComponent.Font Color")}
                </Popover>
                <DropdownContent
                    placement="cb"
                    triangle={{
                        width: "2rem",
                        height: "1rem",
                        color: "#fff",
                    }}
                >
                    <ColorList handleClick={handleClick} color={colorVal || undefined}>
                        <div className={styles.editorColor_clear} onClick={removeColor}>
                            <Icon type="clearColor" className={styles.editorColor_clearIcon} />
                            {t("TextEditColorComponent.Clear")}
                        </div>
                    </ColorList>
                </DropdownContent>
            </Dropdown>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
EditorColor.displayName = "EditorColor";
