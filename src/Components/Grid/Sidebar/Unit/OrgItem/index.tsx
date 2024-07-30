/**
 * @file
 * @date 2023-08-22
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-22
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { startTransition, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, LoadingComponent } from "../../../../..";
import classNames from "../../../../../Unit/classNames";
import { useSidebarDispatch } from "../../Context/dispatch";
import { usePreferredOrgReducer } from "../../Context/preferredOrgReducer";
import { useSelectedOrg } from "../../Context/selectedOrg";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 组织logo
     */
    logo: string;
    /**
     * 组织名称
     */
    name: string;
    /**
     * 组织id
     */
    id: string;
    /**
     * 是否是个人组织
     */
    isPersonal: boolean;
    /**
     * 关闭下拉
     */
    close: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ logo, name, id, isPersonal, close }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();
    /**
     * 偏好组织的数据
     */
    const preferredOrgReducer = usePreferredOrgReducer();
    /**
     * 侧边栏的所有事件
     */
    const dispatch = useSidebarDispatch();
    /**
     * 选中的组织
     */
    const selectedOrg = useSelectedOrg();
    /**
     * 是否鼠标移入
     */
    const [hover, setHover] = useState(false);
    /**
     * 请求状态
     */
    const [loading, setLoading] = useState(false);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const markerEl = () => {
        /**
         * 偏好组织的id
         */
        const preferredOrgId = preferredOrgReducer.data?.data.data?.organization_id;

        const personalLabel = () => {
            return (
                <span className={styles.sidebarOrgItem_personalMarker}>
                    {t("GridSidebar.personal")}
                </span>
            );
        };

        const preferredLabel = () => {
            return (
                <span className={styles.sidebarOrgItem_preferredMarker}>
                    {t("GridSidebar.preferred")}
                </span>
            );
        };

        if (preferredOrgId === id) {
            return (
                <div className={styles.sidebarOrgItem_marker}>
                    {isPersonal ? personalLabel() : preferredLabel()}
                </div>
            );
        }

        if (hover) {
            return (
                <div className={styles.sidebarOrgItem_marker}>
                    <span
                        className={styles.sidebarOrgItem_preferBtn}
                        onClick={(e) => {
                            if (loading) {
                                return;
                            }
                            e.stopPropagation();
                            setLoading(true);
                            dispatch.requestUpdatePreferredOrg(id, () => {
                                startTransition(() => {
                                    setLoading(false);
                                });
                            });
                        }}
                    >
                        {loading ? (
                            <LoadingComponent
                                type="spinningBubbles"
                                width="1.4rem"
                                height="1.4rem"
                            />
                        ) : (
                            t("GridSidebar.prefer")
                        )}
                    </span>
                </div>
            );
        }

        if (isPersonal) {
            return <div className={styles.sidebarOrgItem_marker}>{personalLabel()}</div>;
        }
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={classNames(styles.sidebarOrgItem_wrapper, {
                [styles.sidebarOrgItem_active]: selectedOrg?.id === id,
            })}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            onClick={() => {
                dispatch.setSelectedOrg(id);
                close();
            }}
        >
            <Avatar size="20" imgUrl={logo} content={name} />
            <div className={styles.sidebarOrgItem_name}>
                <div className={styles.sidebarOrgItem_nameText}>{name}</div>
            </div>
            {markerEl()}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
