/**
 * @file Input box for configuration data
 * @date 2021-08-09
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownBtn, DropdownContent, Icon } from "../../..";
import { languageConfig } from "../../../DefaultData/DataInput/listRetrieval";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import { ScrollComponent } from "../../DataDisplay/Scroll";
import { transformStr } from "./Unit/filterList";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ListRetrievalProps {
    /**
     * list content
     */
    contentList?: string[];
    /**
     *  matching type : is fuzzy
     */
    fuzzy?: boolean;
    /**
     * get selected value
     */
    getSelectValue?: (res: string) => void;
    /**
     * set style when focus
     */
    focusStyle?: React.CSSProperties;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * triangle size
     */
    triangleSize?: {
        w: string;
        h: string;
    };
    /**
     * triangle height
     */
    triangleColor?: string;
    /**
     *
     */
    floatingClassName?: string;
    /**
     * start position
     */
    startingPosition?: "lb" | "rb" | "cb" | "lt" | "rt" | "ct";
    /**
     * placeholder of this component
     */
    placeholder?: string;
    /**
     * className of this component wrap
     */
    className?: string;
    /**
     * oninput callback
     */
    onInput?: (value: string) => void;
    /**
     * value of input
     */
    value?: string;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ListRetrieval: React.FC<ListRetrievalProps> = ({
    contentList,
    fuzzy = false,
    getSelectValue,
    focusStyle,
    placeholder,
    style,
    triangleSize,
    triangleColor,
    floatingClassName,
    startingPosition,
    className,
    value,
    onInput,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    //这里添加翻译文件
    useLangConfig("ListRetrievalComponent", languageConfig);

    const { t } = useTranslation();
    /**
     * input element
     */
    const iptEl = useRef<HTMLInputElement>(null);

    /**
     * 检索值
     */
    const [matchList, setMatchList] = useState<string[]>();

    /**
     * 菜单列表
     */
    const [list, setList] = useState<string[]>(() =>
        contentList
            ? contentList.filter((content) =>
                  matchList ? matchList.some((item) => content.includes(item)) : true,
              )
            : [],
    );

    /**
     * hover状态
     */
    const [hoverStatus, setHoverStatus] = useState(false);

    /**
     * 下拉框是否可见
     */
    const [visible, setVisible] = useState(false);

    /**
     * 输入框的值
     */
    const iptVal = useRef<string>();

    /**
     * 下拉框过渡是否结束
     */
    const isTransitionEnd = useRef(true);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const arr = contentList
            ? contentList.filter((content) =>
                  matchList ? matchList.some((item) => content.includes(item)) : true,
              )
            : [];
        setList([...arr]);
    }, [contentList, matchList]);

    useEffect(() => {
        if (isTransitionEnd.current) {
            setMatchList(() => {
                if (fuzzy) {
                    return value ? value.split("") : undefined;
                } else if (value) {
                    return [value];
                } else {
                    return undefined;
                }
            });
        }
        iptVal.current = value;
        if (iptEl.current) {
            iptEl.current.value = value ?? "";
        }
    }, [fuzzy, value]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.trim();
        onInput?.(val);
        iptVal.current = val;
        setMatchList(() => {
            if (fuzzy) {
                return val ? val.split("") : undefined;
            } else if (val) {
                return [val];
            } else {
                return undefined;
            }
        });
    };

    const handleSelect = (item: string) => {
        getSelectValue?.(item);
        if (iptEl.current) {
            iptEl.current.blur();
            iptEl.current.value = item;
        }
        iptVal.current = item;
    };

    const listContent = () =>
        list.map((item) => {
            let content: string = item;
            matchList?.forEach((item) => {
                const reg = transformStr(item);
                content = content.replace(reg, `<em>${item}</em>`);
            });

            return (
                <div
                    className={styles.listRetrieval_item}
                    key={item}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(item)}
                >
                    <div
                        className={styles.listRetrieval_itemContent}
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            );
        });

    const handleFocus = () => {
        setVisible(true);
    };
    const handleBlur = () => {
        setVisible(false);
    };

    const handleTransitionStart = () => {
        isTransitionEnd.current = false;
    };

    /**
     * 赋值检索值
     */
    const setVal = () => {
        setMatchList(() => {
            if (fuzzy) {
                return iptVal.current ? iptVal.current.split("") : undefined;
            } else if (iptVal.current) {
                return [iptVal.current];
            } else {
                return undefined;
            }
        });
    };

    const handleTransitionEnd = () => {
        isTransitionEnd.current = true;
        setVal();
    };

    const handleTransitionCancel = () => {
        isTransitionEnd.current = true;
        setVal();
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Dropdown
            placement={startingPosition}
            triangle={{
                width: triangleSize?.w || "0",
                height: triangleSize?.h || "0",
                color: triangleColor,
            }}
            show={visible}
        >
            <DropdownBtn className={styles.listRetrieval_wrap + (className ? ` ${className}` : "")}>
                <div
                    className={styles.listRetrieval_inputWrap}
                    onMouseEnter={() => setHoverStatus(true)}
                    onMouseLeave={() => setHoverStatus(false)}
                    style={Object.assign({}, style, visible ? focusStyle || {} : {})}
                >
                    <input
                        type="text"
                        className={styles.listRetrieval_container}
                        onInput={handleChange}
                        ref={iptEl}
                        onFocus={handleFocus}
                        placeholder={placeholder}
                        onBlur={handleBlur}
                    />
                    <Icon
                        type="empty"
                        onClick={() => {
                            iptVal.current = undefined;
                            setMatchList(undefined);
                            if (iptEl.current) {
                                iptEl.current.value = "";
                            }
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                        className={
                            styles.listRetrieval_clearIcon +
                            (matchList?.length && (hoverStatus || visible)
                                ? ` ${styles.listRetrieval_clearIcon__active}`
                                : "")
                        }
                    />
                </div>
            </DropdownBtn>
            <DropdownContent
                className={floatingClassName}
                handleTransitionStart={handleTransitionStart}
                handleTransitionEnd={handleTransitionEnd}
                handleTransitionCancel={handleTransitionCancel}
            >
                {list.length ? (
                    <ScrollComponent
                        bodyClassName={styles.listRetrieval_listBody}
                        className={styles.listRetrieval_listWrap}
                    >
                        {listContent()}
                    </ScrollComponent>
                ) : (
                    <div className={styles.listRetrieval_listNull}>
                        {t("ListRetrievalComponent.null")}
                    </div>
                )}
            </DropdownContent>
        </Dropdown>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
