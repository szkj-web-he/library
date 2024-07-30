/**
 * @file Wrapper
 * @date 2022-01-05
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-05
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, ReactElement } from "react";
import { NavigationBarProps } from "../../Navigation/NavigationBar";
import { NavigationBar, Row, Sidebar } from "../../..";
import { RowProps } from "../Row";
import { SidebarProps } from "../Sidebar";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * children of this component
     */
    children: [
        ReactElement<NavigationBarProps>,
        ReactElement<SidebarProps>,
        ReactElement<RowProps>,
    ];
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(
    ({ className, children, ...props }, ref) => {
        Wrapper.displayName = "Wrapper";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        let headerComponent: null | React.ReactElement<NavigationBarProps> = null;
        let sidebarComponent: null | React.ReactElement<SidebarProps> = null;
        let rowComponent: null | React.ReactElement<RowProps> = null;
        const headerName = NavigationBar.displayName || NavigationBar.name;
        const rowName = Row.displayName || Row.name;
        const sideBarName = Sidebar.displayName || Sidebar.name;

        for (let i = 0; i < children.length; i++) {
            const currentComponent = children[i];
            const fnType = currentComponent.type as React.FC;
            const name = fnType.displayName || fnType.name;
            switch (name) {
                case headerName:
                    headerComponent = currentComponent as ReactElement<NavigationBarProps>;
                    break;
                case rowName:
                    rowComponent = currentComponent as ReactElement<RowProps>;
                    break;
                case sideBarName:
                    sidebarComponent = currentComponent as ReactElement<SidebarProps>;
                    break;
            }
        }

        return headerComponent && rowComponent && sidebarComponent ? (
            <div
                className={styles.wrapper_wrap + (className ? ` ${className}` : "")}
                {...props}
                ref={ref}
            >
                {headerComponent}
                <div className={styles.wrapper_main}>
                    {sidebarComponent}
                    <div className={styles.wrapper_container}>{rowComponent}</div>
                </div>
            </div>
        ) : (
            <div
                className={styles.wrapper_wrap + (className ? ` ${className}` : "")}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Wrapper.displayName = "Wrapper";
