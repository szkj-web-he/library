/**
 * @file
 * @date 2022-10-21
 * @author
 * @lastModify  2022-10-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { getIconType, Icon, Progress } from "../../..";
import classNames from "../../../Unit/classNames";
import { AxiosInstance } from "axios";
import React, { Fragment, HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import { languageConfig } from "../../../DefaultData/Zmz/downloadCard";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface DownloadCardProps extends HtmlHTMLAttributes<HTMLDivElement> {
    request: AxiosInstance;
    onDownloadProgress?: (parcent: number) => void;
    itemClassName?: string;
    children: React.ReactNode;
}

export interface QueueItem {
    id: string;
    name: string;
    val: number;
    controller: AbortController | null;
    end: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const DownloadCard: React.FC<DownloadCardProps> = ({
    request: service,
    onDownloadProgress,
    itemClassName,
    children,
    ...rest
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const queues = useRef<QueueItem[]>([]);
    const [active, setActive] = useState(-1);
    const [isIcon, setIsIcon] = useState(false);
    const [isButton, setIsButton] = useState(false);

    const timer = useRef(0);
    const memoQueue = useRef<QueueItem[]>([]);

    const { t, i18n } = useTranslation();

    //这里添加翻译文件
    useLangConfig("DownloadCardComponent", languageConfig);

    useEffect(() => {
        service.interceptors.request.use((config) => {
            if (config.responseType === "blob") {
                const controller = new AbortController();
                const queueItem = {
                    id: `${new Date().valueOf()}`,
                    name: localStorage.getItem("curFileName") ?? "",
                    val: 0,
                    controller,
                    end: -1,
                };
                memoQueue.current = [...queues.current];
                queues.current.unshift(queueItem);
                config.signal = controller.signal;
                config.onDownloadProgress = (progress) => {
                    const curItem = queues.current.find((item) => item.id === queueItem.id);
                    const val = (progress.loaded * 100) / (progress.total ?? 0);
                    if (curItem) {
                        curItem.val = val;

                        if (val === 100) {
                            timer.current && window.clearTimeout(timer.current);
                            timer.current = window.setTimeout(() => {
                                handleDel(curItem);
                            }, 2000);
                        }
                        setQueue([...queues.current]);
                    }

                    onDownloadProgress?.(val);
                };
            }

            return config;
        });

        () => {
            localStorage.removeItem("curFileName");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleDel = (item: QueueItem) => {
        const { val, controller } = item;
        const copyQueues = [...queues.current];
        const index = copyQueues.findIndex((items) => items.id === item.id);
        val !== 100 && controller?.abort();
        copyQueues.splice(index, 1);
        queues.current = copyQueues;
        setQueue([...copyQueues]);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    const renderList = () => {
        return queue.map((item, index) => {
            const { id, val, name, end } = item;
            const nameList = name.split(".");
            const suffix = nameList[nameList.length - 1];
            const type = getIconType(suffix);
            return (
                <div
                    key={id}
                    className={classNames(itemClassName, styles.download_item, {
                        [`${styles.download_item_leave_from}`]: end === 1,
                        [`${styles.download_item_leave_active}`]: end === 0,
                        [`${styles.download_item_leave_to}`]: end === 0,
                    })}
                    onMouseEnter={() => {
                        setActive(index);
                    }}
                    onMouseLeave={() => {
                        setActive(-1);
                    }}
                    onTransitionEnd={() => {
                        if (item.end !== -1) handleDel(item);
                    }}
                >
                    <Icon
                        type="close"
                        onClick={() => {
                            queues.current[index].end = 1;

                            timer.current && window.clearTimeout(timer.current);
                            timer.current = window.setTimeout(() => {
                                queues.current[index].end = 0;
                                setQueue([...queues.current]);
                            });
                            setQueue([...queues.current]);
                        }}
                        onMouseEnter={() => {
                            setIsIcon(true);
                        }}
                        onMouseLeave={() => {
                            setIsIcon(false);
                        }}
                        className={classNames(styles.download_item_closeicon, {
                            [`${styles.download_item_closeicon__active}`]:
                                active === index && isIcon,
                        })}
                    />
                    <div className={styles.download_item_info}>
                        <Icon type={type} />
                        <span>{name}</span>
                    </div>
                    <div className={styles.download_item_progresswrap}>
                        <Progress type="line" showInfo={false} percent={val} />
                        <button
                            className={classNames(styles.download_item_cancelbutton, {
                                [`${styles.download_item_cancelbutton__active}`]:
                                    active === index && isButton && val !== 100,
                            })}
                            onClick={() => {
                                queues.current[index].end = 1;
                                timer.current && window.clearTimeout(timer.current);
                                timer.current = window.setTimeout(() => {
                                    queues.current[index].end = 0;
                                    setQueue([...queues.current]);
                                });
                                setQueue([...queues.current]);
                            }}
                            onMouseEnter={() => {
                                setIsButton(true);
                            }}
                            onMouseLeave={() => {
                                setIsButton(false);
                            }}
                        >
                            {val === 100
                                ? t("DownloadCardComponent.Completed")
                                : t("DownloadCardComponent.Cancel")}
                        </button>
                    </div>
                </div>
            );
        });
    };

    return (
        <Fragment>
            <div
                {...rest}
                className={classNames(rest.className, styles.download_wrap, {
                    [`${styles.download_wrap_cn}`]: i18n.language === "cn",
                })}
            >
                {renderList()}
            </div>

            {children}
        </Fragment>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export const setFileName = (filename: string) => {
    localStorage.setItem("curFileName", filename);
};
