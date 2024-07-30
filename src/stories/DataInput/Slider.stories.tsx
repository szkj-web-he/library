/**
 * @file this is the slider component file
 * @date 2021-05-03
 * @author Frank
 * @lastModify Frank 2021-05-03
 */
import { FC, useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Slider, SliderProps } from "../../Components/DataInput/Slider";

/**
 * Slider component
 *
 */
export default {
    title: "DataInput/Slider",
    component: Slider,
} as Meta;

const Template: FC<SliderProps> = () => {
    const [left, setLeft] = useState(0.5);

    return (
        <div style={{ marginTop: "2rem", marginLeft: "3rem" }}>
            <Slider
                handleChange={(value) => {
                    setLeft(value);
                }}
                value={left}
            />
        </div>
    );
};

type Story = StoryObj<typeof Slider>;
/**
 * Slider Normal component normal
 *
 */
export const SliderDefault: Story = {
    render: (args) => <Template {...args} />,
};
