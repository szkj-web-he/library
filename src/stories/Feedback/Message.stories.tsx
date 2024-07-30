/**
 * @file
 * @date 2020-12-04
 * @author Jack zhu
 * @lastModify Jack zhu 2020-12-05
 */
import { Meta, StoryObj } from "@storybook/react";
import Message, {
    BottomMessageProps,
    RightMessageProps,
    TopMessageProps,
} from "../../Components/Feedback/Message";
import { useRef } from "react";
import { Button, Icon } from "../..";

const Template: React.FC<
    (TopMessageProps | BottomMessageProps | RightMessageProps) & {
        position: "top" | "right" | "bottom" | "auto";
    }
> = (args) => {
    const handler = useRef<(status: boolean) => void>();
    const fn = () => {
        switch (args.position) {
            case "auto":
                // It can decide for itself whether to use top or right
                Message.auto(args);
                break;
            case "top":
                // For mobile
                Message.top(args);
                break;
            case "right":
                // For PC
                Message.right({
                    ...args,
                    bindSetVisibleStatus(handleEvent) {
                        handler.current = handleEvent;
                    },
                });
                break;
            case "bottom":
                Message.bottom(args);
                break;
        }
    };
    return (
        <div>
            <Button type="none" height="2.5rem" width="10rem" label="click" onClick={fn} />
            <button
                onClick={() => {
                    handler.current?.(false);
                }}
            >
                自定义关闭
            </button>
        </div>
    );
};

const meta: Meta<typeof Template> = {
    title: "Feedback/Message",
    component: Template,
};

export default meta;

type Story = StoryObj<typeof Template>;

/**
 * normal notification
 */
export const TopSuccess: Story = {
    args: {
        type: "success",
        position: "top",
        content: "this is success message",
        onClose: () => {
            console.log("close");
        },
        onClick: () => {
            console.log("click");
        },

        duration: 3000,
        style: {
            boxSizing: "border-box",
        },
        icon: null,
    },
};

/**
 * info notification
 */
export const TopInfo: Story = {
    args: {
        type: "info",
        position: "top",
        duration: 5000,
        content: "custom icon",
    },
};

/**
 * waring notification
 */
export const TopWarning: Story = {
    args: {
        type: "warning",
        position: "top",
        content: "this is warn message",
    },
};

/**
 * error notification
 */
export const TopError: Story = {
    args: {
        type: "error",
        content:
            "this is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error messagethis is error message",
        position: "top",
    },
};

/**
 * top none
 */
export const TopNone: Story = {
    args: {
        type: "none",
        content: "this is none message",
        duration: 5000,
        position: "top",
    },
};

/**
 * right success
 */
export const RightSuccess: Story = {
    args: {
        type: "success",
        position: "right",
        content:
            "this is success message,this is success message,this is success message,this is success message,this is success message,this is success message,this is success message,this is success message,this is success message,this is success message,this is success message,this is success message,this is success message,this is success message,this is success message,this is success message,this is success message,this is success message",
        onClose: () => {
            console.log("close");
        },
        onClick: () => {
            console.log("click");
        },
        duration: 1000,

        style: {
            boxSizing: "border-box",
        },
    },
};

/**
 * right info notification
 */
export const RightInfo: Story = {
    args: {
        type: "info",
        position: "right",
        duration: 5000,
        content: "custom icon",
    },
};

/**
 * right waring notification
 */
export const RightWarning: Story = {
    args: {
        type: "warning",
        position: "right",
        content: "custom icon,custom close icon",
        duration: 5000,
        icon: (
            <Icon
                type="warningTriangle"
                style={{
                    fontSize: "1.6rem",
                    color: "rgba(0,255,255,0.5)",
                }}
            />
        ),
        closeIcon: (
            <Icon
                type="closeDetails"
                style={{
                    fontSize: "1.6rem",
                    color: "rgba(255,0,255,0.5)",
                }}
            />
        ),
    },
};

/**
 * error notification
 */
export const RightError: Story = {
    args: {
        type: "error",
        content: "this is error message",
        position: "right",
    },
};

/**
 * top none
 */
export const RightNone: Story = {
    args: {
        type: "none",
        content: "this is none message",
        duration: 5000,
        position: "right",
    },
};

/**
 * bottom
 */
export const BottomMessageArgs: Story = {
    args: {
        content: "this is bottom message",
        duration: 5000,
        position: "bottom",
    },
};

export const BottomMessageArgs2: Story = {
    args: {
        content:
            "this is bottom message3,this is bottom message3,this is bottom message3,this is bottom message3,this is bottom message3,this is bottom message3",
        duration: 1000,
        position: "bottom",
    },
};
