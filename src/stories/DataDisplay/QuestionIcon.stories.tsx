/**
 * @fileQuestionIcon storybook
 * @date 2020-09-04
 * @author Andy
 * @lastModify Andy 2020-10-21
 */
import { StoryObj, Meta } from "@storybook/react";
import { QuestionIcon } from "../../Components/DataDisplay/QuestionIcon";

/**
 * QuestionIcon component
 *
 */
export default {
    title: "DataDisplay/QuestionIcon",
    component: QuestionIcon,
} as Meta;

type Story = StoryObj<typeof QuestionIcon>;
/**
 *QuestionIcon component
 *
 */
export const QuestionIconSample: Story = {
    args: {},
};
