/**
 * @file 文字按钮的案例展示
 * @date 2023-08-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-18
 */
import { Meta, StoryObj } from "@storybook/react";
import { TextBtn } from "../../Components/Buttons/TextBtn";
export default {
    title: "Buttons/TextBtn",
    component: TextBtn,
    parameters: {
        docs: {
            description: {
                component: "1. 继承了原生的button属性\n2. 转发了Btn的BtnEvents事件 ",
            },
        },
    },
} as Meta;

type Story = StoryObj<typeof TextBtn>;

/**
 * hover的时候才会添加下滑线的按钮
 */
export const UnderlineOnHoverBtn: Story = {
    args: {
        label: "按钮",
        disabled: false,
        underlineOnHover: true,
        onClick: () => {
            console.log("hover的时候才会添加下滑线的按钮");
        },
    },
};

/**
 * 默认按钮
 */
export const DefaultBtn: Story = {
    args: {
        label: "按钮",
        onClick: () => {
            console.log("默认按钮");
        },
    },
};

/**
 * 一直带有下划线的
 */
export const AllowedUnderlineBtn: Story = {
    args: {
        label: "按钮",
        underline: true,
        onClick: () => {
            console.log("AllowedUnderlineBtn");
        },
    },
};

/**
 * 带有icon的按钮
 */
export const IconTextBtn: Story = {
    args: {
        label: "按钮",
        icon: "choose",
        onClick: () => {
            console.log("带有icon的按钮");
        },
    },
};

/**
 * auxiliary类型的按钮
 */
export const AuxiliaryBtn: Story = {
    args: {
        label: "按钮",
        icon: "choose",
        type: "auxiliary",
        onClick: () => {
            console.log("auxiliary类型的按钮");
        },
    },
};

/**
 * neutralPrimary类型的按钮
 */
export const NeutralPrimaryBtn: Story = {
    args: {
        label: "按钮",
        icon: "choose",
        type: "neutralPrimary",
        onClick: () => {
            console.log("neutralPrimary类型的按钮");
        },
    },
};

/**
 * 带有背景框的按钮
 */
export const BackgroundBtn: Story = {
    args: {
        label: "按钮",
        icon: "choose",
        backgroundOnHover: true,
        onClick: () => {
            console.log("带有背景框的按钮");
        },
    },
};

/**
 * icon在右边的文字按钮
 */
export const IconRightBtn: Story = {
    args: {
        label: "按钮",
        icon: "choose",
        iconAlign: "right",
        onClick: () => {
            console.log("icon在右边的文字按钮");
        },
    },
};

/**
 * neutral类型按钮
 */
export const NeutralBtn: Story = {
    args: {
        label: "按钮",
        type: "neutral",
        icon: "choose",
        iconAlign: "right",
        onClick: () => {
            console.log("neutral类型按钮");
        },
    },
};

/**
 * danger类型的下划线按钮
 */
export const DangerUnderlineBtn: Story = {
    args: {
        label: "按钮",
        type: "danger",
        underlineOnHover: true,
        onClick: () => {
            console.log("danger类型的下划线按钮");
        },
    },
};

/**
 * danger类型的按钮
 */
export const DangerBtn: Story = {
    args: {
        icon: "choose",
        label: "按钮",
        type: "danger",
        onClick: () => {
            console.log("danger类型的按钮");
        },
    },
};

/**
 * neutralDanger类型的按钮
 */
export const NeutralDangerBtn: Story = {
    args: {
        icon: "choose",
        label: "按钮",
        type: "neutralDanger",
        onClick: () => {
            console.log("neutralDanger类型的按钮");
        },
    },
};

/**
 * 禁用的按钮
 */
export const DisabledBtn: Story = {
    args: {
        label: "按钮",
        disabled: true,
        onClick: () => {
            console.log("禁用的按钮");
        },
    },
};

/**
 * 只有Icon的按钮
 */
export const OnlyIconBtn: Story = {
    args: {
        label: <></>,
        icon: "choose",
        onClick: () => {
            console.log("只有Icon的按钮");
        },
    },
};
