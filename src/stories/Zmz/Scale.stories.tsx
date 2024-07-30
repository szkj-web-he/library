/**
 * @file
 * @date 2022-05-27
 * @author
 * @lastModify 2022-05-27
 */
import { StoryObj, Meta } from "@storybook/react";
import { FC, useState } from "react";
import { Scale, ScaleProps } from "../../Components/Zmz/Scale";

export default {
    title: "Zmz/Scale",
    component: Scale,
} as Meta;

const Template: FC<ScaleProps> = (args) => {
    return (
        <div
            style={{
                width: 300,
                height: 300,
                border: "1px solid black",
                margin: "5rem",
            }}
        >
            <Scale {...args} />
        </div>
    );
};

type Story = StoryObj<typeof Scale>;

export const ScaleDefaultSample: Story = {
    render: () => <Template />,
};

export const CustomScaleNode: FC<ScaleProps> = (args) => {
    const [show, setShow] = useState(false);

    return (
        <div
            style={{
                width: 300,
                height: 300,
                border: "1px solid black",
            }}
        >
            <Scale
                style={{ left: 50, top: 50 }}
                {...args}
                isShow={show}
                customScaleNode={<button onClick={() => setShow(true)}>123</button>}
                onZoomOut={() => setShow(false)}
            ></Scale>
        </div>
    );
};
