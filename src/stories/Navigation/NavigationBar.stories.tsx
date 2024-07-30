/**
 * @file
 * @date 2022-04-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-04-11
 */
import { StoryObj, Meta } from "@storybook/react";
import { OIDCLogin } from "../..";
import { NavigationBar, NavigationBarProps } from "../../Components/Navigation/NavigationBar";
import { ProjectContext } from "../../Components/OIDCLogin/Unit/projectContext";
import { FC } from "react";

/**
 * steps component
 *
 */
export default {
    title: "Navigation/NavigationBar",
    component: NavigationBar,
} as Meta;

const Template: FC<NavigationBarProps> = (args) => {
    return (
        <OIDCLogin projectType="website">
            <NavigationBar {...args} />
        </OIDCLogin>
    );
};

type Story = StoryObj<typeof NavigationBar>;

export const DefaultArgs: Story = {
    render: (args) => <Template {...args} />,
    args: {
        navLink: {
            home: () => {
                console.log("home");
                return `${window.location.href}#home`;
            },
            signUp: () => {
                console.log("signUp");
                return `${window.location.href}#signUp`;
            },
            profile: () => {
                console.log("profile");
                return `${window.location.href}#profile`;
            },
            dashboard: () => {
                console.log("dashboard");
                return `${window.location.href}#dashboard`;
            },
            projectManager: () => {
                console.log("projectManager");
                return `${window.location.href}#projectManager`;
            },
            qEditor: () => {
                console.log("qEditor");
                return `${window.location.href}#qEditor`;
            },
            qEditorDashboard: () => {
                console.log("qEditorDashboard");
                return `${window.location.href}#qEditorDashboard`;
            },
            dist: () => {
                console.log("dist");
                return `${window.location.href}#dist`;
            },
            plugin: () => {
                console.log("plugin");
                return `${window.location.href}#plugin`;
            },
            market: () => {
                console.log("market");
                return `${window.location.href}#market`;
            },
            community: () => {
                console.log("community");
                return `${window.location.href}#community`;
            },
            analysis: () => {
                console.log("analysis");
                return `${window.location.href}#analysis`;
            },
            dataCollect: () => {
                console.log("dataCollect");
                return `${window.location.href}#dataCollect`;
            },

            userInfo: () => {
                console.log("userInfo");
                return `${window.location.href}#userInfo`;
            },
            organization: () => {
                console.log("organization");
                return `${window.location.href}#organization`;
            },
            contract: () => {
                console.log("contract");
                return `${window.location.href}#contract`;
            },
        },
    },
};

const Template1: FC<NavigationBarProps> = (args) => {
    return (
        <ProjectContext.Provider value={"marketplace"}>
            <NavigationBar {...args} />
        </ProjectContext.Provider>
    );
};
/**
 * 选中了market
 */
export const MarketArgs: Story = {
    render: (args) => <Template1 {...args} />,
    args: {},
};

/**
 * 有了用户信息
 */
export const UserArgs: Story = {
    render: (args) => <Template1 {...args} />,
    args: {
        userData: {
            link: "https://dr-avatars-user-dev.s3-ap-southeast-2.amazonaws.com/7MqaFXYhHticALNQiUmm9/blob",
            name: "zb123456",
            email: "bin.zhou@datareachable.com",
            status: true,
        },
        orgList: [
            { name: "Monica Li", role: "Owner", id: "a" },
            { name: "dataReachable Pty Ltd", role: "Owner", id: "b" },
            { name: "Fiverr xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", role: "Admin", id: "c" },
            {
                name: "HBO Max xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                role: "Reviewer",
                id: "d",
            },
        ],
        handleOrgChange: (res) => {
            console.log("我改变成了", res?.name);
        },
    },
};

const Template2: FC<NavigationBarProps> = (args) => {
    return (
        <ProjectContext.Provider value={"profile"}>
            <NavigationBar {...args} />
        </ProjectContext.Provider>
    );
};
/**
 * 后台管理类
 */
export const ManagementArgs: Story = {
    render: (args) => <Template2 {...args} />,
    args: {
        userData: {
            link: "https://dr-avatars-user-dev.s3-ap-southeast-2.amazonaws.com/7MqaFXYhHticALNQiUmm9/blob",
            name: "zb123456",
            email: "bin.zhou@datareachable.com",
            status: true,
        },
    },
};
