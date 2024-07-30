/**
 * @file FixedSizeText stories file
 * @date 2021-09-27
 * @author xuejie.he
 * @lastModify xuejie.he 2021-09-27
 */

import React, { FC, useEffect, useState } from "react";

import { Meta, StoryObj } from "@storybook/react";
import { FixedSizeText, FixedSizeTextProps } from "../../Components/DataDisplay/FixedSizeText";

export default {
    title: "DataDisplay/FixedSizeText",
    component: FixedSizeText,
} as Meta;

const Template: FC<FixedSizeTextProps> = ({ style, ...args }) => {
    const [styles, setStyles] = useState<React.CSSProperties>({ width: "20rem", height: "5rem" });
    useEffect(() => {
        const timer = window.setTimeout(() => {
            setStyles({
                width: "20rem",
                height: "5rem",
            });
        }, 500);
        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    return (
        <FixedSizeText {...args} style={{ ...style, width: styles.width, height: styles.height }} />
    );
};

type Story = StoryObj<typeof FixedSizeText>;

export const Temp: Story = {
    render: (args) => <Template {...args} />,
    args: {
        content: (
            <>
                <span>11</span>
                <span>12</span>
                <span>13</span>
                <span>14</span>
                <span>15</span>
                <span>16</span>
                <span>17</span>
                <span>18</span>
                <span>19</span>
                <span>20</span>
                <span>21</span>
                <span>22</span>
                <span>23</span>
                <span>abc</span>
                <span>def</span>
                <span>ghi</span>
                <span>jkl</span>
                <span>mno</span>
                <span>pqr</span>
                <span>stu</span>
                <span>vwx</span>
                <span>yz</span>
                <div>块文本1</div>
                <div>块文本2</div>
                <div>块文本3</div>
            </>
        ),
        style: {
            maxWidth: "50%",
            width: "50%",
            height: "5rem",
        },
        before: <span>a</span>,
        after: (
            <>
                <span>aa</span>
                <span>a</span>
            </>
        ),
        nodeOnOverflow: (
            <>
                ...<span>213213</span>
            </>
        ),
    },
};

export const LongText: Story = {
    render: (args) => <Template {...args} />,
    args: {
        content:
            "DataReachable is the first technology company in the world to develop digital survey standards and to become the new fulcrum of enterprise digital transformation. The one-stop market research cloud platform developed by several Internet technology companies will solve many pain points existing in the network market research industry a survey standards.",
        style: {
            fontSize: "1.4rem",
            font: '400 1.4rem -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica", "Arial", "Calibri", "Segoe UI", "Ping Fang SC", "Microsoft Yahei"',
            color: "#828282",
            lineHeight: "2.4rem",
            width: "40.6rem",
            height: "15rem",
        },
    },
};
