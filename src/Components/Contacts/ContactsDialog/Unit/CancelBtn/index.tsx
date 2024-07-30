/**
 * @file 取消按钮
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "../../../../../Unit/classNames";
import { useContactsDialog } from "../context";
import { findContact } from "../findContact";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    onClick: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ onClick }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();

    const [isPending, setIsPending] = useState(false);

    const { selectedContact, contacts } = useContactsDialog();

    /**
     *
     * 不能点击取消的时候
     *
     * 1. 当 操作为新增
     *  且 没有联系人的时候
     *
     * 2. 当操作为编辑
     * 且数据没有改变的时候
     */

    const disabled = useMemo(() => {
        if (selectedContact.type === "add" && !contacts?.length) {
            return true;
        }

        if (selectedContact.type === "edit") {
            const data = contacts ? findContact(contacts, selectedContact.name) : null;

            const contact = {
                name: selectedContact.name,
                email: selectedContact.email,
                area: selectedContact.area,
                country: selectedContact.country,
                number: selectedContact.number,
            };
            if (data && JSON.stringify(data) === JSON.stringify(contact)) {
                return true;
            }
            return false;
        }
        return false;
    }, [selectedContact, contacts]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleMouseUp = () => {
        setIsPending(false);
    };

    const handleMouseDown = () => {
        setIsPending(true);
        document.addEventListener("mouseup", handleMouseUp, { once: true });
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <button
            className={classNames(styles.contactsDialog_cancelBtn, {
                [styles.contactsDialog_cancelBtn__pending]: isPending,
                [styles.contactsDialog_cancelBtn__disabled]: disabled,
            })}
            onClick={() => {
                if (disabled) {
                    return;
                }
                onClick();
            }}
            onMouseDown={handleMouseDown}
        >
            {t("ContactsComponent.Cancel")}
        </button>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
