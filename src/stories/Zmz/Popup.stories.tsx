/**
 * @file
 * @date 2022-11-14
 * @author mingzhou.zhang
 * @lastModify  2022-11-14
 */

import { Meta, StoryObj } from "@storybook/react";
import { FC, useState } from "react";
import { Popup, PopupProps } from "../../Components/Zmz/Popup";

export default {
    title: "Zmz/Popup",
    component: Popup,
} as Meta;

const Template: FC<PopupProps> = (args) => {
    const [show, setShow] = useState(false);
    return (
        <div style={{ width: "100%" }}>
            <button onClick={() => setShow(!show)}>trigger</button>
            <Popup {...args} show={show} onClose={() => setShow(false)}>
                <div>123</div>
            </Popup>
        </div>
    );
};

type Story = StoryObj<typeof Popup>;

export const PopupSample: Story = {
    render: (args) => <Template {...args} />,
    args: {},
};
