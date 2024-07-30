/**
 * @file 选中的组织
 * @date 2023-08-23
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { Avatar, Icon, Popover, Skeleton } from "../../../../..";
import { useSelectedOrg } from "../../Context/selectedOrg";
import styles from "./style.module.scss";
import { useOrgReducer } from "../../Context/orgReducer";
import { usePreferredOrgReducer } from "../../Context/preferredOrgReducer";
import classNames from "../../../../../Unit/classNames";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    onClick: () => void;

    open: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ onClick, open }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const selectedOrg = useSelectedOrg();

    /**
     * 请求到的组织数据
     */
    const orgReducer = useOrgReducer();
    /**
     * 请求到的偏好组织的数据
     */
    const preferredOrgReducer = usePreferredOrgReducer();

    /**
     * 是否有title
     */
    const [disabled, setDisabled] = useState(true);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    if (
        (orgReducer.loading && !orgReducer.isRefresh) ||
        (preferredOrgReducer.loading && !preferredOrgReducer.isRefresh)
    ) {
        return (
            <div
                className={classNames(
                    styles.sidebarSelectedOrg_wrapper,
                    styles.sidebarSelectedOrg_wrapper__loading,
                )}
            >
                <Skeleton variant="circle" width="2.8rem" height="2.8rem" />
                <div className={styles.sidebarSelectedOrg_name}>
                    <Skeleton variant="rect" width="100%" height="2.8rem" />
                </div>
            </div>
        );
    }

    return (
        <Popover
            delayHidden={150}
            delayShow={800}
            autoSize
            triangle={{
                width: "0",
                height: "0",
            }}
            disable={disabled}
            root={
                <div
                    className={styles.sidebarSelectedOrg_wrapper}
                    onClick={() => {
                        onClick();
                    }}
                >
                    <Avatar
                        imgUrl={selectedOrg?.logo}
                        size="28"
                        content={selectedOrg?.name}
                        type="org"
                    />
                    <div
                        className={styles.sidebarSelectedOrg_name}
                        ref={(el) => {
                            setDisabled(el ? el.scrollWidth <= el.offsetWidth : true);
                        }}
                    >
                        {selectedOrg?.name}
                    </div>
                    <div className={styles.sidebarSelectedOrg_openView}>
                        <Icon
                            type="open"
                            className={styles.sidebarSelectedOrg_openIcon}
                            style={
                                open
                                    ? {
                                          transform: "rotate(90deg)",
                                      }
                                    : undefined
                            }
                        />
                    </div>
                </div>
            }
        >
            {selectedOrg?.name}
        </Popover>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
