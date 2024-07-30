/**
 * @file datePicker
 * @date 2021-12-14
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-14
 */
import { Meta, StoryObj } from "@storybook/react";
import { CalendarInput } from "../../Components/Calendar/CalendarInput";
import { DatePicker } from "../../Components/Calendar/DatePicker";

export default {
    title: "Calendar/DatePicker",
    component: DatePicker,
} as Meta;

type Story = StoryObj<typeof DatePicker>;

/**
 * default DatePicker
 */
export const DefaultSample: Story = {
    args: {
        // defaultValue: new Date(),
        value: "2022-01-14T08:00:00.000Z",
        type: "dateTime",
        handleTimeChange: (e) => {
            console.log(e);
        },
        children: <CalendarInput valueFormat="yyyy-MM-dd hh:mm:ss" style={{ width: "200px" }} />,
        maxTime: new Date(),
    },
};

/**
 * date of type
 */
export const DateOfDatePicker: Story = {
    args: {
        // value: new Date(),
        type: "date",
        triangle: {
            width: "20px",
            height: "10px",
        },
    },
};

/**
 * custom child
 */
export const CustomChild: Story = {
    args: {
        type: "date",

        children: (
            <CalendarInput>
                <input type="text" defaultValue={121231} />
            </CalendarInput>
        ),
    },
};

export const ShowTime: Story = {
    args: {
        // value: new Date(),
        type: "date",
        triangle: {
            width: "20px",
            height: "10px",
        },
        children: (
            <CalendarInput
                placeholder="Start Time"
                valueFormat="yyyy-MM-dd hh:mm:ss"
                style={{ width: "200px" }}
            />
        ),
        showTime: true,
        onTimeConfirm: (date, str) => {
            console.log(date, str);
        },
    },
};
