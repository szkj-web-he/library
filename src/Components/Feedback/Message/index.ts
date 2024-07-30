/**
 * @file Message components
 * @date 2021-06-03
 * @author xuejie.he
 * @lastModify xuejie.he 2021-06-03
 */
import React, { createElement } from "react";
import { createHash } from "../../..";
import styles from "./style.module.scss";
import { TopMessage } from "./Unit/TopMessage";
import { RightMessage } from "./Unit/RightMessage";
import { createRoot } from "react-dom/client";
import { BottomMessage } from "./Unit/BottomMessage";
import i18next from "i18next";
import { langConfig } from "../../../DefaultData/Feedback/message";

export type TypeProps = "success" | "info" | "warning" | "error" | "none";

let order = 100;

export const messageContextData: {
    top?: {
        content: React.ReactNode;
        type: TypeProps;
        mount: HTMLElement;
        key: string;
    };
    bottom?: {
        content: React.ReactNode;
        mount: HTMLElement;
        key: string;
    };
    right?: {
        content: React.ReactNode;
        type: TypeProps;
        mount: HTMLElement;
        key: string;
    };
} = {};

export interface BottomMessageProps {
    /**
     * Notification content
     */
    content?: React.ReactNode;
    /**
     * Time(seconds) before auto-dismiss
     */
    duration?: number;
    /**
     * callback of close
     */
    onClose?: () => void;
    /**
     * Where message is mounted
     */
    mount?: HTMLElement;
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * callback of onClick
     */
    onClick?: () => void;

    /**
     * whether is always exist
     *
     * if persist value is true, duration is not work
     */
    persist?: boolean;
    /**
     * when click close button trigger
     */
    onTriggerClose?: () => void;
    /**
     * bind setVisible function
     */
    bindSetVisibleStatus?: (handleEvent: (status: boolean) => void) => void;
}

export interface TopMessageProps extends BottomMessageProps {
    /**
     * icon of this component
     */
    icon?: React.ReactNode;
    /**
     * Notification type
     */
    type?: TypeProps;
}

export interface RightMessageProps extends BottomMessageProps {
    /**
     * icon of this component
     */
    icon?: React.ReactNode;
    /**
     * Notification type
     */
    type?: TypeProps;
    /**
     * Customize the close icon
     */
    closeIcon?: React.ReactNode;
    /**
     * Custom Title
     */
    title?: React.ReactNode;
}

const createMountEl = (position: "top" | "right" | "bottom", mount?: HTMLElement): HTMLElement => {
    const cnLangData = i18next.getResource("cn", "translation", "MessageComponent");
    if (!cnLangData) {
        i18next.addResourceBundle(
            "cn",
            "translation",
            { MessageComponent: langConfig.CN },
            true,
            true,
        );
    }
    const enLangData = i18next.getResource("en", "translation", "MessageComponent");
    if (!enLangData) {
        i18next.addResourceBundle(
            "en",
            "translation",
            { MessageComponent: langConfig.EN },
            true,
            true,
        );
    }

    if (mount) {
        return mount;
    }

    let node = document.querySelector(`body > [class*=pop_wrap__${position}]`) as HTMLElement;

    if (!node) {
        node = document.createElement("div");
        node.setAttribute("class", styles[`pop_wrap__${position}`]);
        document.body.appendChild(node);
    }
    return node;
};

const createDiv = (mount: HTMLElement) => {
    return new Promise<HTMLDivElement>((resolve) => {
        window.requestAnimationFrame(() => {
            const div = document.createElement("div");
            div.setAttribute("class", styles[`pop_container`]);
            mount.appendChild(div);
            window.requestAnimationFrame(() => {
                resolve(div);
            });
        });
    });
};

/**
 * Create a message that appears below the visible window
 * @param {BottomMessageProps}
 * @returns void
 */
async function bottom({
    content,
    duration,
    onClose,
    mount,
    className,
    style,
    onClick,
    bindSetVisibleStatus,
}: Omit<BottomMessageProps, "persist" | "onTriggerClose">) {
    const mountEl = createMountEl("bottom", mount);

    const div = await createDiv(mountEl);

    const root = createRoot(div);

    div.style.order = `${order}`;
    --order;
    const key = createHash("bottomMessage");

    messageContextData.bottom = {
        content,
        mount: mountEl,
        key,
    };

    const reactEl = createElement(BottomMessage, {
        className,
        style,
        content,
        duration: duration ?? 3000,
        onClose: (res) => {
            if (res === messageContextData.bottom?.key) {
                messageContextData.bottom = undefined;
            }
            root.unmount();
            div.remove();

            onClose?.();
        },
        onClick,
        hashId: key,
        bindSetVisibleStatus,
    });

    root.render(reactEl);
}

/**
 * Create a message that appears above the visible window
 * @param {TopMessageProps}
 * @returns void
 */
async function top({
    content,
    duration,
    onClose,
    mount,
    className,
    style,
    onClick,
    icon,
    type,
    persist,
    onTriggerClose,
    bindSetVisibleStatus,
}: TopMessageProps) {
    const mountEl = createMountEl("top", mount);
    const typeVal = type ?? "none";

    const div = await createDiv(mountEl);

    const key = createHash("topMessage");

    const root = createRoot(div);

    messageContextData.top = {
        content,
        type: typeVal,
        mount: mountEl,
        key,
    };

    const reactEl = createElement(TopMessage, {
        className,
        style,
        type: typeVal,
        content,
        duration: duration ?? 3000,
        onClose: (res) => {
            if (res === messageContextData.top?.key) {
                messageContextData.top = undefined;
            }
            root.unmount();
            div.remove();

            onClose?.();
        },
        onClick,
        icon,
        hashId: key,
        persist,
        onTriggerClose,
        bindSetVisibleStatus,
    });
    root.render(reactEl);
}

async function right({
    content,
    duration,
    onClose,
    mount,
    className,
    style,
    onClick,
    icon,
    type,
    closeIcon,
    title,
    persist,
    onTriggerClose,
    bindSetVisibleStatus,
}: RightMessageProps) {
    const mountEl = createMountEl("right", mount);
    const typeVal = type ?? "none";

    const div = await createDiv(mountEl);

    const key = createHash("rightMessage");

    const root = createRoot(div);

    messageContextData.right = {
        content,
        type: typeVal,
        mount: mountEl,
        key,
    };

    const reactEl = createElement(RightMessage, {
        className,
        style,
        closeIcon,
        title,
        type: typeVal,
        content,
        duration: duration ?? 3000,
        onClose: (res) => {
            if (res === messageContextData.right?.key) {
                messageContextData.right = undefined;
            }
            root.unmount();
            div.remove();

            onClose?.();
        },
        onClick,
        icon,
        hashId: key,
        persist,
        onTriggerClose,
        bindSetVisibleStatus,
    });

    root.render(reactEl);
}

export default {
    bottom: (args: Omit<BottomMessageProps, "persist" | "onTriggerClose">) => {
        void bottom(args);
    },
    top: (args: TopMessageProps) => {
        void top(args);
    },
    right: (args: RightMessageProps) => {
        void right(args);
    },
    auto: (args: TopMessageProps | RightMessageProps) => {
        if (window.innerWidth < 500) {
            void top(args);
        } else {
            void right(args);
        }
    },
};
