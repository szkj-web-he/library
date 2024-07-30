/**
 * @file 图标按钮的案例展示
 * @date 2023-08-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-18
 */
import { Meta, StoryObj } from "@storybook/react";
import { IconBtn } from "../../Components/Buttons/IconBtn";
import { Icon } from "../..";
export default {
    title: "Buttons/IconBtn",
    component: IconBtn,
    parameters: {
        docs: {
            description: {
                component: "1. 继承了原生的button属性\n2. 转发了Btn的BtnEvents事件 ",
            },
        },
    },
} as Meta;

type Story = StoryObj<typeof IconBtn>;

/**
 * 默认按钮
 */
export const Default: Story = {
    args: {
        label: <Icon type="singleChoiceSelected" />,
        disabled: false,
        onClick: () => {
            console.log("默认按钮");
        },
    },
};

/**
 * Shadow主题按钮
 */
export const ShadowBtn: Story = {
    args: {
        label: <Icon type="choose" />,
        theme: "shadow",
        onClick: () => {
            console.log("Shadow主题按钮");
        },
    },
};

/**
 * hoverShadow主题按钮
 */
export const HoverShadowBtn: Story = {
    args: {
        label: <Icon type="choose" />,
        theme: "hoverShadow",
        onClick: () => {
            console.log("hoverShadow主题按钮");
        },
    },
};

/**
 * background主题按钮
 */
export const BackgroundBtn: Story = {
    args: {
        label: <Icon type="choose" />,
        theme: "background",
        onClick: () => {
            console.log("background主题按钮");
        },
    },
};

/**
 * primary主题按钮
 */
export const PrimaryBtn: Story = {
    args: {
        label: <Icon type="choose" />,
        theme: "primary",
        onClick: () => {
            console.log("primary主题按钮");
        },
    },
};

/**
 * neutral主题按钮
 */
export const NeutralBtn: Story = {
    args: {
        label: <Icon type="choose" />,
        theme: "neutral",
        onClick: () => {
            console.log("neutral主题按钮");
        },
    },
};

/**
 * hoverPrimary主题按钮
 */
export const HoverPrimaryBtn: Story = {
    args: {
        label: <Icon type="choose" />,
        theme: "hoverPrimary",
        onClick: () => {
            console.log("hoverPrimary主题按钮");
        },
    },
};

/**
 * border主题按钮
 */
export const BorderBtn: Story = {
    args: {
        label: <Icon type="magnify" />,
        theme: "border",
        onClick: () => {
            console.log("border主题按钮");
        },
    },
};

/**
 * danger主题按钮
 */
export const DangerBtn: Story = {
    args: {
        label: <Icon type="dustbin" />,
        theme: "danger",
        onClick: () => {
            console.log("danger主题按钮");
        },
    },
};
