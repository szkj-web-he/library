/**
 * @file NavigationLanguage
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { forwardRef, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigationLanguageProps } from "../..";
import { Icon } from "../../../../..";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<HTMLDivElement, NavigationLanguageProps>(
    ({ languages, onBlur, className, handleLanguageChange, ...props }, ref) => {
        Temp.displayName = "NavigationLanguagePc";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/

        const { i18n } = useTranslation();

        const selectedLanguage = useMemo(() => {
            return languages?.find((item) => item.sim === i18n.language);
        }, [i18n.language, languages]);

        const [show, setShow] = useState(false);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const handleChange = (res: { sim: string; content: string; img: string }) => {
            if (res.sim !== i18n.language) {
                void i18n.changeLanguage(res.sim).then(() => {
                    handleLanguageChange?.(res);
                    setShow(false);
                });
            } else {
                setShow(false);
            }
        };

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div
                className={styles.navigationLanguage_wrapper + (className ? ` ${className}` : "")}
                {...props}
                ref={ref}
                tabIndex={-1}
                onBlur={(e) => {
                    setShow(false);
                    onBlur?.(e);
                }}
            >
                <div
                    className={
                        styles.navigationLanguage_content +
                        (show ? ` ${styles.navigationLanguage_contentActive}` : "")
                    }
                    onClick={() => {
                        setShow((pre) => !pre);
                    }}
                >
                    <img
                        src={selectedLanguage?.img}
                        className={styles.navigationLanguage_icon}
                        alt=""
                    />

                    <div className={styles.navigationLanguage_name}>
                        {selectedLanguage?.sim === "cn" ? "简体中文" : "English"}
                    </div>

                    {languages?.length ? (
                        <Icon type="dropdown" className={styles.navigationLanguage_dropdownIcon} />
                    ) : (
                        <></>
                    )}
                </div>
                <ul
                    className={
                        styles.navigationLanguage_list +
                        (show ? ` ${styles.navigationLanguage_listActive}` : "")
                    }
                >
                    {languages?.map((item) => {
                        const isActive = item.sim === selectedLanguage?.sim;
                        return (
                            <li
                                key={item.sim}
                                className={
                                    styles.navigationLanguage_item +
                                    (isActive ? ` ${styles.navigationLanguage_itemActive}` : "")
                                }
                                onClick={() => {
                                    handleChange(item);
                                }}
                            >
                                <img
                                    src={item?.img}
                                    className={styles.navigationLanguage_itemIcon}
                                    alt=""
                                />
                                {item.content}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Temp.displayName = "NavigationLanguagePc";
export default Temp;
