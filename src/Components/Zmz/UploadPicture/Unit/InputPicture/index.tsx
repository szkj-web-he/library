/**
 * @file 选择图片
 * @date 2023-01-05
 * @author xuejie.he
 * @lastModify xuejie.he 2023-01-05
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import IconUpload from "../../../../../Assets/images/icon_upload.png";
import { checkAccept } from "../checkAccept";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface ChooseHandle {
    selectPicture: () => void;
}

interface TempProps {
    /**
     * 上传的图片类型
     *
     */
    accept?: string;
    /**
     * 图片最大限制
     * 默认值为3M
     */
    limit?: number;
    /**
     * 当上传失败的时候
     * msg为报错的文字
     */
    onError: (msg: string) => void;
    /**
     * 上传成功的时候
     * url为上传成功后的链接
     * name 图片名
     * type 图片类型
     */
    onSuccess: (url: string, name: string, type: string) => void;

    /**
     * 描述
     * 关于选择图片的描述
     */
    description?: React.ReactNode;
    /**
     * 组件的样式
     */
    style?: React.CSSProperties;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.ForwardRefRenderFunction<ChooseHandle, TempProps> = (
    { accept, limit, onError, onSuccess, description, style },
    ref,
) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t, i18n } = useTranslation();

    const iptRef = useRef<HTMLInputElement | null>(null);

    const [isDrag, setIsDrag] = useState(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /**
     * 重置图片选择框
     */
    const restInput = () => {
        const el = iptRef.current;
        if (el) {
            el.value = "";
        }
    };

    /**
     * 获取到图片后
     */
    const getFile = (file: File) => {
        const { size } = file;
        /**
         * 是否是限制内的图片格式
         */
        const flag = checkAccept(file, accept);

        const maxSize = limit ? limit * 1024 * 1024 : null;

        if (flag) {
            //如果是限制内的图片格式

            if ((maxSize && maxSize >= size) || !maxSize) {
                const url = URL.createObjectURL(file);
                onSuccess(url, file.name, file.type);
            } else {
                let msg = t("UploadPictureComponent.Please upload pictures below");
                msg += limit;
                msg += t("UploadPictureComponent.M");
                //图片过大
                onError(msg);
                restInput();
            }

            return;
        }

        const acceptDes = accept?.replace(/(\.|image\/)/g, "");
        let msg = t(
            "UploadPictureComponent.Please check your image format, currently only supports",
        );
        msg += acceptDes;
        msg += t("UploadPictureComponent.type images");
        //如果不是
        onError(msg);
        restInput();
    };

    /**
     * 选择图片
     */
    const selectPicture = () => {
        iptRef.current?.showPicker();
    };

    /**
     * 转发 事件
     */
    useImperativeHandle(ref, () => ({
        selectPicture,
    }));

    /**
     * 当input的值产生变化时
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        getFile(file);
    };

    /**
     * 阻止drag的默认事件
     * @param e
     */
    const stopDefaultEvent = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    /**
     * 获取文件流
     * @param e
     */
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        stopDefaultEvent(e);
        const files = e.dataTransfer.files;
        getFile(files[0]);
        setIsDrag(false);
    };

    /**
     * 拖拽到当前容器上
     * @param e
     */
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        stopDefaultEvent(e);

        setIsDrag(true);
    };
    /**
     * 拖拽离开当前容器
     * @param e
     */
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        stopDefaultEvent(e);
        setIsDrag(false);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={styles[`inputPicture_wrapper${i18n.language === "cn" ? "__cn" : ""}`]}
            style={style}
        >
            <div
                className={
                    styles.inputPicture_iptContainer +
                    (isDrag ? ` ${styles.inputPicture_isDrag}` : "")
                }
                onClick={selectPicture}
                onDrop={handleDrop}
                onDragOver={stopDefaultEvent}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
            >
                <input
                    accept={accept}
                    className={styles.inputPicture_ipt}
                    ref={iptRef}
                    type="file"
                    onChange={handleChange}
                    title=" "
                />
                <div className={styles.inputPicture_iptDesContainer}>
                    {description ?? (
                        <>
                            <img
                                src={IconUpload}
                                className={styles.inputPicture_iptDesIcon}
                                alt=""
                            />
                            <div className={styles.inputPicture_iptDesContent}>
                                {t("UploadPictureComponent.Drag or")}
                                <span className={styles.inputPicture_iptDesContent__highlight}>
                                    {t("UploadPictureComponent.browse")}
                                </span>
                                <br />
                                {t("UploadPictureComponent.the picture to be uploaded here")}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default forwardRef(Temp);
