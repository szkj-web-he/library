import { PartialByKeys } from "../../Unit/utils";
import i18next from "i18next";
import { LangConfigProps } from "../../Hooks/useLangConfig";
import { LinkItem } from "../../Components/Zmz/Footer";
import { getProjectLink } from "../Navigation/navigationBar";

export const defaultProductsSet = (): Array<LinkItem> => {
    const data = getProjectLink();

    return [
        {
            label: i18next.t("FooterComponent.Project Manager"),
            func: (): void => {
                ("");
            },
            link: data.projectManager.toString(),
            linkJump: true,
        },
        {
            label: i18next.t("FooterComponent.Questionnaire Editor"),
            func: (): void => {
                ("");
            },
            link: data.qEditorDashboard.toString(),
            linkJump: true,
        },
        {
            label: i18next.t("FooterComponent.Questionnaire Distribution"),
            func: (): void => {
                ("");
            },
            link: data.dist.toString(),
            linkJump: true,
        },
        {
            label: i18next.t("FooterComponent.Data Processing & Brief"),
            func: (): void => {
                ("");
            },
            link: data.dataProc.toString(),
            linkJump: true,
        },
        {
            label: i18next.t("FooterComponent.Plugin Editor"),
            func: (): void => {
                ("");
            },
            link: data.plugin.toString(),
            linkJump: true,
        },
    ];
};

export const defaultCompanySet = (): Array<LinkItem> => {
    const data = getProjectLink();

    return [
        {
            label: i18next.t("FooterComponent.Our Offering"),
            func: (): void => {
                ("");
            },
            link: `${data.home.toString()}#service`,
            linkJump: true,
        },
        {
            label: i18next.t("FooterComponent.Our Team"),
            func: (): void => {
                ("");
            },
            link: `${data.home.toString()}#teams`,
            linkJump: true,
        },
        {
            label: i18next.t("FooterComponent.Contact Us"),
            func: (): void => {
                ("");
            },
            link: `${data.home.toString()}#contacts`,
            linkJump: true,
        },
    ];
};

export const defaultResourcesSet = (isLogin = false): Array<LinkItem> => {
    const data = getProjectLink(undefined, isLogin);
    return [
        // {
        //     label: i18next.t("FooterComponent.Blog"),
        //     func: (): void => {
        //         ("");
        //     },
        //     link: "/",
        //     linkJump: false,
        // },
        {
            label: i18next.t("FooterComponent.Market"),
            func: (): void => {
                ("");
            },
            link: `${data.market.toString()}`,
            linkJump: true,
        },
        {
            label: i18next.t("FooterComponent.Community"),
            func: (): void => {
                ("");
            },
            link: `${data.community.toString()}`,
            linkJump: true,
        },
    ];
};

export const defaultRightLinkSet = (): Array<PartialByKeys<LinkItem, "link" | "linkJump">> => {
    const data = getProjectLink();
    return [
        {
            label: i18next.t("FooterComponent.Privacy Policy"),
            func: (): void => {
                window.location.href = `${data.home.toString()}policy`;
            },
        },
        {
            label: i18next.t("FooterComponent.Terms of Service"),
            func: (): void => {
                window.location.href = `${data.home.toString()}clause`;
            },
        },
        {
            label: i18next.t("FooterComponent.Data & Security"),
            func: (): void => {
                ("");
            },
        },
        {
            label: i18next.t("FooterComponent.Cookie Setting"),
            func: (): void => {
                ("");
            },
        },
    ];
};

export const langConfig: LangConfigProps = {
    CN: {
        Blog: "博客",
        Market: "市场",
        Community: "社区",
        Products: "产品",
        "Project Manager": "项目管理系统",
        "Questionnaire Editor": "表单编辑系统",
        "Questionnaire Distribution": "样本分发系统",
        "Data Processing & Brief": "表单数据处理系统",
        "Plugin Editor": "表单插件系统",
        "Privacy Policy": "隐私政策",
        "Terms of Service": "条款服务",
        "Data & Security": "数据与安全",
        "Cookie Setting": "客户端管理设置",
        Company: "公司",
        Resources: "资源",
        "Our Offering": "我们提供的服务",
        "Our Team": "我们的团队",
        "Contact Us": "联系我们",
        "All Rights Reserved": "版权所有",
        "© dataReachable. All Rights Reserved": "版权属于数支科技，并保留所有权利",
    },
    EN: {
        Blog: "Blog",
        Market: "Market",
        Community: "Community",
        Products: "Products",
        "Project Manager": "Project Manager",
        "Questionnaire Editor": "Questionnaire Editor",
        "Questionnaire Distribution": "Questionnaire Distribution",
        "Data Processing & Brief": "Data Processing & Brief",
        "Plugin Editor": "Plugin Editor",
        "Privacy Policy": "Privacy Policy",
        "Terms of Service": "Terms of Service",
        "Data & Security": "Data & Security",
        "Cookie Setting": "Cookie Setting",
        Company: "Company",
        Resources: "Resources",
        "Our Offering": "Our Offering",
        "Our Team": "Our Team",
        "Contact Us": "Contact Us",
        "All Rights Reserved": "All Rights Reserved",
        "© dataReachable. All Rights Reserved": "© dataReachable. All Rights Reserved",
    },
};
