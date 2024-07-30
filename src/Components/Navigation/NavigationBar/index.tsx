/**
 * @file NavigationBar
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useLayoutEffect, useState } from "react";
import {
    LinkProps,
    getProjectLink,
    langConfig,
    list,
} from "../../../DefaultData/Navigation/navigationBar";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import { NavigationLanguage, NavigationLanguageProps } from "../Language";
import { NavigationLinkProps } from "../Nav";
import { useLoginStatus } from "./../../OIDCLogin/Unit/login/loginContext";
import { useSystemType } from "./Hooks/useSystemType";
import Management from "./Unit/Management";
import Product from "./Unit/Product";
import { NavLinkContext } from "./Unit/context";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface NavigationBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Element of logo
     */
    logo?: React.ReactElement;
    /**
     * Element of login
     */
    login?: React.ReactElement;
    /**
     * Element of signUp
     */
    signUp?: React.ReactElement;
    /**
     * Element of languages
     */
    languages?: React.ReactElement<NavigationLanguageProps>;
    /**
     * Element of navigation
     */
    navigation?: React.ReactElement<NavigationLinkProps>;
    /**
     *My Organization
     */
    orgList?: Array<{
        name: string;
        role?: "Owner" | "Admin" | "Reviewer";
        id: string;
        logo?: string;
    }>;
    /**
     * Current Organization Id
     */
    currentOrg?: string;
    /**
     * Events that occur when changing organizations
     */
    handleOrgChange?: (
        res:
            | {
                  name: string;
                  role?: "Owner" | "Admin" | "Reviewer";
                  id: string;
                  logo?: string;
              }
            | undefined,
    ) => void;

    /**
     * Is it currently on the dashboard home page
     */
    dashboard?: boolean | React.ReactElement;
    /**
     * user info
     */
    userData?: {
        link?: string;
        name: string;
        email?: string;
        status: boolean;
    };
    /**
     * sign out click fn
     */
    handleSignOutClick?: () => void;
    /**
     * Log in click fn
     */
    handleLoginClick?: () => void;
    /**
     * sign up click fn
     */
    handleSignUpClick?: () => void;

    /**
     * When each navigation is clicked
     */
    handleNavClick?: (label: string) => void;

    /**
     * 自定义各个项目的跳转链接
     */
    navLink?: LinkProps;

    /**
     * 是否隐藏切换 language
     */
    hiddenLang?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const NavigationBar = forwardRef<HTMLDivElement, NavigationBarProps>(
    (
        {
            className,
            logo,
            login,
            signUp,
            languages,
            navigation,
            dashboard,
            userData,
            handleSignOutClick,
            handleLoginClick,
            handleSignUpClick,
            handleNavClick,
            hiddenLang,
            orgList,
            currentOrg,
            handleOrgChange,
            navLink,
            ...props
        },
        ref,
    ) => {
        NavigationBar.displayName = "NavigationBar";
        /**
         * The system is divided into two categories
         * 1. Management (mainly interactive)
         * 2. Product introduction (mainly display)
         */
        const systemType = useSystemType();

        const loginStatus = useLoginStatus();

        //这里添加翻译文件
        useLangConfig("NavComponent", langConfig);

        const [linkList, setLinkList] = useState(getProjectLink(navLink));

        useLayoutEffect(() => {
            if (!loginStatus.loading) {
                setLinkList(getProjectLink(navLink, loginStatus.status));
            }
        }, [navLink, loginStatus.loading, loginStatus.status]);

        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const contentEl = () => {
            if (systemType === 1) {
                let languagesEl: React.ReactNode = undefined;
                if (!hiddenLang) {
                    languagesEl = languages ?? <NavigationLanguage languages={list} />;
                }
                return (
                    <Management
                        ref={ref}
                        className={className}
                        logo={logo}
                        languages={languagesEl}
                        dashboard={dashboard}
                        userData={userData}
                        handleSignOutClick={handleSignOutClick}
                        {...props}
                    />
                );
            }

            return (
                <Product
                    ref={ref}
                    className={className}
                    logo={logo}
                    login={login}
                    signUp={signUp}
                    navigation={navigation}
                    dashboard={dashboard}
                    userData={userData}
                    handleSignOutClick={handleSignOutClick}
                    handleLoginClick={handleLoginClick}
                    handleSignUpClick={handleSignUpClick}
                    handleNavClick={handleNavClick}
                    orgList={orgList}
                    currentOrg={currentOrg}
                    handleOrgChange={handleOrgChange}
                    {...props}
                />
            );
        };

        return (
            <NavLinkContext.Provider value={{ ...linkList }}>
                <>{contentEl()}</>
            </NavLinkContext.Provider>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

NavigationBar.displayName = "NavigationBar";
