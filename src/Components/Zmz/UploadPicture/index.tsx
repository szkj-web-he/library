/**
 * @file
 * @date 2022-11-29
 * @author
 * @lastModify  2022-11-29
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { languageConfig } from "../../../DefaultData/Zmz/uploadPicture";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { ajaxRequest } from "../../DataInput/AvatarCrop/Unit/ajax";
import { LoadingComponent } from "../../Loading/LoadingComponent";
import styles from "./style.module.scss";
import CutPicture, { CutEventProps, CutProps, CutSuccessProps } from "./Unit/CutPicture";
import InputPicture, { ChooseHandle } from "./Unit/InputPicture";
import Preview from "./Unit/Preview";
import { useDomDisplay, useUnmount } from "../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface UploadPictureProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 头像的链接
     * 这个只会在
     * preview为true时生效
     * 当这个传入时 只会对其预览 不会对它进行裁剪之类的操作
     */
    avatar?: string;

    /**
     * 图片链接
     * 这个会进行裁剪
     */
    imgUrl?: string;

    /**
     * 图片最大限制
     * 默认值为3M
     */
    limit?: number;
    /**
     * 上传的图片类型
     *
     */
    accept?: string;
    /**
     * 是否可以预览
     */
    preview?: boolean;
    /**
     * 这个组件的头
     *
     * 如果可以预览
     * 默认是 => 上传头像
     *
     * 如果不可以预览
     * 默认是  => 上传图片
     */
    head?: React.ReactNode;

    /**
     * 描述
     * 关于选择图片的描述
     */
    description?: React.ReactNode;
    /**
     * 取消按钮
     */
    cancelBtn?: React.ReactNode;
    /**
     * 确认按钮
     */
    confirmBtn?: React.ReactNode;
    /**
     * 当取消按钮点击时
     *
     * 这里只做了图片选择框的重置
     *
     * 如果需要终止上传图片的请求
     * 需要自行操作
     */
    handleCancelClick?: () => void;
    /**
     * 当确认按钮点击时
     * 当成功的时候返回剪切结果
     * 当失败的时候返回 错误信息
     *
     * isPending 是否在进行裁剪中
     * errorMsg 有值时表示裁剪失败
     * 裁剪成功会 返回 file和 base64
     *
     *
     * 在这里将裁剪完的图片进行上传
     * 需自行完成
     */
    handleConfirmClick?: (res: CutProps) => void;

    /**
     * 这里 给予一个 上传图片的请求状态状态
     * 如果 上传裁剪完的图片 请求结束
     *
     * 确认按钮的loading会消失
     */
    uploadLoading?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const UploadPicture: React.FC<UploadPictureProps> = ({
    className,
    avatar,
    imgUrl,
    accept = ".jpeg,.jpg,.png,.svg",
    limit = 3,
    preview = true,
    head,
    description,
    cancelBtn,
    confirmBtn,
    handleCancelClick,
    handleConfirmClick,
    uploadLoading,
    ...props
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [errorMsg, setErrorMsg] = useState<string>();

    const [imgData, setImgData] = useState<{
        url: string;
        name: string;
        type: string;
    }>();

    const { t, i18n } = useTranslation();

    /**
     * 获取头像预览的dom
     */
    const previewDom = useRef<HTMLDivElement | null>(null);

    /**
     * 重置选择图片的回调
     */
    const restChooseImgRef = useRef<ChooseHandle>({ selectPicture: () => undefined });
    /**
     * 剪切图片的转发回调
     * 包含
     * 1. 开始剪切
     * 2. 取消剪切
     */
    const cutPictureRef = useRef<CutEventProps>();

    const [loading, setLoading] = useState(false);

    //这里添加翻译文件
    useLangConfig("UploadPictureComponent", languageConfig);

    /**
     * 视口大小
     */
    const [view, setView] = useState({ width: 0, height: 0 });

    /**
     * 加载imgUrl的loading状态
     */
    const [requestLoading, setRequestLoading] = useState(false);

    const imgUrlRequest = useRef<XMLHttpRequest>();

    /**
     * 获取裁剪后的链接
     */
    const [cutUrl, setCutUrl] = useState<string>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useUnmount(() => {
        imgData && URL.revokeObjectURL(imgData.url);
    });

    /**
     * 动态监听imgUrl变化
     */
    useEffect(() => {
        cutPictureRef.current?.cancelCut();

        if (imgUrl) {
            setRequestLoading(true);
            imgUrlRequest.current = ajaxRequest({
                method: "get",
                responseType: "blob",
                url: imgUrl,
                complete: (res) => {
                    imgUrlRequest.current = undefined;
                    if (res.status === 200) {
                        const file = res.response as File;
                        const url = URL.createObjectURL(file);
                        setImgData({
                            url,
                            type: file?.type ?? "image/png",
                            name: file?.name ?? "avatar.png",
                        });
                    }
                    setRequestLoading(false);
                },
            });
        } else {
            setImgData(undefined);
        }
        return () => {
            imgUrlRequest.current?.abort();
            setRequestLoading(false);
        };
    }, [imgUrl]);

    useDomDisplay(
        previewDom,
        () => {
            const node = previewDom.current;
            if (!preview || !node) {
                return;
            }

            setView(() => {
                return {
                    width: node.offsetWidth,
                    height: node.offsetHeight,
                };
            });
        },
        [preview],
    );

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */

    /************* This section will include this component general function *************/
    /**
     * 裁剪图片的回调
     */
    const handleCutCallback = (res: CutProps) => {
        if (preview && !res.isPending && res.errorMsg !== "cancel") {
            setCutUrl(res.base64);
        }
    };

    /**
     * 选择图片失败
     */
    const handleChooseImageError = (msg: string) => {
        setErrorMsg(msg);
    };

    /**
     * 选择图片成功
     */
    const handleChooseImageSuccess = (url: string, name: string, type: string) => {
        setErrorMsg(undefined);
        setImgData((pre) => {
            if (pre) {
                URL.revokeObjectURL(pre.url);
            }
            return {
                url,
                name,
                type,
            };
        });
    };

    /**
     * 点击重新选择图片时
     */
    const handleRestClick = () => {
        restChooseImgRef.current.selectPicture();
    };

    /**
     * 取消
     */
    const cancelClick = () => {
        cutPictureRef.current?.cancelCut();
        setImgData((pre) => {
            if (pre?.url) {
                URL.revokeObjectURL(pre.url);
            }
            return undefined;
        });

        setErrorMsg(undefined);
        setLoading(false);
        setRequestLoading(false);
        imgUrlRequest.current?.abort();
        imgUrlRequest.current = undefined;
        handleCancelClick?.();
    };
    /**
     * 确认
     */
    const confirmClick = () => {
        if (!imgData?.url) {
            return;
        }

        setLoading(true);
        handleConfirmClick?.({
            isPending: true,
        });

        if (cutPictureRef.current) {
            cutPictureRef.current
                .toCut()
                .then((res: CutSuccessProps) => {
                    handleConfirmClick?.({
                        isPending: false,
                        ...res,
                    });
                    if (preview) {
                        setCutUrl(res.base64);
                    }
                })
                .catch((error: string) => {
                    handleConfirmClick?.({
                        isPending: false,
                        errorMsg: error,
                    });
                    if (preview) {
                        setCutUrl(undefined);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
            return;
        }
        handleConfirmClick?.({
            isPending: false,
            errorMsg: "代码有问题",
        });
    };

    /**
     * 选择图片的节点
     */
    const chooseNode = (
        <div
            style={imgData ? { display: "none" } : undefined}
            className={styles.uploadPicture_chooseNode}
            ref={previewDom}
        >
            {requestLoading ? (
                <div className={styles.uploadPicture_chooseLoading}>
                    <LoadingComponent
                        type="spinningBubbles"
                        width="6rem"
                        height="6rem"
                        color="#fff"
                    />
                    <div className={styles.uploadPicture_chooseLoadingText}>
                        {t("UploadPictureComponent.Loading")}...
                    </div>
                </div>
            ) : (
                <></>
            )}
            <InputPicture
                accept={accept}
                limit={limit}
                description={description}
                onError={handleChooseImageError}
                onSuccess={handleChooseImageSuccess}
                ref={restChooseImgRef}
            />
        </div>
    );

    let errorStyle: React.CSSProperties | undefined = undefined;
    if (errorMsg) {
        errorStyle = { position: "absolute", bottom: "-2rem", left: "0" };
    } else if (imgData) {
        errorStyle = { display: "none" };
    }

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <div
            className={classNames(
                className,
                preview ? styles.uploadAvatar_wrapper : styles.uploadPicture_wrapper,
                {
                    [styles.uploadPicture_cn]: i18n.language === "cn",
                },
            )}
            {...props}
        >
            {head ? (
                head
            ) : (
                <div className={styles.uploadPicture_head}>
                    {preview
                        ? t("UploadPictureComponent.Upload avatar")
                        : t("UploadPictureComponent.Upload pictures")}
                </div>
            )}
            <div className={styles.uploadPicture_main}>
                <div className={styles.uploadPicture_container}>
                    <CutPicture
                        imgData={imgData}
                        isPreview={preview ?? false}
                        restClick={handleRestClick}
                        ref={cutPictureRef}
                        handleCut={handleCutCallback}
                    />
                    {chooseNode}
                    {preview ? <Preview url={cutUrl} avatar={avatar} getSize={setView} /> : <></>}
                </div>
                <div
                    className={
                        styles.inputPicture_tips +
                        (errorMsg ? ` ${styles.inputPicture_errorTips}` : "")
                    }
                    style={errorStyle}
                >
                    {errorMsg
                        ? errorMsg
                        : `${t("UploadPictureComponent.Please upload a picture")}${view.width}*${
                              view.height
                          }${t("UploadPictureComponent.pixels, and no larger than")}${limit}M`}
                </div>
            </div>
            <div className={styles.uploadPicture_hr} />
            <div className={styles.uploadPicture_btnContainer}>
                <div className={styles.uploadPicture_cancelContainer}>
                    {cancelBtn ? (
                        cancelBtn
                    ) : (
                        <div
                            className={styles.uploadPicture_cancelBtn}
                            onClickCapture={cancelClick}
                        >
                            {t("UploadPictureComponent.Cancel")}
                        </div>
                    )}
                </div>
                <div
                    className={styles.uploadPicture_confirmContainer}
                    onClickCapture={confirmClick}
                >
                    {confirmBtn ? (
                        confirmBtn
                    ) : (
                        <div
                            className={classNames(styles.uploadPicture_confirmBtn, {
                                [styles.uploadPicture_confirmActive]: imgData?.url,
                                [styles.uploadPicture_confirmLoading]: loading,
                            })}
                        >
                            {uploadLoading || loading ? (
                                <LoadingComponent
                                    type="spinningBubbles"
                                    width={"2rem"}
                                    height="2rem"
                                    color="#fff"
                                    className={classNames(styles.uploadPicture_loadingIcon, {
                                        [styles.uploadPicture_loadingActive]: loading,
                                    })}
                                />
                            ) : (
                                <></>
                            )}
                            {t("UploadPictureComponent.Confirm")}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
