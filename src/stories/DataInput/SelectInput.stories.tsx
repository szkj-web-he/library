/**
 * @file checkbox storybook
 * @date 2020-09-04
 * @author Andy
 * @lastModify Andy 2020-09-04
 */
import { FC, useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { SelectInput, SelectInputProps } from "../../Components/DataInput/SelectInput";

/**
 * checkbox component
 *
 */
export default {
    title: "DataInput/SelectInput",
    component: SelectInput,
} as Meta;

const Template: FC<SelectInputProps> = (args) => {
    const [value, setValue] = useState<(number | string)[]>([2]);

    return (
        <SelectInput
            {...args}
            defaultValue={value}
            handleChange={(res) => {
                setValue(res);
            }}
        />
    );
};

type Story = StoryObj<typeof SelectInput>;
/**
 * checkbox component
 *
 */
export const CheckboxSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        type: "check",
        list: [
            { id: 1, content: "1" },
            { id: 2, content: <div>1321312</div> },
            { id: 3, content: "3" },
        ],
    },
};
