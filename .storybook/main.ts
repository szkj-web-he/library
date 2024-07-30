import path from "node:path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    typescript: {
        check: true,
        checkOptions: {
            async: true,
        },
    },

    docs: {
        autodocs: true,
    },
    env: (config) => ({
        ...config,
        NODE_ENV: "development",
        BASENAME: "/v2/dev",
    }),
    staticDirs: [path.resolve(__dirname, "../public")],
    async webpackFinal(config) {
        const customRules = [
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    {
                        loader: "style-loader",
                    },

                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 3,
                            modules: {
                                localIdentName: "[local]",
                            },
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, "../postcss.config.js"),
                            },
                        },
                    },
                    { loader: "resolve-url-loader" },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ];

        return {
            ...config,
            module: { ...config.module, rules: [...(config.module?.rules ?? []), ...customRules] },
            plugins: [...(config.plugins ?? [])],
        };
    },
};
export default config;
