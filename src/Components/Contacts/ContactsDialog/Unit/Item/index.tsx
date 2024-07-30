/**
 * @file 联系人
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Icon } from "../../../../..";
import classNames from "../../../../../Unit/classNames";
import { MatchKeywords } from "../MatchKeywords";
import { useContactsDialog } from "../context";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    /**
     * 名称
     */
    name: string;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 是否是新增的item
     */
    isNew?: boolean;
    /**
     * 第几个 下标
     */
    index?: number;
    /**
     * 点击回调
     */
    onClick?: () => void;

    /**
     * 删除回调
     */
    onDelete?: () => void;
    /**
     * 搜索框的值
     */
    searchVal?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ name, email, isNew, index, onClick, onDelete, searchVal }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { selectedContact } = useContactsDialog();

    const { t } = useTranslation();

    const [hover, setHover] = useState(false);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const nameContent = () => {
        if (name) {
            return <MatchKeywords keywords={searchVal} content={name} />;
        }

        return t("ContactsComponent.His/Her Name");
    };

    const emailContent = () => {
        if (email) {
            return email;
        }

        return t("ContactsComponent.His/Her Email Address");
    };

    const avatarEl = () => {
        if (isNew) {
            return <Avatar size="20" type="person" />;
        }

        return (
            <>
                <div
                    className={styles.contactsDialog_itemAvatarCircle}
                    style={{
                        opacity: hover ? 0 : 1,
                    }}
                >
                    {name.slice(0, 1).toUpperCase()}
                </div>
                <Icon
                    type="deleteMinus"
                    className={styles.contactsDialog_itemDelBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.();
                    }}
                    style={{
                        opacity: hover ? 1 : 0,
                    }}
                />
            </>
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={classNames(
                styles.contactsDialog_itemWrapper,
                typeof index === "number" ? styles[`contactsDialog_item__${index % 6}`] : undefined,
                {
                    [styles.contactsDialog_itemActive]: isNew || selectedContact.name === name,
                },
            )}
            onClick={() => {
                onClick?.();
            }}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            <div className={styles.contactsDialog_itemAvatar}>{avatarEl()}</div>
            <div className={styles.contactsDialog_itemCol}>
                <div className={styles.contactsDialog_itemName}>{nameContent()}</div>
                <div className={styles.contactsDialog_itemEmail}>{emailContent()}</div>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
