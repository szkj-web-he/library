/**
 * @file
 * @date 2022-06-03
 * @author
 * @lastModify  2022-06-03
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import classNames from "../../../Unit/classNames";

import { useTranslation } from "react-i18next";
import { languageConfig } from "../../../DefaultData/Zmz/authorization";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import { Button } from "../../Buttons/Button";
import { ScrollComponent } from "../../DataDisplay/Scroll";
import { Icon } from "../../Icon";
import { LoadingComponent } from "../../Loading/LoadingComponent";
import { Scale, ScaleProps, ScaleRef } from "../Scale";
import styles from "./style.module.scss";
import { Item, UserInfoProps } from "./Unit/Item";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface AuthorizationProps extends ScaleProps {
    /**
     * data source
     */
    source?: Array<UserInfoProps>;
    /**
     * data loding state
     */
    isLoading?: boolean;
    /**
     * slide to the bottom trigger this event
     */
    onLoadMore?: (scrollRef: HTMLDivElement | null) => void;
    /**
     * switch change event
     */
    onSwitchChange?: (item: UserInfoProps, state: boolean) => void;
    /**
     * click on the cancel button calls
     */
    onCancel?: (scaleRef: ScaleRef) => void;
    /**
     * click on the confirm button calls
     */
    onConfirm?: (list: Array<UserInfoProps>, scaleRef: ScaleRef) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Authorization: React.FC<AuthorizationProps> = (props) => {
    const {
        className,
        style,
        title,
        subtitle,
        isLoading = false,
        source = [],
        customScaleNode,
        isShow = false,
        allowBgZoom,
        maskClosable,
        onLoadMore,
        onSwitchChange,
        onCancel,
        onConfirm,
        onZoomIn,
        onZoomOut,
    } = props;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const list = useRef(source);
    const scaleRef = useRef<ScaleRef>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [scrollTop, setScrollTop] = useState(0);

    const { t, i18n } = useTranslation();

    //这里添加翻译文件
    useLangConfig("AuthorizationComponent", languageConfig);

    useEffect(() => {
        if (scrollRef.current && isLoading) {
            const scrollWrap = scrollRef.current.lastElementChild;
            if (scrollWrap) {
                scrollWrap.scrollTo({
                    top: scrollWrap.scrollHeight - scrollWrap.clientHeight,
                });
            }
        }
    }, [isLoading]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const beforeTitle = () => (
        <span className={styles.authorization_title}>
            {title ?? t(`AuthorizationComponent.Authorization`)}
        </span>
    );
    const afterTitle = () => (
        <div className={styles.authorization_titleWrap}>
            <span className={styles.authorization_title__scale}>
                {title ?? t(`AuthorizationComponent.Authorization`)}
            </span>
            <span className={styles.authorization_subtitle__scale}>
                {subtitle ??
                    t(
                        `AuthorizationComponent.Set permission of your organization members to this project`,
                    )}
            </span>
        </div>
    );
    const beforeContent = () => (
        <div className={styles.authorization_contentWrap}>
            <div
                className={
                    styles.authorization_content + ` ${!source.length ? "" : styles.list_wrap}`
                }
            >
                {!source.length ? (
                    t("AuthorizationComponent.Not add anyone yet")
                ) : (
                    <>
                        {source.slice(0, 3).map((item, index) => (
                            <div key={index} className={styles.list_item}>
                                <span>
                                    {!item.avatar ? (
                                        <Icon
                                            type="person01Solid"
                                            className={styles.list_item_icon}
                                        />
                                    ) : (
                                        <img
                                            src={item.avatar}
                                            className={styles.list_item_icon}
                                            alt=""
                                        />
                                    )}
                                    <span>{item.name}</span>
                                </span>
                                <span>
                                    {item.isAdmin ? (
                                        <>
                                            {t("AuthorizationComponent.Admin")}

                                            {!index && (
                                                <span>({t("AuthorizationComponent.me")})</span>
                                            )}
                                        </>
                                    ) : (
                                        t("AuthorizationComponent.Non-Admin")
                                    )}
                                </span>
                            </div>
                        ))}
                        <Icon type="moreHorizontal" className={styles.list_item_more} />
                    </>
                )}
            </div>
        </div>
    );
    const afterContent = () => (
        <div className={styles.authorization_listWrap}>
            <div className={styles.authorization_listWrap_title}>
                <span>{t("AuthorizationComponent.Name")}</span>
                <span>{t("AuthorizationComponent.Email")}</span>
                <span>{t("AuthorizationComponent.Authorizations")}</span>
            </div>
            <ScrollComponent
                ref={scrollRef}
                stopPropagation={false}
                handleBarChange={(res) => {
                    // 判断是否滑动到底部
                    if (res.clientHeight + res.top === res.scrollHeight) {
                        if (!isLoading) {
                            onLoadMore?.(scrollRef.current);
                        }
                        setScrollTop(res.scrollHeight - res.clientHeight - 1);
                    }
                }}
                defaultScrollTop={scrollTop}
                height="30.5rem"
                className={styles.authorization_list}
            >
                {source.map((item, index) => (
                    <Item
                        key={item.id ? item.id : Date.now() + index}
                        self={!index}
                        onSwitchChange={(state) => {
                            item.isAdmin = state;
                            onSwitchChange?.(item, state);
                        }}
                        {...item}
                    />
                ))}
                {isLoading && (
                    <div className={styles.authorization_list_loading}>
                        <span>{t("AuthorizationComponent.Loading")}</span>
                        <LoadingComponent
                            color="#BDBDBD"
                            width="2rem"
                            height="2rem"
                            type="spinningBubbles"
                        />
                    </div>
                )}
            </ScrollComponent>
            <div className={styles.authorization_operation}>
                <Button
                    className={styles.authorization_confirm}
                    size="big"
                    label={t("AuthorizationComponent.Cancel")}
                    type="primary"
                    onClick={() => {
                        scaleRef.current && onCancel?.(scaleRef.current);
                    }}
                />
                <Button
                    className={styles.authorization_cancel}
                    label={t("AuthorizationComponent.Save")}
                    onClick={() => {
                        scaleRef.current?.zoomIn();
                        scaleRef.current && onConfirm?.(list.current, scaleRef.current);
                    }}
                />
            </div>
        </div>
    );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Scale
            ref={scaleRef}
            className={classNames(className, styles.authorization_wrap, {
                [`${styles.authorization_cn}`]: i18n.language === "cn",
            })}
            style={style}
            customScaleNode={customScaleNode}
            allowBgZoom={allowBgZoom}
            maskClosable={maskClosable}
            isShow={isShow}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            beforeContent={beforeContent()}
            afterContent={afterContent()}
            beforeTitle={beforeTitle()}
            afterTitle={afterTitle()}
        />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
