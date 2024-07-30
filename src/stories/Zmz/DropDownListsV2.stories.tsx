/**
 * @file
 * @date 2021-08-18
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-18
 */
import { FC, useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { DropDownListV2, DropDownListV2Props } from "../../Components/Zmz/DropDownListV2";
import { Icon } from "../..";

/**
 * DropDownListV2 component
 *
 */
export default {
    title: "Zmz/DropDownListV2",
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
 * Large component
 */
export const Sample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        // floatingStyle: {
        //     width: "18.5rem",
        //     height: "14rem",
        // },
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
            {
                content: "Demo organization",
                id: 4,
            },
            {
                content: "Demo2 organization",
                id: 5,
            },
        ],
    },
};

/**
 * Large component
 */
export const IconSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        // floatingStyle: {
        //     width: "18.5rem",
        // },
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
                id: 5,
                children: [
                    {
                        content: "Tools1",
                        id: "5-1",
                    },
                    {
                        content: "Tools2",
                        id: "5-2",
                    },
                ],
            },
        ],
    },
};

/**
 * When Component has children
 */
export const ChildrenSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        // floatingStyle: {
        //     width: "18rem",
        //     height: "24.5rem",
        // },
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
export const CustomChildrenSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        // floatingStyle: {
        //     width: "18rem",
        //     height: "24.5rem",
        // },
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
 * tag component
 */
export const TagComponent: Story = {
    render: (args) => <Template {...args} />,
    args: {
        isFront: true,
        isTag: true,
        customDropdownIcon: <></>,
        handleValueChange(id, list) {
            console.log(id, list);
        },
    },
};
