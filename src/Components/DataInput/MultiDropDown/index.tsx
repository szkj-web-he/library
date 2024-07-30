/**
 * @file MultiDropDown
 * @date 2021-02-05
 * @author Andy Jiang
 * @lastModify Andy Jiang 2021-02-05
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef, useState } from "react";
import styles from "./style.module.scss";
import { Icon, Kite } from "../../..";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
type Item = {
    content: React.ReactNode;
    id: string | number;
};

export interface MultiDropDownProps {
    /**
     * width of label field
     */
    width?: string;
    /**
     * height of label field
     */
    height?: string;

    /**
     * Maximum number of choices
     */
    maxItems?: number;
    /**
     * type of the drop down list
     */
    type?: "button" | "single" | "multi";
    /**
     * label set
     * content : label content
     * id: label key
     */
    labelSet: {
        content: React.ReactNode;
        id: string | number;
    }[];

    /**
     * placeholder of this component
     */
    placeholder?: string;
    /**
     * focus style
     */
    focusStyle?: {
        [key: string]: string;
    };
    /**
     * custom style
     */
    style?: {
        [key: string]: string;
    };
    /**
     * custom className
     */
    className?: string;
    /**
     * default items
     */
    defaultItem?: (string | number)[];
    /**
     * handle change
     */
    handleChange?: (res: (string | number)[]) => void;
    /**
     * floating triangle size
     */
    triangleSize?: {
        w: string;
        h: string;
    };
    /**
     * floating class name
     */
    floatingClassName?: string;

    /**
     * Floating axis direction
     */
    direction?: "vertical" | "horizontal";
    /**
     * Origin in the main axis
     */
    startingPosition?: "lb" | "rb" | "cb" | "lt" | "rt" | "ct" | "rc" | "lc";
    /**
     * The selected item delimiter
     */
    separator?: React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
/**
 * @deprecated 将在复选树的下拉列表完成时移除
 */
export const MultiDropDown: React.FC<MultiDropDownProps> = ({
    width = "auto",
    height = "auto",
    maxItems = undefined,
    type = "single",
    placeholder = "Choose option",
    style,
    focusStyle,
    labelSet,
    defaultItem,
    className = "",
    handleChange = undefined,
    triangleSize,
    floatingClassName,
    direction,
    startingPosition,
    separator = <span style={{ fontWeight: "bold", color: "aquamarine" }}>/</span>,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    // handler click when  type === multi
    const toggleClick = (item: Item) => {
        const arr: (string | number)[] = Array.isArray(defaultItem)
            ? JSON.parse(JSON.stringify(defaultItem))
            : [];
        const n: number = arr.findIndex((index: string | number) => {
            return index === item.id;
        });
        if (n >= 0) {
            arr.splice(n, 1);
        } else {
            arr.push(item.id);
        }
        if (maxItems && arr.length > maxItems) return null;
        handleChange && handleChange([...arr]);
    };
    // Is this active
    const isMe = (index: Item) => {
        return defaultItem && defaultItem.some((item) => item === index.id);
    };
    /**
     * get list element
     */
    const getListElement = () => {
        if (type === "multi") {
            return (
                <ul
                    className={styles.multiDropDown_list}
                    style={ref.current ? { width: String(ref.current.offsetWidth) + "px" } : {}}
                >
                    {labelSet.map((index) => (
                        <li
                            key={index.id}
                            onClick={() => {
                                toggleClick(index);
                            }}
                            className={
                                styles.multiDropDown_Item +
                                (isMe(index) ? " " + styles.multiDropDown_ItemActive : "")
                            }
                        >
                            <Icon
                                type={isMe(index) ? "checkboxSolid" : "checkboxEmpty"}
                                className={
                                    styles.multiDropDown_check +
                                    (isMe(index) ? " " + styles.multiDropDown_ItemActive : "")
                                }
                            />

                            {index.content}
                        </li>
                    ))}
                </ul>
            );
        } else {
            return (
                <ul
                    className={styles.multiDropDown_list}
                    style={ref.current ? { width: String(ref.current.offsetWidth) + "px" } : {}}
                >
                    {labelSet.map((index) => (
                        <li
                            key={index.id}
                            onClick={() => {
                                setVisible(false);
                                handleChange && handleChange([index.id]);
                            }}
                            className={
                                styles.multiDropDown_Item +
                                (isMe(index) ? " " + styles.multiDropDown_ItemActive : "")
                            }
                        >
                            {index.content}
                        </li>
                    ))}
                </ul>
            );
        }
    };

    const rootEl = () => {
        return (
            <div
                ref={ref}
                className={
                    styles.multiDropDown_container +
                    (className ? " " + className : "") +
                    (width === "auto" ? " " + styles.multiDropDown_nowrap : "") +
                    (type === "button" ? " " + styles.buttonDropDown_container : "")
                }
                style={Object.assign(
                    {},
                    style,
                    visible && (focusStyle ? focusStyle : { borderColor: "#478da5" }),
                    { width, height },
                )}
                onClick={() => {
                    setVisible(!visible);
                }}
            >
                <div className={styles.multiDropDown_input}>
                    <div
                        className={styles.multiDropDown_placeholder}
                        style={
                            Array.isArray(defaultItem) && defaultItem.length
                                ? { display: "none" }
                                : {}
                        }
                    >
                        {placeholder}
                    </div>
                    <ul
                        className={styles.multiDropDown_selectList}
                        style={Object.assign(
                            {},
                            defaultItem === undefined || defaultItem.length < 1
                                ? { display: "none" }
                                : {},
                        )}
                    >
                        {Array.isArray(defaultItem) &&
                            defaultItem.map((index, n) => (
                                <li key={index} className={styles.multiDropDown_selectListItem}>
                                    {(() => {
                                        const data = labelSet.find((item) => item.id === index);
                                        return data && data.content;
                                    })()}
                                    {n < defaultItem.length - 1 && separator}
                                </li>
                            ))}
                    </ul>
                </div>
                <Icon
                    type="dropdown"
                    className={styles.multiDropDown_drop}
                    style={visible ? { transform: "rotate(180deg)" } : {}}
                />
            </div>
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Kite
            show={visible}
            root={rootEl()}
            triangle={{
                width: triangleSize?.w || "0",
                height: triangleSize?.h || "0",
            }}
            className={floatingClassName}
            direction={direction}
            placement={startingPosition}
            handleGlobalClick={(res) => {
                if (!res.isBtn && !res.isMenu && visible) {
                    setVisible(false);
                }
            }}
        >
            {getListElement()}
        </Kite>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
