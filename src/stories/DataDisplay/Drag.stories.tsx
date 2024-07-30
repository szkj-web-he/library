/**
 * @file drag component's storybook
 * @date 2022-05-30
 * @author xuejie.he
 * @lastModify xuejie.he 2022-05-30
 */
import { Meta, StoryObj } from "@storybook/react";
import { Drag } from "../../Components/DataDisplay/Drag";
export default {
    title: "DataDisplay/Drag",
    component: Drag,
} as Meta;

type Story = StoryObj<typeof Drag>;
/**
 * Normal Drag
 */
export const NormalDrag: Story = {
    args: {
        style: {
            width: "200px",
            height: "300px",
            backgroundColor: "#fff",
            border: "1px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        isResize: true,
        isDrag: true,
        children: <>可以是任何react element</>,
    },
};
