import { addons } from "@storybook/manager-api";
import personalTheme from "./personalTheme";

addons.setConfig({
    theme: personalTheme,
});
