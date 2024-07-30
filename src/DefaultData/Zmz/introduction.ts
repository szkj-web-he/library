import React from "react";
import bg_delivery_01 from "../../Assets/images/bg_delivery_01.png";
import bg_delivery_02 from "../../Assets/images/bg_delivery_02.png";
import bg_delivery_03 from "../../Assets/images/bg_delivery_03.png";
import bg_delivery_04 from "../../Assets/images/bg_delivery_04.png";
import bg_delivery_05 from "../../Assets/images/bg_delivery_05.png";
import bg_contract_01 from "../../Assets/images/bg_contract_01.png";
import bg_contract_02 from "../../Assets/images/bg_contract_02.png";
import bg_contract_03 from "../../Assets/images/bg_contract_03.png";
import bg_contract_04 from "../../Assets/images/bg_contract_04.png";
import bg_contract_05 from "../../Assets/images/bg_contract_05.png";
import bg_contract_06 from "../../Assets/images/bg_contract_06.png";
import bg_permission_01 from "../../Assets/images/bg_permission_01.png";
import bg_permission_02 from "../../Assets/images/bg_permission_02.png";
import bg_permission_03 from "../../Assets/images/bg_permission_03.png";
import bg_permission_04 from "../../Assets/images/bg_permission_04.png";
import bg_permission_05 from "../../Assets/images/bg_permission_05.png";
import bg_permission_06 from "../../Assets/images/bg_permission_06.png";
import bg_permission_07 from "../../Assets/images/bg_permission_07.png";

export interface BaseTemplate {
    title?: string;
    content?: string;
    src?: string;
    children?: React.ReactNode;
}

export type IntroductionListItem = BaseTemplate & { subtitle?: string };

export interface IntroductionTemplate extends BaseTemplate {
    linkBtn?: string | Array<string>;
    list: Array<IntroductionListItem> | Array<Array<IntroductionListItem>>;
}

export const deliveryTemplate: IntroductionTemplate = {
    title: "什么是交付物？",
    content: `当您创建数字化表单项目之后，便可以在该项目下新建表单编辑、表单分发、数据处理、编辑插件等数字化表单任务，这些任务即称为“交付物”。`,
    linkBtn: `了解4种类型交付物`,
    src: bg_delivery_01,
    list: [
        {
            title: "交付物的种类",
            subtitle: "01  表单编辑",
            content: "设计数字化表单内容、逻辑、外观",
            src: bg_delivery_02,
        },
        {
            title: "交付物的种类",
            subtitle: "02  表单分发",
            content: "分发设计完成的表单给被访者进行填写",
            src: bg_delivery_03,
        },
        {
            title: "交付物的种类",
            subtitle: "03  数据处理",
            content: "将表单样本数据进行处理与可视化展示",
            src: bg_delivery_04,
        },
        {
            title: "交付物的种类",
            subtitle: "04  插件",
            content: "编辑用于数字化表单各个环节中的插件",
            src: bg_delivery_05,
        },
    ],
};

export const contractTemplate: IntroductionTemplate = {
    title: "什么是合同？",
    content: `约定双方工作任务，并传递及管理交付物权限的协议称为合同`,
    linkBtn: `了解5种类型合同`,
    src: bg_contract_01,
    list: [
        {
            title: "合同的状态区分",
            subtitle: "01  草稿",
            content: "已创建合同，但是没有发送给乙方",
            src: bg_contract_02,
        },
        {
            title: "合同的状态区分",
            subtitle: "02  已发送",
            content: "已发送给乙方，乙方还未签署",
            src: bg_contract_03,
        },
        {
            title: "合同的状态区分",
            subtitle: "03  已签署",
            content: "乙方确认合同内容并签署合同",
            src: bg_contract_04,
        },
        {
            title: "合同的状态区分",
            subtitle: "04  已终止",
            content: "合同内工作任务无法正常完成，合同异常终止",
            src: bg_contract_05,
        },
        {
            title: "合同的状态区分",
            subtitle: "05  已完成",
            content: "合同内工作任务已完成，合同正常终止",
            src: bg_contract_06,
        },
    ],
};

export const permissionTemplate: IntroductionTemplate = {
    title: "什么是交付物权限？",
    content: `交付物权限是用户访问或编辑交付物的能力区分`,
    linkBtn: ["了解4种类型交付物权限", "了解2种权限分配方式"],
    src: bg_permission_01,
    list: [
        [
            {
                title: "交付物权限的分类",
                subtitle: "01  可分配任务",
                content: "负责分配交付物的工作任务、制定工作目标",
                src: bg_permission_02,
            },
            {
                title: "交付物权限的分类",
                subtitle: "02  可编辑",
                content: "负责完成交付物内的实际工作任务",
                src: bg_permission_03,
            },
            {
                title: "交付物权限的分类",
                subtitle: "03  可评论",
                content: "可查看或评论交付物内的工作情况",
                src: bg_permission_04,
            },
            {
                title: "交付物权限的分类",
                subtitle: "04  可阅读",
                content: "可查看交付物内的工作情况",
                src: bg_permission_05,
            },
        ],
        [
            {
                title: "权限分配方式",
                subtitle: "01  组织内授权",
                content: "将交付物的权限分配给本组织的部门",
                src: bg_permission_06,
            },
            {
                title: "权限分配方式",
                subtitle: "02  组织外授权",
                content:
                    "通过与其他组织签署的合同，传递交付物的权限，让其他组织拥有进行交付物工作的权力",
                src: bg_permission_07,
            },
        ],
    ],
};
