/**
 * @file 联系人的相关操作
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */

import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ContactsDialogProps } from "..";
import { useUpdateEffect } from "../../../..";
import { useLatest } from "../../../../Hooks/useLatest";
import { deepCloneData } from "../../../../Unit/deepCloneData";
import { SelectedContact } from "../Unit/context";
import { findContact, findContactIndex } from "../Unit/findContact";
import { initContact } from "../Unit/initContact";
import { ContactProps } from "../Unit/type";

export const useContact = (
    msgId: string,
    value: ContactsDialogProps["value"],
    handleChange: ContactsDialogProps["handleChange"],
): [
    ContactProps[] | undefined,
    SelectedContact,
    MutableRefObject<SelectedContact>,
    MutableRefObject<ContactProps[] | undefined>,
] => {
    const listRef = useRef(deepCloneData(value));

    const [list, setList] = useState(value);

    const selectedDataRef = useRef<SelectedContact>({ type: "add", name: "", key: 1 });

    const [selectedData, setSelectedData] = useState<SelectedContact>({
        type: "add",
        name: "",
        key: 1,
    });

    const handleChangeRef = useLatest(handleChange);

    useUpdateEffect(() => {
        setList(value);
        listRef.current = value;
    }, [value]);

    /**
     * 监听名称变化
     */
    useEffect(() => {
        const fn = (e: Event) => {
            const event = e as CustomEvent<{ value: string }>;

            selectedDataRef.current.name = event.detail.value;
            setSelectedData(deepCloneData(selectedDataRef.current));
        };

        document.addEventListener(`nameChange-${msgId}`, fn);
        return () => {
            document.removeEventListener(`nameChange-${msgId}`, fn);
        };
    }, [msgId]);

    /**
     * 监听邮箱变化
     */
    useEffect(() => {
        const fn = (e: Event) => {
            const event = e as CustomEvent<{ value: string }>;

            selectedDataRef.current.email = event.detail.value;
            setSelectedData(deepCloneData(selectedDataRef.current));
        };

        document.addEventListener(`emailChange-${msgId}`, fn);
        return () => {
            document.removeEventListener(`emailChange-${msgId}`, fn);
        };
    }, [msgId]);

    /**
     * 监听区号变化变化
     */
    useLayoutEffect(() => {
        const fn = (e: Event) => {
            const event = e as CustomEvent<{ areaCode: string; country: string }>;

            selectedDataRef.current.country = event.detail.country;
            selectedDataRef.current.area = event.detail.areaCode;
            setSelectedData(deepCloneData(selectedDataRef.current));
        };

        document.addEventListener(`areaChange-${msgId}`, fn);
        return () => {
            document.removeEventListener(`areaChange-${msgId}`, fn);
        };
    }, [msgId]);

    /**
     * 监听手机号的变化
     */
    useEffect(() => {
        const fn = (e: Event) => {
            const event = e as CustomEvent<{ value: string }>;

            selectedDataRef.current.number = event.detail.value;
            setSelectedData(deepCloneData(selectedDataRef.current));
        };

        document.addEventListener(`phoneChange-${msgId}`, fn);
        return () => {
            document.removeEventListener(`phoneChange-${msgId}`, fn);
        };
    }, [msgId]);

    /**
     * 监听 传进组件的联系人列表 发生变化
     * 如果 传进组件的联系人列表 变化后,当前正在的操作有冲突
     * 就得重置
     */
    useEffect(() => {
        if (selectedDataRef.current.type === "edit") {
            const status = value?.some((item) => item.name === selectedDataRef.current.name);
            if (!status) {
                setSelectedData(() => {
                    const data = initContact(value);
                    selectedDataRef.current = deepCloneData(data);
                    return data;
                });
            }
        }
    }, [value]);

    /**
     * 监听保存按钮的点击
     */
    useEffect(() => {
        const fn = () => {
            const data = selectedDataRef.current;

            const arr = listRef.current ?? [];
            if (data.type === "add") {
                arr.unshift({
                    name: data.name,
                    contact: {
                        email: data.email,
                        country: data.country,
                        area: data.area,
                        number: data.number,
                    },
                });
            } else {
                for (let i = 0; i < arr.length; ) {
                    if (arr[i].name === data.name) {
                        arr[i].contact = {
                            area: data.area,
                            country: data.country,
                            number: data.number,
                            email: data.email,
                        };
                        i = arr.length;
                    } else {
                        ++i;
                    }
                }
            }

            setList(arr);
            listRef.current = deepCloneData(arr);
            handleChangeRef.current?.(deepCloneData(arr));

            selectedDataRef.current = {
                ...deepCloneData(data),
                type: "edit",
            };
            setSelectedData(deepCloneData(selectedDataRef.current));
        };

        document.addEventListener(`save-${msgId}`, fn);
        return () => {
            document.removeEventListener(`save-${msgId}`, fn);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msgId]);

    /**
     * 监听取消按钮的点击
     */
    useEffect(() => {
        const fn = () => {
            if (!listRef.current?.length) {
                const data: SelectedContact = {
                    type: "add",
                    name: "",
                    email: undefined,
                    area: undefined,
                    country: undefined,
                    number: undefined,
                    key: Date.now(),
                };

                selectedDataRef.current = deepCloneData(data);

                setSelectedData(data);
                return;
            }

            let contact: Omit<SelectedContact, "type" | "key">;
            if (selectedDataRef.current.type === "add") {
                const item = listRef.current[0];
                contact = {
                    name: item.name,
                    email: item.contact.email,
                    area: item.contact.area,
                    country: item.contact.country,
                    number: item.contact.number,
                };
            } else {
                contact = findContact(listRef.current, selectedDataRef.current.name) as Omit<
                    SelectedContact,
                    "type"
                >;
            }

            const data: SelectedContact = {
                type: "edit",
                name: contact.name,
                email: contact.email,
                area: contact.area,
                country: contact.country,
                number: contact.number,
                key: Date.now(),
            };

            selectedDataRef.current = deepCloneData(data);

            setSelectedData(data);
        };

        document.addEventListener(`cancel-${msgId}`, fn);
        return () => {
            document.removeEventListener(`cancel-${msgId}`, fn);
        };
    }, [msgId]);

    /**
     * 监听新增按钮的点击
     */
    useEffect(() => {
        const fn = () => {
            const data: SelectedContact = {
                type: "add",
                name: "",
                email: undefined,
                area: undefined,
                country: undefined,
                number: undefined,
                key: Date.now(),
            };

            selectedDataRef.current = deepCloneData(data);

            setSelectedData(data);
        };

        document.addEventListener(`add-${msgId}`, fn);
        return () => {
            document.removeEventListener(`add-${msgId}`, fn);
        };
    }, [msgId]);

    /**
     * 监听item的点击
     */
    useEffect(() => {
        const fn = (e: Event) => {
            const event = e as CustomEvent<{
                area?: string;
                country?: string;
                number?: string;
                email?: string;
                name: string;
            }>;

            selectedDataRef.current = {
                ...deepCloneData(event.detail),
                type: "edit",
                key: Date.now(),
            };

            setSelectedData(deepCloneData(selectedDataRef.current));
        };

        document.addEventListener(`itemClick-${msgId}`, fn);
        return () => {
            document.removeEventListener(`itemClick-${msgId}`, fn);
        };
    }, [msgId]);

    /**
     * 监听item的删除事件
     */
    useEffect(() => {
        const fn = (e: Event) => {
            if (!listRef.current?.length) {
                console.log("如果走到这里  就有bug");
                return;
            }

            const event = e as CustomEvent<{
                area?: string;
                country?: string;
                number?: string;
                email?: string;
                name: string;
            }>;

            const index = findContactIndex(listRef.current, event.detail.name);

            listRef.current.splice(index, 1);

            setList(deepCloneData(listRef.current));

            handleChangeRef.current?.(deepCloneData(listRef.current));

            if (listRef.current.length) {
                const item = listRef.current[0];
                selectedDataRef.current = {
                    area: item.contact.area,
                    country: item.contact.country,
                    number: item.contact.number,
                    email: item.contact.email,
                    name: item.name,
                    type: "edit",
                    key: Date.now(),
                };
            } else {
                selectedDataRef.current = {
                    name: "",
                    type: "add",
                    key: Date.now(),
                };
            }
            setSelectedData(deepCloneData(selectedDataRef.current));
        };

        document.addEventListener(`itemDelete-${msgId}`, fn);
        return () => {
            document.removeEventListener(`itemDelete-${msgId}`, fn);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msgId]);

    return [list, selectedData, selectedDataRef, listRef];
};
