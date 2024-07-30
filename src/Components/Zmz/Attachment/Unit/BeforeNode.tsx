/**
 * @file
 * @date 2022-11-01
 * @author
 * @lastModify  2022-11-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../../../..";
import { languageConfig } from "../../../../DefaultData/Zmz/attachment";
import { useLangConfig } from "../../../../Hooks/useLangConfig";
import classNames from "../../../../Unit/classNames";
import { getIconType } from "../../../../Unit/getIconType";
import styles from "../style.module.scss";
import { getNameorSuffix } from "./getNameorSuffix";
import { FileItem } from "./Item";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface BeforeNodeProps extends HTMLAttributes<HTMLDivElement> {
    list?: Array<FileItem>;
    type?: "column" | "row";
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const BeforeNode: React.FC<BeforeNodeProps> = ({
    list = [],
    type = "column",
    className,
    ...rest
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t, i18n } = useTranslation();

    useLangConfig("AttachmentComponent", languageConfig);

    const dataList = type === "column" ? list.slice(0, 3) : list.slice(0, 6);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            {...rest}
            className={classNames(
                styles.attachment_contentWrap,
                className,
                i18n.language === "cn" && "attachment_contentWrap_cn",
            )}
        >
            <div
                className={classNames(styles.attachment_content, {
                    [`${styles.attachment_list_wrap}`]: list.length,
                    [`${styles.attachment_list_wrap__column}`]: type === "column",
                    [`${styles.attachment_list_wrap__row}`]: type === "row",
                })}
            >
                {list.length
                    ? dataList.map((item) => (
                          <span key={item.id} className={styles.attachment_listItem}>
                              <Icon
                                  className={styles.attachment_listItem_icon}
                                  type={getIconType(getNameorSuffix(item.name, "suffix"))}
                              />
                              <span className={styles.attachment_listItem_content}>
                                  {item.name}
                              </span>
                          </span>
                      ))
                    : t("AttachmentComponent.Not add any document yet")}
            </div>
            <Icon type="moreHorizontal" className={styles.attachment_listItem_more} />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
