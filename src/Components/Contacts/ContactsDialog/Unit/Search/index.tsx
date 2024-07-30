/**
 * @file 联系人搜索框
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Icon, Input, InputEvents } from "../../../../..";
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

    const ref = useRef<InputEvents | null>(null);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /**
     * 新增按钮的点击
     */
    useEffect(() => {
        const fn = () => {
            ref.current?.clear();
        };

        document.addEventListener(`add-${msgId}`, fn);
        return () => {
            document.removeEventListener(`add-${msgId}`, fn);
        };
    }, [msgId]);

    /**
     * 监听初始化状态
     */
    useEffect(() => {
        const fn = () => {
            ref.current?.clear();
        };
        document.addEventListener(`init-${msgId}`, fn);
        return () => {
            document.removeEventListener(`init-${msgId}`, fn);
        };
    }, [msgId]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleChange = (res: string) => {
        const event = new CustomEvent(`search-${msgId}`, {
            detail: {
                value: res,
            },
        });

        document.dispatchEvent(event);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.contactsDialog_searchWrapper}>
            <Input
                className={styles.contactsDialog_searchIpt}
                placeholder={t("ContactsComponent.searchPlaceholder")}
                hiddenClearIcon
                disabled={disabled}
                onChange={handleChange}
                ref={ref}
                afterNode={
                    <div className={styles.contactsDialog_searchIconContainer}>
                        <Icon type="search" className={styles.contactsDialog_searchIcon} />
                    </div>
                }
            />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
