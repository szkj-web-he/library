/**
 * @file counter stories
 * @date 2021-07-19
 * @author xuejie.he
 * @lastModify xuejie.he 2021-07-19
 */
import { FC, useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Counter, CounterProps } from "../../Components/DataInput/Counter";
import { Icon } from "../../Components/Icon";
import { useEffect } from "react";

/**
 * counter component
 *
 */
export default {
    title: "DataInput/Counter",
    component: Counter,
} as Meta;

const Template: FC<CounterProps> = ({ defaultValue, ...args }) => {
    const [value, setValue] = useState(-1);

    useEffect(() => {
        setValue(defaultValue ?? -1);
    }, [defaultValue]);

    return (
        <Counter
            {...Object.assign({}, args, {
                defaultValue: value,
                handleValueOnChange: (val: number) => {
                    setValue(val);
                },
            })}
        />
    );
};

type Story = StoryObj<typeof Counter>;
/**
 * counter component
 *
 */
export const CounterSample: Story = {
    render: (args) => <Template {...args} />,
    args: {},
};

/**
 * custom node
 */
export const CustomCounter: Story = {
    render: (args) => <Template {...args} />,
    args: {
        customBeforeIcon: <Icon type="Magnify" />,
        customAfterIcon: <Icon type="minification" />,
    },
};
