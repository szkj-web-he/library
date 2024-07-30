/**
 * @file 图片预览的工具
 * @date 2023-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { useTranslation } from "react-i18next";
import { Icon, LoadingComponent } from "../../../../..";
import { ImgTransformEvents, ImgTransformProps } from "../../Hooks/useImgTransform";
import Btn from "../Btn";
import styles from "./style.module.scss";
import { useDownloadFile } from "../../Hooks/useDownloadFile";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 转化属性
     */
    transform?: ImgTransformProps;
    /**
     *
     */
    dispatch: ImgTransformEvents;
    /**
     * 要下载的链接
     */
    url?: string;
    /**
     * 文件名称
     */
    name?: string;
    /**
     * 是否可以下载
     */
    isDownload: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ transform, dispatch, url, name, isDownload }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();
    /**
     * 下载
     */
    const [toDownload, loading] = useDownloadFile();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.imageViewer_tools}>
            <Btn
                tipsText={t(`ImageComponent.mirror`)}
                onClick={() => {
                    dispatch.mirror();
                }}
                active={transform?.isMirror}
            >
                <Icon type="mirror" />
            </Btn>
            <Btn
                tipsText={t(`ImageComponent.rotate`)}
                active={!!transform?.rotate}
                onClick={() => {
                    dispatch.rotate();
                }}
            >
                <Icon type="rotate" />
            </Btn>
            <Btn
                tipsText={t(`ImageComponent.minification`)}
                disabled={typeof transform?.scale.y === "number" && transform.scale.y <= 1}
                onClick={() => {
                    dispatch.shrink();
                }}
            >
                <Icon
                    icon={{
                        iconName: "shrink",
                        icon: [20, 21, [], "shrink123456", ""],
                        pathList: [
                            {
                                d: "M5.52413 8.02577C5.17345 8.02577 4.88917 8.30379 4.88917 8.64675C4.88917 8.98971 5.17345 9.26773 5.52413 9.26773H11.8737C12.2244 9.26773 12.5087 8.98971 12.5087 8.64675C12.5087 8.30379 12.2244 8.02577 11.8737 8.02577H5.52413Z",
                            },
                            {
                                d: "M8.69897 17.1538C10.7583 17.1538 12.6504 16.454 14.1404 15.2843L18.9163 19.9575C19.1642 20.2 19.5662 20.2 19.8141 19.9575C20.062 19.7149 20.062 19.3216 19.8141 19.0791L15.071 14.438C16.5149 12.9194 17.3979 10.8838 17.3979 8.64658C17.3979 3.9482 13.5033 0.139404 8.69897 0.139404C3.89466 0.139404 0 3.9482 0 8.64658C0 13.345 3.89466 17.1538 8.69897 17.1538ZM8.69897 15.9118C12.802 15.9118 16.128 12.659 16.128 8.64658C16.128 4.63414 12.802 1.38136 8.69897 1.38136C4.59599 1.38136 1.26992 4.63414 1.26992 8.64658C1.26992 12.659 4.59599 15.9118 8.69897 15.9118Z",
                                fillRule: "evenodd",
                                clipRule: "evenodd",
                            },
                        ],
                    }}
                />
            </Btn>
            <div className={styles.imageViewer_scaleValue}>
                {Math.round((transform?.scale.y ?? 1) * 100)}%
            </div>

            <Btn
                tipsText={t(`ImageComponent.enlarge`)}
                onClick={() => {
                    dispatch.enlarge();
                }}
                active={typeof transform?.scale.y === "number" && transform?.scale.y > 1}
            >
                <Icon
                    icon={{
                        iconName: "enlarge",
                        icon: [20, 20, [], "enlarge123", ""],
                        pathList: [
                            {
                                d: "M8.69894 12.2332C8.34826 12.2332 8.06398 11.9552 8.06398 11.6122V9.12832H5.52413C5.17345 9.12832 4.88917 8.8503 4.88917 8.50735C4.88917 8.16439 5.17345 7.88637 5.52413 7.88637H8.06398V5.40246C8.06398 5.05951 8.34826 4.78149 8.69894 4.78149C9.04962 4.78149 9.3339 5.05951 9.3339 5.40246V7.88637H11.8737C12.2244 7.88637 12.5087 8.16439 12.5087 8.50735C12.5087 8.8503 12.2244 9.12832 11.8737 9.12832H9.3339V11.6122C9.3339 11.9552 9.04962 12.2332 8.69894 12.2332Z",
                            },
                            {
                                d: "M8.69897 17.0144C10.7583 17.0144 12.6504 16.3146 14.1404 15.1449L18.9163 19.8181C19.1642 20.0606 19.5662 20.0606 19.8141 19.8181C20.062 19.5755 20.062 19.1822 19.8141 18.9397L15.071 14.2986C16.5149 12.78 17.3979 10.7444 17.3979 8.50718C17.3979 3.80879 13.5033 0 8.69897 0C3.89466 0 0 3.80879 0 8.50718C0 13.2056 3.89466 17.0144 8.69897 17.0144ZM8.69897 15.7724C12.802 15.7724 16.128 12.5196 16.128 8.50718C16.128 4.49473 12.802 1.24195 8.69897 1.24195C4.59599 1.24195 1.26992 4.49473 1.26992 8.50718C1.26992 12.5196 4.59599 15.7724 8.69897 15.7724Z",
                                fillRule: "evenodd",
                                clipRule: "evenodd",
                            },
                        ],
                    }}
                    fontSize="1.9rem"
                />
            </Btn>
            <Btn
                tipsText={t(`ImageComponent.magnify`)}
                onClick={() => {
                    dispatch.reset();
                }}
            >
                <Icon type="magnify" fontSize="1.8rem" />
            </Btn>
            {isDownload ? (
                <Btn
                    tipsText={t(`ImageComponent.download`)}
                    onClick={() => {
                        toDownload(url, name);
                    }}
                    disabled={loading}
                >
                    {loading ? (
                        <LoadingComponent
                            type="spinningBubbles"
                            width="2.8rem"
                            height="2.8rem"
                            color="#22a6b3"
                        />
                    ) : (
                        <Icon type="download" />
                    )}
                </Btn>
            ) : undefined}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
