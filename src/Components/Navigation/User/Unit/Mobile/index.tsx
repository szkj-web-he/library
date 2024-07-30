/**
 * @file Temp
 * @date 2022-04-13
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { forwardRef, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigationUserProps } from "../..";
import { Avatar, Icon } from "../../../../..";
import { MenuProps } from "../../../../../DefaultData/Navigation/navigationBar";
import { useNavContext } from "../../../NavigationBar/Unit/context";
import { handleCloseClick } from "../../../NavigationBar/Unit/handleCloseClick";
import Mobile from "../../../NavigationBar/Unit/Mobile";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<HTMLDivElement, NavigationUserProps>(
    (
        { img, name, email, menu, orgList, currentOrg, handleOrgChange, className, ...props },
        ref,
    ) => {
        Temp.displayName = "NavigationUserMobile";
        /**Banishment start*/

        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const { close } = useNavContext();

        const [selectedData, setSelectData] = useState<MenuProps>();

        const [show, setShow] = useState(false);

        const [selectedOrg, setSelectOrg] = useState<{
            name: string;
            role?: "Owner" | "Admin" | "Reviewer" | undefined;
            id: string;
            logo?: string | undefined;
        }>();

        const [openOrg, setOpenOrg] = useState(false);

        const { t } = useTranslation();
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useLayoutEffect(() => {
            if (currentOrg) {
                setSelectOrg(orgList?.find((item) => item.id === currentOrg));
            } else {
                setSelectOrg(Array.isArray(orgList) ? orgList[0] : undefined);
            }
        }, [currentOrg, orgList]);

        useEffect(() => {
            if (selectedOrg?.id !== currentOrg) {
                handleOrgChange && handleOrgChange(selectedOrg);
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [selectedOrg]);

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

        const handleClick = (item: MenuProps) => {
            if (item.children?.length) {
                setSelectData(item);
                setShow(true);
                handleCloseClick(close.current, () => {
                    setShow(false);
                });
            }
            handleSubClick(item);
        };

        const subNav = (
            <Mobile
                show={show}
                handleShowChange={(res) => setShow(res)}
                header={selectedData?.label}
            >
                <ul className={styles.navigationUserMob_list}>
                    {selectedData?.children?.map((item) => {
                        return (
                            <li
                                key={item.label}
                                className={styles.navigationUserMob_subItem}
                                onClick={() => {
                                    handleSubClick(item);
                                }}
                            >
                                {item.label}
                            </li>
                        );
                    })}
                </ul>
            </Mobile>
        );

        const colorFn = (role?: "Owner" | "Admin" | "Reviewer") => {
            switch (role) {
                case "Admin":
                    return {
                        bg: "#FEF4F5",
                        color: "#F58E95",
                    };
                case "Owner":
                    return {
                        bg: "#FFF4F0",
                        color: "#FF7745",
                    };
                case "Reviewer":
                    return {
                        bg: "#E9F7F8",
                        color: "#3CBBC7",
                    };
            }
        };

        const orgEl = (
            <Mobile
                show={openOrg}
                handleShowChange={(res) => {
                    setOpenOrg(res);
                }}
                header={t("NavComponent.Switch Organization")}
            >
                {orgList?.map((item) => {
                    const colorData = colorFn(item.role);
                    const isActive = selectedOrg?.id === item.id;
                    return (
                        <div
                            className={styles.navigationUserMob_orgItem}
                            key={item.id}
                            onClick={() => {
                                setSelectOrg(item);
                            }}
                        >
                            <div className={styles.navigationUserMob_orgItemInfo}>
                                <Avatar
                                    imgUrl={item.logo}
                                    content={item.name}
                                    size="20"
                                    type="org"
                                    className={styles.navigationUserMob_orgAvatar}
                                />
                                <div className={styles.navigationUserMob_orgName}>{item.name}</div>
                                <div
                                    className={styles.navigationUserMob_orgRole}
                                    style={
                                        colorData
                                            ? {
                                                  backgroundColor: colorData.bg,
                                                  color: colorData.color,
                                              }
                                            : {}
                                    }
                                >
                                    {item.role}
                                </div>
                            </div>
                            {isActive && (
                                <Icon type="right" className={styles.navigationUserMob_icon} />
                            )}
                        </div>
                    );
                })}
            </Mobile>
        );

        const selectColor = colorFn(selectedOrg?.role);

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={styles.navigationUserMob_wrap + (className ? ` ${className}` : "")}
                ref={ref}
                {...props}
            >
                <div className={styles.navigationUserMob_userContainer}>
                    <Avatar
                        imgUrl={img}
                        content={name}
                        size="36"
                        className={styles.navigationUserMob_userAvatar}
                    />
                    <div className={styles.navigationUserMob_userInfo}>
                        <div className={styles.navigationUserMob_userName}>{name}</div>
                        <div className={styles.navigationUserMob_userEmail}>{email}</div>
                    </div>
                </div>

                <div className={styles.navigationUserMob_profileContainer}>
                    {!!selectedOrg && (
                        <div className={styles.navigationUserMob_orgContainer}>
                            <div className={styles.navigationUserMob_row}>
                                <div className={styles.navigationUserMob_des}>
                                    {t("NavComponent.I'm in")}
                                </div>
                                <div
                                    className={styles.navigationUserMob_switch}
                                    onClick={() => {
                                        setOpenOrg(true);
                                        handleCloseClick(close.current, () => {
                                            setOpenOrg(false);
                                        });
                                    }}
                                >
                                    {t("NavComponent.Switch Organization")}
                                    <Icon
                                        type="open"
                                        className={styles.navigationUserMob_openIcon}
                                    />
                                </div>
                            </div>
                            <div className={styles.navigationUserMob_selectedOrg}>
                                <div className={styles.navigationUserMob_orgItemInfo}>
                                    <Avatar
                                        size="20"
                                        type="org"
                                        imgUrl={selectedOrg?.logo}
                                        content={selectedOrg?.name}
                                        className={styles.navigationUserMob_orgAvatar}
                                    />
                                    <div className={styles.navigationUserMob_orgName}>
                                        {selectedOrg?.name}
                                    </div>
                                    <div
                                        className={styles.navigationUserMob_orgRole}
                                        style={
                                            selectColor
                                                ? {
                                                      backgroundColor: selectColor.bg,
                                                      color: selectColor.color,
                                                  }
                                                : {}
                                        }
                                    >
                                        {selectedOrg?.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {menu?.map((item) => {
                        return (
                            <div
                                className={styles.navigationUserMob_menuItem}
                                key={item.label}
                                onClick={() => {
                                    handleClick(item);
                                }}
                            >
                                {item.label}
                                {item.children?.length ? (
                                    <Icon
                                        type="open"
                                        className={styles.navigationUserMob_openIcon}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        );
                    })}
                </div>
                {subNav}
                {orgEl}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Temp.displayName = "NavigationUserMobile";
export default Temp;
