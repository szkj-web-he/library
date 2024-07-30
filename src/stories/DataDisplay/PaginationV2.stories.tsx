/**
 * @file Pagination stories
 * @date 2021-12-07
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-07
 */
import { FC, useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Pagination, PaginationProps } from "../../Components/DataDisplay/Pagination";

export default {
    title: "DataDisplay/Pagination",
    component: Pagination,
} as Meta;

const Template: FC<PaginationProps> = (args) => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <div style={{ margin: "20px 0 0 0" }}>
            <Pagination
                {...Object.assign({}, args, {
                    defaultCurrentPage: currentPage,
                    handleChange: (val: number) => {
                        setCurrentPage(val);
                    },
                })}
            />
        </div>
    );
};

type Story = StoryObj<typeof Pagination>;

/**
 * Base pagintion style
 */

export const BasePagintion: Story = {
    render: (args) => <Template {...args} />,
    args: {
        total: 100,
        rows: 10,
    },
};
