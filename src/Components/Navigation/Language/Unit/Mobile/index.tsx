/**
 * @file Temp
 * @date 2022-04-13
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { forwardRef, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavigationLanguageProps } from "../..";
import { Icon } from "../../../../..";
import classNames from "../../../../../Unit/classNames";
import { useNavContext } from "../../../NavigationBar/Unit/context";
import { handleCloseClick } from "../../../NavigationBar/Unit/handleCloseClick";
import Mobile from "../../../NavigationBar/Unit/Mobile";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Temp = forwardRef<HTMLDivElement, NavigationLanguageProps>(
    ({ languages, onClick, className, handleLanguageChange, ...props }, ref) => {
        Temp.displayName = "NavigationLanguageMobile";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const { close } = useNavContext();

        const [show, setShow] = useState(false);

        const { i18n } = useTranslation();

        const selectedLanguage = useMemo(() => {
            return languages?.find((item) => item.sim === i18n.language);
        }, [i18n.language, languages]);

        const { t } = useTranslation();
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/

        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        /**
         * 点击语言类型时
         */
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

        const subNav = (
            <Mobile
                show={show}
                handleShowChange={(res) => setShow(res)}
                header={t("NavComponent.Language")}
            >
                <ul className={styles.navigationLanguageMobile_list}>
                    {languages?.map((item) => {
                        const isActive = item.sim === selectedLanguage?.sim;

                        return (
                            <li
                                key={item.sim}
                                className={
                                    styles.navigationLanguageMobile_subItem +
                                    (isActive
                                        ? ` ${styles.navigationLanguageMobile_subItemActive}`
                                        : "")
                                }
                                onClick={() => {
                                    handleChange(item);
                                }}
                            >
                                <div className={styles.navigationLanguageMobile_subItemName}>
                                    <img
                                        src={item?.img}
                                        className={styles.navigationLanguageMobile_icon}
                                        alt=""
                                    />
                                    {item.content}
                                </div>
                                <Icon
                                    type="right"
                                    className={styles.navigationLanguageMobile_rightIcon}
                                />
                            </li>
                        );
                    })}
                </ul>
            </Mobile>
        );

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <>
                <div
                    className={classNames(styles.navigationLanguageMobile_wrap, className)}
                    {...props}
                    ref={ref}
                    onClick={(e) => {
                        setShow(true);
                        onClick?.(e);
                        handleCloseClick(close.current, () => {
                            setShow(false);
                        });
                    }}
                >
                    <>{t("NavComponent.Language")}</>
                    <div className={styles.navigationLanguageMobile_content}>
                        <img
                            src={selectedLanguage?.img}
                            className={classNames(styles.navigationLanguageMobile_icon, {
                                [`${styles.navigationLanguage_contentActive}`]: show && false,
                            })}
                            alt=""
                        />
                        <span>{selectedLanguage?.sim === "cn" ? "简体中文" : "English"}</span>

                        {languages?.length ? (
                            <Icon
                                type="open"
                                className={styles.navigationLanguageMobile_dropdownIcon}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                {subNav}
            </>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Temp.displayName = "NavigationLanguageMobile";
export default Temp;
