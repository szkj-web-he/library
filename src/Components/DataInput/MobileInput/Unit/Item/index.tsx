/**
 * @file
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import styles from "./style.module.scss";
import classNames from "../../../../../Unit/classNames";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 点击回调
     */
    onClick: () => void;
    /**
     * 图片链接
     */
    src: string;
    /**
     * 内容
     */
    content: number;

    /**
     * 样式
     */
    style?: React.CSSProperties;
    /**
     * 是否活跃
     */
    active: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ onClick, src, content, style, active }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={classNames(styles.mobileInputV2_areaCodeItem, {
                [styles.mobileInputV2_areaCodeItemActive]: active,
            })}
            onClick={() => {
                onClick();
            }}
            style={style}
        >
            <div className={styles.mobileInputV2_areaCodeItemContent}>
                <img src={src} className={styles.mobileInputV2_areaCodeItemImg} alt="" />+{content}
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
