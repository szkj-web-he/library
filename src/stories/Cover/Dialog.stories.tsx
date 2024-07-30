/**
 * @file 对话框的例子
 * @date 2023-01-31
 * @author xuejie.he
 * @lastModify xuejie.he 2023-01-31
 */
import { Meta, StoryObj } from "@storybook/react";
import { FC, useState } from "react";
import { Button } from "../..";
import { Dialog, DialogProps } from "../../Components/Cover/Dialog";

export default {
    title: "Cover/Dialog",
    component: Dialog,
} as Meta;

const A = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <button
                onClick={() => {
                    setCount((pre) => ++pre);
                }}
            >
                加加
            </button>
            {count}
        </>
    );
};

const Template: FC<DialogProps> = (args) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button
                onClick={() => {
                    setShow((pre) => !pre);
                }}
                label="点我"
            />
            <Dialog
                {...args}
                show={show}
                onCloseClick={() => {
                    setShow(false);
                }}
            >
                <A />
            </Dialog>
        </>
    );
};

type Story = StoryObj<typeof Dialog>;

/**
 * 默认的对话框
 */
export const DefaultDialog: Story = {
    render: (args) => <Template {...args} />,
    args: {
        title: "标题",
        description: "描述",
        type: "error",
        removeOnHidden: true,
    },
};

/**
 * 信息类型的对话框
 */
export const InfoDialog: Story = {
    render: (args) => <Template {...args} />,
    args: {
        title: "标题",
        description: "描述",
        type: "info",
        size: "small",
        buttons: (
            <>
                <Button />
            </>
        ),
    },
};
/**
 * 警告类型的对话框
 */
export const WarnDialog: Story = {
    render: (args) => <Template {...args} />,
    args: {
        title: "标题",
        description: "描述",
        type: "warning",
        size: "small",
    },
};
/**
 * 错误类型的对话框
 */
export const ErrorDialog: Story = {
    render: (args) => <Template {...args} />,
    args: {
        title: "标题",
        description: "描述",
        type: "error",
        size: "small",
    },
};

/**
 * 小尺寸的对话框
 * 关闭时 移除了节点
 */
export const SmallDialog: Story = {
    render: (args) => <Template {...args} />,
    args: {
        title: "标题",
        description:
            "这是一个small尺寸的对话框,且在关闭时会删除节点，如果想要清除react element,则需要将children作为一个子组件(不能和当前dialog放在同一级)",
        size: "small",
        removeOnHidden: true,
    },
};

/**
 * 大尺寸的对话框
 */
export const BigDialog: Story = {
    render: (args) => <Template {...args} />,
    args: {
        title: "标题",
        // description: "这是一个big尺寸的对话框",
        size: "large",
        // type: "error",
    },
};
