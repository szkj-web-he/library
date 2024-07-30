/**
 * @file 固定位置的富文本工具栏
 * @date 2023-03-17
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { Fragment, useRef } from "react";
import {
    BlockButton,
    EditorBackground,
    EditorColor,
    EditorCopy,
    EditorFontSize,
    EditorImage,
    Icon,
    MarkButton,
} from "../../../..";
import classNames from "../../../../Unit/classNames";
import { ToolDisableContext } from "../../Unit/toolContext";
import styles from "../styles.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * Rich Text Editor Toolbar
     */
    data?: Array<
        | "font-size"
        | "|"
        | "bold"
        | "italic"
        | "underline"
        | "line-through"
        | "color"
        | "background"
        | "left-align"
        | "center-align"
        | "right-align"
        | "copy"
        | "img"
        | React.ReactNode
    >;

    /**
     * 是否禁用
     */
    disable: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ data, disable }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const fontSize = useRef<number>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const className = classNames(styles.lockedEditor_markBtn, styles.lockedEditor_repeat);
    const activeClassName = styles.lockedEditor_active;

    /**
     * 字体按钮
     */
    const fontBtn = () => {
        const contentEl = () =>
            fontSize.current ? (
                <span className={styles.lockedEditor_fontSize}>{fontSize.current}</span>
            ) : (
                <Icon type="fontSize" className={styles.lockedEditor_fIcon} />
            );

        return (
            <EditorFontSize
                className={className}
                activeClassName={activeClassName}
                render={(res) => {
                    fontSize.current = res;
                    return contentEl();
                }}
            />
        );
    };

    /**
     * 斜体按钮
     */
    const italicBtn = () => {
        const contentEl = <Icon type="incline" className={styles.lockedEditor_iIcon} />;

        return (
            <MarkButton
                format="italic"
                className={className}
                activeClassName={activeClassName}
                render={() => contentEl}
            />
        );
    };

    /**
     * 加粗按钮
     */
    const boldBtn = () => {
        const contentEl = <Icon type="bold" className={styles.lockedEditor_bIcon} />;

        return (
            <MarkButton
                format="bold"
                className={className}
                activeClassName={activeClassName}
                render={() => contentEl}
            />
        );
    };

    /**
     * 下划线按钮
     */
    const underlineBtn = () => {
        const contentEl = <Icon type="underline" className={styles.lockedEditor_uIcon} />;

        return (
            <MarkButton
                format="underline"
                className={className}
                activeClassName={activeClassName}
                render={() => contentEl}
            />
        );
    };

    /**
     * 删除线按钮
     */
    const lineThroughBtn = () => {
        const contentEl = <Icon type="lineThrough" className={styles.lockedEditor_lIcon} />;

        return (
            <MarkButton
                className={className}
                format="line-through"
                activeClassName={activeClassName}
                render={() => contentEl}
            />
        );
    };

    /**
     * 字体颜色按钮
     */
    const fontColorBtn = () => {
        const contentEl = <Icon type="fontColor" className={styles.lockedEditor_cIcon} />;

        return (
            <EditorColor
                activeClassName={activeClassName}
                className={className}
                render={() => contentEl}
            />
        );
    };

    /**
     * 背景色按钮
     */
    const backgroundBtn = () => {
        const contentEl = (
            <Icon type="chooseColor" className={styles.lockedEditor_backgroundIcon} />
        );

        return (
            <EditorBackground
                className={className}
                activeClassName={activeClassName}
                render={() => contentEl}
            />
        );
    };

    /**
     * 左对齐按钮
     */
    const leftAlignBtn = () => {
        const contentEl = <Icon type="textLeft" className={styles.lockedEditor_leftIcon} />;

        return (
            <BlockButton
                className={className}
                format="left-align"
                activeClassName={activeClassName}
                render={() => contentEl}
            />
        );
    };

    /**
     * 居中对齐按钮
     */
    const centerAlignBtn = () => {
        const contentEl = <Icon type="textCenter" className={styles.lockedEditor_centerIcon} />;

        return (
            <BlockButton
                format="center-align"
                className={className}
                activeClassName={activeClassName}
                render={() => contentEl}
            />
        );
    };

    /**
     * 右对齐按钮
     */
    const rightAlignBtn = () => {
        const contentEl = <Icon type="textRight" className={styles.lockedEditor_rightIcon} />;

        return (
            <BlockButton
                className={className}
                format="right-align"
                activeClassName={activeClassName}
                render={() => contentEl}
            />
        );
    };

    /**
     * 复制按钮
     */
    const copyBtn = () => {
        const contentEl = <Icon type="copy" className={styles.lockedEditor_copyIcon} />;

        return <EditorCopy className={className}>{contentEl}</EditorCopy>;
    };

    /**
     * 插入图片按钮
     */
    const inertImgBtn = () => {
        const contentEl = <Icon type="picture" className={styles.lockedEditor_pIcon} />;

        return <EditorImage className={className}>{contentEl}</EditorImage>;
    };

    /**
     * 工具栏部分
     */
    const list = data?.length
        ? [...data]
        : [
              "font-size",
              "bold",
              "italic",
              "underline",
              "line-through",
              "|",
              "color",
              "background",
              "|",
              "left-align",
              "center-align",
              "right-align",
              "|",
              "copy",
              "|",
              "img",
          ];
    const els: React.ReactNode[] = [];
    for (let i = 0; i < list.length; i++) {
        const data = list[i];
        switch (data) {
            case "font-size":
                els.push(<Fragment key={`fontSize${i}`}>{fontBtn()}</Fragment>);
                break;
            case "bold":
                els.push(<Fragment key={`bold${i}`}>{boldBtn()}</Fragment>);
                break;
            case "italic":
                els.push(<Fragment key={`italic${i}`}>{italicBtn()}</Fragment>);
                break;
            case "underline":
                els.push(<Fragment key={`underline${i}`}>{underlineBtn()}</Fragment>);
                break;
            case "line-through":
                els.push(<Fragment key={`line-through${i}`}>{lineThroughBtn()}</Fragment>);
                break;
            case "|":
                els.push(<div className={styles.lockedEditor_markSplit} key={`|${i}`} />);
                break;
            case "color":
                els.push(<Fragment key={`font-color${i}`}>{fontColorBtn()}</Fragment>);
                break;
            case "background":
                els.push(<Fragment key={`background${i}`}>{backgroundBtn()}</Fragment>);
                break;
            case "left-align":
                els.push(<Fragment key={`left-align${i}`}>{leftAlignBtn()}</Fragment>);
                break;
            case "center-align":
                els.push(<Fragment key={`center-align${i}`}>{centerAlignBtn()}</Fragment>);
                break;
            case "right-align":
                els.push(<Fragment key={`right-align${i}`}>{rightAlignBtn()}</Fragment>);
                break;
            case "copy":
                els.push(<Fragment key={`copy${i}`}>{copyBtn()}</Fragment>);
                break;
            case "img":
                els.push(<Fragment key={`img${i}`}>{inertImgBtn()}</Fragment>);
                break;
            default:
                els.push(data);
                break;
        }
    }

    /**
     * 工具栏部分end
     */

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.lockedEditor_tool} onMouseDown={(e) => e.preventDefault()}>
            <ToolDisableContext.Provider value={disable}>{els}</ToolDisableContext.Provider>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
