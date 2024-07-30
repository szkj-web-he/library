/**
 * @file
 * @date 2022-11-16
 * @author mingzhou.zhang
 * @lastModify  2022-11-16
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { startTransition, useEffect, useRef, useState } from "react";
import { useDefaultValue } from "../../../Hooks/useDefaultValue";
import classNames from "../../../Unit/classNames";
import { deepCloneData } from "../../../Unit/deepCloneData";
import { Icon } from "../../Icon";
import Extra from "./Unit/extra";
import { pushItem } from "./Unit/pushItem";
import TabMain from "./Unit/tabMain";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
type TabsType = "line" | "card" | "editable-card";

type EditType = "add" | "remove";

type tabPositionType = "top" | "right" | "bottom" | "left";

type TabClick = (key: string, container?: NavItemRect) => void;

interface NavItemRect {
    width: number;
    height: number;
    x: number;
    y: number;
}

interface TabBarExtraContent {
    before?: React.ReactNode;
    after?: React.ReactNode;
}

export interface TabsHooks {
    /**
     * called when closeIcon or add button click
     */
    onEdit?: (payload: MouseEvent | string, action: EditType) => void;
    /**
     * called when tab click
     */
    onTabClick?: TabClick;
}

export interface TabsItem extends TabsHooks {
    /**
     * custom close icon
     */
    closeIcon?: React.ReactNode;
    /**
     * disable closeIcon Only works while type="editable-card"
     */
    closable?: boolean;
    /**
     * Set TabPane disabled
     */
    disabled?: boolean;
    /**
     * current tab's title corresponding to current tabPane
     */
    label: React.ReactNode;
    /**
     * corresponding to activeKey, should be unique
     */
    key: string;
    /**
     * current tab's corresponding to current tabContent
     */
    children: React.ReactNode;
}

export interface TabsProps extends TabsHooks {
    /**
     * current active tabPanel's key
     */
    activeKey?: string;
    /**
     * initial active tabPanel's key if activeKey is absent
     */
    defaultActiveKey?: string;
    /**
     * render list data source
     */
    items: TabsItem[];
    /**
     * position of tabs
     */
    tabPosition?: tabPositionType;
    /**
     * config extra content
     */
    tabBarExtraContent?: TabBarExtraContent | React.ReactNode;
    /**
     * whether destroy inactive TabPane when change tab
     */
    destroyInactiveTabPane?: boolean;
    /**
     * basic style of tabs
     */
    type?: TabsType;
    /**
     * hide plus icon or not. Only works while type="editable-card"
     */
    hideAdd?: boolean;
    /**
     * whether hide tabContent border
     */
    contentBorder?: boolean;
    /**
     * called when tabPanel is changed
     */
    onChange?: (activeKey: string) => void;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Tabs: React.FC<TabsProps> = ({
    activeKey,
    items,
    defaultActiveKey = items[0].key,
    tabPosition = "top",
    destroyInactiveTabPane = false,
    type = "line",
    hideAdd = type !== "editable-card",
    contentBorder = type === "line" ? false : true,
    tabBarExtraContent,
    onChange,
    onTabClick,
    onEdit,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     * 选中的key
     */
    const [selectedKey, setSelectedKey] = useDefaultValue<string | null>(
        defaultActiveKey,
        activeKey ?? null,
        (res) => {
            onChange?.(res ?? "");
        },
    );
    /**
     * 选项卡导航栏的 容器
     */
    const tabNav = useRef<null | HTMLDivElement>(null);
    /**
     * 活跃的导航栏的点位信息
     */
    const [point, setPoint] = useState<NavItemRect | null>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const container = tabNav.current;
        const activeItem = container?.querySelector(`.${styles.tabs_nav_item__active}`);

        /**
         * 监听活跃的item的尺寸变化的实例对象
         */
        let resizeOb: ResizeObserver | null = null;
        /**
         * 获取选中的导航的left值和width
         */
        const getActiveNavRect = () => {
            if (!(activeItem instanceof HTMLElement)) {
                return;
            }
            startTransition(() => {
                setPoint((pre) => {
                    let rect: NavItemRect | null = null;
                    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = activeItem;

                    rect = {
                        width: offsetWidth,
                        height: offsetHeight,
                        x: offsetLeft,
                        y: offsetTop,
                    };
                    if (JSON.stringify(rect) === JSON.stringify(pre)) {
                        return pre;
                    }
                    return deepCloneData(rect);
                });
            });
        };

        /**
         * 监听当选项卡变得可见的时候再进行计算
         */

        const intersection = new IntersectionObserver(
            (res) => {
                if (!res[0].isIntersecting) {
                    return;
                }
                getActiveNavRect();
                if (resizeOb) {
                    return;
                }
                listenItemResize();
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: [0.0, 0.1],
            },
        );
        container && intersection.observe(container);

        /****监听获选的item的尺寸变化 ****/

        const listenItemResize = () => {
            if (!activeItem) {
                return;
            }
            resizeOb = new ResizeObserver(getActiveNavRect);
            resizeOb.observe(activeItem);
        };

        listenItemResize();

        return () => {
            activeItem && resizeOb?.unobserve(activeItem);
            container && intersection.unobserve(container);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKey]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    /** 创建选项卡的内容主体 */
    const contentItem = (item: TabsItem): React.ReactNode => {
        return (
            <TabMain key={item.key} uId={item.key} selectedUId={selectedKey ?? ""}>
                {item.children}
            </TabMain>
        );
    };

    /**
     * 选项卡导航的item
     */
    const navItemEl = (item: TabsItem): React.ReactNode => {
        const closeIcon = type === "editable-card" ? <Icon type="close" /> : null;
        const closable = item.closable ?? (type === "line" ? false : true);
        return (
            <div
                key={item.key}
                className={classNames(styles.tabs_nav_item, {
                    [`${styles.tabs_nav_item__active}`]: selectedKey === item.key,
                    [`${styles.tabs_nav_item__disabled}`]: item.disabled,
                })}
                onClick={(e) => {
                    if (!item.disabled) {
                        setSelectedKey(item.key);
                        if (onTabClick) {
                            const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
                                e.currentTarget;

                            onTabClick(item.key, {
                                width: offsetWidth,
                                height: offsetHeight,
                                x: offsetLeft,
                                y: offsetTop,
                            });
                        }
                    }
                }}
            >
                <div className={styles.tabs_nav_item_btn}>{item.label}</div>
                {closeIcon && closable && (
                    <span
                        className={styles.tabs_nav_item_closeicon}
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            onEdit?.(item.key, "remove");
                        }}
                    >
                        {closeIcon}
                    </span>
                )}
            </div>
        );
    };

    let navs: React.ReactNode[] | null = null;

    let contents: React.ReactNode[] | null = null;
    {
        const arr = items ?? [];
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            navs = pushItem(navItemEl(item), navs);
            if (destroyInactiveTabPane) {
                if (selectedKey === item.key) {
                    contents = pushItem(contentItem(item), contents);
                }
            } else {
                contents = pushItem(contentItem(item), contents);
            }
        }
    }

    const transitionStyle = (): React.CSSProperties | undefined => {
        const index = items.findIndex((item) => item.key === selectedKey);
        if (!(typeof index === "number" && index >= 0)) {
            return;
        }

        const { width, height, x: transformX, y: transformY } = point ?? {};

        return tabPosition === "top" || tabPosition === "bottom"
            ? {
                  width,
                  transform: `translateX(${transformX ?? 0}px)`,
              }
            : {
                  height,
                  transform: `translateY(${transformY ?? 0}px)`,
              };
    };

    return (
        <div
            className={classNames(styles.tabs_container, styles[`tabs_container_${tabPosition}`], {
                [`${styles.tabs_card}`]: type === "card",
                [`${styles.tabs_editable_card}`]: type === "editable-card",
            })}
        >
            <div className={styles.tabs_nav}>
                <Extra extraType="before" tabBarExtraContent={tabBarExtraContent} />
                <div className={styles.tabs_nav_wrap}>
                    <div className={styles.tabs_nav_list} ref={tabNav}>
                        {navs}
                        {!hideAdd && type === "editable-card" && (
                            <button
                                className={styles.tabs_nav_add}
                                onClick={(event) => {
                                    onEdit?.(event as unknown as MouseEvent, "add");
                                }}
                            >
                                <span>
                                    <Icon type="addition01" />
                                </span>
                            </button>
                        )}
                        <div className={styles.tabs_ink_bar} style={transitionStyle()} />
                    </div>
                </div>
                <Extra extraType="after" tabBarExtraContent={tabBarExtraContent} />
            </div>
            <div
                className={classNames(styles.tabs_content, {
                    [`${styles.tabs_content__border}`]: contentBorder,
                })}
            >
                <div className={styles.tabs_content_holder}>{contents}</div>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
