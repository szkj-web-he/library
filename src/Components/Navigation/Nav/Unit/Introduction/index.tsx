/**
 * @file Introduction
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface IntroductionProps {
    main: React.ReactNode;
    description: React.ReactNode;
    icon: React.ReactNode;
    href?: string | (() => void);
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Introduction: React.FC<IntroductionProps> = ({ main, description, icon, href }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.introduction_wrap}>
            <div className={styles.introduction_main}>
                {icon}
                <div className={styles.introduction_mainContext}>
                    {main}
                    <div
                        className={styles.introduction_btn}
                        onClick={() => {
                            if (href) {
                                if (typeof href === "string") {
                                    window.location.href = href;
                                } else {
                                    href();
                                }
                            }
                        }}
                    >
                        {t("NavComponent.Start")}
                    </div>
                </div>
            </div>
            <div className={styles.introduction_split} />
            <div className={styles.introduction_des}>{description}</div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
