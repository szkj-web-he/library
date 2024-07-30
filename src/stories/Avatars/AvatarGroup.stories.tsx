/**
 * @file avatar stories
 * @date 2023-02-27
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-27
 */
import { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../..";
import { AvatarGroup } from "../../Components/Avatars/AvatarGroup";

export default {
    title: "Avatars/AvatarGroup",
    component: AvatarGroup,
} as Meta;

type Story = StoryObj<typeof AvatarGroup>;

/**
 * 默认头像组
 */
export const DefaultAvatarGroup: Story = {
    args: {
        children: (
            <>
                <Avatar content="a" />
                <Avatar content="b" />
                <Avatar content="c" />
                <Avatar content="d" />
            </>
        ),
    },
};
