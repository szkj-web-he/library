/**
 * @file
 * @date 2023-01-05
 * @author  mingzhou.zhang
 * @lastModify  2022-01-05
 */
import { StoryObj, Meta } from "@storybook/react";
import { Icon } from "../../Components/Icon";
import type { BreadcrumbProps } from "../../Components/Zmz/Breadcrumb";
import Breadcrumb from "../../Components/Zmz/Breadcrumb";
import { FC } from "react";
export default {
    title: "Zmz/Breadcrumb",
    component: Breadcrumb,
} as Meta<BreadcrumbProps>;

const Template: FC<BreadcrumbProps> = (args) => {
    return (
        <Breadcrumb {...args}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
                <a href="#">Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <a href="#">Application List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item disabled>
                <a href="#">An Application</a>
            </Breadcrumb.Item>
        </Breadcrumb>
    );
};

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
    render: () => <Template />,
};

const Template2: FC<BreadcrumbProps> = (args) => {
    return (
        <Breadcrumb {...args}>
            <Breadcrumb.Item>
                <Icon type="home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">
                <Icon type="employee" />
                <span>Application Center</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">
                <span>Application List</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" disabled>
                <span>An Application</span>
            </Breadcrumb.Item>
        </Breadcrumb>
    );
};

export const Withicon: Story = {
    render: () => <Template2 />,
};

const Template3: FC<BreadcrumbProps> = (args) => {
    return (
        <Breadcrumb {...args}>
            <Breadcrumb.Item>
                <Icon type="home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">
                <Icon type="employee" />
                <span>Application Center</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">
                <span>Application List</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" disabled>
                <span>An Application</span>
            </Breadcrumb.Item>
        </Breadcrumb>
    );
};

export const Maxwidth: Story = {
    render: (args) => <Template3 {...args} />,

    args: {
        maxItemWidth: "8rem",
    },
};

const Template4: FC<BreadcrumbProps> = (args) => {
    return (
        <Breadcrumb {...args}>
            <Breadcrumb.Item>
                <Icon type="home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">
                <Icon type="employee" />
                <span>应用大厅1</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">
                <span>应用大厅2</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" disabled>
                <span>应用大厅3</span>
            </Breadcrumb.Item>
        </Breadcrumb>
    );
};

export const Maxitems: Story = {
    render: (args) => <Template4 {...args} />,

    args: {
        maxItems: 3,
    },
};
