/**
 * @file
 * @date 2022-11-23
 * @author mingzhou.zhang
 * @lastModify  2022-11-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import classNames from "../../../../Unit/classNames";
import { Icon } from "../../../Icon";
import styles from "../style.module.scss";
import { SubItemProps } from "./SubItem";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ListItemContent {
    // eslint-disable-next-line @typescript-eslint/ban-types
    content: React.ReactNode | ("/" & {});
    isError?: boolean;
    id: string | number;
    children?: SubItemProps[];
}

export type ListItemProps = ListItemContent & {
    className?: string;
    dropdownHide?: boolean;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
};
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ListItem: React.FC<ListItemProps> = ({
    content,
    children,
    className,
    dropdownHide = false,
    onMouseEnter,
    onMouseLeave,
    onClick,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const handleMouseEnter = (event: React.MouseEvent) => {
        if (dropdownHide) return;
        const contentWrap = (event.target as HTMLDivElement).lastChild as HTMLDivElement;
        if (contentWrap.nodeType === 3) return;

        onMouseEnter?.(event);
    };

    const handleMouseLeave = (event: React.MouseEvent) => {
        onMouseLeave?.(event);
    };

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        onClick?.(event);
    };
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const listItem = (
        <li
            className={classNames(className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.dropDownListsV2_labelContainer}>
                <div
                    className={classNames(styles.dropDownListsV2_labelContent, {
                        [`${styles.dropDownListsV2_labelSibling}`]: children,
                    })}
                    onClick={handleClick}
                >
                    {content}
                </div>
                {children && <Icon type="open" className={styles.dropDownListsV2_labelIcon} />}
            </div>
        </li>
    );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return content === "/" ? (
        <li className={styles.dropDownListsV2_labelHr} />
    ) : (
        listItem
        // <Popover direction="horizontal" placement="rc" show={show} root={listItem} bodyClassName={styles.dropDownListsV2_popover}>
        //     {content}
        // </Popover>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
