/**
 * @file
 * @date 2023-08-21
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon, ScrollComponent, Transition, useUnmount } from "../../../../..";
import { baseName } from "../../../../OIDCLogin/Api/mainDomain";
import { useOrgReducer } from "../../Context/orgReducer";
import { usePreferredOrgReducer } from "../../Context/preferredOrgReducer";
import OrgItem from "../OrgItem";
import SelectedOrg from "../SelectedOrg";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [open, setOpen] = useState(false);

    const { t } = useTranslation();
    /**
     * 请求到的组织数据
     */
    const orgReducer = useOrgReducer();
    /**
     * 请求到的偏好组织的数据
     */
    const preferredOrgReducer = usePreferredOrgReducer();
    /**
     *
     */
    const ref = useRef<HTMLDivElement | null>(null);

    /**
     * 组织列表是否可见
     */
    const visible = useMemo(() => {
        if (orgReducer.loading && !orgReducer.isRefresh) {
            return false;
        }

        if (preferredOrgReducer.loading && !preferredOrgReducer.isRefresh) {
            return false;
        }
        return open;
    }, [
        open,
        orgReducer.isRefresh,
        orgReducer.loading,
        preferredOrgReducer.isRefresh,
        preferredOrgReducer.loading,
    ]);

    const timer = useRef<number | null>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        if (visible) {
            timer.current && window.clearTimeout(timer.current);
            ref.current?.focus();
        }
    }, [visible]);

    useUnmount(() => {
        timer.current && window.clearTimeout(timer.current);
    });

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <div
            className={styles.sidebarOrg_wrapper}
            tabIndex={-1}
            onBlur={() => {
                timer.current && window.clearTimeout(timer.current);
                timer.current = window.setTimeout(() => {
                    timer.current = null;
                    setOpen(false);
                }, 150);
            }}
            ref={ref}
        >
            <div className={styles.sidebarOrg_selectedOrg}>
                <SelectedOrg
                    onClick={() => {
                        setOpen((pre) => !pre);
                    }}
                    open={open}
                />
            </div>
            <Transition show={visible} animationType="taller" className={styles.sidebarOrg_orgList}>
                <ScrollComponent bodyClassName={styles.sidebarOrg_orgList__scrollBody}>
                    {orgReducer.data?.data.data?.organizations.map((item) => {
                        return (
                            <OrgItem
                                close={() => {
                                    setOpen(false);
                                }}
                                logo={item.logo}
                                name={item.name}
                                isPersonal={item.type === "personal"}
                                key={item.id}
                                id={item.id}
                            />
                        );
                    })}
                </ScrollComponent>
                <div className={styles.sidebarOrg_hr} />
                <div
                    className={styles.sidebarOrg_managementOrg}
                    onClick={() => {
                        let origin = "https://dev-profile.datareachable.cn";
                        if (process.env.NODE_ENV === "production") {
                            origin = "https://profile.datareachable.cn";
                        }

                        window.location.href = `${origin}${baseName}/profile/organization`;
                    }}
                >
                    <div className={styles.sidebarOrg_managementOrgView}>
                        <Icon type="management" className={styles.sidebarOrg_managementOrgIcon} />
                    </div>
                    <div className={styles.sidebarOrg_managementOrgText}>
                        {t(`GridSidebar.managementOrg`)}
                    </div>
                </div>
            </Transition>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
