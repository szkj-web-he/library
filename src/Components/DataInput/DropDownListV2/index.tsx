/**
 * @file drop down list v2
 * @date 2021-08-18
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-18
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useMemo, useRef, useState } from "react";
import styles from "./style.module.scss";
import { Icon, Kite, nextFrame, ScrollComponent } from "../../..";
import { isTrue } from "../../Table/Unit/isTrue";
import classNames from "../../../Unit/classNames";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
interface Label {
    content: React.ReactNode | "/";
    isError?: boolean;
    id: string | number;
    children?: {
        content: React.ReactNode;
        id: string | number;
    }[];
}

type ListItem = Label & {
    subsId: (string | number)[];
    parentsId: (string | number)[];
};

/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface DropDownListV2Props {
    /**
     * floating size
     */
    size?: "small" | "normal" | "large" | "extraLarge";
    /**
     * disabled of input container
     */
    disabled?: boolean;
    /**
     * labels of this component
     */
    labels?: {
        content: React.ReactNode | "/";
        isError?: boolean;
        id: string | number;
        children?: {
            content: React.ReactNode;
            id: string | number;
        }[];
    }[];
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of floating container
     */
    floatingStyle?: React.CSSProperties;
    /**
     * width of input container
     */
    width?: string;
    /**
     * height of input container
     */
    height?: string;
    /**
     * Floating triangle size
     */
    triangleSize?: {
        w: string;
        h: string;
    };
    /**
     * Floating triangle color
     */
    triangleColor?: string;
    /**
     * Floating className
     */
    floatingClassName?: string;
    /**
     * Floating direction
     */
    direction?: "vertical" | "horizontal";
    /**
     * Floating starting position
     */
    startingPosition?: "lb" | "rb" | "cb" | "lt" | "rt" | "ct" | "rc" | "lc";
    /**
     * placeholder of this component
     */
    placeholder?: string;
    /**
     * defaultValue of this component
     */
    defaultValue?: string | number;
    /**
     * handle selected value change fn
     */
    handleValueChange?: (id: number | string) => void;
    /**
     * custom content
     */
    customContent?: React.ReactNode;
    /**
     * onChangeComplete
     */
    onChangeComplete?: (
        content: React.ReactNode,
        childList: (number | string)[],
        parentList: (number | string)[],
    ) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
/**
 * @deprecated 将在V0.3.0被废弃
 */
export const DropDownListV2: React.FC<DropDownListV2Props> = ({
    size = "large",
    disabled = false,
    labels,
    className,
    floatingStyle,
    width = "22rem",
    height = "3rem",
    triangleSize,
    triangleColor,
    floatingClassName,
    direction,
    startingPosition = "lb",
    placeholder,
    defaultValue,
    handleValueChange,
    customContent,
    onChangeComplete,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLDivElement | null>(null);
    const [subRef, setSubRef] = useState<HTMLDivElement>();
    const [subVisibleStatus, setSubVisibleStatus] = useState(false);
    const [visibleStatus, setVisibleStatus] = useState(false);
    const [subContent, setSubContent] = useState<Label>();
    const frameTimer = useRef<null | number>(null);

    const labelList = useMemo(() => {
        // Deep Recursion Algorithm
        const recursion: (
            list: Label[],
            container: ListItem[],
            parentsId: (string | number)[],
        ) => void = (list, container, parentsId) => {
            list.forEach((index, n) => {
                container[n] = {
                    content: index.content,
                    id: index.id,
                    isError: index.isError,
                    subsId: [],
                    parentsId,
                };

                if (index.children) {
                    const idList: typeof parentsId = JSON.parse(JSON.stringify(parentsId));
                    idList.push(index.id);
                    container[n].children = [];
                    recursion(index.children, container[n].children as ListItem[], idList);
                    container[n].subsId = (container[n].children as ListItem[])
                        .map((item) => {
                            const childIdList: (string | number)[] = JSON.parse(
                                JSON.stringify(item.subsId),
                            );
                            childIdList.push(item.id);
                            return childIdList;
                        })
                        .flat();
                }
            });
        };
        const container: ListItem[] = [];
        recursion(labels || [], container, []);
        return container;
    }, [labels]);

    const selectContent = useMemo(() => {
        const contentArr: (JSX.Element | string)[] = [];
        if (isTrue(defaultValue) && labelList) {
            let status = false;
            const findVal = (id: number | string, list: ListItem[]) => {
                for (let i = 0; i < list.length; i++) {
                    if (status) {
                        break;
                    }
                    if (list[i].id === id) {
                        status = true;
                        if (contentArr.length > 0) {
                            contentArr.push(
                                <span
                                    className={styles.dropDownListV2_cutLine}
                                    key={`/${list[i].id}`}
                                >
                                    /
                                </span>,
                            );
                        }
                        contentArr.push(<div key={`content${list[i].id}`}>{list[i].content}</div>);
                        onChangeComplete &&
                            onChangeComplete(list[i].content, list[i].subsId, list[i].parentsId);
                        break;
                    } else if (list[i].children) {
                        if (list[i].subsId.some((item) => item === defaultValue)) {
                            if (contentArr.length > 0) {
                                contentArr.push(
                                    <span
                                        className={styles.dropDownListV2_cutLine}
                                        key={`/${list[i].id}`}
                                    >
                                        /
                                    </span>,
                                );
                            }
                            contentArr.push(
                                <div key={`content${list[i].id}`}>{list[i].content}</div>,
                            );
                        }

                        findVal(id, list[i].children as ListItem[]);
                    }
                }
            };
            findVal(defaultValue as string | number, labelList);
        }
        return contentArr;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue, labelList]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClickMethods = (item: Label, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (item.children?.length) {
            e.stopPropagation();
            return;
        }
        handleValueChange?.(item.id);
    };

    const handleMouseEnter = (item: Label, e: React.MouseEvent) => {
        if (item.children) {
            frameTimer.current && window.cancelAnimationFrame(frameTimer.current);
            setSubVisibleStatus(true);
            setSubRef(e.currentTarget as HTMLDivElement);
            setSubContent(item);
        } else {
            void nextFrame(
                () => {
                    setSubVisibleStatus(false);
                    setSubRef(undefined);
                    setSubContent(undefined);
                },
                frameTimer,
                3,
            );
        }
    };

    const handleMouseLeave = () => {
        void nextFrame(
            () => {
                setSubVisibleStatus(false);
                setSubRef(undefined);
                setSubContent(undefined);
            },
            frameTimer,
            3,
        );
    };

    const labelsEl = () => {
        const radioList = (list: Label[]) =>
            list.map((index, n) => {
                const isSelectActive = index.id === defaultValue;
                const isHoverActive = index.id === subContent?.id;

                return index.content === "/" ? (
                    <li key={index.id} className={styles.dropDownListV2_labelHr} />
                ) : (
                    <li
                        key={index.id}
                        className={
                            (n + 1 >= list.length || list[n + 1].content === "/"
                                ? styles.dropDownListV2_floatingLabelLast
                                : styles.dropDownListV2_floatingLabel) +
                            (index.isError
                                ? ` ${styles.dropDownListV2_floatingLabel__error}`
                                : "") +
                            (isSelectActive
                                ? ` ${styles.dropDownListV2_floatingLabelActive}`
                                : "") +
                            (isHoverActive
                                ? ` ${styles.dropDownListV2_floatingLabel__hoverActive}`
                                : "")
                        }
                        onMouseEnter={(e: React.MouseEvent) => {
                            handleMouseEnter(index, e);
                        }}
                        onMouseLeave={() => {
                            handleMouseLeave();
                        }}
                    >
                        <div className={styles.dropDownListV2_labelContainer}>
                            <div
                                className={
                                    styles.dropDownListV2_labelContent +
                                    (index.children ? ` ${styles.dropDownListV2_labelSibling}` : "")
                                }
                                onClick={(e) => {
                                    handleClickMethods(index, e);
                                    setVisibleStatus(false);
                                }}
                            >
                                {index.content}
                            </div>
                            {index.children && (
                                <Icon type="open" className={styles.dropDownListV2_labelIcon} />
                            )}
                        </div>
                    </li>
                );
            });

        return (
            labelList && (
                <ul className={styles.dropDownListV2_floatingLabels}>{radioList(labelList)}</ul>
            )
        );
    };

    const rootEl = () => (
        <div
            className={classNames(styles.dropDownListV2_wrap, className)}
            style={{
                width,
                height,
            }}
            onClick={() => {
                !disabled && setVisibleStatus(!visibleStatus);
            }}
        >
            {customContent || (
                <div
                    className={classNames(styles.dropDownListV2_container, {
                        [`${styles.dropDownListV2_wrap__disabled}`]: disabled,
                    })}
                    tabIndex={-1}
                >
                    {selectContent.length ? (
                        <div className={styles.dropDownListV2_content}>{selectContent}</div>
                    ) : (
                        <div className={styles.dropDownListV2_placeholder}>{placeholder}</div>
                    )}
                    <Icon
                        type="dropdown"
                        className={styles.dropDownListV2_dropdownIcon}
                        style={{
                            transform: visibleStatus ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                    />
                </div>
            )}
        </div>
    );

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <Kite
                show={visibleStatus}
                root={rootEl()}
                handleGlobalClick={(res) => {
                    if (!res.isBtn && !res.isMenu && visibleStatus) {
                        setVisibleStatus(false);
                    }
                }}
                ref={ref}
                triangle={{
                    width: triangleSize?.w || "0",
                    height: triangleSize?.h || "0",
                    color: triangleColor,
                }}
                className={floatingClassName}
                direction={direction}
                placement={startingPosition}
            >
                <ScrollComponent
                    stopPropagation={true}
                    className={styles[`dropDownListV2_floatingWrap__${String(size)}`]}
                    style={floatingStyle}
                >
                    <>{labelsEl()}</>
                </ScrollComponent>
            </Kite>

            {subRef && (
                <Kite
                    root={subRef}
                    show={subVisibleStatus && visibleStatus}
                    direction="horizontal"
                    placement="rt"
                    mount={ref.current || undefined}
                    onMouseEnter={() => {
                        setSubVisibleStatus(true);
                        frameTimer.current && window.cancelAnimationFrame(frameTimer.current);
                    }}
                    onMouseLeave={() => {
                        void nextFrame(
                            () => {
                                setSubVisibleStatus(false);
                                setSubRef(undefined);
                                setSubContent(undefined);
                            },
                            frameTimer,
                            3,
                        );
                    }}
                >
                    <div
                        className={styles.dropDownListV2_subFloatingWrap}
                        style={{
                            width: `${String(subRef?.offsetWidth)}px`,
                        }}
                    >
                        <ul>
                            {subContent &&
                                (
                                    subContent.children as {
                                        content: React.ReactNode;
                                        id: string | number;
                                    }[]
                                ).map((index) => {
                                    const isActive = defaultValue === index.id;
                                    return (
                                        <li
                                            key={index.id}
                                            className={
                                                styles.dropDownListV2_subFloatingLabel +
                                                (isActive
                                                    ? " " +
                                                      styles.dropDownListV2_subFloatingLabel__active
                                                    : "")
                                            }
                                            onClick={() => {
                                                handleValueChange?.(index.id);
                                                setSubVisibleStatus(false);
                                                setVisibleStatus(false);
                                            }}
                                        >
                                            <Icon
                                                type="right"
                                                className={styles.dropDownListV2_subFloatingIcon}
                                            />
                                            <div
                                                className={styles.dropDownListV2_subFloatingContent}
                                            >
                                                {index.content}
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </Kite>
            )}
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
