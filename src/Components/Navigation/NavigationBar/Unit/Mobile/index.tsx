/**
 * @file Temp
 * @date 2022-04-13
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Icon, Transition } from "../../../../..";
import { useNavContext } from "../context";

import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    children: React.ReactNode;

    show: boolean;

    handleShowChange: (res: boolean) => void;

    header?: string;

    handleTransitionEnd?: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    children,
    show,
    handleShowChange,
    header,
    handleTransitionEnd,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { mobile } = useNavContext();

    const { t } = useTranslation();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return mobile.current ? (
        createPortal(
            <Transition
                show={show}
                className={styles.navigationMobile_wrap}
                animationType={"inRight"}
                handleTransitionEnd={handleTransitionEnd}
            >
                <div
                    className={styles.navigationMobile_back}
                    onClick={() => {
                        handleShowChange(false);
                    }}
                >
                    <Icon type="open" className={styles.navigationMobile_backIcon} />
                    {t("NavComponent.Back")}
                </div>
                <div className={styles.navigationMobile_header}>{header ?? ""}</div>
                <div className={styles.navigationMobile_container}>{children}</div>
            </Transition>,
            mobile.current,
        )
    ) : (
        <></>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
