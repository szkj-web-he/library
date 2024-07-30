/**
 * @file table
 * @date 2021-08-23
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-23
 */

import { FC, useState } from "react";
import { Table, TableProps } from "../../Components/Table/Table";
import { Meta, StoryObj } from "@storybook/react";
import { dataList } from "../../DefaultData/DataDisplay/table";
import { Icon, Kite } from "../..";
import { Column } from "../../Components/Table/Column";
import { TableBody } from "../../Components/Table/Main";
import { TableHeader } from "../../Components/Table/Title";

/**
 * TagCard component
 *
 */
export default {
    title: "Table/Table",
    component: Table,
} as Meta;

const Template: FC<TableProps> = (args) => {
    const [floatingEl, setFloatingEl] = useState<SVGElement>();
    const [floatingStatus, setFloatingStatus] = useState(false);
    const [sortData, setSortData] = useState<{
        q2: "asc" | "des" | "default";
        q3: "asc" | "des" | "default";
    }>({
        q2: "asc",
        q3: "default",
    });

    return (
        <>
            <Table {...args}>
                <Column
                    title={
                        <Icon
                            type="checkboxEmpty"
                            color="#BDBDBD"
                            fontSize="1.6rem"
                            onClick={() => {
                                console.log("1");
                            }}
                        />
                    }
                    isFixedDrag={true}
                    render={() => {
                        return (
                            <Icon
                                type="checkboxEmpty"
                                color="#BDBDBD"
                                fontSize="1.6rem"
                                onClick={() => {
                                    console.log("1");
                                }}
                            />
                        );
                    }}
                    fixed="left"
                    dataIndex="customTitle"
                    width="5rem"
                />
                <Column title="Recorded Date" dataIndex="date" width="20rem" fixed="left" />
                <Column title="Q1 - Welcome to our suggestion box" dataIndex="q1" width="20rem" />
                <Column
                    title="Q2 - Overall, how satisfied or dissatisfied are you with our website?"
                    dataIndex="q2"
                    width="31.5rem"
                    isDrag={true}
                    defaultSort={sortData.q2}
                    callback={{
                        sort: (res) => {
                            sortData.q2 = res;
                            setSortData({ ...sortData });
                        },
                    }}
                />
                <Column
                    title="Q3 - test"
                    dataIndex="q3"
                    width="31.5rem"
                    isDrag={true}
                    defaultSort={sortData.q3}
                    callback={{
                        sort: (res) => {
                            sortData.q3 = res;
                            setSortData({ ...sortData });
                        },
                    }}
                />
                <Column title="Q4 - test" dataIndex="q4" width="10rem" fixed="right" />
                <Column title="Q5 - test" dataIndex="q5" width="10rem" />
                <Column title="Q6 - test" dataIndex="q6" width="10rem" />
                <Column title="Q7 - test" dataIndex="q7" width="10rem" />
                <Column title="Q8 - test" dataIndex="q8" width="10rem" />
                <Column
                    title="Actions"
                    dataIndex="more"
                    width="8.5rem"
                    fixed="right"
                    render={() => {
                        return (
                            <Icon
                                color="#BDBDBD"
                                fontSize="0.5rem"
                                type="moreHorizontal"
                                onClick={(el) => {
                                    setFloatingEl(el.currentTarget);
                                    setFloatingStatus(true);
                                }}
                            />
                        );
                    }}
                />
            </Table>
            {floatingEl && (
                <Kite
                    show={floatingStatus}
                    root={floatingEl}
                    handleGlobalClick={(res) => {
                        if (!res.isBtn && !res.isMenu) {
                            setFloatingStatus(false);
                        }
                    }}
                >
                    <div>more</div>
                </Kite>
            )}
        </>
    );
};

type Story = StoryObj<typeof Table>;

/**
 * TagCard component
 */
export const TagCardSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        width: "96.4rem",
        height: "30rem",
        dataList,
    },
};

/**
 * 没有border
 */
export const NoBorder: Story = {
    render: (args) => <Template {...args} />,
    args: {
        width: "96.4rem",
        height: "30rem",
        border: false,
        dataList,
    },
};

/**
 * 只有1列
 */
const Template2: FC<TableProps> = (args) => {
    return (
        <Table {...args}>
            <Column title="Recorded Date" dataIndex="date" width="20rem" fixed="left" />
        </Table>
    );
};

export const OnlyOne: Story = {
    render: (args) => <Template2 {...args} />,
    args: { width: "20rem", height: "30rem", border: false, dataList },
};

/**
 * 自定义Table
 */
const Template3: FC<TableProps> = (args) => {
    return (
        <Table {...args}>
            <TableHeader />
            <TableBody height="10rem" />
        </Table>
    );
};

export const CustomTable: Story = {
    render: (args) => <Template3 {...args} />,
    args: {
        width: "96.4rem",
        height: "30rem",
        columns: [
            {
                title: "Recorded Date",
                dataIndex: "date",
                width: "20rem",
            },
            {
                title: "Q1 - Welcome to our suggestion box",
                dataIndex: "q1",
                width: "20rem",
            },
            {
                title: "Q2 - Overall, how satisfied or dissatisfied are you with our website?",
                dataIndex: "q2",
                width: "31.5rem",
            },
            {
                title: "Q3 - test",
                dataIndex: "q3",
                width: "31.5rem",
            },
            {
                title: "Q4 - test",
                dataIndex: "q4",
                width: "10rem",
            },
            {
                title: "Q5 - test",
                dataIndex: "q5",
                width: "10rem",
            },
            {
                title: "Q6 - test",
                dataIndex: "q6",
                width: "10rem",
            },
            {
                title: "Q7 - test",
                dataIndex: "q7",
                width: "10rem",
            },
            {
                title: "Q8 - test",
                dataIndex: "q8",
                width: "10rem",
            },
            {
                title: "Actions",
                dataIndex: "more",
                width: "8.5rem",
                render: () => {
                    return <Icon color="#BDBDBD" fontSize="0.5rem" type="moreHorizontal" />;
                },
            },
        ],
        dataList,
    },
};

/**
 * 没有 table header
 */
const Template4: FC<TableProps> = (args) => {
    return (
        <Table {...args}>
            <TableBody height="35rem" />
        </Table>
    );
};

export const NoHeader: Story = {
    render: (args) => <Template4 {...args} />,
    args: {
        width: "96.4rem",
        columns: [
            {
                title: "Recorded Date",
                dataIndex: "date",
                width: "20rem",
            },
            {
                title: "Q1 - Welcome to our suggestion box",
                dataIndex: "q1",
                width: "20rem",
            },
            {
                title: "Q2 - Overall, how satisfied or dissatisfied are you with our website?",
                dataIndex: "q2",
                width: "31.5rem",
            },
            {
                title: "Q3 - test",
                dataIndex: "q3",
                width: "31.5rem",
            },
            {
                title: "Q4 - test",
                dataIndex: "q4",
                width: "10rem",
            },
            {
                title: "Q5 - test",
                dataIndex: "q5",
                width: "10rem",
            },
            {
                title: "Q6 - test",
                dataIndex: "q6",
                width: "10rem",
            },
            {
                title: "Q7 - test",
                dataIndex: "q7",
                width: "10rem",
            },
            {
                title: "Q8 - test",
                dataIndex: "q8",
                width: "10rem",
            },
            {
                title: "Actions",
                dataIndex: "more",
                width: "8.5rem",
                render: () => {
                    return <Icon color="#BDBDBD" fontSize="0.5rem" type="moreHorizontal" />;
                },
            },
        ],
        dataList,
    },
};
