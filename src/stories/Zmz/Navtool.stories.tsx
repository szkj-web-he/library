/**
 * @file
 * @date 2022-12-19
 * @author
 * @lastModify 2022-12-19
 */
import { Meta, StoryObj } from "@storybook/react";
import { FC, useState } from "react";
import { NavTool, NavToolProps } from "../../Components/Zmz/NavTool";

export default {
    title: "Zmz/NavTool",
    component: NavTool,
} as Meta;

const Template1: FC<NavToolProps> = () => {
    // const wrap = useRef<HTMLDivElement>(null);
    const [root, setRoot] = useState<HTMLDivElement | null>(null);

    return (
        <div
            ref={(el) => {
                console.log(el);
                if (el) setRoot(el);
            }}
            style={{ height: "300px", overflow: "auto" }}
        >
            <div style={{ height: "3000px" }}>
                {root && <NavTool mode="fixed" target={root} limitHeight={100} />}
            </div>
        </div>
    );
};

type Story = StoryObj<typeof NavTool>;

export const Default: Story = {
    render: (args) => <Template1 {...args} />,
    args: {},
};
