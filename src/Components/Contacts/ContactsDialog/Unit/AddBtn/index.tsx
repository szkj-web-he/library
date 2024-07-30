/**
 * @file 新增联系人按钮
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { useTranslation } from "react-i18next";
import { DropdownBtn, Icon } from "../../../../..";
import classNames from "../../../../../Unit/classNames";
import { AutoSizePopover } from "../AutoSizePopover";
import { useContactsMsgId } from "../context";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    disabled: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ disabled }) => {
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
    const handleClick = () => {
        const event = new CustomEvent(`add-${msgId}`);
        document.dispatchEvent(event);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <AutoSizePopover
            trigger={disabled ? "hover" : undefined}
            direction="vertical"
            placement="ct"
            delayShow={300}
            btn={
                <DropdownBtn
                    className={classNames(styles.contactsDialog_addBtn, {
                        [styles.contactsDialog_addBtn__disabled]: disabled,
                    })}
                    onClick={() => {
                        if (disabled) {
                            return;
                        }
                        handleClick();
                    }}
                >
                    <div className={styles.contactsDialog_addIconContainer}>
                        <Icon type="addition01" className={styles.contactsDialog_addIcon} />
                    </div>
                    {t("ContactsComponent.Add Contact")}
                </DropdownBtn>
            }
        >
            {t("ContactsComponent.AddTips")}
        </AutoSizePopover>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
