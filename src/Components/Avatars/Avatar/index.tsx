/**
 * @file
 * @date 2023-02-22
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-22
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, startTransition, useRef, useState } from "react";
import { Icon, LoadingComponent } from "../../..";
import { useAvatarGroupParams } from "../AvatarGroup/Unit/context";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 头像的尺寸
     * * 默认 60
     */
    size?: "20" | "28" | "32" | "36" | "60" | "80";
    /**
     * 头像类型
     * 分个人和组织
     * * 默认是个人
     */
    type?: "person" | "org";
    /**
     * 头像链接
     */
    imgUrl?: string;
    /**
     * 昵称
     * 当头像链接打不开时 展示这个的第一个字符
     */
    content?: string;
    /**
     * 是什么形状
     * * 默认circle
     */
    shape?: "rect" | "circle";
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.ForwardRefRenderFunction<HTMLDivElement | null, AvatarProps> = (
    { size = "60", type = "person", imgUrl, content, shape = "circle", className, style, ...props },
    ref,
) => {
    Temp.displayName = "Avatar";
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    /**
     * 加载状态
     * 1为加载中
     * 0为加载失败
     * 2为加载成功
     */
    const [loadingStatus, setLoadingStatus] = useState(1);

    const { margin } = useAvatarGroupParams();

    const imgRef = useRef<HTMLImageElement>(null);

    /**
     * 上一次的imgUrl
     */
    const preImgUrl = useRef<string>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    {
        if (preImgUrl.current !== imgUrl) {
            setLoadingStatus(imgUrl ? 1 : 2);
            preImgUrl.current = imgUrl;
        }
    }

    const handleLoadEnd = () => {
        startTransition(() => {
            setLoadingStatus(2);
        });
    };

    const handleLoadingError = () => {
        startTransition(() => {
            setLoadingStatus(0);
        });
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    let marginStyle = { ...style };
    if (margin) {
        marginStyle = {
            marginLeft: `${margin}px`,
            ...style,
        };
    }

    const classNameList = [styles.avatar_wrapper];

    classNameList.push(styles[`avatar_size__${size}`]);

    className && classNameList.push(className);

    if (imgUrl && loadingStatus !== 0) {
        classNameList.push(styles[`avatar_${shape}`]);

        return (
            <div className={classNameList.join(" ")} style={marginStyle} {...props} ref={ref}>
                {loadingStatus === 1 ? (
                    <div className={styles.avatar_loadingCover}>
                        <LoadingComponent
                            color="#fff"
                            width="100%"
                            height="100%"
                            type="spinningBubbles"
                            className={styles.avatar_loading}
                        />
                    </div>
                ) : (
                    <></>
                )}
                <img
                    src={imgUrl}
                    onLoad={handleLoadEnd}
                    onError={handleLoadingError}
                    className={styles.avatar_img}
                    ref={imgRef}
                    alt={content}
                />
            </div>
        );
    }

    if (content) {
        classNameList.push(styles[`avatar_${shape}`]);
        classNameList.push(styles[`avatar_nickname`]);
        return (
            <div className={classNameList.join(" ")} {...props} ref={ref} style={marginStyle}>
                {content.slice(0, 1)}
            </div>
        );
    }

    /**
     * 当图片和name都没有值
     * 或者是
     * 图片加载失败 name也没有值的时候
     */

    const icon =
        type === "person" ? (
            <Icon type="avatar_default" className={styles.avatar_icon} />
        ) : (
            <Icon type="organization" className={styles.avatar_icon} />
        );
    return (
        <div className={classNameList.join(" ")} {...props} ref={ref} style={marginStyle}>
            {icon}
        </div>
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export const Avatar = forwardRef(Temp);
Temp.displayName = "Avatar";
