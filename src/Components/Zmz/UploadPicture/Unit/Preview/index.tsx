/**
 * @file 头像预览
 * @date 2023-01-09
 * @author xuejie.he
 * @lastModify xuejie.he 2023-01-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 头像链接
     */
    url?: string;

    /**
     * 获取预览视口的大小
     */
    getSize: React.Dispatch<
        React.SetStateAction<{
            width: number;
            height: number;
        }>
    >;
    /**
     * 头像链接
     */
    avatar?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ url, getSize, avatar }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t, i18n } = useTranslation();

    const ref = useRef<HTMLDivElement | null>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const img = () => {
        if (url || avatar) {
            return (
                <img
                    src={url ?? avatar}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    alt=""
                />
            );
        }

        return <div className={styles.previewAvatar_null}>M</div>;
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={
                styles.previewAvatar_wrapper +
                (i18n.language === "cn" ? ` ${styles.previewAvatar_cn}` : "")
            }
        >
            <div
                className={styles.previewAvatar_main}
                ref={(el) => {
                    ref.current = el;
                    getSize((pre) => {
                        if (!el) {
                            return pre;
                        }
                        const data = {
                            width: el.offsetWidth,
                            height: el.offsetHeight,
                        };
                        if (JSON.stringify(pre) === JSON.stringify(data)) {
                            return pre;
                        }
                        return {
                            ...data,
                        };
                    });
                }}
            >
                {img()}
            </div>
            <div className={styles.previewAvatar_des}>{t("UploadPictureComponent.preview")}</div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
