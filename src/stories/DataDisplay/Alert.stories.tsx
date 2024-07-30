/**
 * @file Alert storybook
 * @date 2020-09-07
 * @author Andy
 * @lastModify Andy 2020-09-07
 */
import { StoryObj, Meta } from "@storybook/react";
import { Alert, AlertProps } from "../../Components/DataDisplay/Alert";
import { Button } from "../../Components/Buttons/Button";
import { FC, useState } from "react";

/**
 * Alert component
 *
 */
export default {
    title: "DataDisplay/Alert",
    component: Alert,
} as Meta;

const Template: FC<AlertProps> = (args) => {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <Button
                type="primary"
                height="3.2rem"
                width="10rem"
                label={<div>click </div>}
                onClick={() => {
                    setVisible(true);
                }}
            />
            <Alert
                {...Object.assign({}, args, { status: visible })}
                changeStatus={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

type Story = StoryObj<typeof Alert>;

/**
 * error Sample
 */
export const ErrorSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        content: (
            <div>
                Are you sure want to archive this project?
                <div style={{ color: "#E5E5E5", fontSize: "12px" }}>
                    (You can restore this project in the “deleted” folder)
                </div>
            </div>
        ),
        type: "error",
        title: "Archive Project?",
        removeOnHidden: true,
        cache: false,
        animationType: "inBottom",
        handleCancel: () => {
            console.log(222);
        },
    },
};

/**
 * custom Sample
 */

export const CustomSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        custom: true,
        children: <div>custom context</div>,
        width: "34.6rem",
        height: "16.8rem",
        handleCancel: () => {
            console.log(222);
        },
    },
};
