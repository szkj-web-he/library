/**
 * @file 关键词匹配
 * @date 2023-06-20
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-20
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { deepCloneData } from "../../../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface MatchKeywordsProps {
    /**
     * 要渲染的字段
     */
    content: string;

    /**
     * 转化的关键词
     */
    keywords?: string;

    /**
     * 当匹配到的内容转化成什么节点
     */
    render?: (str: string) => React.ReactNode;
    /**
     *
     */
    className?: string;
}

interface MatchTextProps {
    value: string;
    isMatch?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const MatchKeywords: React.FC<MatchKeywordsProps> = ({
    content,
    keywords,
    render,
    className,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [text, setText] = useState<Array<MatchTextProps>>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        (() => {
            if (!keywords) {
                setText(content.split("").map((item) => ({ value: item })));
                return;
            }

            const textArr: Array<MatchTextProps> = [];
            /**
             * 将关键词都改成\凭借方式
             * a => \a
             * * =>\*
             */
            let transformKeywordStr = "";

            for (let i = 0; i < keywords.length; i++) {
                const item = keywords.slice(i, i + 1);
                if (/[a-z0-9_]/i.test(item)) {
                    transformKeywordStr += item;
                } else {
                    transformKeywordStr += `\\${item}`;
                }
            }

            const reg = new RegExp(`(${transformKeywordStr})`, "ig");
            const arr = content.split(reg);
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                if (item) {
                    const data: MatchTextProps = { value: item };
                    if (reg.test(item)) {
                        reg.lastIndex = 0;
                        data.isMatch = true;
                    }
                    textArr.push(data);
                }
            }
            setText(deepCloneData(textArr));
        })();
    }, [keywords, content]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <span className={className}>
            {text?.map((item, i) => {
                if (item.isMatch) {
                    return (
                        <Fragment key={i}>
                            {render ? (
                                render(item.value)
                            ) : (
                                <span className={styles.matchKeywords_bold}>{item.value}</span>
                            )}
                        </Fragment>
                    );
                }
                return <Fragment key={i}>{item.value}</Fragment>;
            })}
        </span>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
