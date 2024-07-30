/**
 * @file
 * @date 2021-08-19
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-19
 */
import { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "../../Components/DataDisplay/Accordion";
import { Icon } from "../..";
import { data } from "../../DefaultData/DataDisplay/accordion";

const defaultList = [
    {
        content: (
            <div>
                <Icon type="folder" style={{ marginRight: "10px" }} />
                Folder A
            </div>
        ),
        id: 1,
        child: [
            {
                content: (
                    <div>
                        <Icon type="text" style={{ marginRight: "10px" }} />
                        file
                    </div>
                ),
                id: "1-1",
            },
            {
                content: (
                    <div>
                        <Icon type="JSfile" style={{ marginRight: "10px" }} />
                        index.js
                    </div>
                ),
                id: "1-2",
            },
            {
                content: (
                    <div>
                        <Icon type="CSSfile" style={{ marginRight: "10px" }} />
                        index.scss
                    </div>
                ),
                id: "1-3",
            },
        ],
    },
    {
        content: (
            <div>
                <Icon type="folder" style={{ marginRight: "10px" }} />
                Folder B
            </div>
        ),
        id: 2,
        child: [
            {
                content: (
                    <div>
                        <Icon type="text" style={{ marginRight: "10px" }} />
                        file
                    </div>
                ),
                id: "2-1",
            },
            {
                content: (
                    <div>
                        <Icon type="JSfile" style={{ marginRight: "10px" }} />
                        index.js
                    </div>
                ),
                id: "2-2",
            },
            {
                content: (
                    <div>
                        <Icon type="CSSfile" style={{ marginRight: "10px" }} />
                        index.scss
                    </div>
                ),
                id: "2-3",
            },
        ],
    },
    {
        content: (
            <div>
                <Icon type="folder" style={{ marginRight: "10px" }} />
                Folder C
            </div>
        ),
        id: 3,
        child: [
            {
                content: (
                    <div>
                        <Icon type="text" style={{ marginRight: "10px" }} />
                        file
                    </div>
                ),
                id: "3-1",
            },
            {
                content: (
                    <div>
                        <Icon type="JSfile" style={{ marginRight: "10px" }} />
                        index.js
                    </div>
                ),
                id: "3-2",
            },
            {
                content: (
                    <div>
                        <Icon type="CSSfile" style={{ marginRight: "10px" }} />
                        index.scss
                    </div>
                ),
                id: "3-3",
            },
        ],
    },
    {
        content: (
            <div>
                <Icon type="folder" style={{ marginRight: "10px" }} />
                Folder D
            </div>
        ),
        id: 4,
        child: [
            {
                content: (
                    <div>
                        <Icon type="text" style={{ marginRight: "10px" }} />
                        file
                    </div>
                ),
                id: "4-1",
            },
            {
                content: (
                    <div>
                        <Icon type="JSfile" style={{ marginRight: "10px" }} />
                        index.js
                    </div>
                ),
                id: "4-2",
            },
            {
                content: (
                    <div>
                        <Icon type="CSSfile" style={{ marginRight: "10px" }} />
                        index.scss
                    </div>
                ),
                id: "4-3",
            },
        ],
    },
    {
        content: (
            <div>
                <Icon type="folder" style={{ marginRight: "10px" }} />
                Folder E
            </div>
        ),
        id: 5,
        child: [
            {
                content: (
                    <div>
                        <Icon type="text" style={{ marginRight: "10px" }} />
                        file
                    </div>
                ),
                id: "5-1",
            },
            {
                content: (
                    <div>
                        <Icon type="JSfile" style={{ marginRight: "10px" }} />
                        index.js
                    </div>
                ),
                id: "5-2",
            },
            {
                content: (
                    <div>
                        <Icon type="CSSfile" style={{ marginRight: "10px" }} />
                        index.scss
                    </div>
                ),
                id: "5-3",
            },
        ],
    },
];

export default {
    title: "DataDisplay/Accordion",
    component: Accordion,
    // decorators: [
    //     (Story) => (
    //         <div style={{ margin: "3em" }}>
    //             <Story />
    //         </div>
    //     ),
    // ],
} as Meta;

type Story = StoryObj<typeof Accordion>;

export const DefaultSample: Story = {
    args: {
        labels: defaultList,
        width: "22rem",
        indent: "2rem",
    },
};

export const TreeSample: Story = {
    args: {
        labels: data,
        width: "22rem",
        indent: "2rem",
    },
};
