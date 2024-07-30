/**
 * @file NavigationUser
 * @date 2022-04-13
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, useEffect, useState } from "react";
import { Avatar, Icon, Transition } from "../../../../..";
import { MenuProps } from "../../../../../DefaultData/Navigation/navigationBar";
import { useNavContext } from "../../../NavigationBar/Unit/context";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
interface TempProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Link to user avatar
     */
    img?: string;
    /**
     * Abbreviation of user nickname
     */
    name?: string;
    /**
     * User's email
     */
    email?: string;
    /**
     * menu
     */
    menu?: MenuProps[];
}
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<HTMLDivElement, TempProps>(
    ({ img, name, email, menu, onBlur, className, tabIndex, ...props }, ref) => {
        Temp.displayName = "NavigationUserPc";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const { logOutNode } = useNavContext();

        const [selectedIndex, setSelectedIndex] = useState(-1);

        const [show, setShow] = useState(false);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        useEffect(() => {
            if (!show) {
                setSelectedIndex(-1);
            }
        }, [show]);
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const handleSubClick = (item: { label: string; href?: string | (() => void) }) => {
            if (item.href) {
                if (typeof item.href === "string") {
                    window.location.href = item.href;
                } else {
                    item.href();
                }
            }
        };

        const handleClick = (item: MenuProps, index: number) => {
            if (item.children?.length) {
                setSelectedIndex((pre) => {
                    return pre === index ? -1 : index;
                });
            }
            handleSubClick(item);
        };

        /**
         * 菜单
         */
        const menuEl = menu?.map((item, index) => {
            const isActive = index === selectedIndex;

            return (
                <div className={styles.navigationUser_menuItem} key={item.label}>
                    <div
                        className={
                            styles.navigationUser_menuItemName +
                            (isActive ? ` ${styles.navigationUser_menuItemNameActive}` : "")
                        }
                        onClick={() => handleClick(item, index)}
                    >
                        {item.label}
                        {item.children?.length ? (
                            <Icon type="open" className={styles.navigationUser_openIcon} />
                        ) : (
                            <></>
                        )}
                    </div>
                    <Transition
                        show={isActive}
                        animationType="taller"
                        className={styles.navigationUser_subList}
                    >
                        {item.children?.map((menuItem) => {
                            return (
                                <div
                                    key={menuItem.label}
                                    className={styles.navigationUser_subItem}
                                    onClick={() => handleSubClick(menuItem)}
                                >
                                    <span className={styles.navigationUser_subItemContent}>
                                        {menuItem.label}
                                    </span>
                                </div>
                            );
                        })}
                    </Transition>
                </div>
            );
        });
        /**
         * 漂浮窗
         */
        const kite = (
            <div
                className={
                    styles.navigationUser_kite +
                    (show ? ` ${styles.navigationUser_kiteActive}` : "")
                }
            >
                <div className={styles.navigationUser_triangle} />
                <div className={styles.navigationUser_main}>
                    <div className={styles.navigationUser_userContainer}>
                        <Avatar imgUrl={img} content={name} size="36" />
                        <div className={styles.navigationUser_userData}>
                            <div className={styles.navigationUser_userName}>{name}</div>
                            <div className={styles.navigationUser_userEmail}>{email}</div>
                        </div>
                    </div>
                    <>{menuEl}</>
                    {logOutNode}
                </div>
            </div>
        );

        let tabIndexVal = tabIndex;
        tabIndexVal = -1;
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                ref={ref}
                {...props}
                tabIndex={tabIndexVal}
                className={styles.navigationUser_wrapper + (className ? ` ${className}` : "")}
                onBlur={(e) => {
                    setShow(false);
                    onBlur?.(e);
                }}
            >
                <Avatar
                    imgUrl={img}
                    content={name}
                    style={{
                        cursor: "pointer",
                        width: "100%",
                        height: "100%",
                    }}
                    size="32"
                    onClick={() => setShow((pre) => !pre)}
                />
                {kite}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Temp.displayName = "NavigationUserPc";
export default Temp;
