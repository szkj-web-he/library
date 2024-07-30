/**
 * @file FoldingCard storybook
 * @date 2020-09-07
 * @author Andy
 * @lastModify Andy 2020-09-07
 */
import { Meta, StoryObj } from "@storybook/react";
import { FoldingCard } from "../../Components/DataDisplay/FoldingCard";
import SingleDropdownList from "../../Components/DropdownList/SingleDropdown";

/**
 * FoldingCard component
 *
 */
export default {
    title: "DataDisplay/FoldingCard",
    component: FoldingCard,
} as Meta;

type Story = StoryObj<typeof FoldingCard>;

/**
 * FoldingCard component
 *
 */
export const FoldingCardSample: Story = {
    args: {
        title: "example title",
        elementTitle: <div>better than title</div>,
        id: "1",
        content: (
            <div>
                <div>123123</div>
                <div>123123</div>
                <div>123123</div>
                <div>123123</div>
                <div>123123</div>
                <div>123123</div>
                <div>123123</div>
                <div>123123</div>
                <div>123123</div>
                <div>123123</div>
                <div>
                    <SingleDropdownList btn={<SingleDropdownList.BorderBtn />} lineHeight="3.2rem">
                        <SingleDropdownList.Item uuid={1}>1</SingleDropdownList.Item>
                        <SingleDropdownList.Item uuid={2}>2</SingleDropdownList.Item>
                        <SingleDropdownList.Item uuid={3}>3</SingleDropdownList.Item>
                        <SingleDropdownList.Item uuid={4}>4</SingleDropdownList.Item>
                    </SingleDropdownList>
                </div>
            </div>
        ),
    },
};
