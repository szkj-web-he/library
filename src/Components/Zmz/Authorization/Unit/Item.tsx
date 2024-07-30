/**
 * @file
 * @date 2022-06-05
 * @author
 * @lastModify  2022-06-05
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { InputHTMLAttributes, useState } from "react";
import { ToolTips } from "../../../DataDisplay/ToolTips";
import { Switch } from "../../../DataInput/Switch";
import { Icon } from "../../../Icon";
import styles from "../style.module.scss";
import classNames from "../../../../Unit/classNames";
import { useTranslation } from "react-i18next";
import { Kite } from "../../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface UserInfoProps extends Omit<InputHTMLAttributes<HTMLDivElement>, "id"> {
    /**
     * user id
     */
    id: number;
    /**
     * user avatar
     */
    avatar?: string;
    /**
     * user name
     */
    name: string;
    /**
     * user email
     */
    email: string;
    /**
     * whether is admin
     */
    isAdmin: boolean;
    /**
     * whether is current user
     */
    self?: boolean;
    /**
     * switch change event
     */
    onSwitchChange?: (state: boolean) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Item: React.FC<UserInfoProps> = (props) => {
    const { avatar, name, email, isAdmin, self = false, onSwitchChange } = props;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [switchState, setSwitchState] = useState(isAdmin);

    const [root, setRoot] = useState<HTMLElement>();

    const [show, setShow] = useState(false);

    const { t, i18n } = useTranslation();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.listItem}>
            <span>
                {!avatar ? (
                    <Icon type="person01Solid" className={styles.listItem_icon} />
                ) : (
                    <img src={avatar} className={styles.listItem_icon} alt="" />
                )}
                <span>{name}</span>
            </span>
            <span>{email}</span>
            {self ? (
                <span>
                    {t("AuthorizationComponent.Admin")}
                    <span>({t("AuthorizationComponent.me")})</span>
                </span>
            ) : (
                <span>
                    <Switch
                        className={styles.listItem_switch}
                        activeClassName={styles.listItem_switch__active}
                        handleChange={(state) => {
                            setShow(false);
                            setSwitchState(state);
                            onSwitchChange?.(state);
                        }}
                        onMouseEnter={(event) => {
                            setRoot(event.target as unknown as HTMLElement);
                            setShow(true);
                        }}
                        onMouseLeave={() => {
                            setShow(false);
                        }}
                        defaultValue={switchState}
                    />
                </span>
            )}
            {root && show && (
                <Kite placement="ct" show={show} root={root}>
                    {show ? (
                        <ToolTips
                            className={classNames({
                                [`${styles.listItem_tooltip}`]: i18n.language === "cn",
                            })}
                            width="auto"
                            type="TM"
                            style={{
                                marginBottom: "1rem",
                                whiteSpace: "nowrap",
                                padding: ".4rem .8rem",
                            }}
                            content={
                                switchState
                                    ? t("AuthorizationComponent.Admin")
                                    : t("AuthorizationComponent.Non-Admin")
                            }
                        />
                    ) : (
                        <></>
                    )}
                </Kite>
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
