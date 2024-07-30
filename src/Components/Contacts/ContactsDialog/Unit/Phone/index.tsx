/**
 * @file contact phone
 * @date 2021-11-01
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon, MobileInput, useUnmount } from "../../../../..";
import { useCheckPhone } from "../../Hooks/useCheckPhone";
import { AutoSizePopover } from "../AutoSizePopover";
import { useContactsDialog, useContactsMsgId } from "../context";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    // const [errorStatus, setErrorStatus] = useState(error);
    const [errorMsg, setErrorMsg] = useState<string>();

    const { t } = useTranslation();

    const [focus, setFocus] = useState(false);

    const { selectedContact } = useContactsDialog();

    const msgId = useContactsMsgId();

    const check = useCheckPhone();

    const timer = useRef<number>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useUnmount(() => {
        timer.current && window.clearTimeout(timer.current);
    });

    /**
     * 监听取消按钮的点击
     */
    useEffect(() => {
        const fn = () => {
            timer.current && window.clearTimeout(timer.current);
        };

        document.addEventListener(`cancel-${msgId}`, fn);
        return () => {
            document.removeEventListener(`cancel-${msgId}`, fn);
        };
    }, [msgId]);

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
            timer.current && window.clearTimeout(timer.current);
            setFocus(false);
        };
        document.addEventListener(`init-${msgId}`, fn);
        return () => {
            document.removeEventListener(`init-${msgId}`, fn);
        };
    }, [msgId]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleBlur = () => {
        timer.current = window.setTimeout(() => {
            setFocus(false);
            setErrorMsg(check());
        }, 100);
    };

    const handleFocus = () => {
        setFocus(true);
        timer.current && window.clearTimeout(timer.current);
    };

    const handleInput = (val: string) => {
        const event = new CustomEvent(`phoneChange-${msgId}`, {
            detail: {
                value: val,
            },
        });
        document.dispatchEvent(event);
    };

    const handleAreaCodeChange = (areaCode: number, area: string) => {
        const event = new CustomEvent(`areaChange-${msgId}`, {
            detail: {
                areaCode: `${areaCode}`,
                country: area,
            },
        });
        document.dispatchEvent(event);

        timer.current && window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            setErrorMsg(check());
        }, 100);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.contactsDialog_phoneWrapper}>
            <div className={styles.contactsDialog_phoneName}>{t("ContactsComponent.Phone")}</div>
            <AutoSizePopover
                show={!focus && !!errorMsg}
                btn={
                    <MobileInput
                        handleBlur={handleBlur}
                        handleFocus={handleFocus}
                        error={!!errorMsg}
                        selectedAreaCodeKey={selectedContact.country}
                        value={selectedContact.number}
                        placeholder={t("ContactsComponent.Contact Phone")}
                        maxLength={30}
                        handleInput={handleInput}
                        handleAreaCodeChange={handleAreaCodeChange}
                    />
                }
            >
                <Icon
                    type="warning"
                    fontSize="1.6rem"
                    color="red"
                    style={{
                        marginRight: "0.8rem",
                    }}
                />
                {errorMsg ? t(`ContactsComponent.PhoneError.${errorMsg}`) : undefined}
            </AutoSizePopover>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
