/**
 * @file
 * @date 2022-05-24
 * @author mingzhou.zhang
 * @lastModify  2022-05-24
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { DOMAttributes, HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { languageConfig } from "../../../../../DefaultData/Zmz/keyword";
import { useLangConfig } from "../../../../../Hooks/useLangConfig";
import classNames from "../../../../../Unit/classNames";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
interface KeywordBtnProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * button type
     */
    type: "default" | "multi";
    /**
     * keyword btn placeholder content
     */
    placeholder?: string;
    /**
     * keyword btn placeholder classname
     */
    placeholderCls?: string;
    /**
     * whether is disable add
     */
    disable?: boolean;
    /**
     * keyword button animationIn state
     */
    animationIn?: boolean;
    /**
     * keyword button animationOut state
     */
    animationOut?: boolean;
}
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const KeywordBtn: React.FC<KeywordBtnProps & DOMAttributes<MouseEvent>> = (props) => {
    const {
        type = "default",
        className,
        style,
        placeholder,
        placeholderCls,
        disable,
        animationIn,
        animationOut,
        onClick,
        onMouseEnter,
        onMouseLeave,
    } = props;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t, i18n } = useTranslation();

    //这里添加翻译文件
    useLangConfig("KeywordComponent", languageConfig);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */

    const renderStyle = (): Record<string, string> => {
        let color: string;
        if (type === "default") {
            color = "#3cbbc7";
        }
        if (disable) {
            color = "#bdbdbd";
        }
        switch (true) {
            case type === "default":
                color = "#3cbbc7";
                break;
            case disable:
                color = "#bdbdbd";
                break;
            default:
                color = "#3CBBC7";
        }
        return {
            "--icon-color": color,
        };
    };
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={classNames(styles.keyword_icon_add__wrap, className, {
                [`${styles.keyword_cn}`]: i18n.language === "cn",
            })}
            style={{ ...renderStyle(), ...style }}
        >
            <span className={styles.keyword_container}>
                <span
                    className={classNames(styles.keyword_wrap, {
                        [`${styles.keyword_wrap_animationOut}`]: animationOut,
                        [`${styles.keyword_wrap_animationIn}`]: animationIn,
                        [`${styles.keyword_wrap__colorless}`]: type !== "default",
                    })}
                >
                    <span
                        className={classNames(styles.keyword_icon_add, {
                            [`${styles.keyword_icon_add__dashed}`]: type !== "default",
                        })}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />
                </span>
            </span>
            {type === "default" && (
                <span
                    className={classNames(placeholderCls, styles.keyword_placeholder, {
                        [`${styles.keyword_placeholder_animationOut}`]: animationOut,
                        [`${styles.keyword_placeholder_animationIn}`]: animationIn,
                    })}
                    style={{ opacity: `${animationOut ? 0 : 1}` }}
                >
                    {placeholder ?? t("KeywordComponent.Add keyword")}
                </span>
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
