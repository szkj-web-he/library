/**
 * @file switch stories
 * @date 2021-06-09
 * @author xuejie.he
 * @lastModify xuejie.he 2021-06-09
 */
import { FC, useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Switch, SwitchProps } from "../../Components/DataInput/Switch";

export default {
    title: "DataInput/Switch",
    component: Switch,
} as Meta;

const Template: FC<SwitchProps> = (args) => {
    const [status, setStatus] = useState(false);

    return <Switch {...args} defaultValue={status} handleChange={setStatus} />;
};

type Story = StoryObj<typeof Switch>;
/**
 * Switch
 */
export const SwitchArgs: Story = {
    render: (args) => <Template {...args} />,
    args: {
        children: <>TEST</>,
    },
};
