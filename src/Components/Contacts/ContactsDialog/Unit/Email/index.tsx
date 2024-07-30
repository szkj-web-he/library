/**
 * @file contact email
 * @date 2021-11-01
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCheckEmail } from "../../Hooks/useCheckEmail";
import FormInput from "../FormInput";
import { useContactsDialog, useContactsMsgId } from "../context";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const TempProps: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [errorMsg, setErrorMsg] = useState<string>();

    const { t } = useTranslation();

    const { selectedContact } = useContactsDialog();

    const msgId = useContactsMsgId();

    const check = useCheckEmail();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /**
     * 监听选中的数据发生变化的时候
     */
    useEffect(() => {
        setErrorMsg(undefined);
    }, [selectedContact.key]);

    /**
     * 监听初始化状态
     */
    useEffect(() => {
        const fn = () => {
            setErrorMsg(undefined);
        };
        document.addEventListener(`init-${msgId}`, fn);
        return () => {
            document.removeEventListener(`init-${msgId}`, fn);
        };
    }, [msgId]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /**
     * 当输入框的值发生变化时
     */
    const handleChange = (res: string) => {
        const event = new CustomEvent(`emailChange-${msgId}`, {
            detail: {
                value: res,
            },
        });
        document.dispatchEvent(event);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.contactsDialog_emailWrapper}>
            <div className={styles.contactsDialog_emailLabel}>{t("ContactsComponent.Email")}</div>
            <FormInput
                value={selectedContact.email}
                disabled={false}
                handleChange={handleChange}
                tipsOnError={errorMsg ? t(`ContactsComponent.emailError.${errorMsg}`) : undefined}
                placeholder={t("ContactsComponent.Contact Email")}
                maxLength={72}
                handleBlur={() => {
                    setErrorMsg(check());
                }}
            />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default TempProps;
