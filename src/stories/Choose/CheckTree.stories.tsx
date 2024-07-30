/**
 * @file 复选树的stories
 * @date 2023-03-06
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-06
 */
import { Meta, StoryObj } from "@storybook/react";
import CheckTree from "../../Components/Choose/CheckTree";

export default {
    title: "Choose/CheckTree",
    component: CheckTree,
} as Meta;

type Story = StoryObj<typeof CheckTree>;

export const DefaultCheckTree: Story = {
    render: (args) => {
        return (
            <CheckTree {...args}>
                <CheckTree.Item uuid={"1"} content={"子1"}>
                    <CheckTree.Item uuid={"a"} content={"子1-子a"} />
                    <CheckTree.Item uuid={"b"} content={"子1-子b"} />
                    <CheckTree.Item uuid={"c"} content={"子1-子c"}>
                        <CheckTree.Item uuid={"aa"} content={"子1-子c-孙aa"}>
                            <CheckTree.Item uuid={"z"} content={"子1-子c-孙aa-曾孙z"} />
                            <CheckTree.Item uuid={"y"} content={"子1-子c-孙aa-曾孙y"} />
                            <CheckTree.Item uuid={"x"} content={"子1-子c-孙aa-曾孙x"} />
                        </CheckTree.Item>
                        <CheckTree.Item uuid={"g"} content={"子1-子c-孙g"} />
                        <CheckTree.Item uuid={"h"} content={"子1-子c-孙h"} />
                        <CheckTree.Item uuid={"i"} content={"子1-子c-孙i"} />
                    </CheckTree.Item>
                </CheckTree.Item>
                <CheckTree.Item uuid={"2"} content={"子2"}>
                    <CheckTree.Item uuid={"d"} content={"子2-子d"} />
                    <CheckTree.Item uuid={"e"} content={"子2-子e"} />
                    <CheckTree.Item uuid={"f"} content={"子2-子f"} />
                </CheckTree.Item>
            </CheckTree>
        );
    },
    args: {},
};
