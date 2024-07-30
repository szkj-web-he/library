/**
 * @file
 * @date 2022-05-24
 * @author
 * @lastModify 2022-05-24
 */
import { StoryObj, Meta } from "@storybook/react";
import { InputProps } from "../../Components/Zmz/Input/Unit/interface";
import { Input } from "../../Components/Zmz/Input";
import { DropDownListV2 } from "../../Components/Zmz/DropDownListV2";
import { FC } from "react";

export default {
    title: "Zmz/Input",
    component: Input,
} as Meta;

const Template: FC<InputProps> = (args) => {
    return <Input {...args} style={{ width: "100%" }} />;
};

type Story = StoryObj<typeof Input>;

export const InputDefaultSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        // allowClear: true,
        placeholder: "input text",
        maxLength: 20,
        disabled: true,
        addonBefore: "http://",
        addonAfter: "MB",
        addonStyleHide: true,
        // disabled: true,
        onPressEnter(event) {
            console.log(event);
        },
    },
};

export const PrefixInputSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        prefix: <span>123</span>,
    },
};

export const SuffixInputSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        suffix: <span>345</span>,
    },
};

export const GroupInputSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        addonBefore: (
            <DropDownListV2
                placeholder="please choose"
                labels={[
                    {
                        content: "Survey Project Manager",
                        id: 0,
                    },
                    {
                        content: "Questionnaire Editor",
                        id: 1,
                    },
                    {
                        content: "Questionnaire Distribution",
                        id: 2,
                    },
                    {
                        content: "Data Processing & Brief",
                        id: 3,
                    },
                ]}
                // border={false}
                disabled
            />
        ),
        placeholder: "please input text",
        allowClear: true,
        disabled: true,
    },
};

export const GroupInputAfterSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        addonAfter: (
            <DropDownListV2
                placeholder="please choose"
                labels={[
                    {
                        content: "Survey Project Manager",
                        id: 0,
                    },
                    {
                        content: "Questionnaire Editor",
                        id: 1,
                    },
                    {
                        content: "Questionnaire Distribution",
                        id: 2,
                    },
                    {
                        content: "Data Processing & Brief",
                        id: 3,
                    },
                ]}
                // border={false}
                disabled
            />
        ),
        allowClear: true,
        placeholder: "please input text",
        // disabled: true,
    },
};
