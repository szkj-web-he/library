/**
 * @file project status
 * @date 2022-04-27
 * @author mingzhou.zhang
 * @lastModify  2022-04-27
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import { Alert, AlertProps } from "../../DataDisplay/Alert";
import { Icon } from "../../Icon";
import styles from "./style.module.scss";
import { languageConfig } from "../../../DefaultData/Zmz/projectStatus";
import { useTranslation } from "react-i18next";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export type statusType = "public" | "private";

export type ProjectStatusProps = {
    /**
     * The project publish status
     */
    isPublish?: boolean;
    /**
     * The status of the component
     */
    status?: statusType;
} & Omit<AlertProps, "status">;
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ProjectStatus: React.FC<ProjectStatusProps> = ({
    isPublish = false,
    status = "public",
    changeStatus,
    handleCancel,
    handleConfirm,
    style,
    className,
    content = null,
    ...arg
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    //这里添加翻译文件
    useLangConfig("ProjectStatusComponent", languageConfig);

    const [visible, setVisible] = useState(false);

    const { t } = useTranslation();

    const willType =
        status === "public"
            ? t("ProjectStatusComponent.private")
            : t("ProjectStatusComponent.public");
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleButtonClick = () => {
        setVisible(true);
    };
    const handleAlertStatusChange = () => {
        changeStatus?.();
        setVisible(false);
    };
    const handleAlertCancel = () => {
        handleCancel?.();
        setVisible(false);
    };
    const handleAlertConfirm = () => {
        handleConfirm && handleConfirm();
        setVisible(false);
        return () => undefined;
    };
    const statusToIconType = (status: statusType) => {
        switch (status) {
            case "public":
                return "employee";
            case "private":
                return "lock";
            default:
                return undefined;
        }
    };
    const projectStatusContent = () => {
        return (
            <div>
                <div
                    style={{
                        fontSize: "1.6rem",
                        letterSpacing: "0.05rem",
                        marginBottom: "0.8rem",
                    }}
                >
                    {`${t(
                        "ProjectStatusComponent.Please confirm you would like to change the status of the project to",
                    )} '${willType}'`}
                </div>
                <div
                    style={{
                        fontSize: "1.4rem",
                        color: "#BDBDBD",
                        letterSpacing: "0.025rem",
                        marginBottom: "2rem",
                    }}
                >
                    {`( ${t(
                        "ProjectStatusComponent.Once the status of the project turned to",
                    )} '${willType}', `}

                    {isPublish ? (
                        status === "public" ? (
                            <>
                                {t("ProjectStatusComponent.this project in")}{" "}
                                <span style={{ fontWeight: "500" }}>
                                    {`${t("ProjectStatusComponent.Market")}`}
                                </span>{" "}
                                {t(
                                    "ProjectStatusComponent.will be stopped automatically, also all the tasks under this project. And others can not search them.",
                                )}{" "}
                                )
                            </>
                        ) : (
                            <>
                                {t("ProjectStatusComponent.this project in ")}
                                <span style={{ fontWeight: "500" }}>{`${t(
                                    "ProjectStatusComponent.Market",
                                )}`}</span>{" "}
                                {t(
                                    "ProjectStatusComponent.will be not activated automatically. You need to go to",
                                )}{" "}
                                <span style={{ fontWeight: "500" }}>{`${t(
                                    "ProjectStatusComponent.Market",
                                )}`}</span>{" "}
                                {t("ProjectStatusComponent.to activate it.")} )
                            </>
                        )
                    ) : status == "public" ? (
                        <>
                            {t(
                                "ProjectStatusComponent.all the information of the project will be opened only to your organization members.",
                            )}{" "}
                            )
                        </>
                    ) : (
                        <>
                            {t(
                                "ProjectStatusComponent.all the information of the project can be opened to public.",
                            )}{" "}
                            )
                        </>
                    )}
                </div>
            </div>
        );
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <div
                className={styles.projectstatus_warpper + (className ? ` ${className}` : "")}
                style={style}
            >
                <Icon type={statusToIconType(status)} className={styles.projectstatus_Icon} />
                <span>{`${t(
                    `ProjectStatusComponent.${status.replace(status[0], status[0].toUpperCase())}`,
                )}`}</span>
                <button className={styles.projectstatus_button} onClick={handleButtonClick}>{`${t(
                    "ProjectStatusComponent.Make",
                )}${willType}`}</button>
            </div>
            <Alert
                width="41.4rem"
                height="26rem"
                content={content || projectStatusContent()}
                type="warn"
                title={
                    <span style={{ fontWeight: "400", fontSize: "2.4rem" }}>
                        {`${t("ProjectStatusComponent.Change status ?")}`}
                    </span>
                }
                removeOnHidden={true}
                status={visible}
                changeStatus={handleAlertStatusChange}
                handleCancel={handleAlertCancel}
                handleConfirm={handleAlertConfirm}
                {...arg}
            />
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
