/**
 * @file EditorBackground
 * @date 2022-03-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, startTransition, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Editor, Range } from "slate";
import { useSlateSelector, useSlateStatic } from "slate-react";
import { message, Popover } from "../../..";
import { langConfig } from "../../../DefaultData/TextEditor/image";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { addImage } from "../Unit/command";
import { useToolContext, useToolDisable } from "../Unit/toolContext";
import { fileToBase } from "../Unit/withImages";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const EditorImage = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, title, children, ...props }, ref) => {
        EditorImage.displayName = "EditorImage";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const editor = useSlateStatic();

        const { active, isFalse } = useToolContext();

        const iptRef = useRef<HTMLInputElement | null>(null);

        const isActive = useSlateSelector((e) => {
            const { selection } = e;
            return (
                !selection ||
                Range.isCollapsed(selection) ||
                Editor.string(editor, selection) === ""
            );
        });

        const { t } = useTranslation();

        //这里添加翻译文件
        useLangConfig("TextEditImageComponent", langConfig);

        const isDisabled = useToolDisable();
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const onClick = () => {
            iptRef.current?.showPicker();
        };

        /**
         * 转换图片
         * 将图片转化为base64
         * @param {File} file
         * @returns
         */
        const transformImg = (file: File) => {
            //3M
            const maxFileSizeB = 3 * 1024 * 1024;
            return new Promise<string>((resolve, reject) => {
                if (file.size > maxFileSizeB) {
                    message.auto({
                        type: "error",
                        content: `${t("TextEditImageComponent.Sorry that this picture is so big")}`,
                    });
                    reject({ isTooBig: true });
                    return;
                }

                fileToBase(file, (url) => {
                    resolve(url);
                });
            });
        };

        /**
         * 遍历文件
         */
        const mapFiles = (files: FileList, index: number) => {
            const file = files[index];
            if (file) {
                transformImg(file)
                    .then((res) => {
                        addImage(editor, res);
                        if (index === files.length - 1 && iptRef.current) {
                            iptRef.current.value = "";
                        }

                        if (index < files.length) {
                            startTransition(() => {
                                mapFiles(files, index + 1);
                            });
                        }
                    })
                    .catch(() => {
                        if (iptRef.current) {
                            iptRef.current.value = "";
                        }
                    });
            }
        };

        /**
         * 监听到选择的图片产生了变化
         */
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;

            if (files) {
                mapFiles(files, 0);
            }
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        const content = (
            <div
                className={classNames(styles.editorImage_wrap, className, {
                    [styles.editorImage_gray]: !isActive,
                })}
                {...props}
                ref={ref}
            >
                <div onClick={onClick}>{children ? children : "Upload images"}</div>
            </div>
        );

        if (isDisabled) {
            return content;
        }
        return (
            <>
                <Popover
                    className={styles.editorImage_kite}
                    show={!active && !isFalse ? false : undefined}
                    root={content}
                >
                    {title ?? t("TextEditImageComponent.Upload Images")}
                </Popover>
                <input
                    type="file"
                    className={styles.editorImage_ipt}
                    ref={iptRef}
                    multiple
                    accept="image/*"
                    onChange={handleChange}
                />
            </>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
EditorImage.displayName = "EditorImage";
