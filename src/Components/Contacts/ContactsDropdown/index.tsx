/**
 * @file
 * @date 2023-06-17
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-17
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    forwardRef,
    startTransition,
    useEffect,
    useId,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { Dropdown, DropdownContent, Icon } from "../../..";
import { languageConfig } from "../../../DefaultData/DataInput/contacts";
import { useLangConfig } from "../../../Hooks/useLangConfig";
import { useContact } from "../ContactsDialog/Hooks/useContact";
import ContactInfo from "../ContactsDialog/Unit/ContactInfo";
import Contacts from "../ContactsDialog/Unit/Contacts";
import { ContactsMsgId, Context } from "../ContactsDialog/Unit/context";
import { ContactProps } from "../ContactsDialog/Unit/type";
import Btn from "./Unit/Btn";
import { VisibleContext } from "./Unit/context";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ContactsDropdownProps {
    /**
     * 下拉框的宽度
     */
    width?: string;
    /**
     * 下拉框的高度
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
     * 自定义下拉框btn
     * 这个btn的一定得是DropdownBtn这个组件
     */
    customDropdownBtn?: React.ReactNode;
}

export interface ContactsDropdownEvents {
    /**
     * 打开下拉框
     */
    toOpen: () => void;
    /**
     * 关闭下拉框
     */
    toHidden: () => void;
    /**
     * 重置数据
     */
    init: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ContactsDropdown = forwardRef<ContactsDropdownEvents | null, ContactsDropdownProps>(
    ({ width = "65rem", height = "41.5rem", value, customDropdownBtn, handleChange }, events) => {
        ContactsDropdown.displayName = "ContactsDropdown";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        //这里添加翻译文件
        useLangConfig("ContactsComponent", languageConfig);

        const id = useId();

        const [show, setShow] = useState(false);

        const [list, selectedData, selectedDataRef, listRef] = useContact(id, value, handleChange);

        const changeVisibleFn = useRef<React.Dispatch<React.SetStateAction<boolean>>>();
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /***
         * 当变得不可见的时候
         * 需要重置数据
         */
        useEffect(() => {
            if (show === false) {
                startTransition(() => {
                    const event = new CustomEvent(`cancel-${id}`);
                    document.dispatchEvent(event);
                });
            }
        }, [show, id]);

        useImperativeHandle(events, () => {
            return {
                toOpen: () => {
                    changeVisibleFn.current?.(true);
                },
                toHidden: () => {
                    changeVisibleFn.current?.(false);
                },
                init: () => {
                    const event = new CustomEvent(`init-${id}`);
                    document.dispatchEvent(event);

                    startTransition(() => {
                        const event = new CustomEvent(`cancel-${id}`);
                        document.dispatchEvent(event);
                    });
                },
            };
        });
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        /**
         * 当下拉框的看见发生变化后
         */
        const handleVisibleChange = (res: boolean) => {
            setShow(res);
            const event = new CustomEvent(`init-${id}`);
            document.dispatchEvent(event);
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <ContactsMsgId.Provider value={id}>
                <VisibleContext.Provider value={show}>
                    <Context.Provider
                        value={{
                            contacts: list,
                            contactsRef: listRef,
                            selectedContact: selectedData,
                            selectedContactRef: selectedDataRef,
                        }}
                    >
                        <Dropdown
                            trigger={"click"}
                            hideOnClick={false}
                            placement="cb"
                            direction="vertical"
                            triangle={{
                                width: "2rem",
                                height: "1rem",
                                color: "#fff",
                            }}
                        >
                            {customDropdownBtn ?? <Btn />}
                            <DropdownContent
                                bodyClassName={styles.contactsDropdown_body}
                                style={{
                                    width,
                                    height,
                                }}
                                handleVisibleChange={handleVisibleChange}
                                eventId={id}
                                changeVisibleFn={changeVisibleFn}
                                removeOnHide
                                cache={false}
                            >
                                <div
                                    className={styles.contactsDropdown_closeBtn}
                                    onClick={() => {
                                        changeVisibleFn.current?.(false);
                                    }}
                                >
                                    <Icon
                                        type="close"
                                        className={styles.contactsDropdown_closeIcon}
                                    />
                                </div>
                                <Contacts />
                                <ContactInfo />
                            </DropdownContent>
                        </Dropdown>
                    </Context.Provider>
                </VisibleContext.Provider>
            </ContactsMsgId.Provider>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
ContactsDropdown.displayName = "ContactsDropdown";
