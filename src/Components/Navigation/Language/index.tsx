/**
 * @file NavigationLanguage
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useState } from "react";
import { useSystemType } from "../NavigationBar/Hooks/useSystemType";
import Mobile from "./Unit/Mobile";
import Pc from "./Unit/Pc";

import { langConfig } from "../../../DefaultData/Navigation/navigationBar";
import { useLangConfig } from "../../../Hooks/useLangConfig";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface NavigationLanguageProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * How many language types
     */
    languages?: Array<{
        sim: string;
        content: string;
        img: string;
    }>;
    /**
     * Manually choose adapter device is PC or Mobile
     */
    ident?: "PC" | "Mobile";
    /**
     * When the language changes
     */
    handleLanguageChange?: (res: { sim: string; content: string; img: string }) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const NavigationLanguage = forwardRef<HTMLDivElement, NavigationLanguageProps>(
    ({ ident, ...props }, ref) => {
        NavigationLanguage.displayName = "NavigationLanguage";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const [show, setShow] = useState(window.matchMedia("(max-width: 1024px)").matches);
        /**
         * The system is divided into two categories
         * 1. Management (mainly interactive)
         * 2. Product introduction (mainly display)
         */
        const systemType = useSystemType();

        //这里添加翻译文件
        useLangConfig("NavComponent", langConfig);
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useEffect(() => {
            const fn = () => {
                setShow(window.matchMedia("(max-width: 1024px)").matches);
            };
            window.addEventListener("resize", fn);
            return () => {
                window.removeEventListener("resize", fn);
            };
        }, []);
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        const renderComponent = () => {
            if (ident) {
                return ident === "Mobile" ? (
                    <Mobile {...props} ref={ref} />
                ) : (
                    <Pc {...props} ref={ref} />
                );
            } else {
                return systemType === 2 && show ? (
                    <Mobile {...props} ref={ref} />
                ) : (
                    <Pc {...props} ref={ref} />
                );
            }
        };

        return renderComponent();
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
NavigationLanguage.displayName = "NavigationLanguage";
