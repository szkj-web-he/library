/**
 * @file
 * @date 2022-06-15
 * @author
 * @lastModify  2022-06-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageComponent, useLoginStatus } from "../../..";
import idCardImg from "../../../Assets/images/secret_idCard.png";
import SecurityRecord from "../../../Assets/images/spr_security_record.png";
import {
    defaultCompanySet,
    defaultProductsSet,
    defaultResourcesSet,
    defaultRightLinkSet,
    langConfig,
} from "../../../DefaultData/Footer/footer";
import { list } from "../../../DefaultData/Navigation/navigationBar";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { useProjectContext } from "../../OIDCLogin/Unit/projectContext";
import { ImageViewer, ImageViewerEvents } from "../../Preview/ImageViewer";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface LinkItem {
    label: string;
    func: () => void;
    link?: string;
    linkJump?: boolean;
}

export interface FooterProps {
    productsSet?: Array<LinkItem>;
    companySet?: Array<LinkItem>;
    resourcesSet?: Array<LinkItem>;
    rightLinkSet?: Array<LinkItem>;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Footer: React.FC<FooterProps> = (props) => {
    const { productsSet, companySet, resourcesSet, rightLinkSet } = props;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [width, setWidth] = useState(window.innerWidth);

    const { t, i18n } = useTranslation();

    const projectName = useProjectContext(); //项目名称

    /**
     * 获取登录状态
     */
    const loginStatus = useLoginStatus();

    //这里添加翻译文件
    useLangConfig("FooterComponent", langConfig);

    const labelSet = () => [
        { label: t("FooterComponent.Products"), data: productsSet ?? defaultProductsSet() },
        { label: t("FooterComponent.Company"), data: companySet ?? defaultCompanySet() },
        {
            label: t("FooterComponent.Resources"),
            data: resourcesSet ?? defaultResourcesSet(loginStatus.status),
        },
    ];

    /**
     * 转发的事件
     */
    const imageEvents = useRef<ImageViewerEvents | null>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const fn = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleLinkClick = (item: LinkItem) => {
        item?.func();
        if (item.linkJump && item.link) {
            window.location.href = item.link;
        }
    };

    const leftElement = (
        <div className={styles.footer_leftWrap}>
            {labelSet().map((item) => {
                return (
                    <div className={styles.footer_linkGroup} key={item.label}>
                        <div className={styles.footer_linkTitle}>{item.label}</div>
                        <ul className={styles.footer_linkList}>
                            {item.data.map((cItem) => {
                                return (
                                    <li
                                        className={styles.footer_linkItem}
                                        key={cItem.label}
                                        onClick={() => {
                                            handleLinkClick(cItem);
                                        }}
                                    >
                                        {cItem.label}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    ); //左侧内容

    const currentLanguage = list.find((item) => item.sim === i18n.language); //当前选中的语言

    const rightElement = (
        <div className={styles.footer_rightWrap}>
            <div className={styles.footer_language}>
                <img src={currentLanguage?.img} className={styles.footer_language_icon} alt="" />
                <span className={styles.footer_language_content}>
                    {currentLanguage?.sim === "cn" ? "简体中文" : currentLanguage?.content}
                </span>
            </div>
            <ul className={styles.footer_linkRight}>
                {(rightLinkSet ?? defaultRightLinkSet()).map((item) => {
                    return (
                        <li
                            className={styles.footer_linkRightItem}
                            key={item.label}
                            onClick={() => {
                                handleLinkClick(item);
                            }}
                        >
                            {item.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={classNames(styles.footer_wrapper, {
                [`${styles.footer_cn}`]: i18n.language === "cn",
                [styles.footer_colourful]: projectName === "community",
            })}
        >
            <div className={styles.footer_wrapper_top}>
                {leftElement}
                {width >= 375 && rightElement}
            </div>
            <div className={styles.footer_hr} />
            <div className={styles.footer_wrapper_bottom}>
                {width < 375 && rightElement}
                <div className={styles.footer_info}>
                    <span className={styles.footer_copyright}>
                        {t("FooterComponent.© dataReachable. All Rights Reserved")}
                    </span>
                    <span className={styles.footer_filing}>
                        <a href="https://beian.miit.gov.cn" target={"_blank"} rel="noreferrer">
                            鄂ICP备2022009085号-1
                        </a>
                    </span>
                    <span className={styles.footer_security_record}>
                        <img src={SecurityRecord} alt="" />
                        <a href="https://www.beian.gov.cn/" target={"_blank"} rel="noreferrer">
                            鄂公网安备 42018502005944号
                        </a>
                    </span>
                    <span
                        className={styles.footer_idCard}
                        onClick={() => {
                            imageEvents.current?.open(0);
                        }}
                    >
                        增值电信业务经营许可证：鄂B2-20230124
                    </span>
                </div>
            </div>
            <ImageViewer ref={imageEvents}>
                <ImageComponent
                    src={idCardImg}
                    nodeOnHover={<></>}
                    isVisible={false}
                    isDownload={false}
                    name="中华人民共和国增值电信业务经营许可证"
                />
            </ImageViewer>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
