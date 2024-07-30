/**
 * @file
 * @date 2021-08-18
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-18
 */
import { FC, useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { DropDownListV2, DropDownListV2Props } from "../../Components/DataInput/DropDownListV2";
import { Icon } from "../..";

/**
 * DropDownListV2 component
 *
 */
export default {
    title: "DataInput/DropDownListV2",
    component: DropDownListV2,
} as Meta;

const Template: FC<DropDownListV2Props> = (args) => {
    const [id, setId] = useState(args.defaultValue);

    return (
        <DropDownListV2
            {...Object.assign({}, args, {
                defaultValue: id,
                handleValueChange: (id: number | string) => {
                    setId(id);
                },
            })}
            placeholder="1213213"
        />
    );
};

type Story = StoryObj<typeof DropDownListV2>;

/**
 * Extra Large component
 */
export const ExtraLargeSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: "extraLarge",
        floatingStyle: {
            width: "24.7rem",
            height: "16.7rem",
        },
        labels: [
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
        ],
    },
};

/**
 * Large component
 */
export const LargeSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: "large",
        floatingStyle: {
            width: "18.5rem",
            height: "14rem",
        },
        defaultValue: 0,
        labels: [
            {
                content: "Rename organization",
                id: 0,
            },

            {
                content: "Change organization",
                id: 1,
            },
            {
                content: "Leave organization",
                id: 2,
            },
            {
                content: "Remove organization",
                id: 3,
                isError: true,
            },
        ],
    },
};

/**
 * Large component
 */
export const IconLargeSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: "large",
        floatingStyle: {
            width: "18.5rem",
            height: "14rem",
        },
        labels: [
            {
                content: (
                    <div>
                        <Icon
                            type="importIcon"
                            style={{
                                marginRight: "1.2rem",
                                color: "#333",
                                fontSize: "1.6rem",
                            }}
                        />
                        Import Data
                    </div>
                ),
                id: 1,
            },
            {
                content: (
                    <div>
                        <Icon
                            type="exportIcon"
                            style={{
                                marginRight: "1.2rem",
                                color: "#333",
                                fontSize: "1.6rem",
                            }}
                        />
                        Export Data
                    </div>
                ),
                id: 2,
            },
            {
                content: (
                    <div>
                        <Icon
                            type="edit"
                            style={{
                                marginRight: "1.2rem",
                                color: "#333",
                                fontSize: "1.6rem",
                            }}
                        />
                        Edit Data
                    </div>
                ),
                id: 3,
            },
            {
                content: (
                    <div
                        style={{
                            fontSize: "1.4rem",
                            color: "#333",
                            fontWeight: 400,
                        }}
                    >
                        <Icon
                            type="utility"
                            style={{
                                marginRight: "1.2rem",
                                color: "#333",
                                fontSize: "1.6rem",
                            }}
                        />
                        Tools
                    </div>
                ),
                id: 4,
                children: [
                    {
                        content: "Tools1",
                        id: "4-1",
                    },
                    {
                        content: "Tools2",
                        id: "4-2",
                    },
                ],
            },
        ],
    },
};

/**
 * When Large Component has children
 */
export const LargeChildrenSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: "large",
        floatingStyle: {
            width: "18rem",
            height: "24.5rem",
        },
        labels: [
            {
                content: "Create New Field",
                id: 1,
            },
            {
                content: "Delete Custom Field",
                id: 2,
            },
            {
                content:
                    "Translate Comments Translate Comments Translate Comments Translate Comments Translate Comments",
                id: 3,
            },
            {
                content: "/",
                id: 4,
            },
            {
                content: "Save Layouts",
                id: 5,
                children: [
                    {
                        content: "Save Layouts1",
                        id: "5-1",
                    },
                    {
                        content: "Save Layouts2",
                        id: "5-2",
                    },
                    {
                        content: "Save Layouts3",
                        id: "5-3",
                    },
                    {
                        content: "Save Layouts4",
                        id: "5-4",
                    },
                ],
            },
            {
                content: "Delete Data",
                id: 6,
                children: [
                    {
                        content: "Delete Data1",
                        id: "6-1",
                    },
                    {
                        content: "Delete Data2",
                        id: "6-2",
                    },
                    {
                        content: "Delete Data3",
                        id: "6-3",
                    },
                    {
                        content: "Delete Data4",
                        id: "6-4",
                    },
                ],
            },
            {
                content: "Choose Columns",
                id: 7,
                children: [
                    {
                        content: "Choose Columns1",
                        id: "7-1",
                    },
                    {
                        content: "Choose Columns2",
                        id: "7-2",
                    },
                    {
                        content: "Choose Columns3",
                        id: "7-3",
                    },
                    {
                        content: "Choose Columns4",
                        id: "7-4",
                    },
                ],
            },
            {
                content: "Select Page Size",
                id: 8,
                children: [
                    {
                        content: "Select Page Size1",
                        id: "8-1",
                    },
                    {
                        content: "Select Page Size2",
                        id: "8-2",
                    },
                    {
                        content: "Select Page Size3",
                        id: "8-3",
                    },
                    {
                        content: "Select Page Size4",
                        id: "8-4",
                    },
                ],
            },
        ],
    },
};

/**
 * custom content component
 */
export const CustomLargeChildrenSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: "large",
        floatingStyle: {
            width: "18rem",
            height: "24.5rem",
        },
        width: "auto",
        height: "auto",
        customContent: (
            <Icon
                type="moreHorizontal"
                color="blue"
                fontSize="1rem"
                style={{ cursor: "pointer" }}
            />
        ),
        labels: [
            {
                content: "Create New Field",
                id: 1,
            },
            {
                content: "Delete Custom Field",
                id: 2,
            },
            {
                content:
                    "Translate Comments Translate Comments Translate Comments Translate Comments Translate Comments",
                id: 3,
            },
            {
                content: "/",
                id: 4,
            },
            {
                content: "Save Layouts",
                id: 5,
                children: [
                    {
                        content: "Save Layouts1",
                        id: "5-1",
                    },
                    {
                        content: "Save Layouts2",
                        id: "5-2",
                    },
                    {
                        content: "Save Layouts3",
                        id: "5-3",
                    },
                    {
                        content: "Save Layouts4",
                        id: "5-4",
                    },
                ],
            },
            {
                content: "Delete Data",
                id: 6,
                children: [
                    {
                        content: "Delete Data1",
                        id: "6-1",
                    },
                    {
                        content: "Delete Data2",
                        id: "6-2",
                    },
                    {
                        content: "Delete Data3",
                        id: "6-3",
                    },
                    {
                        content: "Delete Data4",
                        id: "6-4",
                    },
                ],
            },
            {
                content: "Choose Columns",
                id: 7,
                children: [
                    {
                        content: "Choose Columns1",
                        id: "7-1",
                    },
                    {
                        content: "Choose Columns2",
                        id: "7-2",
                    },
                    {
                        content: "Choose Columns3",
                        id: "7-3",
                    },
                    {
                        content: "Choose Columns4",
                        id: "7-4",
                    },
                ],
            },
            {
                content: "Select Page Size",
                id: 8,
                children: [
                    {
                        content: "Select Page Size1",
                        id: "8-1",
                    },
                    {
                        content: "Select Page Size2",
                        id: "8-2",
                    },
                    {
                        content: "Select Page Size3",
                        id: "8-3",
                    },
                    {
                        content: "Select Page Size4",
                        id: "8-4",
                    },
                ],
            },
        ],
    },
};

/**
 * normal component
 */
export const NormalComponent: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: "normal",
        floatingStyle: {
            width: "11.1rem",
            height: "13rem",
        },
        labels: [
            {
                content: "owner",
                id: 1,
            },
            {
                content: "admin",
                id: 2,
            },
            {
                content: "reviewer",
                id: 3,
            },
            {
                content: "/",
                id: 4,
            },
            {
                content: "remove",
                isError: true,
                id: 5,
            },
        ],
    },
};

/**
 * small component
 */
export const SmallComponent: Story = {
    render: (args) => <Template {...args} />,
    args: {
        size: "small",
        floatingStyle: {
            width: "7.4rem",
            height: "6.4rem",
        },
        labels: [
            {
                content: "Public",
                id: 1,
            },
            {
                content: "Private",
                id: 2,
            },
        ],
        onChangeComplete: (content) => {
            console.log(content);
        },
    },
};
