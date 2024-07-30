/**
 * @file 联系人
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Btn from "../AddBtn";
import List from "../List";
import Search from "../Search";
import styles from "./style.module.scss";
import { useContactsDialog } from "../context";
import { findContact } from "../findContact";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();

    const { selectedContact, contacts } = useContactsDialog();
    /**
     * 表单是否在编辑中
     */
    const isEdit = useMemo(() => {
        if (selectedContact.type === "add") {
            return true;
        }
        const data = contacts ? findContact(contacts, selectedContact.name) : null;

        const contact = {
            name: selectedContact.name,
            email: selectedContact.email,
            area: selectedContact.area,
            country: selectedContact.country,
            number: selectedContact.number,
        };
        if (JSON.stringify(data) !== JSON.stringify(contact)) {
            return true;
        }

        return false;
    }, [contacts, selectedContact]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.contactsDialog_contactsWrapper}>
            <div className={styles.contactsDialog_contactsHead}>
                {t("ContactsComponent.Contacts")}
            </div>
            <Search disabled={isEdit} />
            <List isEdit={isEdit} />
            <Btn disabled={isEdit} />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
