/**
 * @file Temp
 * @date 2022-04-14
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-14
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { forwardRef, isValidElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NavigationLogo } from "../../../../..";
import { menus } from "../../../../../DefaultData/Navigation/navigationBar";
import { useProjectContext } from "../../../../OIDCLogin/Unit/projectContext";
import { NavigationDashboard } from "../../../Dashboard";
import { NavigationLanguageProps } from "../../../Language";
import { NavigationUser } from "../../../User";
import styles from "../../style.module.scss";
import { NavigationContext, useNavLink } from "../context";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

interface TempProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactElement;

    languages?: React.ReactElement<NavigationLanguageProps>;

    /**
     * Is it currently on the dashboard home page
     */
    dashboard?: boolean | React.ReactElement;
    /**
     * user info
     */
    userData?: {
        link?: string;
        name: string;
        email?: string;
        status: boolean;
    };
    /**
     * sign out click fn
     */
    handleSignOutClick?: () => void;
}

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<HTMLDivElement, TempProps>(
    ({ className, logo, languages, dashboard, userData, handleSignOutClick, ...props }, ref) => {
        Temp.displayName = "NavigationBarManagement";

        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const { t } = useTranslation();

        const project = useProjectContext();

        const link = useNavLink();

        const logOutNode = useMemo(() => {
            return (
                <div className={styles.navigationBar_logout} onClick={() => handleSignOutClick?.()}>
                    {t("NavComponent.Log out")}
                </div>
            );
        }, [handleSignOutClick, t]);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

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

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

        const logoEl = logo ?? <NavigationLogo onClick={handleLogoClick} />;

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
                orgList={[]}
                currentOrg={undefined}
                handleOrgChange={() => undefined}
            />
        );

        return (
            <NavigationContext.Provider
                value={{
                    mobile: { current: null },
                    close: { current: null },
                    logOutNode,
                }}
            >
                <div
                    className={styles.navigationBar_wrapper + (className ? ` ${className}` : "")}
                    ref={ref}
                    {...props}
                >
                    {logoEl}
                    <div className={styles.navigationBar_managementMain}>
                        {languages}
                        {userData?.status ? (
                            <>
                                {dashboardEl}
                                {userEl}
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </NavigationContext.Provider>
        );
    },
);
Temp.displayName = "NavigationBarManagement";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
