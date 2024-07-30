/**
 * @file 常用的btn的案例展示
 * @date 2023-08-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-18
 */
import { Meta, StoryObj } from "@storybook/react";
import { NormalBtn, NormalBtnProps } from "../../Components/Buttons/NormalBtn";
import { useRef } from "react";
import { BtnEvents } from "../../Components/Buttons/Btn";

export default {
    title: "Buttons/NormalBtn",
    component: NormalBtn,
    parameters: {
        docs: {
            description: {
                component: "1. 继承了原生的button属性\n2. 转发了Btn的BtnEvents事件 ",
            },
        },
    },
} as Meta<typeof NormalBtn>;

type Story = StoryObj<typeof NormalBtn>;

const Temp: React.FC<NormalBtnProps> = ({ ...props }) => {
    const ref = useRef<null | BtnEvents>(null);

    return (
        <>
            <button
                onClick={() => {
                    ref.current?.mousedown();
                }}
            >
                点我可以让按钮的状态为按下的样式
            </button>
            <NormalBtn ref={ref} {...props} />
        </>
    );
};

/**
 * 小按钮
 */
export const SmallBtn: Story = {
    render: (args) => <Temp {...args} />,
    args: {
        label: "按钮",
        size: "small",
        onClick: () => {
            console.log("小按钮");
        },
    },
};

/**
 * 默认按钮
 */
export const DefaultBtn: Story = {
    args: {
        label: "按钮",
        size: "default",
        onClick: () => {
            console.log("默认按钮");
        },
    },
};

/**
 * 大按钮
 */
export const LargeBtn: Story = {
    args: {
        label: "按钮",
        size: "large",
        onClick: () => {
            console.log("大按钮");
        },
    },
};

/**
 * 危险按钮
 */
export const DangerBtn: Story = {
    args: {
        label: "按钮",
        danger: true,
        onClick: () => {
            console.log("危险按钮");
        },
    },
};

/**
 * 禁用按钮
 */
export const DisabledBtn: Story = {
    args: {
        label: "按钮",
        disabled: true,
        onClick: () => {
            console.log("禁用按钮");
        },
    },
};

/**
 * loading按钮
 */
export const LoadingBtn: Story = {
    args: {
        label: "按钮",
        loading: true,
        disabled: true,
        onClick: () => {
            console.log("loading按钮");
        },
    },
};

/**
 * 带有icon的按钮
 */
export const IconBtn: Story = {
    args: {
        label: "按钮",
        icon: "mark1",
        onClick: () => {
            console.log("带有icon的按钮");
        },
    },
};

/**
 * 只有icon的按钮
 */
export const OnlyIconBtn: Story = {
    args: {
        icon: "mark1",
        onClick: () => {
            console.log("只有icon的按钮");
        },
    },
};
