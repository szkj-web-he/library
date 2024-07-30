/**
 * @file
 * @date 2023-02-23
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { readChildElement } from "../../../Unit/readChild";
import { Avatar } from "../Avatar";
import styles from "./style.module.scss";
import { AvatarGroupParams } from "./Unit/context";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface AvatarGroupProps {
    /**
     * 组件的children必须包含Avatar
     * 不然会报错
     */
    children?: React.ReactNode;
    /**
     * 头像之间的间距
     */
    margin?: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({ children, margin = -8 }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    const avatarName = Avatar.displayName;
    /**
     * children里有没有avatar
     */

    const childrenNameList = readChildElement(children);
    const flag = childrenNameList.map((item) => {
        return item.displayName === avatarName;
    });

    if (flag) {
        return (
            <div className={styles.avatarGroup_wrapper}>
                <AvatarGroupParams.Provider
                    value={{
                        margin,
                    }}
                >
                    {children}
                </AvatarGroupParams.Provider>
            </div>
        );
    }
    return <>请确认AvatarGroup里是Avatar</>;
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
