/**
 * @file drop down list v2
 * @date 2021-08-18
 * @author xuejie.he
 * @lastModify mingzhou.zhang 2022-11-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./style.module.scss";
import { Icon, Kite, ScrollComponent } from "../../..";
import { isTrue } from "../../Table/Unit/isTrue";
import classNames from "../../../Unit/classNames";
import { TAG_LIST } from "../../../DefaultData/DataInput/dropDownListV2";
import { TagItem, TagItemContent } from "./Unit/TagItem";
import { SubItem, SubItemContent } from "./Unit/SubItem";
import { ListItem } from "./Unit/ListItem";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
interface Label {
    content: React.ReactNode | "/";
    isError?: boolean;
    id: string | number;
    children?: SubItemContent[];
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
     * border of input container
     */
    border?: boolean;
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
    handleValueChange?: (id: number | string, list?: TagItemContent[]) => void;
    /**
     * custom content
     */
    customContent?: React.ReactNode;
    /**
     * list item is tag
     */
    isTag?: boolean;
    /**
     * whether the dropdown icon is front
     */
    isFront?: boolean;
    /**
     * custom DropdownIcon
     */
    customDropdownIcon?: React.ReactNode;
    /**
     * onChangeComplete
     */
    onChangeComplete?: (
        content: React.ReactNode,
        childList: (number | string)[],
        parentList: (number | string)[],
    ) => void;
    /**
     * hide timeout
     */
    hideTimeout?: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const DropDownListV2: React.FC<DropDownListV2Props> = ({
    size = "large",
    disabled = false,
    border = true,
    labels,
    className,
    floatingStyle,
    width,
    height,
    triangleSize,
    triangleColor,
    floatingClassName,
    direction,
    startingPosition = "lb",
    placeholder,
    defaultValue,
    handleValueChange,
    customContent,
    customDropdownIcon,
    isTag = false,
    isFront = false,
    onChangeComplete,
    hideTimeout,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLDivElement | null>(null);
    const [subRef, setSubRef] = useState<HTMLDivElement>();
    const [subVisibleStatus, setSubVisibleStatus] = useState(false);
    const [visibleStatus, setVisibleStatus] = useState(false);
    const [subContent, setSubContent] = useState<Label>();
    const frameTimer = useRef<null | number>(null);

    const dropdownInput = useRef<HTMLDivElement | null>(null);

    const [active, setActive] = useState(0);
    const [dropdownHide, setDropdownHide] = useState(false);

    // const popover = useRef<string | number>(-1);
    // const [popover, setPopover] = useState<string | number>(-1);

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
                                    className={styles.dropDownListsV2_cutLine}
                                    key={`/${list[i].id}`}
                                >
                                    /
                                </span>,
                            );
                        }
                        contentArr.push(<div key={`content${list[i].id}`}>{list[i].content}</div>);
                        onChangeComplete?.(list[i].content, list[i].subsId, list[i].parentsId);
                        break;
                    } else if (list[i].children) {
                        if (list[i].subsId.some((item) => item === defaultValue)) {
                            if (contentArr.length > 0) {
                                contentArr.push(
                                    <span
                                        className={styles.dropDownListsV2_cutLine}
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

    const renderTagLists = useMemo(() => {
        return (
            <ul className={styles.dropDownListsV2_tags_container}>
                {TAG_LIST.map((item) => (
                    <TagItem
                        key={item.status}
                        {...item}
                        className={classNames(
                            item.status === active && styles.dropDownListsV2_tags_item__active,
                        )}
                        onClick={() => {
                            setActive(item.status);
                            setVisibleStatus(false);
                            handleValueChange?.(item.status, TAG_LIST);
                        }}
                    />
                ))}
            </ul>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    useEffect(() => {
        if (visibleStatus) setDropdownHide(false);
    }, [visibleStatus]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClickMethods = (item: Label, e: React.MouseEvent) => {
        setDropdownHide(true);
        if (item.children?.length) {
            e.stopPropagation();
            return;
        }
        handleValueChange?.(item.id);
    };

    const handleMouseEnter = (item: Label, e: React.MouseEvent) => {
        if (item.children) {
            frameTimer.current && window.clearTimeout(frameTimer.current);
            setSubVisibleStatus(true);
            setSubRef(e.currentTarget as HTMLDivElement);
            setSubContent(item);
            return;
        }
        setSubVisibleStatus(false);
        setSubRef(undefined);
        setSubContent(undefined);
    };

    const handleMouseLeave = (item: Label) => {
        if (item.children) {
            frameTimer.current = window.setTimeout(() => {
                setSubVisibleStatus(false);
            }, hideTimeout);
            return;
        }
        setSubVisibleStatus(false);
    };

    const labelsEl = useMemo(
        () =>
            labelList && (
                <ul className={styles.dropDownListsV2_floatingLabels}>
                    {labelList.map((item, n) => {
                        const isSelectActive = item.id === defaultValue;
                        const isHoverActive = item.id === subContent?.id;
                        const isLast =
                            n + 1 >= labelList.length || labelList[n + 1].content === "/";

                        return (
                            <ListItem
                                key={item.id}
                                {...item}
                                className={classNames({
                                    [`${styles.dropDownListsV2_floatingLabelLast}`]: isLast,
                                    [`${styles.dropDownListsV2_floatingLabel}`]: !isLast,
                                    [`${styles.dropDownListsV2_floatingLabel__error}`]:
                                        item.isError,
                                    [`${styles.dropDownListsV2_floatingLabelActive}`]:
                                        isSelectActive,
                                    [`${styles.dropDownListsV2_floatingLabel__hoverActive}`]:
                                        isHoverActive,
                                })}
                                dropdownHide={dropdownHide}
                                onClick={(event) => {
                                    handleClickMethods(item, event);
                                    setVisibleStatus(false);
                                }}
                                onMouseEnter={(event) => handleMouseEnter(item, event)}
                                onMouseLeave={() => handleMouseLeave(item)}
                            />
                        );
                    })}
                </ul>
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [defaultValue, labelList, subContent?.id, dropdownHide],
    );
    const rootEl = () => {
        const selectLen = selectContent.length;
        const dropdownIcon = customDropdownIcon ?? (
            <Icon
                type="dropdown"
                className={classNames(styles.dropDownListsV2_dropdownIcon, {
                    [`${styles.dropDownListsV2_dropdownIcon_prefix}`]: isFront,
                    [`${styles.dropDownListsV2_dropdownIcon_suffix}`]: !isFront,
                })}
                style={{
                    transform: visibleStatus ? "rotate(180deg)" : "rotate(0deg)",
                }}
            />
        );
        return (
            <div
                ref={dropdownInput}
                className={classNames(styles.dropDownListsV2_wrap, className, {
                    [`${styles.dropDownListsV2_wrap__border}`]: border && !isTag,
                    [`${styles.dropDownListsV2_wrap__disabled}`]: disabled,
                })}
                style={{
                    width,
                    height,
                }}
                onClick={() => {
                    if (!disabled) setVisibleStatus(!visibleStatus);
                }}
            >
                {customContent || (
                    <div
                        className={classNames({
                            [`${styles.dropDownListsV2_container}`]: !isTag,
                            [`${styles.dropDownListsV2_container_tag}`]: isTag,
                        })}
                        tabIndex={-1}
                    >
                        {isFront && dropdownIcon}
                        {!isTag && !!selectLen && (
                            <div className={styles.dropDownListsV2_content}>{selectContent}</div>
                        )}
                        {!isTag && !selectLen && (
                            <div className={styles.dropDownListsV2_placeholder}>{placeholder}</div>
                        )}
                        {isTag && <TagItem {...TAG_LIST[active]} />}
                        {!isFront && dropdownIcon}
                    </div>
                )}
            </div>
        );
    };

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
                offset={{
                    y: (val) => {
                        return val + 2;
                    },
                }}
                className={floatingClassName}
                style={{
                    width: `${dropdownInput.current?.clientWidth ?? 0}px`,
                    display: "block",
                }}
                direction={direction}
                placement={startingPosition}
            >
                <ScrollComponent
                    stopPropagation={true}
                    className={classNames(styles[`dropDownListsV2_floatingWrap__${String(size)}`], {
                        [`${styles.dropDownListsV2_floatingWrap_tags}`]: isTag,
                    })}
                    style={floatingStyle}
                >
                    {isTag ? renderTagLists : labelsEl}
                </ScrollComponent>
            </Kite>

            {subRef && (
                <Kite
                    root={subRef}
                    show={subVisibleStatus && visibleStatus}
                    direction="horizontal"
                    placement="rt"
                    mount={ref.current || undefined}
                    offset={{ x: (val) => val + 5 }}
                    onMouseEnter={() => {
                        setSubVisibleStatus(true);
                        frameTimer.current && window.clearTimeout(frameTimer.current);
                    }}
                    onMouseLeave={() => {
                        frameTimer.current = window.setTimeout(() => {
                            setSubVisibleStatus(false);
                            setSubRef(undefined);
                            setSubContent(undefined);
                        });
                    }}
                >
                    <div
                        className={styles.dropDownListsV2_subFloatingWrap}
                        style={{
                            width: `${String(subRef?.offsetWidth)}px`,
                        }}
                    >
                        <ul>
                            {subContent?.children?.length &&
                                subContent.children.map((item) => (
                                    <SubItem
                                        key={item.id}
                                        {...item}
                                        className={classNames(
                                            defaultValue === item.id &&
                                                styles.dropDownListsV2_subFloatingLabel__active,
                                        )}
                                        onClick={() => {
                                            handleValueChange?.(item.id);
                                            setSubVisibleStatus(false);
                                            setVisibleStatus(false);
                                        }}
                                    />
                                ))}
                        </ul>
                    </div>
                </Kite>
            )}
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
