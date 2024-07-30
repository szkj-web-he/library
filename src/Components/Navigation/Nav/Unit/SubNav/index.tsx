/**
 * @file Temp
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface SubNavProps {
    list: { label: string; content: React.ReactNode }[];
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    onClick?: (label: string) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<SubNavProps> = ({
    list,
    handleMouseEnter,
    handleMouseLeave,
    onClick,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [selectData, setSelectData] = useState<{
        label: string;
        content: React.ReactNode;
    }>(list[0]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={styles.navigationLink_subNavBody}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.navigationLink_subNavList}>
                {list.map((item) => {
                    const isActive = item.label === selectData.label;

                    return (
                        <div
                            className={
                                styles.navigationLink_subNav__item +
                                (isActive ? ` ${styles.navigationLink_subNav__itemActive}` : "")
                            }
                            onClick={() => {
                                onClick?.(item.label);
                                setSelectData(item);
                            }}
                            key={item.label}
                        >
                            {item.label}
                        </div>
                    );
                })}
            </div>
            <div className={styles.navigationLink_subNavContainer}>{selectData.content}</div>
            <div className={styles.navigationLink_subNavBg} />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

export default Temp;
