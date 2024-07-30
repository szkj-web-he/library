/**
 * @file index file of Upload component
 * @date 2020-09-07
 * @author Andy Jiang
 * @lastModify Andy Jiang 2020-09-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../../..";
import { languageConfig } from "../../../DefaultData/DataInput/upload";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import style from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface UploadProps {
    /**
     * width of this component
     */
    width?: string;
    /**
     * height of this component
     */
    height?: string;
    /**
     * placeholder
     */
    placeholder?: string;
    /**
     * upload Icon
     */
    icon?: React.ReactNode;

    /**
     * children
     */
    children?: React.ReactNode;
    /**
     * function will be called when the input of this component is changed
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * get input value
     */
    handleOnFileUpload?: (files?: FileList) => void;
    /**
     * custom class name
     */
    customClassName?: string;
    /**
     * Is global of input
     */
    isGlobal?: boolean;
    /**
     * link context
     */
    linkMsg?: string;
    /**
     * get input element
     */
    getInputEl?: (el: HTMLElement) => void;
    /**
     * custom style
     */
    styles?: React.CSSProperties;
    /**
     * Limit file upload types
     */
    accept?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Upload: React.FC<UploadProps> = ({
    width = "9rem",
    height = "11rem",
    placeholder,
    icon,
    children,
    onChange,
    isGlobal = true,
    handleOnFileUpload,
    customClassName,
    linkMsg,
    getInputEl,
    styles,
    accept,
}) => {
    const IptRef = useRef<null | HTMLInputElement>(null);
    const [visible, setVisible] = useState(() => isGlobal);

    const { t } = useTranslation();

    //这里添加翻译文件
    useLangConfig("UploadComponent", languageConfig);

    useEffect(() => {
        setVisible(isGlobal);
    }, [isGlobal]);

    const fn = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        fn(e);
        const files = e.dataTransfer.files;
        if (files) {
            const el = IptRef.current;
            if (!el) return;
            handleOnFileUpload?.(files);
        }
    };
    /**
     * will be called when input changes
     * @param event event target
     */

    return (
        <div
            className={style.upload_container + (customClassName ? " " + customClassName : "")}
            onDrop={handleDrop}
            onDragOver={fn}
            onDragEnter={fn}
            style={{ width, height, ...styles }}
            {...Object.assign(
                {},
                isGlobal === false
                    ? {
                          onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
                              e.stopPropagation();
                              e.preventDefault();
                              if (IptRef.current) {
                                  IptRef.current.value = "";
                              }
                              setVisible(true);
                          },
                      }
                    : {},
            )}
        >
            {
                <input
                    accept={accept}
                    className={
                        style.upload_input +
                        (visible === false ? ` ${style.upload_input_hidden}` : "")
                    }
                    ref={(el) => {
                        if (el && getInputEl) getInputEl(el);
                        IptRef.current = el;
                    }}
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.persist();
                        onChange?.(e);
                        if (isGlobal === false) {
                            setVisible(false);
                        }
                        if (handleOnFileUpload && e.target.files)
                            handleOnFileUpload(e.target.files);
                        // reset input value otherwise may not trigger event calls
                        e.target.value = "";
                    }}
                    multiple
                />
            }
            <div className={style.upload_cover} style={{ width, height }}>
                <div className={style.upload_coverContainer}>
                    <div className={style.upload_icon}>
                        {icon ? (
                            icon
                        ) : (
                            <Icon type="exportIcon" className={style.upload_defaultIcon} />
                        )}
                    </div>
                    <div className={style.upload_text}>
                        {placeholder ?? t("UploadComponent.upload avatar")}
                    </div>
                    {linkMsg && (
                        <span
                            className={style.upload_linkMsg}
                            onClick={() => {
                                if (isGlobal === false) {
                                    IptRef.current && IptRef.current.click();
                                }
                            }}
                        >
                            {linkMsg}
                        </span>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
