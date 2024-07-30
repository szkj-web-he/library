import { ReactElement } from "react";
import { BaseInputProps, InputFocusOptions, InputProps } from "./interface";

export function hasAddon(props: BaseInputProps | InputProps) {
    return !!(props.addonBefore || props.addonAfter);
}

export function hasPrefixSuffix(props: BaseInputProps | InputProps) {
    return !!(props.prefix || props.suffix || props.allowClear);
}

export function fixControlledValue<T>(value: T) {
    if (typeof value === "undefined" || value === null) {
        return "";
    }
    return String(value);
}

export function triggerFocus(
    element?: HTMLInputElement | HTMLTextAreaElement,
    option?: InputFocusOptions,
) {
    if (!element) return;
    element.focus(option);

    // Selection content
    const { cursor } = option || {};

    if (cursor) {
        const len = element.value.length;

        switch (cursor) {
            case "start":
                element.setSelectionRange(0, 0);
                break;
            case "end":
                element.setSelectionRange(len, len);
                break;
            default:
                element.setSelectionRange(0, len);
        }
    }
}

export function hasDisabled(props: BaseInputProps | InputProps) {
    const beforeNode = props.addonBefore as ReactElement;
    const afterNode = props.addonAfter as ReactElement;

    if ((beforeNode?.props ?? false) && Object.keys(beforeNode.props as object).length) {
        return !!Object.getOwnPropertyDescriptor(beforeNode.props, "disabled");
    } else if ((afterNode?.props ?? false) && Object.keys(afterNode.props as object).length) {
        return !!Object.getOwnPropertyDescriptor(afterNode.props, "disabled");
    }

    return false
}
