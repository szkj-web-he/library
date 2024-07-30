/**
 * @file 侧边栏的说明
 * @date 2023-08-24
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-24
 */
import { Meta, StoryObj } from "@storybook/react";
import { FC } from "react";
import { renderToString } from "react-dom/server";
import { OIDCLogin } from "../..";
import { Sidebar, SidebarProps } from "../../Components/Grid/Sidebar";
import useJwt from "../../../.storybook/useJWT";

export default {
    title: "Grid/Sidebar",
    component: Sidebar,
    parameters: {
        docs: {
            description: {
                component: renderToString(
                    <>
                        <h5>
                            这个组件有全局的
                            <code>hooks</code>
                            可以使用
                        </h5>
                        <ol>
                            <li>
                                <code>useAssetsType</code> 获取选中的静态资源类型
                            </li>
                            <li>
                                <code>useOrgReducer</code> 获取请求到的组织列表信息
                            </li>
                            <li>
                                <code>usePreferredOrgReducer</code> 获取请求到的偏好组织信息
                            </li>
                            <li>
                                <code>useSelectedOrg</code> 获取选中的组织
                            </li>
                            <li>
                                <code>useSidebarDispatch</code> 用来分发行为
                                <ul>
                                    <li>
                                        <code>requestOrgList</code> 请求组织列表
                                    </li>
                                    <li>
                                        <code>requestPreferredOrg</code> 请求偏好组织
                                    </li>
                                    <li>
                                        <code>requestUpdatePreferredOrg</code> 请求修改偏好组织
                                    </li>
                                    <li>
                                        <code>setSelectedOrg</code> 修改选中的组织
                                    </li>
                                    <li>
                                        <code>setActiveAssetsType</code> 修改选中的侧边栏类型
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </>,
                ),
            },
        },
    },
} as Meta<SidebarProps>;

/**
 * 插件的侧边栏
 * @returns
 */
const PluginSidebar: FC = () => {
    const jwt = useJwt();
    if (!jwt) {
        return <>没有jwt</>;
    }
    return (
        <OIDCLogin projectType="plugins ide" development_jwt={jwt}>
            <Sidebar
                typeData={{
                    bind: 88,
                    star: 1,
                    publish: 3,
                    notBound: 4,
                    transfer: 6,
                    preview: 80,
                }}
            />
        </OIDCLogin>
    );
};

type Story = StoryObj<typeof Sidebar>;

/**
 * 插件侧边栏的样例展示
 * @returns
 */
export const PluginSidebarTemp: Story = {
    render: () => <PluginSidebar />,
    args: {},
};

/**
 * 项目管理的侧边栏
 * @returns
 */
const ProjectSidebar: FC = () => {
    const jwt = useJwt();
    if (!jwt) {
        return <>没有jwt</>;
    }
    return (
        <OIDCLogin projectType="project-manager" development_jwt={jwt}>
            <Sidebar
                typeData={{
                    all: 100,
                    star: 10,
                    publish: 80,
                    archived: 20,
                }}
            />
        </OIDCLogin>
    );
};

/**
 * 项目管理侧边栏的样例展示
 * @returns
 */
export const ProjectSidebarTemp: Story = {
    render: () => <ProjectSidebar />,
    args: {},
};

/**
 * 其它后台管理系统的侧边栏
 */
const ManagementSidebar: FC<SidebarProps> = ({ typeData }) => {
    const jwt = useJwt();
    if (!jwt) {
        return <>没有jwt</>;
    }
    return (
        <OIDCLogin projectType="survey-dist" development_jwt={jwt}>
            <Sidebar
                ide="supplier"
                typeData={
                    typeData ?? {
                        all: 100,
                        star: 10,
                        projectRelated: 80,
                    }
                }
            />
        </OIDCLogin>
    );
};

/**
 * 项目管理侧边栏的样例展示
 */
export const ManagementSidebarTemp: Story = {
    render: () => <ManagementSidebar />,
    args: {},
};

/**
 * 当数据正在请求时
 */
export const ManagementSidebarLoadingTemp: Story = {
    render: (args) => <ManagementSidebar {...args} />,
    args: {
        typeData: "loading",
    },
};
