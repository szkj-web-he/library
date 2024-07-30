/**
 * @file 边框按钮的案例展示
 * @date 2023-08-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-18
 */
import { Meta, StoryObj } from "@storybook/react";
import { BorderBtn } from "../../Components/Buttons/BorderBtn";
export default {
    title: "Buttons/BorderBtn",
    component: BorderBtn,
    parameters: {
        docs: {
            description: {
                component: "1. 继承了原生的button属性\n2. 转发了Btn的BtnEvents事件 ",
            },
        },
    },
} as Meta;

type Story = StoryObj<typeof BorderBtn>;

/**
 * 默认按钮
 */
export const Default: Story = {
    args: {
        label: "按钮",
        disabled: false,
        onClick: () => {
            console.log("默认按钮");
        },
    },
};

/**
 * auxiliary主题
 */
export const AuxiliaryTheme: Story = {
    args: {
        label: "按钮",
        disabled: false,
        theme: "auxiliary",
        onClick: () => {
            console.log("auxiliary主题");
        },
    },
};

/**
 * neutral主题
 */
export const NeutralTheme: Story = {
    args: {
        label: "按钮",
        disabled: false,
        theme: "neutral",
        onClick: () => {
            console.log("neutral主题");
        },
    },
};

/**
 * 反转的交互
 */
export const Invert: Story = {
    args: {
        label: <>{"按钮"}</>,
        disabled: false,
        type: "invert",
        onClick: () => {
            console.log("反转的交互");
        },
    },
};

/**
 * 带有icon的neutral主题
 */
export const IconNeutral: Story = {
    args: {
        label: "按钮",
        disabled: false,
        theme: "neutral",
        icon: "choose",
        onClick: () => {
            console.log("带有icon的neutral主题");
        },
    },
};

/**
 * 禁用的btn
 */
export const Disabled: Story = {
    args: {
        label: "按钮",
        disabled: true,
        theme: "neutral",
        icon: "choose",
        onClick: () => {
            console.log("禁用的btn");
        },
    },
};

/**
 * 一个隐藏label的btn
 */
export const Icon: Story = {
    args: {
        theme: "neutral",
        icon: "choose",
        label: <></>,
        onClick: () => {
            console.log("禁用的btn");
        },
    },
};
