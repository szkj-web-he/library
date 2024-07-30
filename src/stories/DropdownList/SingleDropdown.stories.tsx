/**
 * @file 单选下拉的stories
 * @date 2023-02-28
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-28
 */

import { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../..";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import SingleDropdownList, {
    SingleDropdownListProps,
} from "./../../Components/DropdownList/SingleDropdown";
/**
 * SingleDropdown
 */
export default {
    title: "DropdownList/SingleDropdownList",
    component: SingleDropdownList,

    argTypes: {
        activeUUid: {
            control: "text",
            description: "当前选中的哪一个 dropdown item的id",
            table: {
                type: { summary: ["string", "number", "undefined"] },
                defaultValue: { summary: "undefined" },
            },
        },
        children: {
            description: "children里只能是 <SingleDropdownList.Item>",
            table: {
                type: { summary: "Array<SingleDropdownList.Item>" },
            },
        },
        btn: {
            description: "下拉框的按钮",
            table: {
                type: {
                    summary: ["<SingleDropdownList.BorderBtn>", "<SingleDropdownList.IconBtn>"],
                },
            },
        },
        size: {
            description: "下拉框的宽度",
            defaultValue: "Middle",
            control: "radio",
            options: ["Small", "Middle", "Large", "ExtraLarge"],
            table: {
                defaultValue: { summary: "Middle" },
                type: {
                    summary: ["Small", "Middle", "Large", "ExtraLarge"],
                },
            },
        },
        lineHeight: {
            type: { name: "string", required: true },
            description: "每个item的line height,一定得是有效的line height。必传，它很重要",
            table: {
                type: { summary: "string" },
            },
        },
        placement: {
            description: "下拉框的起点位置",
            control: "radio",
            defaultValue: "lb",
            options: ["lb", "rb", "cb"],
            table: {
                defaultValue: { summary: "lb" },
                type: {
                    summary: ["lb", "rb", "cb"],
                },
            },
        },
        disable: {
            description: "是否禁用",
            control: "boolean",
            defaultValue: false,
            table: {
                defaultValue: { summary: "false" },
                type: {
                    summary: ["boolean"],
                },
            },
        },
        handleChange: {
            description: "当选中的uuid发生变化时",
            table: {
                type: {
                    summary: "(to?: number | string, from?: number | string)=>void",
                },
            },
        },
        handleVisibleChange: {
            description: "当可见度发生变化时",

            table: {
                type: {
                    summary: "(visible : boolean)=>void",
                },
            },
        },
    },
} as Meta<typeof SingleDropdownList>;

/**
 * 选择框的单选下拉列表 start
 */
const Template: FC<SingleDropdownListProps> = (args) => {
    const changeFn = useRef<Dispatch<SetStateAction<boolean>>>();

    return (
        <>
            <button
                onClick={() => {
                    changeFn.current?.((pre) => {
                        return !pre;
                    });
                }}
            >
                点我试试
            </button>
            <SingleDropdownList
                {...args}
                btn={
                    <SingleDropdownList.BorderBtn
                        tipsOnDisable={"当前角色没有权限"}
                        contentRender={(uuid, data) => {
                            if (uuid === 1) {
                                return 111;
                            }
                            return uuid ? data?.[uuid] : undefined;
                        }}
                    />
                }
                size="ExtraLarge"
                lineHeight="3.2rem"
                changeVisibleFn={changeFn}
            >
                <>
                    <SingleDropdownList.Item uuid={1} disable={true} tipsOnDisable={"我不能点击"}>
                        不需要担心下拉框的高度,宽度请在size里设置
                    </SingleDropdownList.Item>
                    <SingleDropdownList.Item uuid={2} readonly>
                        选择框hover和focus的样式统一了,这个点击了不会关闭
                    </SingleDropdownList.Item>
                    <SingleDropdownList.Item uuid={3}>
                        选择框的宽度是自适应的,当然也可以设置为固定值
                    </SingleDropdownList.Item>
                    <SingleDropdownList.Item uuid={4}>
                        这些item,btn都可以自定以样式
                    </SingleDropdownList.Item>
                    <SingleDropdownList.Item uuid={5}>
                        btn的contentRender可以自定义展示的content
                    </SingleDropdownList.Item>
                    <SingleDropdownList.Item uuid={6}>
                        item的uuid一定不能重复
                    </SingleDropdownList.Item>
                </>
            </SingleDropdownList>
        </>
    );
};

type Story = StoryObj<typeof SingleDropdownList>;

export const DefaultTemp: Story = {
    render: (args) => <Template {...args} />,
};

/**
 * 选择框的单选下拉列表 end
 */

/**
 * 自定义btn的单选下拉列表 start
 */

const IconTemplate: FC<SingleDropdownListProps> = (args) => {
    return (
        <SingleDropdownList {...args} size="Large" lineHeight="2.8rem">
            <>
                <SingleDropdownList.Item uuid={1}>iconBtn的例子</SingleDropdownList.Item>
                <SingleDropdownList.Hr />
                <SingleDropdownList.Item uuid={2}>
                    iconBtn也可以自带下拉按钮
                </SingleDropdownList.Item>
                <SingleDropdownList.Item uuid={3}>
                    iconBtn的下拉icon也可以设置位置
                </SingleDropdownList.Item>
                <SingleDropdownList.Item uuid={4}>下拉icon的默认位置在右边</SingleDropdownList.Item>
                <SingleDropdownList.Item uuid={5}>其他的就和BorderBtn一样</SingleDropdownList.Item>
            </>
        </SingleDropdownList>
    );
};

export const DefaultIconTemplate: Story = {
    render: (args) => <IconTemplate {...args} />,
    args: {
        btn: (
            <SingleDropdownList.IconBtn
                contentRender={() => (
                    <Icon
                        type="group"
                        style={{
                            fontSize: "1.6rem",
                        }}
                    />
                )}
            />
        ),
    },
};

/**
 * 下拉按钮在左边
 */
export const LeftDropdownIconTemplate: Story = {
    render: (args) => <IconTemplate {...args} />,
    args: {
        activeUUid: 1,
        btn: (
            <SingleDropdownList.IconBtn
                dropdownIcon={"left"}
                // contentRender={(uuid, child) => {
                //     if (uuid && child) {
                //         return child[uuid];
                //     }
                //     return "我是默认的文本";
                // }}
            />
        ),
    },
};

/**
 * 自定义btn的单选下拉列表 end
 */
