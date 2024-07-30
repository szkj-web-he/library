/**
 * @file 保存按钮
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "../../../../../Unit/classNames";
import { useCheckEmail } from "../../Hooks/useCheckEmail";
import { useCheckName } from "../../Hooks/useCheckName";
import { useCheckPhone } from "../../Hooks/useCheckPhone";
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

    const checkName = useCheckName();

    const checkEmail = useCheckEmail();

    const checkPhone = useCheckPhone();

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
        if (disabled) {
            return;
        }
        setIsPending(true);
        document.addEventListener("mouseup", handleMouseUp, { once: true });
    };
    /**
     * 是否是禁用的状态
     */
    const isDisabled = () => {
        if (!selectedContact.email && !selectedContact.number) {
            //邮箱和手机号都没有填，不能保存
            return true;
        }

        // 当为新增的操作时
        if (selectedContact.type === "add") {
            if (checkName()) {
                //姓名有误，不能保存
                return true;
            }

            if (checkEmail()) {
                //邮箱有误，不能保存
                return true;
            }

            if (checkPhone()) {
                //手机号有误，不能保存
                return true;
            }

            return false;
        }

        //当为编辑的操作时

        if (checkEmail()) {
            //邮箱有误，不能保存
            return true;
        }

        if (checkPhone()) {
            //手机号有误，不能保存
            return true;
        }

        const data = contacts ? findContact(contacts, selectedContact.name) : null;
        /**
         * 原始的联系人
         */
        const origin = {
            name: data?.name,
            email: data?.email,
            area: data?.area,
            country: data?.country,
            number: data?.number,
        };

        /**
         * 当前正在编辑的联系人
         */
        const contact = {
            name: selectedContact.name,
            email: selectedContact.email,
            area: selectedContact.area,
            country: selectedContact.country,
            number: selectedContact.number,
        };

        if (JSON.stringify(origin) === JSON.stringify(contact)) {
            //数据没发生改变，不能保存
            return true;
        }

        return false;
    };
    const disabled = isDisabled();
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <button
            className={classNames(styles.contactsDialog_saveBtn, {
                [styles.contactsDialog_saveBtn__pending]: isPending,
                [styles.contactsDialog_saveBtn__disabled]: disabled,
            })}
            onClick={() => {
                if (disabled) {
                    return;
                }
                onClick();
            }}
            onMouseDown={handleMouseDown}
        >
            {t("ContactsComponent.Save")}
        </button>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
