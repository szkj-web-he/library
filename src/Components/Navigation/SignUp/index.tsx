/**
 * @file NavigationSignUp
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { langConfig } from "../../../DefaultData/Navigation/navigationBar";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import { useNavLink } from "../NavigationBar/Unit/context";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const NavigationSignUp = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, onClick, children, ...props }, ref) => {
        NavigationSignUp.displayName = "NavigationSignUp";

        const [show, setShow] = useState(window.matchMedia("(max-width: 1024px)").matches);

        const { t } = useTranslation();

        //这里添加翻译文件
        useLangConfig("NavComponent", langConfig);

        const link = useNavLink();
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        useLayoutEffect(() => {
            const fn = () => {
                setShow(window.matchMedia("(max-width: 1024px)").matches);
            };
            window.addEventListener("resize", fn);
            return () => {
                window.removeEventListener("resize", fn);
            };
        }, []);

        const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (onClick) {
                onClick(e);
            } else if (typeof link.signUp === "string") {
                window.location.href = link.signUp;
            } else {
                link.signUp();
            }
        };

        const text = show ? "Sign Up - For Free" : "Sign up";

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={styles.navigationSignUp_wrapper + (className ? ` ${className}` : "")}
                ref={ref}
                onClick={handleClick}
                {...props}
            >
                {children ?? t(`NavComponent.${text}`)}
            </div>
        );
    },
);
NavigationSignUp.displayName = "NavigationSignUp";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
