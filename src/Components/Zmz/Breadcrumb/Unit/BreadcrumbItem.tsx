/**
 * @file
 * @date 2023-01-05
 * @author mingzhou.zhang
 * @lastModify  2023-01-05
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { Children, useEffect, useRef } from "react";
import { Icon } from "../../../Icon";
import { DropDownListV2, DropDownListV2Props } from "../../DropDownListV2";
import BreadcrumbSeparator from "./BreadcrumbSeparator";
import styles from "../style.module.scss";
import classNames from "../../../../Unit/classNames";
import { Popover, useRafState } from "../../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface BreadcrumbItemProps {
    separator?: React.ReactNode;
    href?: string;
    maxWidth?: string;
    disabled?: boolean;
    menu?: DropDownListV2Props["labels"];
    dropdownProps?: DropDownListV2Props;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
    children?: React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
    separator = "/",
    maxWidth,
    disabled,
    menu,
    dropdownProps,
    children,
    ...restProps
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    BreadcrumbItem.displayName = "BreadcrumbItem";
    const temp = useRef<HTMLAnchorElement>(null);
    const [isOver, setOver] = useRafState(false);

    useEffect(() => {
        if (temp.current && !isOver) {
            const { scrollWidth, offsetWidth } = temp.current;
            setOver(scrollWidth > offsetWidth);
        }
    }, [isOver, setOver]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    const renderBreadcrumbNode = (breadcrumbItem: React.ReactNode) => {
        const dropdownNode = (
            <div>
                {breadcrumbItem}
                <Icon type="dropdown" />
            </div>
        );
        if (menu) {
            return (
                <DropDownListV2
                    labels={menu}
                    border={false}
                    customContent={dropdownNode}
                    {...dropdownProps}
                />
            );
        }
        return breadcrumbItem;
    };
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    let link: React.ReactNode;

    const linkItemStyle = classNames(styles.breadcrumb_item_link, {
        [`${styles.breadcrumb_item_link__disabled}`]: disabled,
    });

    if ("href" in restProps && !disabled) {
        link = (
            <a ref={temp} className={linkItemStyle} style={{ maxWidth }} {...restProps}>
                {children}
            </a>
        );
    } else {
        link = (
            <span ref={temp} className={linkItemStyle} style={{ maxWidth }} {...restProps}>
                {children}
            </span>
        );
    }

    link = renderBreadcrumbNode(link);

    if (children !== undefined && children !== null) {
        return (
            <li>
                {isOver && !disabled ? (
                    <Popover
                        bodyClassName={styles.breadcrumb_item_tooltip}
                        direction="vertical"
                        placement="ct"
                        root={<>{link}</>}
                        triangle={{ width: "0", height: "0" }}
                    >
                        {Children.toArray(children).filter((item) => {
                            if (React.isValidElement(item)) {
                                return item.type == "span" || item.type == "a";
                            }
                            return false;
                        })}
                    </Popover>
                ) : (
                    link
                )}
                {separator && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
            </li>
        );
    }

    return null;
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default BreadcrumbItem;
BreadcrumbItem.displayName = "BreadcrumbItem";
