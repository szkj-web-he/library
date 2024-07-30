/**
 * @file 常用的btn的案例展示
 * @date 2023-08-16
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-16
 */
import { Meta, StoryObj } from "@storybook/react";
import { Btn } from "../../Components/Buttons/Btn";
export default {
    title: "Buttons/Btn",
    component: Btn,
    parameters: {
        docs: {
            description: {
                component: `
1. 继承了原生的button属性

2. 可通过转发的事件，来控制btn的状态
                    
    2.1. mousedown: () => void;  触发按下的状态

    2.2. mouseup: () => void;   触发取消按下的状态
    
    2.3. hover: (status: boolean) => void;  触发hover的状态 status表示是否移入
                `,
            },
        },
    },
} as Meta;

type Story = StoryObj<typeof Btn>;

/**
 * 自定义按钮
 */
export const CustomBtn: Story = {
    args: {
        children: "按钮",
        style: { padding: "4px 16px", border: "1px solid transparent" },
        styleOnHover: { boxShadow: "0 0 2px rgba(0,0,0,0.5)" },
        styleOnMousedown: { border: "1px solid #000" },
        onClick: () => {
            console.log("自定义按钮");
        },
    },
};
