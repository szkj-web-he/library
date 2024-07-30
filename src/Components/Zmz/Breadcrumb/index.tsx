/**
 * @file
 * @date 2023-01-04
 * @author mingzhou.zhang
 * @lastModify  2023-01-04
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { cloneElement, Fragment, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Popover } from "../../..";
import classNames from "../../../Unit/classNames";
import { readChildElement } from "../../../Unit/readChild";
import styles from "./style.module.scss";
import type { BreadcrumbItemProps } from "./Unit/BreadcrumbItem";
import BreadcrumbItem from "./Unit/BreadcrumbItem";
import BreadcrumbSeparator from "./Unit/BreadcrumbSeparator";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/**
 * 参数没写
 * 注释
 */

export interface Route {
    path: string;
    breadcrumbName: string;
    disabled?: boolean;
    children?: Omit<Route, "children">[];
}

type ItemRenderType = (
    route: Route,
    params: Record<string, string>,
    routes: Array<Route>,
    paths: Array<string>,
) => React.ReactNode;

export interface BreadcrumbProps {
    separator?: React.ReactNode;
    routes?: Route[];
    params?: Record<string, string>;
    maxItemWidth?: string;
    maxItems?: number;
    itemsAfterCollapse?: number;
    itemsBeforeCollapse?: number;
    itemRender?: ItemRenderType;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
}

type CompoundedComponent = React.FC<BreadcrumbProps> & {
    Item: typeof BreadcrumbItem;
    Separator: typeof BreadcrumbSeparator;
};

const getBreadcrumbName = (route: Route, params: Record<string, string>) => {
    if (!route.breadcrumbName) return null;

    const paramsKeys = Object.keys(params).join("|");
    const name = route.breadcrumbName.replace(
        new RegExp(`:${paramsKeys}`, "g"),
        (replacement, key) => params[key as string] || replacement,
    );
    return name;
};

const defaultItemRender: ItemRenderType = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    const name = getBreadcrumbName(route, params);
    return last ? <span>{name}</span> : <a href={`#/${paths.join("/")}`}>{name}</a>;
};

const getPath = (path: string, params: Record<string, string>) => {
    path = path.replace(/^\//, "");
    Object.keys(params).forEach((key) => {
        path = path.replace(`:${key}`, params[key]);
    });
    return path;
};

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Breadcrumb: CompoundedComponent = ({
    separator = "/",
    routes,
    params = {},
    maxItemWidth,
    maxItems = 8,
    itemsAfterCollapse = 1,
    itemsBeforeCollapse = 1,
    itemRender = defaultItemRender,
    style,
    className,
    children,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { i18n } = useTranslation();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const renderItemsBeforeAndAfter = (allItems: React.ReactNode[]) => {
        if (itemsAfterCollapse + itemsBeforeCollapse >= allItems.length) {
            return allItems;
        }

        const expandNode = (
            <span className={styles.breadcrumb_expand}>
                <span>...</span>
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
            </span>
        );

        return [
            ...allItems.slice(0, itemsBeforeCollapse),
            <Popover
                key={"breadcrumb_more"}
                bodyClassName={styles.breadcrumb_item_tooltip}
                direction="vertical"
                placement="ct"
                root={expandNode}
                triangle={{ width: "0", height: "0" }}
            >
                {allItems.slice(itemsBeforeCollapse, allItems.length - itemsAfterCollapse)}
            </Popover>,
            ...allItems.slice(allItems.length - itemsAfterCollapse, allItems.length),
        ];
    };
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    let crumbs: React.ReactNode[];

    if (routes?.length) {
        const paths: string[] = [];
        crumbs = routes.map((route) => {
            const path = getPath(route.path, params);

            if (path) {
                paths.push(path);
            }

            const itemProps: BreadcrumbItemProps = { separator, maxWidth: maxItemWidth };

            return (
                <BreadcrumbItem {...itemProps} key={path || route.breadcrumbName}>
                    {itemRender(route, params, routes, paths)}
                </BreadcrumbItem>
            );
        });
    } else {
        crumbs = readChildElement(children).map((ele, index) => {
            const node = ele.element as ReactElement<
                BreadcrumbItemProps & { style: React.CSSProperties }
            >;
            if (React.isValidElement(node) && ele.displayName === BreadcrumbItem.displayName) {
                const childProps = node.props;
                const childStyle =
                    "style" in node.props
                        ? { ...(childProps?.style as React.CSSProperties | undefined) }
                        : {};
                childStyle.maxWidth = maxItemWidth;

                return (
                    <Fragment key={index}>
                        {cloneElement(node, {
                            ...childProps,
                            style: childStyle,
                            separator,
                        })}
                    </Fragment>
                );
            }

            return <Fragment key={index}>{ele.element}</Fragment>;
        }) as Array<React.ReactNode>;
    }

    return (
        <nav
            className={classNames(className, styles.breadcrumb, {
                [styles.breadcrumb_cn]: i18n.language === "cn",
            })}
            style={style}
        >
            <ol>{crumbs.length <= maxItems ? crumbs : renderItemsBeforeAndAfter(crumbs)}</ol>
        </nav>
    );
};

Breadcrumb.Item = BreadcrumbItem;

Breadcrumb.Separator = BreadcrumbSeparator;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Breadcrumb;
