/**
 * @file 语言翻译
 * @date 2023-10-27
 * @author xuejie.he
 * @lastModify xuejie.he 2023-10-27
 */

import { Preview } from "@storybook/react";
import { Suspense, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

type Decorators = NonNullable<Preview["decorators"]>[number];

export const withI18next: Decorators = (Story, context) => {
    const { locale } = context.globals;

    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [locale]);

    return (
        <Suspense fallback={<div>语言转换中...</div>}>
            <I18nextProvider i18n={i18n}>
                <Story />
            </I18nextProvider>
        </Suspense>
    );
};
