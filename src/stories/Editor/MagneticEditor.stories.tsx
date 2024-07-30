/**
 * @file editor stories
 * @date 2022-02-28
 * @author xuejie.he
 * @lastModify xuejie.he 2022-02-28
 */
import { StoryObj, Meta } from "@storybook/react";
import { FC, useEffect, useState } from "react";
import { Descendant } from "slate";
import { filterDescendant, getDescendantLength, TextEditTool } from "../..";
import { MagneticEditor, MagneticEditorProps } from "../../Components/TextEdit/MagneticEditor";

export default {
    title: "TextEdit/MagneticEditor",
    component: MagneticEditor,
    parameters: {
        docs: {
            source: {
                type: "code",
            },
        },
    },
} as Meta;

const Template: FC<MagneticEditorProps> = (args) => {
    const [value, setValue] = useState<Descendant[]>([{ children: [{ text: "" }] }]);

    useEffect(() => {
        console.log(
            JSON.stringify(
                filterDescendant({
                    value,
                    maxLength: 100,
                    exclude: ["bold"],
                }),
            ),
        );
    }, [value]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            const data = [
                {
                    children: [
                        {
                            text: "abcasdfasdf",
                        },
                    ],
                },
            ] as Descendant[];

            setValue([...data]);
        }, 5000);
        return () => {
            timer && window.clearTimeout(timer);
        };
    }, []);
    return (
        <>
            <MagneticEditor
                {...args}
                editorValue={value}
                handleValueChange={(newValue) => {
                    setValue(newValue);
                    console.log("文字长度: ", getDescendantLength(newValue));
                }}
            />
        </>
    );
};
type Story = StoryObj<typeof MagneticEditor>;
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
        tool: (
            <TextEditTool
                toolList={[
                    "font-size",
                    "bold",
                    "italic",
                    "underline",
                    "line-through",
                    "|",
                    "color",
                    "background",
                    "|",
                    "left-align",
                    "center-align",
                    "right-align",
                ]}
            />
        ),
    },
};
