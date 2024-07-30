/**
 * @file
 * @date 2022-11-08
 * @author mingzhou.zhang
 * @lastModify  2022-11-08
 */
import { Meta, StoryObj } from "@storybook/react";
import { FC, Fragment, useState } from "react";
import { MobilePickerView, MobilePickerViewProps } from "../../Components/Zmz/MobilePickerView";
import { getLanguage } from "../../Unit/getPosition";

export default {
    title: "Zmz/MobilePickerView",
    component: MobilePickerView,
} as Meta;
const optionGroups = {
    name: ["张三", "李四", "王五"],
    age: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
    ],
};

const Template: FC<MobilePickerViewProps> = (args) => {
    const [value, setValue] = useState({
        name: "张三",
        age: "18",
    });
    const [name, setName] = useState("");
    getLanguage()
        .then((res) => res && setName(res))
        .catch((err) => console.log(err));
    return (
        <Fragment>
            <MobilePickerView
                {...args}
                optionGroups={optionGroups}
                valueGroups={value}
                onChange={(key, val) => {
                    console.log("change", key, val);
                    setValue({
                        ...value,
                        [key]: val,
                    });
                }}
            />
            <span>{name}</span>
        </Fragment>
    );
};
type Story = StoryObj<typeof MobilePickerView>;

export const Default: Story = {
    render: (args) => <Template {...args} />,
    args: {
        wheel: "normal",
    },
};
