/**
 * @file keywords stories
 * @date 2021-06-23
 * @author xuejie.he
 * @lastModify xuejie.he 2021-06-23
 */
import { FC, useState } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Keywords, KeywordsProps } from "../../Components/DataInput/Keywords";

/**
 * Alert component
 *
 */
export default {
    title: "DataInput/Keywords",
    component: Keywords,
} as Meta;

const Template: FC<KeywordsProps> = (args) => {
    const [keywords, setKeywords] = useState<string[]>();

    return (
        <div>
            <Keywords
                {...args}
                defaultKeywords={keywords}
                handleChangeKeywords={(res) => {
                    setKeywords(res);
                }}
            />
        </div>
    );
};

type Story = StoryObj<typeof Keywords>;

/**
 * keyword default Sample
 */
export const KeywordsDefaultSample: Story = {
    render: (args) => <Template {...args} />,
    args: {
        maxKeywords: 5,
    },
};
