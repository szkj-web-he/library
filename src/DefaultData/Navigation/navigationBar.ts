import { createElement, ReactNode } from "react";
import areaCode44 from "../../Assets/images/spr_contacts44.png";
import areaCode86 from "../../Assets/images/spr_contacts86.png";
import ProjectManager from "../../Components/Navigation/Nav/Unit/ProjectManager";
import QuestionnaireEditor from "../../Components/Navigation/Nav/Unit/QuestionnaireEditor";
import Distribution from "../../Components/Navigation/Nav/Unit/Distribution";
import AnalysisReport from "../../Components/Navigation/Nav/Unit/DataProcessing";
import PlugInEditor from "../../Components/Navigation/Nav/Unit/Plug-InEditor";
import i18next from "i18next";

export const list = [
    {
        sim: "en",
        content: "English",
        img: areaCode44,
    },
    {
        sim: "cn",
        content: "简体中文",
        img: areaCode86,
    },
];

export const langConfig = {
    CN: {
        Products: "产品",
        Market: "市场",
        Community: "社区",
        "About Us": "关于我们",
        "Sign up": "注册",
        "Log in": "登录",
        "Project Manager": "项目管理系统",
        "Questionnaire Editor": "表单编辑系统",
        Distribution: "样本分发系统",
        "Data Processing & Brief": "表单数据处理系统",
        "Plug-In Editor": "表单插件系统",
        "This is the project management centre, you can manage all your digital research projects here":
            "这是项目管理中心，您可以在这里管理您所有的数据研究项目。",
        "Start here if you want to create a research project from 0 to 1":
            "如果您想从0到1创建一个研究项目，请从这里开始。",
        Start: "开始",
        "You can create research projects, deciding what are the “deliverables” of this project":
            "您可以创建研究项目，决定这个项目的“可交付物”是什么。",
        "For example, “writing the content of questionnaires” or “recruiting respondents”":
            "例如，“设计表单收集数据”或“处理表单数据”。",
        "You can also assign the tasks in a research project to your supplier":
            "您也可以将研究项目中的任务分配给您的协作者。",
        "This is the questionnaire editing tool": "这是表单编辑工具。",
        "Start here if you want to create a questionnaire":
            "如果您想设计一份数据表单，请从这里开始。",
        "This is the agile questionnaire distributing tool": "这是表单分发工具",
        "Start here if you want to distribute a questionnaire":
            "如果您想将一份表单样本进行分发，请从这里开始。",
        "This is the analysis and report tool": "这是表单数据处理的工具。",
        "Start here if you want to create a visualised data report":
            "如果您想创建一个可视化的表单数据图表，请从这里开始。",
        "This is the questionnaire plugin developing tool": "这是表单插件开发工具。",
        "Start here if you want to create plugins":
            "如果您想为表单制作插件来实现定制功能，请从这里开始。",
        "By using this tool, you can create questionnaires that are fully customisable in content, logic and appearance":
            "通过使用这个工具，您可以在内容、逻辑和外观上编辑完全可定制的数字化表单，从而产出高度自定义的数据收集流程。",
        "By using this tool, you can distribute your questionnaires in an highly efficient way":
            "通过使用这个工具，您可以以一种高效的方式分发表单样本。",
        "By using this tool, you can analyse your data by creating graphs and diagrams":
            "您可以对收集到的数据进行清理和可视化，并以不同格式导出您的数据。",
        "By using this tool, you can develop your own plugin that can be used in questionnaire":
            "通过使用这个工具，您可以开发自己的插件，在表单编辑中使用。",
        "Good news is that you can also sell this plugins in the “plugin store” to make an extra money":
            "您也可以在“插件商店”出售这些插件来赚取额外的钱。",
        Language: "语言",
        Back: "返回",
        "Sign Up - For Free": "免费注册",
        DASHBOARD: "主面板",
        Profile: "个人中心",
        "User Information": "用户信息",
        "My Organizations": "我的组织",
        "Contract Management": "合同管理",
        "Log out": "退出",
        "Switch Organization": "切换组织",
        "I'm in": "我在:",
        "Expert panel": "专家委员会",
        Quotation: "报价",
    },
    EN: {
        Products: "Products",
        Market: "Market",
        Community: "Community",
        "About Us": "About Us",
        "Sign up": "Sign up",
        "Log in": "Log in",
        "Project Manager": "Project Manager",
        "Questionnaire Editor": "Questionnaire Editor",
        Distribution: "Distribution",
        "Data Processing & Brief": "Data Processing & Brief",
        "Plug-In Editor": "Plug-In Editor",
        "This is the project management centre, you can manage all your digital research projects here":
            "This is the project management centre, you can manage all your digital research projects here.",
        "Start here if you want to create a research project from 0 to 1":
            "Start here if you want to create a research project from 0 to 1.",
        Start: "Start",
        "You can create research projects, deciding what are the “deliverables” of this project":
            "You can create research projects, deciding what are the “deliverables” of this project.",
        "For example, “writing the content of questionnaires” or “recruiting respondents”":
            "  For example, “writing the content of questionnaires” or “recruiting respondents”.",
        "You can also assign the tasks in a research project to your supplier":
            "You can also assign the tasks in a research project to your supplier.",
        "This is the questionnaire editing tool": "This is the questionnaire editing tool.",
        "Start here if you want to create a questionnaire":
            "Start here if you want to create a questionnaire.",
        "This is the agile questionnaire distributing tool":
            "This is the agile questionnaire distributing tool.",
        "Start here if you want to distribute a questionnaire":
            "Start here if you want to distribute a questionnaire.",
        "This is the analysis and report tool": "This is the analysis and report tool.",
        "Start here if you want to create a visualised data report":
            "Start here if you want to create a visualised data report.",
        "This is the questionnaire plugin developing tool":
            "This is the questionnaire plugin developing tool.",
        "Start here if you want to create plugins": "Start here if you want to create plugins.",
        "By using this tool, you can create questionnaires that are fully customisable in content, logic and appearance":
            "By using this tool, you can create questionnaires that are fully customisable in content, logic and appearance.",
        "By using this tool, you can distribute your questionnaires in an highly efficient way":
            "By using this tool, you can distribute your questionnaires in an highly efficient way.",
        "By using this tool, you can analyse your data by creating graphs and diagrams":
            "By using this tool, you can analyse your data by creating graphs and diagrams.",
        "By using this tool, you can develop your own plugin that can be used in questionnaire":
            "By using this tool, you can develop your own plugin that can be used in questionnaire.",
        "Good news is that you can also sell this plugins in the “plugin store” to make an extra money":
            "Good news is that you can also sell this plugins in the “plugin store” to make an extra money.",
        Language: "Language",
        Back: "Back",
        "Sign Up - For Free": "Sign Up - For Free",
        DASHBOARD: "DASHBOARD",
        Profile: "Profile",
        "User Information": "User Information",
        "My Organizations": "My Organizations",
        "Contract Management": "Contract Management",
        "Log out": "Log Out",
        "Switch Organization": "Switch Organization",
        "I'm in": "I'm in:",
        "Expert panel": "Expert panel",
        Quotation: "Quotation",
    },
};

export interface LinkProps {
    /**
     * 官网
     */
    home?: string | (() => void);
    /**
     * 专家委员会
     */
    expertPanel?: string | (() => void);
    /**
     * 报价
     */
    quotation?: string | (() => void);

    /**
     * 登录
     */
    signUp?: string | (() => void);

    profile?: string | (() => void);
    dashboard?: string | (() => void);
    projectManager?: string | (() => void);
    qEditor?: string | (() => void);
    qEditorDashboard?: string | (() => void);
    dist?: string | (() => void);
    plugin?: string | (() => void);
    market?: string | (() => void);
    community?: string | (() => void);
    analysis?: string | (() => void);
    dataProc?: string | (() => void);
    dataCollect?: string | (() => void);

    userInfo?: string | (() => void);
    organization?: string | (() => void);
    contract?: string | (() => void);
}

export const getProjectLink = (custom?: LinkProps, isLogIn = true) => {
    let defaultLink: Required<LinkProps> = {
        home: "https://dev.datareachable.cn/",
        signUp: "https://dev-signup.datareachable.cn/v2/dev",

        profile: "https://dev-profile.datareachable.cn/v2/dev",
        dashboard: "https://dev-dashboard.datareachable.cn/v2/dev",
        projectManager: "https://dev-spm.datareachable.cn/v2/dev",
        qEditor: "https://dev-qeditor.datareachable.cn/v2/dev",
        qEditorDashboard: "https://dev-qdashboard.datareachable.cn/v2/dev",
        dist: "https://dev-dist.datareachable.cn/v2/dev",
        plugin: "https://dev-plugin-system.datareachable.cn/v2-dev",
        market: "https://dev-market.datareachable.cn/v2/dev",
        community: "https://dev-cmty.datareachable.cn/v2/dev",
        analysis: "", //停用的项目
        dataProc: "https://dev-data-proc.datareachable.cn/v2/dev",

        dataCollect: "https://dev-datacoll.datareachable.cn/v2/dev",
        userInfo: "https://dev-profile.datareachable.cn/v2/dev/profile/user",
        organization: "https://dev-profile.datareachable.cn/v2/dev/profile/organization",
        contract: "https://dev-profile.datareachable.cn/v2/dev/profile/contract",

        expertPanel: "https://dev.datareachable.cn/committeeOfExperts",
        quotation: "https://dev.datareachable.cn/quotation",
    };

    switch (process.env.NODE_ENV) {
        case "v1_dev":
            defaultLink = Object.assign(
                {},
                {
                    ...defaultLink,
                },
                {
                    signUp: "https://signup.dev.datareachable.net/v1/dev",
                    profile: "https://profile.dev.datareachable.net/v1/dev",
                    projectManager: "https://spm.dev.datareachable.net/v1/dev",
                    qEditor: "https://qeditor.dev.datareachable.net/v1/dev",
                    qEditorDashboard: "https://qdashboard.dev.datareachable.net/v1/dev",
                    dist: "https://dist.dev.datareachable.net/v1/dev",
                    analysis: "https://anlys.dev.datareachable.net/v1/dev",
                    market: "https://market.dev.datareachable.net/v1/dev",
                    dataCollect: "https://datacoll.dev.datareachable.net/v1/dev",
                    userInfo: "https://profile.dev.datareachable.net/v1/dev/profile/user/setting",
                    organization: "https://profile.dev.datareachable.net/v1/dev/profile",
                    contract: "https://profile.dev.datareachable.net/v1/dev/profile",
                    expertPanel: "https://dev.datareachable.cn/committeeOfExperts",
                    quotation: "https://dev.datareachable.cn/quotation",
                },
            );
            break;
        case "v2_dev":
            defaultLink = Object.assign(
                {},
                { ...defaultLink },
                {
                    home: "https://dev.datareachable.cn/",
                    signUp: "https://dev-signup.datareachable.cn/v2/dev",

                    profile: "https://dev-profile.datareachable.cn/v2/dev",
                    dashboard: "https://dev-dashboard.datareachable.cn/v2/dev",
                    projectManager: "https://dev-spm.datareachable.cn/v2/dev",
                    qEditor: "https://dev-qeditor.datareachable.cn/v2/dev",
                    qEditorDashboard: "https://dev-qdashboard.datareachable.cn/v2/dev",
                    dist: "https://dev-dist.datareachable.cn/v2/dev",
                    plugin: "https://dev-plugin-system.datareachable.cn/v2-dev",
                    market: "https://dev-market.datareachable.cn/v2/dev",
                    community: "https://dev-cmty.datareachable.cn/v2/dev",
                    analysis: "", //停用的项目
                    dataProc: "https://dev-data-proc.datareachable.cn/v2/dev",

                    dataCollect: "https://dev-datacoll.datareachable.cn/v2/dev",
                    userInfo: "https://dev-profile.datareachable.cn/v2/dev/profile/user",
                    organization:
                        "https://dev-profile.datareachable.cn/v2/dev/profile/organization",
                    contract: "https://dev-profile.datareachable.cn/v2/dev/profile/contract",
                    expertPanel: "https://dev.datareachable.cn/committeeOfExperts",
                    quotation: "https://dev.datareachable.cn/quotation",
                },
            );
            break;
        case "v1_test":
            defaultLink = Object.assign(
                {},
                { ...defaultLink },
                {
                    qEditor: "https://qeditor.dev.datareachable.net/v1/test",
                    qEditorDashboard: "https://qdashboard.dev.datareachable.net/v1/test",
                    analysis: "https://anlys.dev.datareachable.net/v1/test",
                    market: "https://market.dev.datareachable.net/v1/test",
                    dataCollect: "https://datacoll.dev.datareachable.net/v1/test",
                    home: "https://test.datareachable.cn/",
                    expertPanel: "https://test.datareachable.cn/committeeOfExperts",
                    quotation: "https://test.datareachable.cn/quotation",
                },
            );
            break;
        case "production":
            defaultLink = Object.assign(
                {},
                { ...defaultLink },
                {
                    home: "https://www.datareachable.cn/",
                    signUp: "https://signup.datareachable.cn/v2/stable",

                    profile: "https://profile.datareachable.cn/v2/stable",
                    dashboard: "https://dashboard.datareachable.cn/v2/stable",
                    projectManager: "https://spm.datareachable.cn/v2/stable",
                    qEditor: "https://qeditor.datareachable.cn/v2/stable",
                    qEditorDashboard: "https://qdashboard.datareachable.cn/v2/stable",
                    dist: "https://dist.datareachable.cn/v2/stable",
                    plugin: "https://plugin-system.datareachable.cn/v2-stable",
                    market: "https://market.datareachable.cn/v2/stable",
                    community: "https://cmty.datareachable.cn/v2/stable",
                    analysis: "", //停用的项目
                    dataProc: "https://data-proc.datareachable.cn/v2/stable",

                    dataCollect: "https://datacoll.datareachable.cn/v2/stable",
                    userInfo: "https://profile.datareachable.cn/v2/stable/profile/user",
                    organization: "https://profile.datareachable.cn/v2/stable/profile/organization",
                    contract: "https://profile.datareachable.cn/v2/stable/profile/contract",
                    expertPanel: "https://www.datareachable.cn/committeeOfExperts",
                    quotation: "https://www.datareachable.cn/quotation",
                },
            );
            break;
        case "v2_test":
            defaultLink = Object.assign(
                {},
                { ...defaultLink },
                {
                    home: "https://test.datareachable.cn/",
                    signUp: "https://dev-signup.datareachable.cn/v2/test",

                    profile: "https://dev-profile.datareachable.cn/v2/test",
                    dashboard: "https://dev-dashboard.datareachable.cn/v2/test",
                    projectManager: "https://dev-spm.datareachable.cn/v2/test",
                    qEditor: "https://dev-qeditor.datareachable.cn/v2/test",
                    qEditorDashboard: "https://dev-qdashboard.datareachable.cn/v2/test",
                    dist: "https://dev-dist.datareachable.cn/v2/test",
                    plugin: "https://dev-plugin-system.datareachable.cn/v2-test",
                    market: "https://dev-market.datareachable.cn/v2/test",
                    community: "https://dev-cmty.datareachable.cn/v2/test",
                    analysis: "", //停用的项目
                    dataProc: "https://dev-data-proc.datareachable.cn/v2/test",

                    dataCollect: "https://dev-datacoll.datareachable.cn/v2/test",
                    userInfo: "https://dev-profile.datareachable.cn/v2/test/profile/user",
                    organization:
                        "https://dev-profile.datareachable.cn/v2/test/profile/organization",
                    contract: "https://dev-profile.datareachable.cn/v2/test/profile/contract",
                    expertPanel: "https://test.datareachable.cn/committeeOfExperts",
                    quotation: "https://test.datareachable.cn/quotation",
                },
            );
            break;
        default:
            break;
    }

    if (isLogIn === false) {
        defaultLink.market = `${defaultLink.market as string}/tourist`;
        defaultLink.community = `${defaultLink.community as string}/tourist`;
    }

    if (custom) {
        return {
            ...defaultLink,
            ...custom,
        };
    }
    return defaultLink;
};

export interface NavProps {
    /**
     * 导航名称
     */
    label: string;
    /**
     * 是否活跃的
     * 默认是读取oidc的项目名称进行配对
     */
    active?: boolean;
    /**
     * 导航链接
     */
    href?: string | (() => void);
    /**
     * 子 导航内容
     */
    children?: {
        label: string;
        href?: string | (() => void);
        content: ReactNode;
    }[];
}

export const nav = (PROJECTS: ReturnType<typeof getProjectLink>): NavProps[] => {
    return [
        {
            label: i18next.t("NavComponent.Products"),
            children: [
                {
                    label: i18next.t("NavComponent.Project Manager"),
                    content: createElement(ProjectManager),
                },
                {
                    label: i18next.t("NavComponent.Questionnaire Editor"),
                    content: createElement(QuestionnaireEditor),
                },
                {
                    label: i18next.t("NavComponent.Distribution"),
                    content: createElement(Distribution),
                },
                {
                    label: i18next.t("NavComponent.Data Processing & Brief"),
                    content: createElement(AnalysisReport),
                },
                {
                    label: i18next.t("NavComponent.Plug-In Editor"),
                    content: createElement(PlugInEditor),
                },
            ],
        },
        {
            label: i18next.t("NavComponent.Market"),
            href: PROJECTS.market,
        },
        {
            label: i18next.t("NavComponent.Community"),
            href: PROJECTS.community,
        },
        { label: i18next.t("NavComponent.Expert panel"), href: PROJECTS.expertPanel },
        { label: i18next.t("NavComponent.Quotation"), href: PROJECTS.quotation },
    ];
};

export interface MenuProps {
    label: string;
    href?: string | (() => void);
    children?: {
        label: string;
        href?: string | (() => void);
    }[];
}

export const menus = (PROJECTS: ReturnType<typeof getProjectLink>): MenuProps[] => {
    return [
        {
            label: i18next.t("NavComponent.Profile"),
            children: [
                {
                    label: i18next.t("NavComponent.User Information"),
                    href: PROJECTS.userInfo,
                },
                {
                    label: i18next.t("NavComponent.My Organizations"),
                    href: PROJECTS.organization,
                },
                {
                    label: i18next.t("NavComponent.Contract Management"),
                    href: PROJECTS.contract,
                },
            ],
        },
    ];
};
