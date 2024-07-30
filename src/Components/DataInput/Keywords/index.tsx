/**
 * @file keywords component
 * @date 2021-10-21
 * @author xuejie.he
 * @lastModify xuejie.he 2021-10-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon, ScrollComponent, notice, useUnmount } from "../../..";
import { languageConfig } from "../../../DefaultData/DataInput/keywords";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import styles from "./styles.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface KeywordsProps {
    /**
     * default keyword list
     */
    defaultKeywords?: (string | number)[];
    /**
     *  Get the changed list
     */
    handleChangeKeywords?: (res: string[]) => void;
    /**
     * disabled
     */
    disabled?: boolean;
    /**
     *  Maximum number of keywords
     */
    maxKeywords?: number;
    /**
     * maxLength of input
     */
    maxLength?: number;
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Keywords: React.FC<KeywordsProps> = ({
    defaultKeywords,
    handleChangeKeywords,
    disabled,
    maxKeywords,
    maxLength,
    className,
    style = {
        width: "30rem",
    },
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [val, setVal] = useState("");

    /**
     * 1 => add
     * 2 => remove
     */
    const [operationType, setOperationType] = useState<1 | 2 | null>(null);

    const iptRef = useRef<null | HTMLInputElement>(null);
    const keywordsRef = useRef<null | HTMLDivElement>(null);

    const timer = useRef<null | number>(null);

    const { t } = useTranslation();
    //这里添加翻译文件
    useLangConfig("KeywordsComponent", languageConfig);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useUnmount(() => {
        timer.current && window.clearTimeout(timer.current);
    });

    /**
     * remove btn is active
     */
    const removeBtnStatus = () => {
        return operationType ? false : Boolean(defaultKeywords?.length);
    };

    /**
     * add btn is active
     */
    const addBtnStatus = () => {
        if (operationType) {
            return false;
        } else {
            return !(
                defaultKeywords &&
                Number(maxKeywords) >= 0 &&
                Number(maxKeywords) <= defaultKeywords.length
            );
        }
    };

    /**
     * add keywords
     */
    const addKeyword = () => {
        const value = val;
        const flag = defaultKeywords && defaultKeywords.some((index) => index.toString() === value);
        if (flag) {
            notice.error({
                title: t("KeywordsComponent.Error!"),
                description: `${t("KeywordsComponent.Repeated keywords")} - ${value} `,
            });
            return null;
        }
        if (
            Number(maxKeywords) >= 0 &&
            defaultKeywords &&
            defaultKeywords.length >= (maxKeywords as number)
        ) {
            notice.error({
                title: "Error!",
                description: t("KeywordsComponent.Maximum keyword length is 5!"),
            });
            return null;
        }
        const arr = defaultKeywords ? [...defaultKeywords] : [];
        arr.push(value);
        handleChangeKeywords && handleChangeKeywords([...arr.map((index) => index.toString())]);
        if (iptRef.current) {
            iptRef.current.value = "";
        }
        setVal("");
        if (Number(maxKeywords) >= 0 && arr.length >= (maxKeywords as number)) {
            if (iptRef.current) {
                iptRef.current.blur();
            }
        }
    };

    const handleAddClick = () => {
        if (addBtnStatus()) {
            setOperationType(1);
            timer.current && window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => {
                iptRef.current?.focus();
            });
        }
    };

    const handleRemoveClick = () => {
        if (removeBtnStatus()) {
            setOperationType(2);
            timer.current && window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => {
                keywordsRef.current?.focus();
            });
        }
    };

    const handleIptBlur = () => {
        setOperationType(null);
    };

    const handleIptKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const keyVal = e.key;

        if (keyVal === "Enter") {
            addKeyword();
        } else if (keyVal === "Escape") {
            if (iptRef.current) {
                iptRef.current.blur();
            }
        }
    };

    const handleIptEnterClick = () => {
        if (iptRef.current) {
            iptRef.current.blur();
        }
        addKeyword();
    };

    const handleIptCancelClick = () => {
        if (iptRef.current) {
            iptRef.current.value = "";
        }
        setVal("");
    };

    const removeKeywords = (index: number | string) => {
        const arr: string[] = [];
        const list = defaultKeywords || [];
        for (let i = 0; i < list.length; i++) {
            if (list[i] !== index) {
                arr.push(list[i].toString());
            }
        }

        handleChangeKeywords && handleChangeKeywords([...arr]);
        if (arr.length === 0 && keywordsRef.current) {
            keywordsRef.current.blur();
        }
    };

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * input element
     * @returns {React.ReactNode}
     */
    const inputElement = (): React.ReactNode => {
        return (
            <div
                className={
                    styles.keywords_iptContainer +
                    (operationType === 1 ? " " + styles.keywords_iptContainer__active : "")
                }
            >
                <input
                    type="text"
                    className={styles.keywords_iptElement}
                    onFocus={(e) => {
                        e.currentTarget.value = "";
                        setVal("");
                    }}
                    onKeyDown={handleIptKeyDown}
                    maxLength={maxLength}
                    onBlur={handleIptBlur}
                    ref={iptRef}
                    onInput={(e) => {
                        setVal(e.currentTarget.value.trim());
                    }}
                />
                <div className={styles.keywords_iptBtnList}>
                    <Icon
                        type="right"
                        className={
                            styles.keywords_rightIcon +
                            (val ? " " + styles.keywords_rightIcon__active : "")
                        }
                        onMouseDown={(e) => {
                            e.preventDefault();
                        }}
                        title={t("KeywordsComponent.Confirm")}
                        onClick={handleIptEnterClick}
                    />
                    <Icon
                        type="close"
                        className={
                            styles.keywords_closeIcon +
                            (val ? " " + styles.keywords_closeIcon__active : "")
                        }
                        onMouseDown={(e) => {
                            e.preventDefault();
                        }}
                        title={t("KeywordsComponent.Clear")}
                        onClick={handleIptCancelClick}
                    />
                </div>
            </div>
        );
    };

    /**
     * keyword list element
     * @returns {React.ReactNode}
     */
    const keywordItemList = (): React.ReactNode => {
        return (
            defaultKeywords &&
            defaultKeywords.map((index) => {
                return (
                    <div className={styles.keywords_item} key={index}>
                        <Icon
                            type="deleteMinus"
                            className={
                                styles.keywords_removeIcon +
                                (operationType === 2
                                    ? " " + styles.keywords_removeIcon__active
                                    : "")
                            }
                            title={t("KeywordsComponent.Remove")}
                            onClick={() => {
                                removeKeywords(index);
                            }}
                        />
                        {index}
                    </div>
                );
            })
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.keywords_wrapper + (className ? " " + className : "")} style={style}>
            <div
                className={styles.keywords_main}
                tabIndex={-1}
                onBlur={() => setOperationType(null)}
                ref={keywordsRef}
            >
                <ScrollComponent>
                    {keywordItemList()}
                    {inputElement()}
                </ScrollComponent>
            </div>
            {!disabled && (
                <div className={styles.keywords_btnList}>
                    <Icon
                        type="addition"
                        className={
                            styles.keywords_addBtnIcon +
                            (addBtnStatus() ? " " + styles.keywords_addBtnIcon__active : "")
                        }
                        title={t("KeywordsComponent.Add")}
                        onMouseDown={handleAddClick}
                    />

                    <Icon
                        type="dustbin"
                        className={
                            styles.keywords_removeBtnIcon +
                            (removeBtnStatus() ? " " + styles.keywords_removeBtnIcon__active : "")
                        }
                        title={t("KeywordsComponent.Delete")}
                        onMouseDown={handleRemoveClick}
                    />
                </div>
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
