import type { Preview } from "@storybook/react";
import { withI18next } from "./i18nNode";
import "datareachable_font/css/puhui.css";
import "datareachable_font/css/roboto.css";
import type { IndexEntry } from "@storybook/types";

const preview: Preview = {
    parameters: {
        options: {
            storySort(a: IndexEntry, b: IndexEntry) {
                //无效
                return a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true });
            },
        },
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [withI18next],
};

export default preview;
