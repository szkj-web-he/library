/**
 * @file Text
 * @date 2022-05-25
 * @author Chaman
 * @lastModify 2022-05-25
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { FC, useLayoutEffect, useState } from "react";
import classNames from "../../Unit/classNames";
import styles from "./style.module.scss";
import { CnFontType, EnFontType } from "./Utils/types";
import { useTranslation } from "react-i18next";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface languageType {
    EN?: EnFontType;
    CN?: CnFontType;
    [key: string]: unknown;
}

interface TextProps {
    children?: React.ReactNode;
    /**
     * Font style, cn is Chinese fonts and en is English fonts.
     * For font variable names, refer to Text/style.scss.
     * If you use react-i18next. The attribute language of i18N is cn in Chinese and en in English
     */
    fonts?: languageType;
    className?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const TranslateText: FC<TextProps> = ({ children, fonts, className }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [classNameList, setClassNameList] = useState("");

    const { i18n } = useTranslation();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */ /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */ /************* This section will include this component parameter *************/ /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */ /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */ /************* This section will include this component general function *************/
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /**
     * 自定义设置字体样式
     */
    const language = i18n.language.toUpperCase();
    const customCSS =
        language && fonts?.[language] && typeof styles[fonts[language] as string] == "undefined"
            ? { font: fonts[language] as string }
            : {};
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * 这里  没必要用 useLayoutEffect 加 useState
     */
    useLayoutEffect(() => {
        if (!fonts) {
            return;
        }
        const fontsType = String(language === "EN" ? fonts.EN : fonts.CN);
        setClassNameList(classNames(["text_container", [`text_${fontsType}`], className]));
    }, [className, fonts, language]);
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={classNameList} style={customCSS}>
            {children}
        </div>
    );
};

export default TranslateText;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
