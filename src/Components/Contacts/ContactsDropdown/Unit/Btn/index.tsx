/**
 * @file 下拉联系人的按钮
 * @date 2023-06-17
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useMemo } from "react";
import { DropdownBtn, Icon } from "../../../../..";
import classNames from "../../../../../Unit/classNames";
import { useContactsDialog, useContactsMsgId } from "../../../ContactsDialog/Unit/context";
import { ContactProps } from "../../../ContactsDialog/Unit/type";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { contacts } = useContactsDialog();
    const msgId = useContactsMsgId();

    const list = useMemo(() => {
        const arr: ContactProps[] = [];
        const items = contacts ?? [];
        for (let i = 0; i < items.length; ) {
            arr.push(items[i]);
            if (arr.length === 5) {
                i = items.length;
            } else {
                ++i;
            }
        }
        return items;
    }, [contacts]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleAdd = () => {
        const event = new CustomEvent(`add-${msgId}`);
        document.dispatchEvent(event);
    };

    const moreEl = () => {
        if (contacts && contacts?.length > 5) {
            return <div className={styles.contactsBtn_more}>+{contacts.length - 5}</div>;
        }

        return <></>;
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <DropdownBtn className={styles.contactsBtn_wrapper} clickId={msgId}>
            {list.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={classNames(
                            styles.contactsBtn_contact,
                            styles[`contactsBtn_contact${index}`],
                        )}
                    >
                        {item.name.slice(0, 1).toLocaleUpperCase()}
                    </div>
                );
            })}
            {moreEl()}
            <div className={styles.contactsBtn_add} onClick={handleAdd}>
                <Icon type="additionCircle" className={styles.contactsBtn_addIcon} />
            </div>
        </DropdownBtn>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
