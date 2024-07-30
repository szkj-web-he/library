/**
 * @file EditorBackground
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
import { langConfig } from "../../../DefaultData/TextEditor/background";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { ColorList } from "../ColorList";
import { isMarkActive, removeRichMark, setRichMark } from "../Unit/command";
import { useToolContext, useToolDisable } from "../Unit/toolContext";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface EditorBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
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
export const EditorBackground = forwardRef<HTMLDivElement, EditorBackgroundProps>(
    ({ className, style, render, activeClassName, title, ...props }, ref) => {
        EditorBackground.displayName = "EditorBackground";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const { active, isFalse } = useToolContext();

        const editor = useSlateStatic();

        const colorVal = useSlateSelector((e) => {
            return isMarkActive(e, "background") as string;
        });

        const { t } = useTranslation();

        //这里添加翻译文件
        useLangConfig("TextEditBackgroundComponent", langConfig);

        const isDisabled = useToolDisable();

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const handleClick = (colorValue: string) => {
            setRichMark(editor, "background", colorValue);
        };

        const removeBackground = () => {
            removeRichMark(editor, "background");
        };
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        const classNameVal = classNames(
            styles.editorBackground_wrap,
            className,
            activeClassName && {
                [activeClassName]: !!colorVal,
            },
        );

        const content = render ? render(colorVal || undefined) : "background";

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
                    className={styles.editorBackground_kite}
                    show={!active && !isFalse ? false : undefined}
                    root={
                        <DropdownBtn {...props} ref={ref} style={style} className={classNameVal}>
                            {content}
                        </DropdownBtn>
                    }
                >
                    {title ?? t("TextEditBackgroundComponent.Background")}
                </Popover>
                <DropdownContent
                    placement="cb"
                    triangle={{
                        width: "1.5rem",
                        height: "0.8rem",
                        color: "#fff",
                    }}
                >
                    <ColorList handleClick={handleClick} color={colorVal || undefined}>
                        <div className={styles.editorBackground_clear} onClick={removeBackground}>
                            <Icon type="clearColor" className={styles.editorBackground_clearIcon} />
                            {t("TextEditBackgroundComponent.Clear")}
                        </div>
                    </ColorList>
                </DropdownContent>
            </Dropdown>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
EditorBackground.displayName = "EditorBackground";
