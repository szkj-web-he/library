/**
 * @file
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef, startTransition, useId, useImperativeHandle } from "react";
import { languageConfig } from "../../../DefaultData/DataInput/contacts";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import classNames from "../../../Unit/classNames";
import { useContact } from "./Hooks/useContact";
import ContactInfo from "./Unit/ContactInfo";
import Contacts from "./Unit/Contacts";
import { ContactsMsgId, Context } from "./Unit/context";
import { ContactProps } from "./Unit/type";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ContactsDialogProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 联系人弹框的宽度
     */
    width?: string;
    /**
     * 联系人弹框的高度
     */
    height?: string;
    /**
     * 联系人列表
     */
    value?: Array<ContactProps>;
    /**
     * 当联系人列表发生变化时
     */
    handleChange?: (res?: Array<ContactProps>) => void;
    /**
     * 是否需要往组件里插入自定义节点
     */
    children?: React.ReactNode;
}

export interface ContactsDialogEvents {
    /**
     * 初始化
     */
    init: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ContactsDialog = forwardRef<ContactsDialogEvents | null, ContactsDialogProps>(
    (
        {
            className,
            width = "70rem",
            height = "54rem",
            style,
            value,
            handleChange,
            children,
            ...props
        },
        events,
    ) => {
        ContactsDialog.displayName = "ContactsDialog";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        //这里添加翻译文件
        useLangConfig("ContactsComponent", languageConfig);

        const id = useId();

        const [list, selectedData, selectedDataRef, listRef] = useContact(id, value, handleChange);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        /**
         * 这里是初始化
         * input的报错
         * 鼠标移上去的提示文字
         */
        const initTips = () => {
            const event = new CustomEvent(`init-${id}`);
            document.dispatchEvent(event);
        };

        /**
         * 初始化数据
         */
        const initData = () => {
            initTips();

            startTransition(() => {
                const event = new CustomEvent(`cancel-${id}`);
                document.dispatchEvent(event);
            });
        };

        useImperativeHandle(events, () => {
            return {
                init: initData,
            };
        });

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <ContactsMsgId.Provider value={id}>
                <Context.Provider
                    value={{
                        contacts: list,
                        contactsRef: listRef,
                        selectedContact: selectedData,
                        selectedContactRef: selectedDataRef,
                    }}
                >
                    <div
                        className={classNames(styles.contactsDialog_wrapper, className)}
                        style={{
                            ...style,
                            width,
                            height,
                        }}
                        {...props}
                    >
                        {children}

                        <Contacts />
                        <ContactInfo />
                    </div>
                </Context.Provider>
            </ContactsMsgId.Provider>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
ContactsDialog.displayName = "ContactsDialog";
