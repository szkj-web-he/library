import { createElement } from "react";
export const cascadeSet = [
    {
        id: "1",
        content: "Help",
        func: (): void => {
            ("");
        },
        link: "/",
        linkJump: true,
        open: false,
        children: [],
    },
    {
        id: "2",
        content: "/",
        func: (): void => {
            ("");
        },
        link: "/",
        linkJump: true,
        children: [],
        open: false,
    },
    {
        id: "3",
        content: createElement("div", null, "this is reactElement"),
        func: (): void => {
            ("");
        },
        link: "/",
        linkJump: true,
        open: false,
        children: [
            {
                id: "3-1",
                content: "Help",
                func: (): void => {
                    ("");
                },
                link: "/",
                linkJump: true,
                children: [
                    {
                        id: "3-1-1",
                        content: "Help2_2",
                        func: (): void => {
                            ("");
                        },
                        link: "/",
                        linkJump: true,
                        children: [],
                        open: false,
                    },
                ],
                open: false,
            },
            {
                id: "3-2",
                content: "Help2",
                func: (): void => {
                    ("");
                },
                link: "/",
                linkJump: true,
                open: false,
                children: [
                    {
                        id: "3-2-1",
                        content: "Help2_2",
                        func: (): void => {
                            ("");
                        },
                        link: "/",
                        linkJump: true,
                        children: [],
                        open: false,
                    },
                ],
            },
            {
                id: "3-3",
                content: "/",
                func: (): void => {
                    ("");
                },
                link: "/",
                linkJump: true,
                children: [],
                open: false,
            },
            {
                id: "3-4",
                content: "Help3",
                func: (): void => {
                    ("");
                },
                link: "/",
                linkJump: true,
                children: [],
                open: false,
            },
        ],
    },
    {
        id: "4",
        content: "demo",
        func: (): void => {
            ("");
        },
        link: "/",
        linkJump: true,
        children: [
            {
                id: "4-1",
                content: "no bug",
                func: (): void => {
                    ("");
                },
                link: "/",
                linkJump: true,
                children: [],
                open: false,
            },
        ],
        open: false,
    },
];
