/**
 * @file
 * @date 2022-05-27
 * @author mingzhou.zhang
 * @lastModify  2022-05-27
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Descendant, Element, Text } from "slate";
import { languageConfig } from "../../../DefaultData/Zmz/criteria";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { Button } from "../../Buttons/Button";
import { Icon } from "../../Icon";
import { MagneticEditor } from "../../TextEdit/MagneticEditor";
import { Scale, ScaleProps, ScaleRef } from "../Scale";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface CriteriaProps extends ScaleProps {
    /**
     * text content save state
     */
    saveStatus?: boolean;
    /**
     * textarea init content
     */
    content?: string;
    /**
     * whether autosave
     */
    autoSave?: boolean;
    /**
     * autosave time interval
     */
    autoTime?: number;
    /**
     * custom autosave event
     * if don't pass , default use confirm event
     */
    onAutoSave?: () => void;
    /**
     * click save button call
     */
    onConfirm?: (content?: string) => void;
    /**
     * click cancel button call
     */
    onCancel?: () => void;
}
export interface CriteriaRef {
    ScaleRef: ScaleRef | null;
    zoomIn: () => void;
    zommOut: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Criteria = forwardRef<CriteriaRef, CriteriaProps>((props, ref) => {
    const {
        className,
        style,
        title,
        subtitle,
        saveStatus,
        content = '[{"children":[{"text":""}]}]',
        autoSave = true,
        autoTime = 300_000,
        allowBgZoom,
        maskClosable,
        isShow = false,
        customScaleNode,
        onConfirm,
        onAutoSave = onConfirm,
        onCancel,
        onZoomIn,
        onZoomOut,
    } = props;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [isAutoSave, setIsAutoSave] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editValue, setEditValue] = useState<Descendant[]>(() => {
        const ct = content ? content : '[{"children":[{"text":""}]}]';
        return JSON.parse(ct) as Descendant[];
    });
    const ScaleRef = useRef<ScaleRef>(null);

    const { t, i18n } = useTranslation();

    //这里添加翻译文件
    useLangConfig("CriteriaComponent", languageConfig);

    useEffect(() => {
        let timer: number;
        if (saveStatus === false) {
            setSaving(false);
            timer = window.setTimeout(() => {
                setIsAutoSave(false);
            }, 1000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [saveStatus]);

    useEffect(() => {
        let timer = 0;
        if (autoSave && isShow) {
            timer = window.setInterval(() => {
                if (!isEmpty(editValue)) {
                    setIsAutoSave(true);
                    setSaving(true);
                    onAutoSave?.();
                }
            }, autoTime);
            return () => {
                clearInterval(timer);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShow, editValue]);

    useImperativeHandle(ref, () => ({
        ScaleRef: ScaleRef.current,
        zoomIn: ScaleRef.current
            ? ScaleRef.current.zoomIn
            : () => console.error("Uninitialized successfully"),
        zommOut: ScaleRef.current
            ? ScaleRef.current.zoomOut
            : () => console.error("Uninitialized successfully"),
    }));
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const isEmpty = (value: Descendant[]) => {
        const element = value[0] as Element & Text;
        const childrenElement = element.children[0] as Element & Text;
        if (value.length > 1 || element.children.length > 1 || childrenElement.text.length > 0) {
            return false;
        }
        return true;
    };

    const beforeTitle = () => (
        <span className={styles.criteria_title}>{title ?? t("CriteriaComponent.Criteria")}</span>
    );
    const afterTitle = () => (
        <div className={styles.criteria_titleWrap}>
            <span className={styles.criteria_title__scale}>
                {title ?? t("CriteriaComponent.Criteria")}
            </span>
            <span className={styles.criteria_subtitle__scale}>
                {subtitle ?? t("CriteriaComponent.Something about criteria for your project")}
            </span>
        </div>
    );
    const beforeContent = () => (
        <div className={styles.criteria_contentWrap}>
            <div className={styles.criteria_content}>
                <MagneticEditor
                    className={styles.criteria_edit_font}
                    editorValue={editValue}
                    placeholder={t("CriteriaComponent.Not add criteria yet")}
                    readOnly={true}
                    handleValueChange={(value) => {
                        setEditValue(value);
                    }}
                />
            </div>
        </div>
    );
    const afterContent = () => (
        <div className={styles.criteria_contentWrap}>
            <MagneticEditor
                className={classNames(styles.criteria_content__scale, styles.criteria_edit_font)}
                editorValue={editValue}
                placeholder={t("CriteriaComponent.Edit here")}
                readOnly={!!saveStatus}
                handleValueChange={(value) => {
                    setEditValue(value);
                }}
            />
            <div className={styles.criteria_operation}>
                <div
                    className={classNames(styles.criteria_operation_tooltip, {
                        [`${styles.criteria_operation_tooltip__disable}`]: !isAutoSave,
                    })}
                >
                    {saving ? (
                        <Icon className={styles.criteria_operation_tooltip_save} type="save" />
                    ) : (
                        <Icon className={styles.criteria_operation_tooltip_right} type="right" />
                    )}
                    <span>
                        {isAutoSave &&
                            (saving
                                ? t("CriteriaComponent.Auto Saving")
                                : t("CriteriaComponent.Auto Saved"))}
                    </span>
                </div>
                <Button
                    className={classNames(styles.criteria_operation_cancel, {
                        [`${styles.criteria_operation_cancel__disable}`]: saveStatus,
                    })}
                    size="big"
                    type="primary"
                    label={t("CriteriaComponent.Cancel")}
                    onClick={() => {
                        onCancel?.();
                        setEditValue(JSON.parse(content) as Descendant[]);
                    }}
                />
                <Button
                    className={classNames(styles.criteria_operation_save, {
                        [`${styles.criteria_operation_save__disable}`]:
                            saveStatus || isEmpty(editValue),
                    })}
                    width="6rem"
                    disabled={!!saveStatus}
                    label={t("CriteriaComponent.Save")}
                    onClick={() => {
                        onConfirm?.(JSON.stringify(editValue));
                    }}
                />
            </div>
        </div>
    );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    Criteria.displayName = "Criteria";
    return (
        <Scale
            className={classNames(styles.criteria_wrap, className, {
                [`${styles.criteria_cn}`]: i18n.language === "cn",
            })}
            style={style}
            ref={ScaleRef}
            allowBgZoom={allowBgZoom}
            maskClosable={maskClosable}
            customScaleNode={customScaleNode}
            isShow={isShow}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            beforeTitle={beforeTitle()}
            afterTitle={afterTitle()}
            beforeContent={beforeContent()}
            afterContent={afterContent()}
        />
    );
});
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
