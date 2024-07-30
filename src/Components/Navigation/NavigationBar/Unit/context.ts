/**
 * @file abc
 * @date 2022-04-12
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-12
 */

import { createContext, useContext } from "react";
import { LinkProps } from "../../../../DefaultData/Navigation/navigationBar";

interface ContextDataProps {
    mobile: React.MutableRefObject<HTMLDivElement | null>;
    close: React.MutableRefObject<HTMLDivElement | null>;
    logOutNode: React.ReactNode;
}

const contextData = (): ContextDataProps => ({
    mobile: { current: null },
    close: { current: null },
    logOutNode: null,
});

export const NavigationContext = createContext(contextData());

export const useNavContext = () => useContext(NavigationContext);

const NavLinkContextProps = (): Required<LinkProps> => ({
    home: "",
    signUp: "",
    profile: "",
    dashboard: "",
    projectManager: "",
    qEditor: "",
    qEditorDashboard: "",
    dist: "",
    plugin: "",
    market: "",
    community: "",
    analysis: "",
    dataCollect: "",
    userInfo: "",
    organization: "",
    contract: "",
    dataProc: "",
    expertPanel: "",
    quotation: "",
});

export const NavLinkContext = createContext(NavLinkContextProps());

export const useNavLink = () => useContext(NavLinkContext);
