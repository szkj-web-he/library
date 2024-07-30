/**
 * @file UnderConstruction
 * @date 2021-10-13
 * @author xuejie.he
 * @lastModify xuejie.he 2021-10-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { Button } from "../..";
import { useLangConfig } from "../../Hooks/useLangConfig";
import styles from "./style.module.scss";
import { ContentImg } from "./Unit/contentImg";
import { langConfig } from "../../DefaultData/UnderConstruction/underconstruction";
import { useTranslation } from "react-i18next";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface UnderConstructionProps {
    /**
     * title content
     */
    title?: string;
    /**
     * description text
     */
    des?: string;
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * back btn click
     */
    handleBackClick?: () => void;
    /**
     * btn label
     */
    btnLabel?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const UnderConstruction: React.FC<UnderConstructionProps> = ({
    title,
    des,
    btnLabel,
    className,
    style,
    handleBackClick,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    //这里添加翻译文件
    useLangConfig("UnderConstructionComponent", langConfig);

    const { t } = useTranslation();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={styles.underConstruction_wrapper + (className ? " " + className : "")}
            style={style}
        >
            <div className={styles.underConstruction_img}>
                <ContentImg />
            </div>
            <div className={styles.underConstruction_title}>
                {title ?? t("UnderConstructionComponent.A new product is coming soon")}
            </div>
            <div className={styles.underConstruction_des}>
                {des ?? t("UnderConstructionComponent.We are working on it")}
            </div>
            <Button
                className={styles.underConstruction_bigBtn}
                type="primary"
                label={btnLabel ?? t("UnderConstructionComponent.Go To Main Page")}
                width="14rem"
                height="4.2rem"
                onClick={handleBackClick}
            />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
