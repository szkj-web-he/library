/**
 * @file 手机端日期选择器
 * @date 2021-12-14
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-14
 */
import { Meta, StoryObj } from "@storybook/react";
import {
    MobileDatePicker,
    MobileDatePickerProps,
} from "../../Components/Calendar/MobileDatePicker";
import { FC, useState } from "react";

export default {
    title: "Calendar/MobileDatePicker",
    component: MobileDatePicker,
} as Meta;

type Story = StoryObj<typeof MobileDatePicker>;

const Template: FC = (args: MobileDatePickerProps) => {
    const [value, setValue] = useState<Date>();

    return (
        <MobileDatePicker
            {...args}
            value={value}
            handleConfirmClick={(date) => {
                setValue(date);
            }}
            handleClearClick={() => {
                setValue(undefined);
            }}
        />
    );
};

/**
 * default DatePicker
 */
export const DefaultSample: Story = {
    render: (args) => <Template {...args} />,
    args: {},
};
