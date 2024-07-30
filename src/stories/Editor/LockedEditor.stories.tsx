/**
 * @file editor stories
 * @date 2022-02-28
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-28
 */
import { Meta, StoryObj } from "@storybook/react";
import { FC, startTransition, useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { Descendant } from "slate";
import { descendantToReactNode, filterDescendant, getDescendantLength } from "../..";
import { LockedEditor, LockedEditorProps } from "../../Components/TextEdit/LockedEditor";

export default {
    title: "TextEdit/LockedEditor",
    component: LockedEditor,
    parameters: {
        docs: {
            source: {
                type: "code",
            },
        },
    },
} as Meta;

const Template: FC<LockedEditorProps> = (args) => {
    const [value, setValue] = useState<Descendant[]>([
        {
            children: [
                {
                    text: "12345234523452345",
                },
            ],
        },
    ]);

    useEffect(() => {
        startTransition(() => {
            const reactNode = descendantToReactNode({ value, maxLength: 30 });
            const html = renderToString(<>{reactNode}</>);
            console.log("reactNode", reactNode);
            console.log("html", html);
            console.log("文字长度", getDescendantLength(value));
            const data = filterDescendant({ value, maxLength: 150 });
            console.log("限制文字", JSON.stringify(data), getDescendantLength(data));
            console.log(" ");
        });
    }, [value]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            const data = [
                { children: [{ text: "" }] },
                {
                    children: [
                        { text: "爱傻傻的拉屎肯德基点击的假暗杀大萨达爱上退还给" },
                        { text: "123213大萨达撒多", bold: true },
                        { text: "阿是否打赏打发第三方", bold: true, italic: true },
                        {
                            text: "阿斯顿撒打撒多sfasdf",
                            bold: true,
                            italic: true,
                            "line-through": true,
                        },
                    ],
                },
                { children: [{ bold: true, italic: true, "line-through": true, text: "" }] },
                { children: [{ bold: true, italic: true, "line-through": true, text: "" }] },
                {
                    children: [
                        { bold: true, italic: true, "line-through": true, text: "asdfasdf" },
                    ],
                },
                {
                    children: [
                        { bold: true, italic: true, "line-through": true, text: "asdfasdf" },
                    ],
                },
                { children: [{ bold: true, italic: true, "line-through": true, text: "" }] },
            ] as Descendant[];

            setValue([...data]);
        }, 5000);
        return () => {
            timer && window.clearTimeout(timer);
        };
    }, []);

    return (
        <LockedEditor
            {...args}
            editorValue={value}
            handleValueChange={(newValue) => {
                setValue(newValue);
            }}
        />
    );
};

type Story = StoryObj<typeof LockedEditor>;
/**
 * Default text editor
 */
export const DefaultEditor: Story = {
    render: (args) => <Template {...args} />,
};

/**
 * remove Copy btn
 */
export const CustomTool: Story = {
    render: (args) => <Template {...args} />,
    args: {
        showTotal: true,
        maxLength: 100,
    },
};
