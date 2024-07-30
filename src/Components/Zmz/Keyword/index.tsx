/**
 * @file
 * @date 2022-05-20
 * @author
 * @lastModify  2022-05-20
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, InputEvents, Kite, createHash } from "../../..";
import { languageConfig } from "../../../DefaultData/Zmz/keyword";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { ToolTips } from "../../DataDisplay/ToolTips";
import { Icon } from "../../Icon";
import { KeywordBtn } from "./Unit/KeywordBtn";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
type ButtonType = "default" | "multi";

interface KeywordsItem {
    value: string | number;
    id: string | number;
}

export interface KeywordProps {
    /**
     * default keywords list
     */
    defaultKeywords?: KeywordsItem[];
    /**
     *  Maximum number of keywords
     */
    maxKeywords?: number;
    /**
     * The width of the Keywords
     */
    width?: string;
    /**
     * The style for component
     */
    style?: React.CSSProperties;
    /**
     * The classname for component
     */
    classname?: string;
    /**
     * animation duration time
     */
    animationTime?: number;
    /**
     * confirm event
     */
    onConfirm?: (item?: KeywordsItem, index?: number, list?: Array<KeywordsItem>) => void;
    /**
     * cancel event
     */
    onCancel?: () => void;
    /**
     * keyword del event
     */
    onKeywordDel?: (item?: KeywordsItem, index?: number, list?: Array<KeywordsItem>) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Keyword: React.FC<KeywordProps> = ({
    defaultKeywords,
    maxKeywords = 5,
    width = "35rem",
    style,
    classname,
    animationTime = 500,
    onConfirm,
    onCancel,
    onKeywordDel,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [status, setStatus] = useState<ButtonType>("default");
    const [inputShow, setInputShow] = useState(false);
    const [animationState, setAnimationState] = useState({
        animationIn: false,
        animationOut: false,
    });
    const [value, setValue] = useState("");
    const [keywordList, setKeywordList] = useState<Array<KeywordsItem>>([]);
    const [show, setShow] = useState(false);
    const [root, setRoot] = useState<HTMLElement>();
    const [hover, setHover] = useState<number | string | undefined>(undefined);

    const inputRef = useRef<InputEvents | null>(null);

    const timeoutList = useRef<number[]>([]);

    useEffect(() => {
        if (defaultKeywords && defaultKeywords.length) {
            setStatus("multi");
            setKeywordList([...defaultKeywords]);
        }

        () => {
            timeoutList.current.forEach((item) => {
                window.clearTimeout(item);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { t } = useTranslation();

    //这里添加翻译文件
    useLangConfig("KeywordComponent", languageConfig);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleAdd = () => {
        if (keywordList.length >= maxKeywords) {
            return;
        }
        setShow(false);
        setAnimationState({
            animationIn: false,
            animationOut: true,
        });
        timeoutList.current.push(
            window.setTimeout(() => {
                setInputShow(true);
                inputRef.current?.focus();
            }, animationTime),
        );
    };

    const handleInputChange = (val: string) => {
        setValue(val);
    };

    const handleInputBlur = () => {
        keywordList.length ? setStatus("multi") : setStatus("default");
        setInputShow(false);
        setAnimationState({
            animationIn: true,
            animationOut: false,
        });
        timeoutList.current.push(
            window.setTimeout(() => {
                setAnimationState({
                    animationIn: false,
                    animationOut: false,
                });
            }, animationTime - 100),
        );
        setValue("");
    };

    const handleConfirm = () => {
        if (!value) {
            return;
        }
        keywordList.push({ value, id: createHash() });
        setKeywordList(keywordList);
        onConfirm?.(keywordList[keywordList.length - 1], keywordList.length - 1, keywordList);
    };

    const handleCancel = () => {
        onCancel?.();
    };

    const handleDel = (item: KeywordsItem, index: number) => {
        keywordList.splice(index, 1);
        !keywordList.length && setStatus("default");
        setKeywordList([...keywordList]);
        onKeywordDel?.(item, index, keywordList);
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleConfirm();
            inputRef.current?.blur();
        }
    };

    const renderButton = (status: ButtonType) => {
        return (
            <div className={styles.keyword_button_wrap}>
                <KeywordBtn
                    disable={keywordList.length === maxKeywords}
                    type={status}
                    onClick={handleAdd}
                    onMouseEnter={(event) => {
                        setShow(true);
                        event.currentTarget;
                        if (keywordList.length === maxKeywords) {
                            setRoot(event.currentTarget as HTMLSpanElement);
                        }
                    }}
                    onMouseLeave={() => {
                        setShow(false);
                    }}
                    animationIn={animationState.animationIn}
                    animationOut={animationState.animationOut}
                />
                <Input
                    className={classNames(styles.keyword_input_wrap, {
                        [`${styles.keyword_input_hide}`]: !inputShow,
                    })}
                    ref={inputRef}
                    value={value}
                    onKeyDown={handleInputKeyDown}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    hiddenClearIcon
                    afterNode={
                        <>
                            <Icon
                                type="right"
                                className={
                                    styles.keyword_icon_confirm +
                                    ` ${value ? styles.show : styles.hide}`
                                }
                                onMouseDown={handleConfirm}
                            />
                            <Icon
                                type="close"
                                className={
                                    styles.keyword_icon_cancel +
                                    ` ${value ? styles.show : styles.hide}`
                                }
                                onMouseDown={handleCancel}
                            />
                        </>
                    }
                />
            </div>
        );
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={classNames(styles.keyword_wrap, classname)} style={{ ...style, width }}>
            {keywordList.length ? (
                keywordList.map((item, index) => {
                    return (
                        <div
                            onMouseEnter={() => {
                                setHover(item.id);
                                setKeywordList([...keywordList]);
                            }}
                            onMouseLeave={() => {
                                setHover(undefined);
                                setKeywordList([...keywordList]);
                            }}
                            key={index}
                            className={styles.keyword_list_item}
                        >
                            {item.value}
                            {hover === item.id && (
                                <span
                                    onClick={() => {
                                        handleDel(item, index);
                                    }}
                                    className={styles.keywrod_icon_del}
                                />
                            )}
                        </div>
                    );
                })
            ) : (
                <></>
            )}
            {renderButton(status)}
            {keywordList.length === maxKeywords && root && (
                <Kite placement="ct" show={show} root={root}>
                    <ToolTips
                        style={{ marginBottom: "1rem" }}
                        type="TM"
                        content={t("KeywordComponent.You can only add 5 keywords at most")}
                    />
                </Kite>
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
