/**
 * @file Project
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */

import { useTranslation } from "react-i18next";
import banner from "../../../../../Assets/images/questionnaireEditor.png";
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
            <div className={styles.introduction_header}>
                {t("NavComponent.Questionnaire Editor")}
            </div>
            <div className={styles.introduction_subHeader}>
                {t("NavComponent.This is the questionnaire editing tool")}
            </div>

            <div className={styles.introduction_btnMemo}>
                ( 👇 {t("NavComponent.Start here if you want to create a questionnaire")})
            </div>
        </>
    );

    const description = (
        <p className={styles.introduction_text}>
            <span className={styles.introduction_tip}>👉</span>
            <span>
                {t(
                    "NavComponent.By using this tool, you can create questionnaires that are fully customisable in content, logic and appearance",
                )}
            </span>
            {/* 👉{" "}
            {t(
                "NavComponent.By using this tool, you can create questionnaires that are fully customisable in content, logic and appearance",
            )} */}
        </p>
    );

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Introduction
            icon={<img src={banner} className={styles.introduction_banner} alt="" />}
            main={main}
            description={description}
            href={link.qEditorDashboard}
        />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

export default Temp;