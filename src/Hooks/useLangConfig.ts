/**
 * @file 添加翻译文件
 * @date 2022-10-14
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-14
 */

import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export interface LangConfigProps {
    CN: Record<string, string | Record<string, string>>;
    EN: Record<string, string | Record<string, string>>;
}

export const useLangConfig = (namespace: string, config: LangConfigProps) => {
    const { i18n } = useTranslation();
    useMemo(() => {
        /**
         * 这里判断是否已经将lang文件添加进入了
         */
        const cnLangData = i18n.getResource("cn", "translation", namespace);
        if (!cnLangData) {
            i18n.addResourceBundle("cn", "translation", { [namespace]: config.CN }, true, true);
        }
        const enLangData = i18n.getResource("en", "translation", namespace);
        if (!enLangData) {
            i18n.addResourceBundle("en", "translation", { [namespace]: config.EN }, true, true);
        }
    }, [config, i18n, namespace]);
};
