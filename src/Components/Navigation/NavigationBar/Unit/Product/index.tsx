/**
 * @file NavigationBar
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigationBarProps } from "../..";
import { Icon } from "../../../../..";
import { menus, nav } from "../../../../../DefaultData/Navigation/navigationBar";
import classNames from "../../../../../Unit/classNames";
import { useProjectContext } from "../../../../OIDCLogin/Unit/projectContext";
import { NavigationDashboard } from "../../../Dashboard";
import { NavigationLogin } from "../../../Login";
import { NavigationLogo } from "../../../Logo";
import { NavigationLink } from "../../../Nav";
import { NavigationSignUp } from "../../../SignUp";
import { NavigationUser } from "../../../User";
import styles from "../../style.module.scss";
import { NavigationContext, useNavLink } from "../context";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<HTMLDivElement, Omit<NavigationBarProps, "navLink">>(
    (
        {
            className,
            logo,
            login,
            signUp,
            navigation,
            dashboard,
            userData,
            handleSignOutClick,
            handleLoginClick,
            handleSignUpClick,
            handleNavClick,
            orgList,
            currentOrg,
            handleOrgChange,
            ...props
        },
        ref,
    ) => {
        Temp.displayName = "NavigationBarProduct";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const [show, setShow] = useState(false);

        const mobileRef = useRef<HTMLDivElement | null>(null);

        const closeRef = useRef<HTMLDivElement | null>(null);

        const [isSmall, setIsSmall] = useState(() => {
            return window.matchMedia("(max-width: 1024px)").matches;
        });

        const { t } = useTranslation();

        const project = useProjectContext();

        const link = useNavLink();

        const logOutNode = useMemo(() => {
            return isSmall ? (
                <></>
            ) : (
                <div className={styles.navigationBar_logout} onClick={() => handleSignOutClick?.()}>
                    {t("NavComponent.Log out")}
                </div>
            );
        }, [handleSignOutClick, isSmall, t]);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        useEffect(() => {
            const fn = () => {
                setIsSmall(window.matchMedia("(max-width: 1024px)").matches);
            };
            window.addEventListener("resize", fn);
            return () => {
                window.removeEventListener("resize", fn);
            };
        }, []);

        useEffect(() => {
            setShow(false);
        }, [isSmall]);

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        const handleLogoClick = () => {
            if (typeof link.home === "string") {
                window.location.href = link.home;
            } else {
                link.home();
            }
        };

        const handleBtnClick = () => {
            setShow((pre) => !pre);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        const logoEl = logo ?? <NavigationLogo onClick={handleLogoClick} />;
        const loginEl = login ?? <NavigationLogin onClick={handleLoginClick} />;
        const signUpEl = signUp ?? <NavigationSignUp onClick={handleSignUpClick} />;

        const navigationEl = navigation ?? (
            <NavigationLink navList={nav(link)} onClick={handleNavClick} />
        );

        // dashboard
        let dashboardEl = <></>;

        if (userData?.status) {
            if (dashboard === true) {
                dashboardEl = <></>;
            } else if (isValidElement(dashboard)) {
                dashboardEl = dashboard;
            } else {
                dashboardEl = (
                    <NavigationDashboard
                        onClick={() => {
                            if (project === "dashboard") {
                                if (typeof link.profile === "string") {
                                    window.location.href = link.profile;
                                } else {
                                    link.profile();
                                }
                            } else if (typeof link.dashboard === "string") {
                                window.location.href = link.dashboard;
                            } else {
                                link.dashboard();
                            }
                        }}
                    />
                );
            }
        }

        const userEl = (
            <NavigationUser
                img={userData?.link}
                name={userData?.name}
                email={userData?.email}
                menu={menus(link)}
                orgList={orgList}
                currentOrg={currentOrg}
                handleOrgChange={handleOrgChange}
            />
        );

        return (
            <NavigationContext.Provider
                value={{
                    mobile: mobileRef,
                    close: closeRef,
                    logOutNode,
                }}
            >
                <div
                    className={classNames(styles.navigationBar_wrapper, className)}
                    ref={ref}
                    {...props}
                >
                    {logoEl}
                    {/* pc端 */}
                    {!isSmall && (
                        <div className={styles.navigationBar_main}>
                            {navigationEl}
                            {userData?.status ? (
                                <>
                                    {dashboardEl}
                                    {userEl}
                                </>
                            ) : (
                                <>
                                    {signUpEl}
                                    {loginEl}
                                </>
                            )}
                        </div>
                    )}

                    {/* 手机端 */}
                    {isSmall && (
                        <div
                            className={styles.navigationBar_toggleBtn}
                            onClick={handleBtnClick}
                            ref={closeRef}
                        >
                            <Icon
                                type="burgerMenu"
                                className={styles.navigationBar_openIcon}
                                style={show ? { display: "none" } : {}}
                            />
                            <Icon
                                type="close"
                                className={styles.navigationBar_cloneIcon}
                                style={!show ? { display: "none" } : {}}
                            />
                        </div>
                    )}
                </div>
                {isSmall && (
                    <div
                        className={classNames(styles.navigationBar_menu, {
                            [styles.navigationBar_menuActive]: show,
                            [styles.navigationBar_on]: userData?.status,
                        })}
                        onClick={() => {
                            setShow(false);
                        }}
                    >
                        <div
                            className={styles.navigationBar_menuMain}
                            ref={mobileRef}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.navigationBar_menuContainer}>
                                <div className={styles.navigationBar_menuTop}>
                                    {userData?.status ? userEl : <></>}
                                    {navigationEl}
                                    <div className={styles.navigationBar_hr} />
                                    {userData?.status ? (
                                        <div
                                            className={styles.navigationBar_logout}
                                            onClick={() => handleSignOutClick?.()}
                                        >
                                            {t("NavComponent.Log out")}
                                        </div>
                                    ) : (
                                        loginEl
                                    )}
                                </div>
                                {userData?.status ? undefined : signUpEl}
                            </div>
                        </div>
                    </div>
                )}
                {/* PC退出 */}
            </NavigationContext.Provider>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

Temp.displayName = "NavigationBarProduct";
export default Temp;
