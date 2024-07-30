/**
 * @file MobileInput storybook
 * @date 2022-07-27
 * @author xuejie.he
 * @lastModify Andy 2022-07-27
 */
import { StoryObj, Meta } from "@storybook/react";
import { FC, useState } from "react";
import { MobileInput, MobileInputProps } from "../../Components/DataInput/MobileInput";
/**
 * MobileInput component
 *
 */
export default {
    title: "DataInput/MobileInput",
    component: MobileInput,
} as Meta;

const Template: FC<MobileInputProps> = (args) => {
    const [value, setValue] = useState("");
    const [areaCode, setAreaCode] = useState("china");

    return (
        <MobileInput
            {...args}
            selectedAreaCodeKey={areaCode}
            value={value}
            // defaultValue={"345"}
            handleInput={(res) => {
                setValue(res);
            }}
            handleAreaCodeChange={(_, area) => {
                setAreaCode(area);
            }}
        />
    );
};

type Story = StoryObj<typeof MobileInput>;

/**
 * MobileInput component
 *
 */
export const MobileInputSample: Story = {
    render: (args) => <Template {...args} />,
};
