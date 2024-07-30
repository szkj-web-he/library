/**
 * @file NavigationLink
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useLayoutEffect, useState } from "react";
import { langConfig, NavProps } from "../../../DefaultData/Navigation/navigationBar";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import MobileNav from "./Unit/Mobile";
import PcNav from "./Unit/Pc";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface NavigationLinkProps {
    /**
     * Navigation List
     */
    navList?: NavProps[];
    /**
     * When each navigation is clicked
     */
    onClick?: (label: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const NavigationLink: React.FC<NavigationLinkProps> = ({ navList, onClick }) => {
    NavigationLink.displayName = "NavigationLink";

    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [show, setShow] = useState(window.matchMedia("(max-width: 1024px)").matches);

    //这里添加翻译文件
    useLangConfig("NavComponent", langConfig);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useLayoutEffect(() => {
        const fn = () => {
            setShow(window.matchMedia("(max-width: 1024px)").matches);
        };
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return show ? (
        <MobileNav navList={navList} onClick={onClick} />
    ) : (
        <PcNav navList={navList} onClick={onClick} />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
NavigationLink.displayName = "NavigationLink";
