/**
 * @file
 * @date 2022-07-27
 * @author mingzhou.zhang
 * @lastModify  2022-07-27
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { HTMLAttributes, ReactNode, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { createHash } from "../../..";
import bg404 from "../../../Assets/images/bg_404.png";
import bg500 from "../../../Assets/images/bg_500.png";
import bgEmpty from "../../../Assets/images/bg_empty.png";
import { languageConfig } from "../../../DefaultData/Zmz/errorV2";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { Skeleton } from "../../Loading/Skeleton";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ErrorV2Props extends HTMLAttributes<HTMLElement> {
    /**
     * The type of component
     */
    type: "404" | "500" | "empty";
    /**
     * The custom background node
     */
    bgNode?: ReactNode;
    /**
     * The title of the error
     */
    errTypeText?: string;
    /**
     * The first description of the error
     */
    errDesc?: string;
    /**
     * The second description of the error
     */
    errDescSub?: string;
    /**
     * The custom button node
     */
    extra?: ReactNode;
    /**
     * extra value is undefind it work
     * button click event
     */
    onBtnClick?: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ErrorV2: React.FC<ErrorV2Props> = (props) => {
    const {
        type,
        bgNode,
        errTypeText,
        errDesc,
        errDescSub,
        extra,
        onBtnClick,
        className,
        ...rest
    } = props;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [image, setImage] = useState("");
    const [typeText, setTypeText] = useState(errTypeText);
    const [desc, setDesc] = useState(errDesc);
    const [descSub, setDescSub] = useState(errDescSub);

    const imageWidth = useRef<number>(35);
    const imageHeight = useRef<number>(0);

    const placeholderId = `errorv2_placeholder_img_${createHash()}`;

    const { t, i18n } = useTranslation();

    //这里添加翻译文件
    useLangConfig("ErrorV2Component", languageConfig);

    useLayoutEffect(() => {
        switch (type) {
            case "404":
                {
                    setImage(bg404);
                    imageHeight.current = 24.3;
                    setTypeText(t("ErrorV2Component.Page Not Found"));
                    setDesc(t("ErrorV2Component.Sorry, we can't find that page"));
                    setDescSub(t("ErrorV2Component.It might be an old link or maybe it moved"));
                }
                break;
            case "500":
                {
                    setImage(bg500);
                    imageHeight.current = 22.5;
                    setTypeText(t("ErrorV2Component.Unexpected Error"));
                    setDesc(t("ErrorV2Component.We are working on fixing the problem"));
                    setDescSub(t("ErrorV2Component.Be back soon"));
                }
                break;
            default: {
                setImage(bgEmpty);
                imageHeight.current = 26.9;
                setTypeText(t("ErrorV2Component.File Not Found"));
                setDesc(t("ErrorV2Component.Sorry, we can't find that file"));
                setDescSub(t("ErrorV2Component.It might be eliminate or maybe it moved"));
            }
        }
    }, [t, type]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={classNames(className, styles.errorv2_wrap, {
                [`${styles.errorv2_cn}`]: i18n.language === "cn",
            })}
            {...rest}
        >
            <Skeleton
                style={{ position: "absolute", top: 0, left: 0 }}
                variant="img"
                width={`${imageWidth.current}rem`}
                height={`${imageHeight.current}rem`}
                className={placeholderId}
            />
            {bgNode ?? (
                <img
                    src={image}
                    alt=""
                    width={imageWidth.current * 10}
                    height={imageHeight.current * 10}
                    onLoad={() => {
                        const placeholderNode = document.querySelector(
                            `.${placeholderId}`,
                        ) as HTMLElement;
                        placeholderNode.style.display = "none";
                    }}
                />
            )}
            <div className={styles.errorv2_content}>
                <span className={styles.errorv2_type}>{errTypeText ?? typeText}</span>
                <span className={styles.errorv2_desc}>{errDesc ?? desc}</span>
                <span className={styles.errorv2_desc_sub}>{errDescSub ?? descSub}</span>
                {extra ?? (
                    <button
                        className={styles.errorv2_btn}
                        onClick={() => {
                            onBtnClick?.();
                        }}
                    >
                        {t("ErrorV2Component.Go To Main Page")}
                    </button>
                )}
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
