/**
 * @file list retrieval stories
 * @date 2021-08-09
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-09
 */
import { StoryObj, Meta } from "@storybook/react";
import { ListRetrieval } from "../../Components/DataInput/ListRetrieval";

export default {
    title: "DataInput/ListRetrieval",
    component: ListRetrieval,
} as Meta;

type Story = StoryObj<typeof ListRetrieval>;
/**
 * default listRetrieval
 */
export const DefaultListRetrieval: Story = {
    args: {
        contentList: [
            "abc",
            "1231",
            "def",
            "ghi",
            "jkl",
            "mno",
            "pqr",
            "stu",
            "vwx",
            "yz",
            "adg",
            "jmp",
            "svy",
        ],
    },
};
