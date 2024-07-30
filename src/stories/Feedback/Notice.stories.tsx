/**
 * @file
 * @date 2020-12-04
 * @author Jack zhu
 * @lastModify Jack zhu 2020-12-05
 */
import { StoryObj } from "@storybook/react";
import Notice, { NoticeFnProps } from "../../Components/Feedback/notice";
import { Button } from "../../Components/Buttons/Button";
import { FC } from "react";

const Template: FC<
    NoticeFnProps & {
        type: "success" | "info" | "warning" | "error";
    }
> = (args) => {
    const fn = () => {
        switch (args.type) {
            case "success":
                Notice.success({ ...args });
                break;
            case "info":
                Notice.info({ ...args });
                break;
            case "warning":
                Notice.warning({ ...args });
                break;
            case "error":
                Notice.error({ ...args });
                break;
        }
    };
    return (
        <div>
            <Button type="none" height="2.5rem" width="10rem" label="click" onClick={fn} />
        </div>
    );
};

export default {
    title: "Feedback/Notice",
    component: Template,
    argTypes: {
        title: {
            description: "type of React.ReactNode",
            type: {
                required: true,
            },
        },
        description: {
            description: "type of React.ReactNode",
            type: {
                required: true,
            },
        },
        type: {
            description: "Notice type",
            control: {
                type: "radio",
            },
            options: ["success", "info", "warning", "error"],
        },

        duration: {
            description: "type of number,ms value",
            defaultValue: 5000,
            control: {
                type: "number",
            },
        },
        onClose: {
            description: "type of ()=>void | undefined, this is close function",
        },
        showIcon: {
            description: "type of boolean",
            defaultValue: true,
            control: {
                type: "boolean",
            },
        },
        confirm: {
            description: `type of {
                content:React.ReactNode,
                },
            cancel of this component cancel button`,

            control: {
                type: "text",
            },
        },
        cancel: {
            description: `type of {
                content:React.ReactNode,
                },
            cancel of this component cancel button`,
            control: {
                type: "text",
            },
        },
        autoClose: {
            description: "auto close,type of boolean",
            defaultValue: true,
            control: {
                type: "boolean",
            },
        },
        closeWhenLeave: {
            description: "auto close when mouse leave,type of boolean",
            defaultValue: true,
            control: {
                type: "boolean",
            },
        },
        onClick: {
            description: "onClick",
        },
        position: {
            description: "Notice position",
            control: {
                type: "radio",
            },
            defaultValue: "right",
            options: ["left", "right"],
        },
    },
};

type Story = StoryObj<typeof Template>;

/**
 * normal notification
 */
export const Success: Story = {
    args: {
        type: "success",
        title: "Successfully!",
        description: "success message",
        duration: 5000,
        onClose: () => {
            console.log("close");
        },
        onClick: () => {
            console.log("onClick");
        },
    },
};

/**
 * info notification
 */
export const InfoWhenNoAutoClose: Story = {
    args: {
        type: "info",
        title: "info!",
        description: "info message",
        autoClose: false,
        confirm: {
            content: (
                <div style={{ display: "inline-block", marginRight: "2rem" }}>
                    <Button type="none" height="2.5rem" width="10rem" label="confirm" />
                </div>
            ),
        },
        cancel: {
            content: (
                <Button
                    height="2.5rem"
                    width="10rem"
                    label="cancel"
                    size="normal"
                    type="secondary"
                    onClick={() => {
                        console.log(1213);
                    }}
                />
            ),
        },
    },
};

/**
 * waring notification
 */
export const WarningNoMouseLeaveClose: Story = {
    args: {
        type: "warning",
        title: "warning!",
        description: "warning message",
        closeWhenLeave: false,
    },
};

/**
 * error notification
 */
export const ErrorNoIcon: Story = {
    args: {
        type: "error",
        title: "error!",
        description:
            "error message,error message,error message,error message,error message,error message",
        showIcon: false,
    },
};
