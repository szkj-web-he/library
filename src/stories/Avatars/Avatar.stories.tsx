/**
 * @file avatar stories
 * @date 2023-02-27
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-27
 */
import { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../../Components/Avatars/Avatar";

export default {
    title: "Avatars/Avatar",
    component: Avatar,
} as Meta;

type Story = StoryObj<typeof Avatar>;

/**
 * 默认头像
 */
export const DefaultAvatar: Story = {
    args: {},
};

/**
 * Name Avatar
 */
export const NameAvatar: Story = {
    args: { content: "MM" },
};

/**
 * 默认的组织头像
 */
export const OrgAvatar: Story = {
    args: { type: "org" },
};

/**
 * 矩形头像
 */
export const RectAvatar: Story = {
    args: { content: "MM", shape: "rect", size: "20" },
};

/**
 * 图片头像
 */
export const ImageAvatar: Story = {
    args: { imgUrl: "https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF", size: "80" },
};
