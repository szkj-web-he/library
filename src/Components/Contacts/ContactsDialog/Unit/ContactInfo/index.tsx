/**
 * @file 联系人详情
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { useTranslation } from "react-i18next";
import CancelBtn from "../CancelBtn";
import Email from "../Email";
import Name from "../Name";
import Phone from "../Phone";
import SaveBtn from "../SaveBtn";
import { useContactsMsgId } from "../context";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();

    const msgId = useContactsMsgId();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleSaveClick = () => {
        const event = new CustomEvent(`save-${msgId}`);
        document.dispatchEvent(event);
    };

    const handleCancelClick = () => {
        const event = new CustomEvent(`cancel-${msgId}`);
        document.dispatchEvent(event);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.contactsDialog_info}>
            <div className={styles.contactsDialog_infoHead}>
                {t("ContactsComponent.Contact Info")}
            </div>
            <div className={styles.contactsDialog_infoMain}>
                <Name />
                <Email />
                <Phone />
            </div>

            <div className={styles.contactsDialog_infoBtn}>
                <CancelBtn
                    onClick={() => {
                        handleCancelClick();
                    }}
                />
                <SaveBtn
                    onClick={() => {
                        handleSaveClick();
                    }}
                />
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
