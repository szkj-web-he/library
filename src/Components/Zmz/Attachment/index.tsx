/**
 * @file
 * @date 2022-05-30
 * @author mingzhou.zhang
 * @lastModify  2022-05-30
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { languageConfig } from "../../../DefaultData/Zmz/attachment";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { Scale, ScaleProps } from "../Scale";
import { BeforeNode } from "./Unit/BeforeNode";
import { AttachmentMain, AttachmentMainProps } from "./Unit/Container";
import { FileItem } from "./Unit/Item";
import styles from "./style.module.scss";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export type AttachmentProps = Omit<
    ScaleProps,
    | "beforeTitle"
    | "afterTitle"
    | "scaleW"
    | "scaleH"
    | "beforeContent"
    | "afterContent"
    | "containerClassName"
> &
    Omit<AttachmentMainProps, "wrapAnimation" | "showPause" | "onPause" | "onResume">;

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Attachment: React.FC<AttachmentProps> = ({
    className,
    style,
    title,
    subtitle,
    defaultfileList,
    customScaleNode,
    isShow = false,
    limit,
    allowBgZoom,
    maskClosable,
    onCancel,
    onBeforeUpload,
    onEditConfirm,
    onEditCancel,
    onFileDelete,
    onDownFile,
    onFileLimit,
    onListUpdate,
    onZoomIn,
    onZoomOut,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [list, setList] = useState(defaultfileList ?? []);

    const { t, i18n } = useTranslation();

    //这里添加翻译文件
    useLangConfig("AttachmentComponent", languageConfig);

    useEffect(() => {
        if (defaultfileList !== undefined) {
            setList(defaultfileList);
        }
    }, [defaultfileList]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const listUpdate = (list: Array<FileItem>) => {
        onListUpdate?.(list);
        setList([...list]);
    };

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const beforeTitle = () => (
        <span className={styles.attachment_title}>
            {title ?? t("AttachmentComponent.Related Documents")}
        </span>
    );

    const afterTitle = () => (
        <div className={styles.attachment_titleWrap}>
            <span className={styles.attachment_title__scale}>
                {title ?? t("AttachmentComponent.Related Documents")}
            </span>
            <span className={styles.attachment_subtitle__scale}>
                {subtitle ??
                    t("AttachmentComponent.Upload the related documentations with this project")}
            </span>
        </div>
    );
    const beforeContent = () => (
        <BeforeNode
            style={{ width: "19.2rem", height: "14rem" }}
            list={list.filter((item) => item.status === "complete")}
        />
    );
    const afterContent = () => (
        <AttachmentMain
            wrapAnimation
            limit={limit}
            defaultfileList={list}
            onCancel={onCancel}
            onBeforeUpload={onBeforeUpload}
            onEditConfirm={onEditConfirm}
            onEditCancel={onEditCancel}
            onFileDelete={onFileDelete}
            onDownFile={onDownFile}
            onFileLimit={onFileLimit}
            onListUpdate={listUpdate}
        />
    );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Scale
            className={classNames(className, styles.attachment_wrap, {
                [styles.attachment_cn]: i18n.language === "cn",
            })}
            customScaleNode={customScaleNode}
            isShow={isShow}
            allowBgZoom={allowBgZoom}
            maskClosable={maskClosable}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            style={style}
            beforeTitle={beforeTitle()}
            afterTitle={afterTitle()}
            beforeContent={beforeContent()}
            afterContent={afterContent()}
        />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

export { BeforeNode, AttachmentMain };
