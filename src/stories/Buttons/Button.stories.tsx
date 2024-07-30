/**
 * @file
 * @date 2020-09-04
 * @author Mark
 * @lastModify Mark 2020-09-04
 */
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../Components/Buttons/Button";
import { Icon } from "../../Components/Icon";
export default {
    title: "Buttons/Button",
    component: Button,
} as Meta;

type Story = StoryObj<typeof Button>;

/**
 * Primary Button style
 */
export const PrimaryNormal: Story = {
    args: {
        type: "primary",
        label: "Button",
        height: "3.2rem",
        width: "8rem",
        size: "normal",
        onClick: () => {
            console.log(123);
        },
    },
};

/**
 * Primary Button style
 */
export const PrimarySmall: Story = {
    args: {
        type: "primary",
        label: "Button",
        height: "3.2rem",
        width: "8rem",
        size: "small",
    },
};

/**
 * Primary Button style
 */
export const PrimaryBig: Story = {
    args: {
        type: "primary",
        label: "Conduct a survey",
        height: "3.1rem",
        width: "11.7rem",
        size: "big",
    },
};

/**
 * Primary Button style
 */
export const PrimaryLoading: Story = {
    args: {
        type: "primary",
        label: "Button",
        height: "3.2rem",
        width: "20rem",
        loading: true,
    },
};
/**
 * Primary Button style disabled
 */
export const PrimaryDisabled: Story = {
    args: {
        type: "primary",
        label: "Button",
        height: "3.2rem",
        width: "8rem",
        disabled: true,
    },
};
/**
 * Primary Button style disabled
 */
export const PrimaryIcon: Story = {
    args: {
        type: "primary",
        label: "Button",
        height: "3.2rem",
        width: "10rem",
        // icon: send,
        iconNode: <Icon type="send" />,
    },
};

/**
 * Secondary Button style
 */
export const SecondaryNormal: Story = {
    args: {
        type: "secondary",
        label: "Button",
        height: "3.2rem",
        width: "8rem",
        size: "normal",
    },
};
/**
 * Secondary Button style
 */
export const SecondarySmall: Story = {
    args: {
        type: "secondary",
        label: "Button",
        height: "3.2rem",
        width: "8rem",
        size: "small",
    },
};
/**
 * Secondary Button style
 */
export const SecondaryBig: Story = {
    args: {
        type: "secondary",
        label: "Button",
        height: "3.2rem",
        width: "8rem",
        size: "big",
    },
};

export const SecondaryLoading: Story = {
    args: {
        type: "secondary",
        label: "Button",
        height: "3.2rem",
        width: "20rem",
        loading: true,
    },
};

/**
 * Danger Button style
 */
export const Danger: Story = {
    args: {
        type: "danger",
        label: "Button",
        height: "3.2rem",
        width: "8rem",
    },
};
export const DangerLoading: Story = {
    args: {
        type: "danger",
        label: "Button",
        height: "3.2rem",
        width: "20rem",
        loading: true,
    },
};
