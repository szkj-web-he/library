/**
 * @file Check stories file
 * @date 2022-01-19
 * @author xuejie.he
 * @lastModify xuejie.he 2022-01-19
 */

import { Meta, StoryObj } from "@storybook/react";
import { Check } from "../../Components/Choose/Check";
export default {
    title: "Choose/Check",
    component: Check,
    // argTypes: {
    // value: {
    //     description: "value of this component",
    //     type: { name: "string", required: false },
    // },
    // disabled: {
    //     description: "disabled of this component",
    //     type: { name: "boolean", required: false },
    // },
    // onChange: {
    //     description: "onChange of this component",
    //     type: { name: "function", required: false },
    // },
    // defaultChecked: {
    //     description: "defaultChecked of this component",
    //     type: { name: "boolean", required: false },
    // },
    // checked: {
    //     description: "checked of this component",
    //     type: { name: "boolean", required: false },
    // },
    // className: {
    //     description: "className of this component",
    //     type: { name: "string", required: false },
    // },
    // style: {
    //     description: "style of this component",
    // },
    // tabIndex: {
    //     description: "tabIndex of this component",
    //     type: { name: "number", required: false },
    // },
    // id: {
    //     description: "id of this component",
    //     type: { name: "string", required: false },
    // },
    // title: {
    //     description: "title of this component",
    //     type: { name: "string", required: false },
    // },
    // onMouseOver: {
    //     description: "onMouseOver callback",
    //     type: { name: "function", required: false },
    // },
    // onMouseOut: {
    //     description: "onMouseOut callback",
    //     type: { name: "function", required: false },
    // },
    // onClick: {
    //     description: "onClick callback",
    //     type: { name: "function", required: false },
    // },
    // onMouseDown: {
    //     description: "onMouseDown callback",
    //     type: { name: "function", required: false },
    // },
    // onMouseUp: {
    //     description: "onMouseUp callback",
    //     type: { name: "function", required: false },
    // },
    // onFocus: {
    //     description: "onFocus callback",
    //     type: { name: "function", required: false },
    // },
    // onBlur: {
    //     description: "onBlur callback",
    //     type: { name: "function", required: false },
    // },
    // onMouseLeave: {
    //     description: "onMouseLeave callback",
    //     type: { name: "function", required: false },
    // },
    // onMouseEnter: {
    //     description: "onMouseEnter callback",
    //     type: { name: "function", required: false },
    // },
    // children: {
    //     description: "children of this component;By default children will be wrapped by div",
    //     // type: { name: "object", , required: false },
    // },
    // custom: {
    //     description: "custom will cancel being wrapped by div",
    //     type: { name: "boolean", required: false },
    // },
    // },
} as Meta;

type Story = StoryObj<typeof Check>;

/**
 * 默认样例
 */
export const DefaultSample: Story = {
    args: {},
};

/**
 * 禁用样例
 */
export const DisabledSample: Story = {
    args: { disabled: true, checked: true, children: <>123132312</> },
};

/**
 * 自定义设置的样例
 */
export const TextSample: Story = {
    args: { custom: true, children: <>123132312</> },
};

/**
 *  有边框的样例
 */
export const BoxSample: Story = {
    args: { type: "solid", children: "BOX" },
};
