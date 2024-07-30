/**
 * @file storybook of Preview component
 * @date 2020-10-13
 * @author Andy
 * @lastModify Andy 2020-10-13
 */
import { StoryObj, Meta } from "@storybook/react";
import { PreviewDisplay } from "../../Components/Preview/PreviewDisplay";

import { FoldingCard } from "../../Components/DataDisplay/FoldingCard";

/**
 * Preview component
 *
 */
export default {
    title: "Preview/PreviewDisplay",
    component: PreviewDisplay,
    //argTypes: {
    //    desktopSize: {
    //        defaultValue: { width: '1280px', height: '800px' },
    //    },
    //},
} as Meta;

type Story = StoryObj<typeof PreviewDisplay>;

/**
 * preview display component where displays a component
 *
 */
export const PreviewDisplayWithContent: Story = {
    args: {
        content: (
            <div>
                <FoldingCard id={"1"} title={"preview"} content={<div>asd</div>} />
            </div>
        ),
    },
};

/**
 * preview display component where displays a website
 *
 */
export const PreviewDisplayWithLink: Story = {
    args: {
        link: "http://www.datareachable.com",
    },
};
/**
 * preview display component where displays a error massage
 *
 */
export const PreviewDisplayWithError: Story = {
    args: {
        err: true,
        errMsg: "Please check your question configuration.",
    },
};
/**
 * preview display component with costume size
 *
 */
export const PreviewDisplayWithCostumeSize: Story = {
    args: {
        desktopSize: { width: "1900px", height: "700px" },
        padSize: { width: "1000px", height: "600px" },
        phoneSize: { width: "600px", height: "300px" },
    },
};
