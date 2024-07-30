/**
 * @file Project
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */

import { useTranslation } from "react-i18next";
import banner from "../../../../../Assets/images/plug-InEditor.png";
import { useNavLink } from "../../../NavigationBar/Unit/context";
import { Introduction } from "../Introduction";
import styles from "../Introduction/style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = (): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { t } = useTranslation();

    const link = useNavLink();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const main = (
        <>
            <div className={styles.introduction_header}>{t("NavComponent.Plug-In Editor")}</div>
            <div className={styles.introduction_subHeader}>
                {t("NavComponent.This is the questionnaire plugin developing tool")}
            </div>

            <div className={styles.introduction_btnMemo}>
                ( 👇 {t("NavComponent.Start here if you want to create plugins")})
            </div>
        </>
    );

    const description = (
        <>
            <p className={styles.introduction_text}>
                <span className={styles.introduction_tip}>👉</span>
                <span>
                    {t(
                        "NavComponent.By using this tool, you can develop your own plugin that can be used in questionnaire",
                    )}
                </span>
            </p>
            <p className={styles.introduction_text}>
                <span className={styles.introduction_tip}>👉</span>
                <span>
                    {t(
                        "NavComponent.Good news is that you can also sell this plugins in the “plugin store” to make an extra money",
                    )}
                </span>
            </p>
            {/* <p className={styles.introduction_text}>
                👉{" "}
                {t(
                    "NavComponent.By using this tool, you can develop your own plugin that can be used in questionnaire",
                )}
            </p>
            <p className={styles.introduction_text}>
                👉{" "}
                {t(
                    "NavComponent.Good news is that you can also sell this plugins in the “plugin store” to make an extra money",
                )}
            </p> */}
        </>
    );

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Introduction
            icon={<img src={banner} className={styles.introduction_banner} alt="" />}
            main={main}
            description={description}
            href={link.plugin}
        />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

export default Temp;
