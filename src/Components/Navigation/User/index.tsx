/**
 * @file NavigationUser
 * @date 2022-04-13
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useState } from "react";
import { langConfig, MenuProps } from "../../../DefaultData/Navigation/navigationBar";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import { useSystemType } from "./../NavigationBar/Hooks/useSystemType";
import Mobile from "./Unit/Mobile";
import Pc from "./Unit/Pc";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface NavigationUserProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Link to user avatar
     */
    img?: string;
    /**
     * Abbreviation of user nickname
     */
    name?: string;
    /**
     * User's email
     */
    email?: string;
    /**
     * menu
     */
    menu?: MenuProps[];
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
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const NavigationUser = forwardRef<HTMLDivElement, NavigationUserProps>(
    ({ img, name, email, menu, orgList, currentOrg, handleOrgChange, ...props }, ref) => {
        NavigationUser.displayName = "NavigationUser";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const [isSmall, setIsSmall] = useState(window.matchMedia("(max-width: 1024px)").matches);
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
                setIsSmall(window.matchMedia("(max-width: 1024px)").matches);
            };
            window.addEventListener("resize", fn);
            return () => {
                window.removeEventListener("resize", fn);
            };
        }, []);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        if (systemType === 1) {
            return <Pc img={img} name={name} email={email} menu={menu} {...props} ref={ref} />;
        } else {
            return isSmall ? (
                <Mobile
                    img={img}
                    name={name}
                    email={email}
                    menu={menu}
                    orgList={orgList}
                    currentOrg={currentOrg}
                    handleOrgChange={handleOrgChange}
                    {...props}
                    ref={ref}
                />
            ) : (
                <Pc img={img} name={name} email={email} menu={menu} {...props} ref={ref} />
            );
        }
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
NavigationUser.displayName = "NavigationUser";
