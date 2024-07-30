/**
 * @file 联系人列表
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { startTransition, useEffect, useState } from "react";
import { deepCloneData } from "../../../../../Unit/deepCloneData";
import { ScrollComponent } from "../../../../DataDisplay/Scroll";
import Item from "../Item";
import { useContactsDialog, useContactsMsgId } from "../context";
import { ContactProps } from "../type";
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    isEdit: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ isEdit }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { contacts, selectedContact } = useContactsDialog();

    const msgId = useContactsMsgId();

    const [searchList, setSearchList] = useState<ContactProps[]>();

    const [searchVal, setSearchVal] = useState("");

    const { t } = useTranslation();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /**
     * 监听搜索框的值的变化
     */
    useEffect(() => {
        const fn = (e: Event) => {
            const event = e as CustomEvent<{ value: string }>;
            setSearchVal(event.detail.value);
        };

        document.addEventListener(`search-${msgId}`, fn);
        return () => {
            document.removeEventListener(`search-${msgId}`, fn);
        };
    }, [msgId]);

    /**
     * 监听变化
     */
    useEffect(() => {
        startTransition(() => {
            const arr = contacts ?? [];

            const filterArr: ContactProps[] = [];
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];

                if (item.name.includes(searchVal)) {
                    filterArr.push(item);
                }
            }
            setSearchList(deepCloneData(filterArr));
        });
    }, [contacts, searchVal]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleClick = (item: ContactProps) => {
        if (isEdit) {
            return;
        }

        const event = new CustomEvent(`itemClick-${msgId}`, {
            detail: {
                area: item.contact.area,
                country: item.contact.country,
                number: item.contact.number,
                email: item.contact.email,
                name: item.name,
            },
        });
        document.dispatchEvent(event);
    };

    /**
     * 当点击删除时
     */
    const handleDelete = (item: ContactProps) => {
        const event = new CustomEvent(`itemDelete-${msgId}`, {
            detail: {
                area: item.contact.area,
                country: item.contact.country,
                number: item.contact.number,
                email: item.contact.email,
                name: item.name,
            },
        });
        document.dispatchEvent(event);
    };

    const listEl = () => {
        if (contacts?.length && !searchList?.length) {
            return (
                <div className={styles.contactsDialog_listNull}>{t("ContactsComponent.null")}</div>
            );
        }

        return (
            <>
                {selectedContact.type === "add" ? (
                    <Item name={selectedContact.name} email={selectedContact.email} isNew />
                ) : (
                    <></>
                )}
                {searchList?.map((item, index) => {
                    return (
                        <Item
                            key={index}
                            name={item.name}
                            index={index}
                            email={item.contact.email}
                            searchVal={searchVal}
                            onClick={() => {
                                handleClick(item);
                            }}
                            onDelete={() => {
                                handleDelete(item);
                            }}
                        />
                    );
                })}
            </>
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.contactsDialog_listWrapper}>
            <ScrollComponent className={styles.contactsDialog_scroll}>{listEl()}</ScrollComponent>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
