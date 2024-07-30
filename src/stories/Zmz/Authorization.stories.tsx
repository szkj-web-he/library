/**
 * @file
 * @date 2022-05-27
 * @author
 * @lastModify 2022-05-27
 */
import { StoryObj, Meta } from "@storybook/react";
import { FC, useState } from "react";
import { Authorization, AuthorizationProps } from "../../Components/Zmz/Authorization";

export default {
    title: "Zmz/Authorization",
    component: Authorization,
} as Meta;

const list = [
    { id: 0, avatar: "", name: "Lawrence", email: "lawrence.liu@ekas.com", isAdmin: true },
    { id: 0, avatar: "", name: "Lawrence", email: "lawrence.liu@ekas.com", isAdmin: true },
    { id: 0, avatar: "", name: "Lawrence", email: "lawrence.liu@ekas.com", isAdmin: true },
    { id: 0, avatar: "", name: "Lawrence", email: "lawrence.liu@ekas.com", isAdmin: true },
    { id: 0, avatar: "", name: "Lawrence", email: "lawrence.liu@ekas.com", isAdmin: true },
    { id: 0, avatar: "", name: "Lawrence", email: "lawrence.liu@ekas.com", isAdmin: true },
    { id: 0, avatar: "", name: "Lawrence", email: "lawrence.liu@ekas.com", isAdmin: true },
    { id: 0, avatar: "", name: "Lawrence", email: "lawrence.liu@ekas.com", isAdmin: true },
];

type Story = StoryObj<typeof Authorization>;

const Template: FC<AuthorizationProps> = (args) => {
    const [loading, setLoading] = useState(false);
    const [soruce, setSoruce] = useState(list);
    return (
        <div
            style={{
                position: "relative",
                width: 300,
                height: 300,
                border: "1px solid black",
            }}
        >
            <Authorization
                isLoading={loading}
                source={soruce}
                {...args}
                onConfirm={(_, scaleRef) => {
                    scaleRef.zoomIn();
                }}
                onCancel={(scaleRef) => {
                    scaleRef.zoomIn();
                }}
                onLoadMore={() => {
                    setLoading(true);
                    setTimeout(() => {
                        const temp = [...soruce];
                        temp.push({
                            id: 0,
                            avatar: "",
                            name: "zzzz",
                            email: "zzzzz.liu@ekas.com",
                            isAdmin: true,
                        });
                        setSoruce([...temp]);
                        setLoading(false);
                    }, 2000);
                }}
            ></Authorization>
        </div>
    );
};

export const DefaultSample: Story = {
    render: (args) => <Template {...args} />,
};
