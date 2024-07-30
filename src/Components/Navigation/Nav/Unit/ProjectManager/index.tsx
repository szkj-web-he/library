/**
 * @file Project
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */

import { useTranslation } from "react-i18next";
import banner from "../../../../../Assets/images/projectManager.png";
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
            <div className={styles.introduction_header}>{t("NavComponent.Project Manager")}</div>
            <div className={styles.introduction_subHeader}>
                {t(
                    "NavComponent.This is the project management centre, you can manage all your digital research projects here",
                )}
            </div>

            <div className={styles.introduction_btnMemo}>
                ( 👇{" "}
                {t("NavComponent.Start here if you want to create a research project from 0 to 1")})
            </div>
        </>
    );

    const description = (
        <>
            <p className={styles.introduction_text}>
                <span className={styles.introduction_tip}>👉</span>
                <span>
                    {t(
                        "NavComponent.You can create research projects, deciding what are the “deliverables” of this project",
                    )}
                    <br />
                    {t(
                        "NavComponent.For example, “writing the content of questionnaires” or “recruiting respondents”",
                    )}
                </span>
            </p>
            <p className={styles.introduction_text}>
                <span className={styles.introduction_tip}>👉</span>
                <span>
                    {t(
                        "NavComponent.You can also assign the tasks in a research project to your supplier",
                    )}
                </span>
            </p>
        </>
    );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Introduction
            icon={<img src={banner} className={styles.introduction_banner} alt="" />}
            main={main}
            description={description}
            href={link.projectManager}
        />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

export default Temp;
