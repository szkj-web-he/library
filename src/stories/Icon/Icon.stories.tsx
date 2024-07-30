/**
 * @file Icon stories
 * @date 2022-07-27
 * @author xuejie.he
 * @lastModify xuejie.he 2022-07-27
 */
import { Meta, StoryObj } from "@storybook/react";
import { FC } from "react";
import { notice } from "../..";
import { Icon, IconProps } from "../../Components/Icon";
import iconType from "../../Components/Icon/Unit/customFontIcon";
import { copyCommand } from "../../Components/TextEdit/Unit/copy";

export default {
    title: "Icon/Icon",
    component: Icon,
    parameters: {
        docs: {
            source: {
                type: "code",
            },
        },
    },
} as Meta;

const Template: FC<IconProps> = (args) => {
    const list = () => {
        const arr = [];
        for (const key in iconType) {
            arr.push(
                <div
                    key={key}
                    style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexFlow: "column nowrap",
                        width: "100px",
                        height: "100px",
                    }}
                    onClick={() => {
                        const fn = () => {
                            notice.success({
                                title: "Success!",
                                description: (
                                    <>
                                        Copy
                                        <Icon type={key as keyof typeof iconType} />
                                        success!
                                    </>
                                ),
                                duration: 2000,
                            });
                        };
                        void copyCommand(`<Icon type="${key}" />`).then(fn);
                    }}
                >
                    <Icon
                        style={args.type === key ? { color: "blue" } : { color: "#666" }}
                        {...Object.assign(
                            {},
                            { ...args },
                            { type: key },
                            key === "subtract" ? { fontSize: "0.3rem" } : {},
                            key === "moreHorizontal" ? { fontSize: "1rem" } : {},
                        )}
                    />
                    <div
                        style={{
                            width: "calc(100% - 20px)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            textAlign: "center",
                        }}
                    >
                        {key}
                    </div>
                </div>,
            );
        }
        return arr;
    };

    return (
        <>
            <div
                style={{
                    textAlign: "center",
                }}
            >
                Click Copy Icon
            </div>

            {list()}
        </>
    );
};

type Story = StoryObj<typeof Icon>;

/**
 * Default Icon
 */
export const DefaultEditor: Story = {
    render: (args) => <Template {...args} />,
    args: {
        fontSize: "3rem",
    },
};
