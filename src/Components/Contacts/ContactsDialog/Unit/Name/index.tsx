/**
 * @file contact name
 * @date 2021-11-01
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCheckName } from "../../Hooks/useCheckName";
import FormInput from "../FormInput";
import { useContactsDialog, useContactsMsgId } from "../context";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [errorMsg, setErrorMsg] = useState<string>();

    const { selectedContact } = useContactsDialog();

    const msgId = useContactsMsgId();

    const { t } = useTranslation();

    const check = useCheckName();
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
        const event = new CustomEvent(`nameChange-${msgId}`, {
            detail: {
                value: res,
            },
        });
        document.dispatchEvent(event);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.contactsDialog_nameWrapper}>
            <div className={styles.contactsDialog_nameLabel}>{t("ContactsComponent.Name")}</div>
            <FormInput
                placeholder={t("ContactsComponent.Contact Name")}
                disabled={selectedContact.type === "edit"}
                value={selectedContact.name}
                handleChange={handleChange}
                maxLength={30}
                tipsOnError={errorMsg ? t(`ContactsComponent.nameError.${errorMsg}`) : undefined}
                handleBlur={() => {
                    setErrorMsg(check());
                }}
            />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
