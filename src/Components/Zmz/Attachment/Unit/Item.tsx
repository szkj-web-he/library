/**
 * @file
 * @date 2022-06-01
 * @author
 * @lastModify  2022-06-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    HtmlHTMLAttributes,
    forwardRef,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import { languageConfig } from "../../../../DefaultData/Zmz/attachment";
import { useLangConfig } from "../../../../Hooks/useLangConfig";
import useUpdateEffect from "../../../../Hooks/useUpdateEffect";
import useUpdateLayoutEffect from "../../../../Hooks/useUpdateLayoutEffect";
import classNames from "../../../../Unit/classNames";
import { getIconType } from "../../../../Unit/getIconType";
import { sizeUnitConversion } from "../../../../Unit/utils";
import { Icon } from "../../../Icon";
import { Input } from "../../Input";
import { InputRef } from "../../Input/Unit/interface";
import styles from "../style.module.scss";
import { getNameorSuffix } from "./getNameorSuffix";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
type StatusType = "complete" | "fail" | "pendding";

export interface FileItem {
    name: string;
    size: number;
    id: string | number;
    status: StatusType;
    progress?: number;
    path?: string;
}

export interface ItemOptions {
    id?: string | number;
    name?: string;
    path?: string;
    status?: StatusType;
}

export type FileItemProps = FileItem &
    Omit<HtmlHTMLAttributes<HTMLInputElement>, "id"> & {
        isActive?: boolean;
        showPause?: boolean;
        onCancel?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
        onEdit?: () => void;
        onEditConfirm?: (value: string, ref: FileItemRef) => void;
        onEditCancel?: () => void;
        onDelete?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
        onDownFile?: (file_id: string, file_name: string, file_path?: string) => void;
        onPause?: (file_id: string | number) => void;
        onResume?: (file_id: string | number) => void;
        onItemChange?: (options: ItemOptions, id: string | number) => void;
    };

export interface FileItemRef {
    /**
     * fileItem id
     */
    id: number | string;
    /**
     * set fileItem
     */
    setItemFile: (file: ItemOptions) => void;
    /**
     * set file upload progress
     */
    setProgress: (value: number) => void;
    /**
     * set file upload status
     */
    setStatus: (status: StatusType) => void;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Item = forwardRef<FileItemRef | null, FileItemProps>(
    (
        {
            className,
            style,
            isActive = false,
            name = "",
            size,
            id,
            status = "pendding",
            progress = status === "complete" ? 100 : 0,
            path = "",
            showPause = false,
            onCancel,
            onEdit,
            onEditConfirm,
            onEditCancel,
            onDelete,
            onDownFile,
            onPause,
            onResume,
            onItemChange,
            ...rest
        },
        ref,
    ) => {
        Item.displayName = "Item";

        const { t } = useTranslation();
        //这里添加翻译文件
        useLangConfig("AttachmentComponent", languageConfig);
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const [fileId, setFileId] = useState(id);

        const [inputVal, setInputVal] = useState("");

        const [editState, setEditState] = useState(false);

        const [currentProgress, setCurrentProgress] = useState(progress);

        const [fileName, setFileName] = useState(name);

        const [filePath, setFilePath] = useState(path);

        const [isPause, setIsPause] = useState(false);

        // 上传文件状态
        const [state, setStatus] = useState(status);

        // 上传完成后延迟1s状态
        const [finishing, setFinishing] = useState(false);

        // 上传完成后渲染状态
        const [later, setLater] = useState(false);

        const inputRef = useRef<InputRef>(null);

        const timer = useRef<number | null>(null);

        const p = useRef<number>(0);

        const operation: FileItemRef = {
            id: fileId,
            setProgress(value) {
                setCurrentProgress(value);
            },
            setItemFile(option) {
                const { id: ids, name: names, path, status } = option;
                if (names) {
                    const content = getNameorSuffix(names);
                    const suffix = getNameorSuffix(names, "suffix");
                    const newName = `${content}${suffix}`;
                    option.name = newName;
                    setFileName(newName);
                }
                if (ids) setFileId(ids);
                if (path) setFilePath(path);
                option.status = status ?? "complete";
                onItemChange?.({ ...option }, id);
            },
            setStatus,
        };

        useUpdateEffect(() => {
            if (editState) {
                inputRef.current?.focus();
            }
        }, [editState]);

        useUpdateLayoutEffect(() => {
            if (state === "complete" && p.current === 100) {
                setLater(true);
                setFinishing(true);
                timer.current && window.clearTimeout(timer.current);
                timer.current = window.setTimeout(() => {
                    setFinishing(false);
                    setLater(false);
                }, 1000);
            }

            onItemChange?.({ status: state }, id);

            return () => {
                if (timer.current) clearTimeout(timer.current);
            };
        }, [state]);

        useUpdateLayoutEffect(() => {
            p.current = currentProgress;
            if (currentProgress < 0) {
                p.current = 0;
            } else if (currentProgress >= 100) {
                p.current = 100;
            }

            setCurrentProgress(p.current);
        }, [currentProgress]);

        useImperativeHandle(ref, () => operation);
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        const replaceSize = (size: number) => {
            return sizeUnitConversion(size).replace(/[A-z]/g, (replacer) => ` ${replacer}`);
        };

        const handleFileClick = (event: React.MouseEvent<HTMLDivElement>) => {
            const target = event.target as HTMLElement;
            if (target.tagName !== "A" && target.tagName !== "SPAN") {
                return;
            }
            if (state === "complete" && !finishing && !later && typeof fileId === "string") {
                onDownFile?.(fileId, fileName, filePath);
            }
        };

        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        // 上传成功后 后缀icon
        const completedSuffixNode = useMemo(() => {
            // 编辑确认
            const editConfirm = (event: React.MouseEvent) => {
                event.preventDefault();
                const suffix = getNameorSuffix(fileName, "suffix");
                onEditConfirm?.(`${inputVal}${suffix}`, operation);
                setEditState(false);
            };

            // 编辑取消
            const editCancel = (event: React.MouseEvent) => {
                event.preventDefault();
                onEditCancel?.();
                setEditState(false);
            };

            // 开启编辑
            const handleEdit = () => {
                onEdit?.();
                setEditState(true);
            };

            // 编辑时 icon
            const editIcon = (
                <>
                    <Icon key={"right"} type="right" onMouseDown={editConfirm} />
                    <Icon key={"close"} type="close" onMouseDown={editCancel} />
                </>
            );
            // 上传文件成功后 icon
            const uploadedIcon = (
                <>
                    <Icon key={"edit"} type="edit" onClick={handleEdit} />
                    <Icon key={"dustbin"} type="dustbin" onClick={onDelete} />
                </>
            );

            return (
                <span className={styles.attachment_fileItem_operation}>
                    {isActive ? (editState ? editIcon : uploadedIcon) : replaceSize(size)}
                </span>
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            editState,
            fileName,
            inputVal,
            isActive,
            onDelete,
            onEdit,
            onEditCancel,
            onEditConfirm,
            size,
        ]);

        // 上传中 后缀icon
        const uploadSuffixNode = () => {
            // 上传中 文本展示
            const uploadingText =
                state === "fail"
                    ? t("AttachmentComponent.fail")
                    : `${replaceSize((size * currentProgress) / 100)}/${replaceSize(size)}`;
            // 上传中 暂停事件
            const handlePause = () => {
                onPause?.(fileId);
                setIsPause(true);
            };
            // 上传中 继续上传事件
            const handleResume = () => {
                onResume?.(fileId);
                setIsPause(false);
            };
            // 暂停或继续上传 按钮
            const pauseOrContinueIcon = isPause ? (
                <Icon type="next" onClick={handleResume} />
            ) : (
                <Icon type="pause" onClick={handlePause} />
            );
            // 上传中 hover后按钮
            const uploadingBtn = (
                <>
                    {showPause && pauseOrContinueIcon}
                    {state !== "fail" ? (
                        <Icon type="close" onClick={onCancel} />
                    ) : (
                        <Icon key={"dustbin"} type="dustbin" onClick={onDelete} />
                    )}
                </>
            );
            // 上传中 节点
            const uploadingNode = isActive ? uploadingBtn : uploadingText;

            return (
                <span
                    className={classNames(
                        styles.attachment_fileItem_operation,
                        styles.attachment_fileItem_text__upload,
                    )}
                >
                    {finishing ? <Icon type="right" style={{ color: "#22a6b3" }} /> : uploadingNode}
                </span>
            );
        };

        /**
         * 文件后缀
         */
        const suffixVal = getNameorSuffix(fileName, "suffix");
        /**
         * 文件后缀名 (没有.)
         */
        const suffixName = suffixVal.includes(".") ? suffixVal.split(".")[1] : suffixVal;
        /**
         * 文件名
         */
        const _fileName = getNameorSuffix(fileName);

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            // container
            <div
                key={fileId}
                className={classNames(styles.attachment_fileItem, className, {
                    [styles.attachment_fileItem__active]:
                        state === "complete" && isActive && !finishing && !later,
                    [styles.attachment_fileItem_upload__active]: state !== "complete" && isActive,
                    [styles.attachment_fileItem__complete]:
                        state === "complete" && !finishing && !later,
                    [styles.attachment_fileItem__error]: state === "fail",
                })}
                style={style}
                {...rest}
            >
                {/* progress */}
                {!(state === "complete" && !(finishing || later)) && (
                    <div
                        className={styles.attachment_fileItem__progress}
                        style={{
                            transform: `translateX(${currentProgress - 100}%)`,
                        }}
                    />
                )}
                {/* prefix icon */}
                <Icon className={styles.attachment_fileItem_icon} type={getIconType(suffixName)} />
                {/* content */}
                {
                    <div className={styles.attachment_fileItem_name} onClick={handleFileClick}>
                        <div className={styles.attachment_fileItemNameContent}>
                            {editState ? (
                                <Input
                                    className={styles.attachment_fileItem_input}
                                    ref={inputRef}
                                    defaultValue={_fileName}
                                    onFocus={() => {
                                        setInputVal(_fileName);
                                        inputRef.current?.focus({ cursor: "all" });
                                    }}
                                    onBlur={() => {
                                        onEditCancel?.();
                                        setEditState(false);
                                    }}
                                    onInput={(event) => {
                                        setInputVal(event.currentTarget.value);
                                    }}
                                />
                            ) : (
                                <>
                                    {state === "complete" && !finishing && !later ? (
                                        <a>{_fileName}</a>
                                    ) : (
                                        <span>{_fileName}</span>
                                    )}
                                </>
                            )}
                            <span
                                className={classNames({
                                    [`${styles.attachment_fileItem_download}`]:
                                        state === "complete" && !finishing && !later,
                                })}
                            >
                                {suffixVal}
                            </span>
                        </div>
                    </div>
                }
                {/* suffix node */}
                {state === "complete" && !finishing && !later
                    ? completedSuffixNode
                    : uploadSuffixNode()}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
