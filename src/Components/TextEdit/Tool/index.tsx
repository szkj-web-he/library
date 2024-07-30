/**
 * @file Tool
 * @date 2022-03-01
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    forwardRef,
    Fragment,
    startTransition,
    useEffect,
    useInsertionEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { Editor, Range } from "slate";
import { useFocused, useSlateSelector } from "slate-react";
import { EditorImage, Icon } from "../../..";
import classNames from "../../../Unit/classNames";
import { main } from "../../Common/Kite/Unit/autoPosition";
import { setStyle } from "../../Common/Transition/Unit/addStyle";
import { EditorBackground } from "../Background";
import { BlockButton } from "../BlockButton";
import { EditorColor } from "../Color";
import { EditorCopy } from "../Copy";
import { EditorFontSize } from "../FontSize";
import { MarkButton } from "../MarkButton";
import { ToolContext } from "../Unit/toolContext";
import styles from "./style.module.scss";
import { mountElement } from "../../Cover/Unit/mountEl";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface TextEditToolProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Which element to mount the toolbar on
     */
    mount?: HTMLElement;
    /**
     * 工具栏
     */
    toolList?: Array<
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
        | React.ReactNode
    >;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const TextEditTool = forwardRef<HTMLDivElement, TextEditToolProps>(
    ({ className, toolList, mount, style, ...props }, ref) => {
        TextEditTool.displayName = "TextEditTool";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const cRef = useRef<HTMLDivElement | null>(null);

        const autoPosition = useRef<ReturnType<typeof main>>();

        const inFocus = useFocused();

        const [active, setActive] = useState(false);

        const positionRef = useRef<{ x: number; y: number }>();

        const selectionData = useSlateSelector(
            (e) => {
                const { selection } = e;
                return {
                    collapsedStatus: selection ? Range.isCollapsed(selection) : true,
                    text: selection ? Editor.string(e, selection) : undefined,
                };
            },
            (a, b) => {
                return JSON.stringify(a) === JSON.stringify(b);
            },
        );

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        useInsertionEffect(() => {
            autoPosition.current = main();
        }, []);

        useEffect(() => {
            const fn = () => {
                const el = cRef.current;

                if (selectionData.collapsedStatus || !selectionData.text) {
                    setActive(false);
                    return;
                }
                if (!inFocus) {
                    setActive(false);
                    return;
                }

                if (!el) {
                    return;
                }
                setActive(true);
                const rect = el.getBoundingClientRect();
                const domSelection = window.getSelection();
                if (domSelection && domSelection.type !== "None") {
                    const domRange = domSelection?.getRangeAt(0);
                    const range = domRange?.getBoundingClientRect();
                    if (range && autoPosition.current) {
                        const { menu } = autoPosition.current({
                            btnRect: range,
                            triangleSize: [0, 0],
                            menuSize: { width: rect.width, height: rect.height },
                            direction: "vertical",
                            placement: "lt",
                            offset: {},
                        });
                        setStyle(el, {
                            left: `${menu[0]}px`,
                            top: `${menu[1]}px`,
                        });
                        positionRef.current = {
                            x: menu[0],
                            y: menu[1],
                        };
                    }
                }
            };
            startTransition(fn);
        }, [selectionData, inFocus]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const activeClassName = styles.textEditTool_active;

        /**
         * 字体按钮
         */
        const fontBtn = () => {
            const contentEl = (res: number | undefined) =>
                res ? (
                    <span className={styles.textEditTool_fontSize}>{res}</span>
                ) : (
                    <Icon type="fontSize" className={styles.textEditTool_fontSizeIcon} />
                );

            return (
                <EditorFontSize
                    activeClassName={activeClassName}
                    render={(res) => {
                        return contentEl(res);
                    }}
                />
            );
        };

        /**
         * 斜体按钮
         */
        const italicBtn = () => {
            const contentEl = <Icon type="incline" className={styles.textEditTool_inclineIcon} />;

            return (
                <MarkButton
                    format="italic"
                    activeClassName={activeClassName}
                    render={() => contentEl}
                />
            );
        };

        /**
         * 加粗按钮
         */
        const boldBtn = () => {
            const contentEl = <Icon type="bold" className={styles.textEditTool_boldIcon} />;

            return (
                <MarkButton
                    format="bold"
                    activeClassName={activeClassName}
                    render={() => contentEl}
                />
            );
        };

        /**
         * 下划线按钮
         */
        const underlineBtn = () => {
            const contentEl = (
                <Icon type="underline" className={styles.textEditTool_underlineIcon} />
            );

            return (
                <MarkButton
                    format="underline"
                    activeClassName={activeClassName}
                    render={() => contentEl}
                />
            );
        };

        /**
         * 删除线按钮
         */
        const lineThroughBtn = () => {
            const contentEl = (
                <Icon type="lineThrough" className={styles.textEditTool_lineThroughIcon} />
            );

            return (
                <MarkButton
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
            const contentEl = <Icon type="fontColor" className={styles.textEditTool_colorIcon} />;
            return <EditorColor activeClassName={activeClassName} render={() => contentEl} />;
        };

        /**
         * 背景色按钮
         */
        const backgroundBtn = () => {
            const contentEl = (
                <Icon type="chooseColor" className={styles.textEditTool_backgroundIcon} />
            );

            return <EditorBackground activeClassName={activeClassName} render={() => contentEl} />;
        };

        /**
         * 左对齐按钮
         */
        const leftAlignBtn = () => {
            const contentEl = <Icon type="textLeft" className={styles.textEditTool_leftIcon} />;
            return (
                <BlockButton
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
            const contentEl = <Icon type="textCenter" className={styles.textEditTool_centerIcon} />;
            return (
                <BlockButton
                    format="center-align"
                    activeClassName={activeClassName}
                    render={() => contentEl}
                />
            );
        };

        /**
         * 右对齐按钮
         */
        const rightAlignBtn = () => {
            const contentEl = <Icon type="textRight" className={styles.textEditTool_rightIcon} />;

            return (
                <BlockButton
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
            const contentEl = <Icon type="copy" className={styles.textEditTool_copyIcon} />;
            return <EditorCopy>{contentEl}</EditorCopy>;
        };

        /**
         * 插入图片按钮
         */
        const inertImgBtn = () => {
            const contentEl = <Icon type="picture" className={styles.textEditTool_pIcon} />;

            return <EditorImage>{contentEl}</EditorImage>;
        };

        /**
         * 工具栏部分
         */
        const list = toolList?.length
            ? [...toolList]
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

        return createPortal(
            <div
                onMouseDown={(e) => e.preventDefault()}
                className={classNames(styles.textEditTool_wrap, className, {
                    [styles.textEditTool_wrap__active]: active,
                })}
                ref={(el) => {
                    cRef.current = el;
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref !== null) {
                        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
                    }
                }}
                {...props}
                style={{
                    zIndex: 99,
                    ...style,
                    ...{
                        left: `${positionRef.current?.x ?? 0}px`,
                        top: `${positionRef.current?.y ?? 0}px`,
                    },
                }}
            >
                <ToolContext.Provider
                    value={{
                        isFalse: false,
                        active,
                    }}
                >
                    {els}
                </ToolContext.Provider>
            </div>,
            mountElement(mount),
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
TextEditTool.displayName = "TextEditTool";
