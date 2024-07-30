/**
 * @file
 * @date 2022-09-05
 * @author
 * @lastModify  2022-09-05
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { createRef, HTMLAttributes, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { createHash, deepCloneData, Transition } from "../../../..";
import IconUpload from "../../../../Assets/images/icon_upload.png";
import { languageConfig } from "../../../../DefaultData/Zmz/attachment";
import { useLangConfig } from "../../../../Hooks/useLangConfig";
import classNames from "../../../../Unit/classNames";
import { ScrollComponent } from "../../../DataDisplay/Scroll";
import { Upload } from "../../../DataInput/Upload";
import styles from "../style.module.scss";
import { FileItem, FileItemRef, Item } from "./Item";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface AttachmentMainProps {
    /**
     * render list datasource
     */
    defaultfileList?: Array<FileItem>;
    /**
     * whether display the pause button
     */
    showPause?: boolean;
    /**
     * animation of the wrap
     */
    wrapAnimation?: boolean;
    /**
     * file size limit
     */
    limit?: number;
    /**
     * cancel upload event
     */
    onCancel?: (item: FileItem) => void;
    /**
     * BeforeUpload event
     */
    onBeforeUpload?: (files: FileList, fileRef: Array<FileItemRef>) => void;
    /**
     * upload complete, after click edit button, click confirm button call
     */
    onEditConfirm?: (value: string, ref: FileItemRef) => void;
    /**
     *  upload complete, after click edit button, click cancel button call
     */
    onEditCancel?: () => void;
    /**
     * upload complete click file name download file
     */
    onDownFile?: (file_id: string, file_name: string, file_path?: string) => void;
    /**
     * pause event in upload
     */
    onPause?: (file_id: string | number) => void;
    /**
     * resume upload event after pausing
     */
    onResume?: (file_id: string | number) => void;
    /**
     * upload list change
     */
    onListUpdate?: (list: Array<FileItem>) => void;
    /**
     * when file delete call
     */
    onFileDelete?: (file: FileItem) => void;
    /**
     * when file limit
     */
    onFileLimit?: (file: File) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const AttachmentMain: React.FC<
    AttachmentMainProps & HTMLAttributes<HTMLDivElement> & { uploadClassName?: string }
> = (props) => {
    const {
        defaultfileList,
        wrapAnimation = false,
        showPause = false,
        limit,
        onCancel,
        onBeforeUpload,
        onEditConfirm,
        onDownFile,
        onListUpdate,
        onFileDelete,
        onEditCancel,
        onFileLimit,
        uploadClassName,
        className,
        style,
        ...rest
    } = props;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [timer, setTimer] = useState(0);
    const [list, setList] = useState(defaultfileList ?? []);
    const [isActive, setIsActive] = useState<string | number>(-1);
    const [fileItemRefs, setFileItemRefs] = useState<Array<FileItemRef>>([]);
    const lastTimer = useRef(0);
    const [deleteId, setDeleteId] = useState<string | number | null>(null);
    const [files, setFiles] = useState<FileList | undefined>(undefined);

    const transitionType = useRef<string>("");

    const { t, i18n } = useTranslation();

    //这里添加翻译文件
    useLangConfig("AttachmentComponent", languageConfig);

    useEffect(() => {
        if (lastTimer.current !== timer) {
            clearTimeout(lastTimer.current);
        }
        lastTimer.current = timer;
        () => {
            clearTimeout(timer);
        };
    }, [timer]);

    useEffect(() => {
        if (defaultfileList !== undefined) {
            setList(defaultfileList);
        }
    }, [defaultfileList]);

    useEffect(() => {
        setFileItemRefs((fileItemRefs) =>
            Array(list.length)
                .fill(0)
                .map((_, i) => fileItemRefs[i] || createRef()),
        );
    }, [list]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleBeforeUpload = (files?: FileList) => {
        if (files?.length) {
            const arr = deepCloneData(list);
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (limit !== undefined && file.size > limit) {
                    onFileLimit?.(file);
                } else {
                    transitionType.current = "add";
                    const data: FileItem = {
                        name: file.name,
                        size: file.size,
                        id: createHash(),
                        status: "pendding",
                        progress: 0,
                    };
                    arr.unshift(data);
                }
            }

            setList(deepCloneData(arr));
            setFiles(deepCloneData(files));
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            {...rest}
            className={classNames(
                styles.attachment_uploadWrap,
                {
                    [`${styles.attachment_uploadWrap__animation}`]: wrapAnimation,
                },
                i18n.language === "cn" && "attachment_uploadWrap_cn",
                className,
            )}
            style={{ ...style }}
        >
            <Upload
                customClassName={classNames(styles.attachment_uploadWrap_upload, uploadClassName)}
                icon={<img src={IconUpload} alt="" />}
                width="20.4rem"
                height="100%"
                placeholder={t("AttachmentComponent.Drop files here to upload or")}
                linkMsg={t("AttachmentComponent.choose file")}
                handleOnFileUpload={handleBeforeUpload}
            />
            <div className={styles.attachment_uploadWrap_fileListWrap}>
                <span className={styles.attachment_uploadWrap_fileListWrap_title}>
                    {t("AttachmentComponent.Uploaded files")}
                </span>
                <ScrollComponent hidden>
                    {list.map((item, index) => (
                        <Transition
                            show={deleteId !== item.id}
                            key={item.id}
                            firstAnimation={true}
                            fromEnter={styles.attachment_fileItem_sildInFrom}
                            enterActive={styles.attachment_fileItem_sildInActive}
                            toEnter={styles.attachment_fileItem_sildInTo}
                            fromLeave={styles.attachment_fileItem_sildOutFrom}
                            leaveActive={styles.attachment_fileItem_sildOutActive}
                            toLeave={styles.attachment_fileItem_sildOutTo}
                            handleTransitionEnd={() => {
                                const type = transitionType.current;
                                if (deleteId !== null && type === "delete") {
                                    if (item.status === "complete") {
                                        onFileDelete?.({ ...item });
                                    } else {
                                        onCancel?.(item);
                                    }

                                    list.splice(index, 1);
                                    setList([...list]);

                                    onListUpdate?.(list);
                                } else if (files?.length && type === "add") {
                                    setTimer(
                                        window.setTimeout(() => {
                                            if (fileItemRefs.length)
                                                onBeforeUpload?.(files, fileItemRefs);
                                        }),
                                    );
                                    onListUpdate?.(list);
                                }
                                transitionType.current = "";
                            }}
                        >
                            <Item
                                {...item}
                                showPause={showPause}
                                ref={(r) => {
                                    if (r) fileItemRefs[index] = r;
                                }}
                                isActive={item.id === isActive}
                                onMouseOver={() => {
                                    setIsActive(item.id ?? index);
                                }}
                                onMouseLeave={() => {
                                    setIsActive(-1);
                                }}
                                onAnimationEnd={(e) => {
                                    const node = e.target as Element;
                                    if (e.animationName.includes("style_slideOut")) {
                                        node.className = `${styles.attachment_uploadWrap_fileListWrap_fileItem}`;
                                    }
                                }}
                                onCancel={() => {
                                    transitionType.current = "delete";
                                    setDeleteId(item.id);
                                }}
                                onEditConfirm={(value, ref) => onEditConfirm?.(value, ref)}
                                onEditCancel={() => onEditCancel?.()}
                                onDelete={() => {
                                    transitionType.current = "delete";
                                    setDeleteId(item.id);
                                }}
                                onDownFile={(file_id, file_name, file_path) =>
                                    onDownFile?.(file_id, file_name, file_path)
                                }
                                onItemChange={(option, id) => {
                                    const { name, id: newId, path, status = "pendding" } = option;
                                    list.forEach((item) => {
                                        if (item.id === id) {
                                            if (newId) item.id = newId;
                                            if (name) item.name = name;
                                            if (path) item.path = path;
                                            item.status = status;
                                            if (status === "complete") item.progress = 100;
                                        }
                                    });
                                    onListUpdate?.([...list]);
                                }}
                            />
                        </Transition>
                    ))}
                </ScrollComponent>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
