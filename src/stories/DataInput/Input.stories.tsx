/**
 * @file 输入框的
 * @date 2023-06-07
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-07
 */
import { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../..";
import { Input } from "../../Components/DataInput/Input";

/**
 * Input component
 *
 */
export default {
    title: "DataInput/Input",
    component: Input,
} as Meta;

type Story = StoryObj<typeof Input>;
/**
 * 默认输入框
 */
export const DefaultInput: Story = {};

/**
 * 禁用输入框
 */
export const DisableInput: Story = {
    args: {
        disabled: true,
        value: "默认值",
    },
};

/**
 * 默认数字输入框
 */
export const NumberInput: Story = {
    args: {
        type: "number",
    },
};

/**
 * 可以输入下划线的数字输入框
 */
export const IncludeNumberInput: Story = {
    args: {
        type: "number",
        include: ["_"],
    },
};

/**
 * 有前缀的输入框
 */
export const BeforeInput: Story = {
    args: {
        beforeNode: (
            <Icon
                type="signUp"
                style={{
                    position: "absolute",
                    left: "1rem",
                    top: "0",
                    bottom: "0",
                    margin: "auto 0",
                    fontSize: "1.8rem",
                    color: "#22a6b3",
                    pointerEvents: "none",
                }}
            />
        ),
        className: "abc",
    },
};
