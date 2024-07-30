/**
 * @file Pc端的UI
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigationLinkProps } from "../..";
import { Icon, Transition } from "../../../../..";
import { NavProps } from "../../../../../DefaultData/Navigation/navigationBar";
import { useProjectContext } from "../../../../OIDCLogin/Unit/projectContext";
import SubNav from "../SubNav";
import { systemData } from "../systemData";
import styles from "./style.module.scss";
import classNames from "../../../../../Unit/classNames";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<NavigationLinkProps> = ({ navList, onClick }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [hover, setHover] = useState(false);

    const [selectData, setSelectData] = useState<NavProps | null>(null);

    const hoverRef = useRef({
        nav: false,
        subNav: false,
    });

    const timer = useRef<number | null>(null);

    const destroy = useRef(false);

    useEffect(() => {
        destroy.current = false;
        return () => {
            destroy.current = true;
            timer.current && window.clearTimeout(timer.current);
        };
    }, []);

    const systemName = useProjectContext();

    const { t } = useTranslation();

    const [activePath, setActivePath] = useState<string>();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    useEffect(() => {
        if (systemName === "website") {
            const watchHistoryChange = () => {
                const href = window.location.href;
                const path = href.includes("?") ? href.split("?")[0] : href;
                setActivePath(path.replace(window.location.origin, ""));
            };

            window.addEventListener("pushState", watchHistoryChange);
            window.addEventListener("replaceState", watchHistoryChange);
            window.addEventListener("popstate", watchHistoryChange);
            watchHistoryChange();
            return () => {
                window.removeEventListener("pushState", watchHistoryChange);
                window.removeEventListener("replaceState", watchHistoryChange);
                window.removeEventListener("popstate", watchHistoryChange);
            };
        }
    }, [systemName]);
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const changeHoverStatus = () => {
        timer.current && window.clearTimeout(timer.current);
        if (hoverRef.current.nav || hoverRef.current.subNav) {
            setHover(true);
        } else {
            timer.current = window.setTimeout(() => {
                if (destroy.current) {
                    return;
                }
                setHover(false);
                setSelectData(null);
            }, 250);
        }
    };

    const handleMouseEnter = (item: NavProps) => {
        hoverRef.current.nav = true;
        setSelectData(item);
        changeHoverStatus();
    };

    const handleMouseLeave = () => {
        hoverRef.current.nav = false;
        changeHoverStatus();
    };

    const handleMouseEnterOnSubNav = () => {
        hoverRef.current.subNav = true;
        changeHoverStatus();
    };

    const handleMouseLeaveOnSubNav = () => {
        hoverRef.current.subNav = false;
        changeHoverStatus();
    };

    /**
     * 如果自定义了导航的活跃状态
     * 就用自定义的
     */
    const isCustomActive = navList?.some((item) => typeof item.active === "boolean");

    /**
     * 当前路由是否活跃
     */
    const isNavActive = (item: NavProps) => {
        if (isCustomActive) {
            return item.active;
        }

        return (
            (systemName && t(`NavComponent.${systemData[systemName]}`) === item.label) ||
            (activePath && activePath === item.href)
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            {navList?.map((item) => {
                const content = (
                    <div className={styles.navigationLink_itemContent}>
                        {item.label}
                        {item.children?.length ? (
                            <Icon type="dropdown" className={styles.navigationLink_dropdownIcon} />
                        ) : (
                            <></>
                        )}
                    </div>
                );

                const isHover = hover && selectData?.label === item.label;

                return (
                    <div
                        key={item.label}
                        className={classNames(styles.navigationLink_item, {
                            [styles.navigationLink_itemHover]: isHover,
                            [styles.navigationLink_itemActive]: isNavActive(item),
                        })}
                        onMouseEnter={() => handleMouseEnter(item)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => {
                            onClick?.(item.label);
                            if (item.href) {
                                if (typeof item.href === "string") {
                                    window.location.href = item.href;
                                } else {
                                    item.href();
                                }
                            }
                        }}
                    >
                        {content}
                    </div>
                );
            })}
            <span className={styles.navigationLink_split} />
            <Transition
                show={!!selectData?.children}
                animationType="fade"
                className={styles.navigationLink_subNavWrapper}
            >
                {selectData?.children && (
                    <SubNav
                        list={selectData.children}
                        onClick={onClick}
                        handleMouseEnter={handleMouseEnterOnSubNav}
                        handleMouseLeave={handleMouseLeaveOnSubNav}
                    />
                )}
            </Transition>
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
