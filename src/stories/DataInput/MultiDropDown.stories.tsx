/**
 * @file MultiDropDown storybook
 * @date 2020-09-04
 * @author Andy
 * @lastModify Andy 2020-09-04
 */
import { FC, useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { MultiDropDown, MultiDropDownProps } from "../../Components/DataInput/MultiDropDown";

/**
 * MultiDropDown component
 *
 */
export default {
    title: "DataInput/MultiDropDown",
    component: MultiDropDown,
} as Meta;

const Template: FC<MultiDropDownProps> = (args) => {
    const [value, setValue] = useState(args.defaultItem);

    return <MultiDropDown {...args} defaultItem={value} handleChange={setValue} />;
};

/**
 * MultiDropDown component
 *
 */
const singleLabels = [
    {
        id: 1,
        content: "Q1 What is your age group?",
    },
    {
        id: 2,
        content: "Q2 What is your name?",
    },
    {
        id: 3,
        content: "Q3 Who’s your daddy?",
    },
    {
        id: 4,
        content: "Q4 Show me the money?",
    },
    {
        id: 5,
        content: "Q5 Show me the money?",
    },
];

type Story = StoryObj<typeof MultiDropDown>;

export const Single: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "single",
        defaultItem: [singleLabels[0].id],
        labelSet: singleLabels,
    },
};

/**
 * MultiDropDown component
 */
const multiLabels = [
    {
        id: 1,
        content: "Q1_1 10 - 19",
    },
    {
        id: 2,
        content: "Q1_2 20 - 24",
    },
    {
        id: 3,
        content: "Q1_3 25 - 29",
    },
    {
        id: 4,
        content: "Q1_4 30 - 34",
    },
];
export const Multi: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "multi",
        defaultItem: [multiLabels[0].id],
        labelSet: multiLabels,
    },
};

/**
 * ButtonDropDown component
 */
const buttonLabels = [
    {
        id: 1,
        content: "AND",
    },
    {
        id: 2,
        content: "OR",
    },
    {
        id: 3,
        content: "ROR",
    },
];
export const Button: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "button",
        labelSet: buttonLabels,
        width: "7.5rem",
    },
};
