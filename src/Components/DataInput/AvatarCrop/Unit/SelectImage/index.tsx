/**
 * @file
 * @date 2021-09-13
 * @author xuejie.he
 * @lastModify xuejie.he 2021-09-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useId, useRef } from "react";
import { notice } from "../../../../..";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface SelectImageProps {
    /**
     * max file size
     */
    maxFileSize: number;
    /**
     * Original image change event
     */
    handleChange?: (res: File | null) => void;
    /**
     * Image select text label
     */
    inputMsg?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const SelectImage: React.FC<SelectImageProps> = ({
    maxFileSize,
    handleChange,
    inputMsg,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const id = useId();

    const fileRef = useRef<HTMLInputElement | null>(null);

    const uploadStatus = useRef(false);

    const changeFn = useRef(handleChange);

    const { t } = useTranslation();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useLayoutEffect(() => {
        changeFn.current = handleChange;
    }, [handleChange]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        uploadStatus.current = false;
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0];
            const maxFileSizeB = maxFileSize * 1024 * 1024;

            if (maxFileSizeB > file.size) {
                uploadStatus.current = true;
                changeFn.current?.(file);
            } else {
                handleChange?.(null);
                notice.error({
                    title: `${t("AvatarCropComponent.Error")}!`,
                    description: `${t("AvatarCropComponent.Sorry that this picture is so big")}`,
                });
            }
            e.currentTarget.value = "";
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.selectImage_uploadWrapper}>
            <input
                type="file"
                id={id}
                style={{ opacity: 0, visibility: "hidden" }}
                ref={fileRef}
                onChange={onChange}
                accept="image/*"
            />
            <div className={styles.selectImage_tips}>
                ({`${t("AvatarCropComponent.The uploaded file should be less than")}`}
                <span> {maxFileSize}M</span> )
            </div>
            <label htmlFor={id}>{inputMsg ?? ""}</label>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
