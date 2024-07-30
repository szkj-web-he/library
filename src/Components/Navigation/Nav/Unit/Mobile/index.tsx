/**
 * @file Temp
 * @date 2022-04-13
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { NavigationLinkProps } from "../..";
import { Icon, Transition } from "../../../../..";
import { NavProps } from "../../../../../DefaultData/Navigation/navigationBar";
import { useNavContext } from "../../../NavigationBar/Unit/context";
import { handleCloseClick } from "../../../NavigationBar/Unit/handleCloseClick";
import Mobile from "../../../NavigationBar/Unit/Mobile";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<NavigationLinkProps> = ({ navList, onClick }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { close } = useNavContext();

    const [subIndex, setSubIndex] = useState(-1);

    const [show, setShow] = useState(false);

    const [selectData, setSelectData] = useState<NavProps>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleClick = (item: NavProps) => {
        onClick?.(item.label);

        if (item.href) {
            if (typeof item.href === "string") {
                window.location.href = item.href;
            } else {
                item.href();
            }
        }
        if (item.children?.length) {
            handleCloseClick(close.current, () => {
                setShow(false);
            });
            setSelectData({ ...item });
            setShow(true);
        }
    };

    const subNav = (
        <Mobile
            show={show}
            handleShowChange={(res) => {
                setShow(res);
            }}
            header={selectData?.label}
        >
            <ul className={styles.navigationLinkMobile_list}>
                {selectData?.children?.map((item, index) => {
                    const isActive = index === subIndex;
                    return (
                        <li key={item.label} className={styles.navigationLinkMobile_subItem}>
                            <div
                                className={
                                    styles.navigationLinkMobile_subItemName +
                                    (isActive
                                        ? ` ${styles.navigationLinkMobile_subItemNameActive}`
                                        : "")
                                }
                                onClick={() => {
                                    setSubIndex(index);
                                }}
                            >
                                {item.label}
                                <Icon
                                    type="open"
                                    className={styles.navigationLinkMobile_subItemIcon}
                                />
                            </div>
                            <Transition
                                show={isActive}
                                animationType="taller"
                                className={styles.navigationLinkMobile_subItemContent}
                            >
                                {item.content}
                            </Transition>
                        </li>
                    );
                })}
            </ul>
        </Mobile>
    );

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            {navList?.map((item) => {
                return (
                    <div
                        key={item.label}
                        className={styles.navigationLinkMobile_item}
                        onClick={() => handleClick(item)}
                    >
                        {item.label}
                        {item.children?.length ? (
                            <Icon
                                type="open"
                                className={styles.navigationLinkMobile_dropdownIcon}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                );
            })}
            {subNav}
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
