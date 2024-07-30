import React, { ReactNode, InputHTMLAttributes, CSSProperties, ReactElement } from "react";
// eslint-disable-next-line @typescript-eslint/ban-types
export type LiteralUnion<T extends U, U> = T | (U & {});

export interface ShowCountProps {
    formatter: (args: { count: number; maxLength?: number }) => ReactNode;
}

export interface CommonInputProps {
    /**
     * The prefix icon for the Input
     */
    prefix?: ReactNode;
    /**
     * The suffix icon for the Input
     */
    suffix?: ReactNode;
    /**
     * The label text displayed before (on the left side of) the input field
     */
    addonBefore?: ReactNode;
    /**
     * The label text displayed after (on the right side of) the input field
     */
    addonAfter?: ReactNode;
    /**
     * whether hide addon style
     */
    addonStyleHide?: boolean;
    /**
     * className with 'input-affix-wrapper'
     */
    affixWrapperClassName?: string;
    /**
     * className with 'input-group-wrapper'
     */
    groupClassName?: string;
    /**
     * className with 'input-wrapper'
     */
    wrapperClassName?: string;
    /**
     * custom input class
     */
    inputClassName?: string;
    /**
     * If allow to remove input content with clear icon
     */
    allowClear?: boolean | { clearIcon: ReactNode };
}

export interface BaseInputProps extends CommonInputProps {
    /**
     * input element
     */
    inputElement: ReactElement;
    /**
     * additional class name of input
     */
    className?: string;
    /**
     * style properties of input
     */
    style?: CSSProperties;
    /**
     * The initial input content
     */
    defaultValue?: string;
    /**
     * The input content
     */
    value?: InputHTMLAttributes<HTMLInputElement>["value"];
    /**
     * Whether the input is focused
     */
    focused?: boolean;
    /**
     * Whether the input is disabled
     */
    disabled?: boolean;
    /**
     * Whether the input is readonly
     */
    readOnly?: boolean;
    /**
     * Whether has border style
     */
    bordered?: boolean;
    /**
     * Whether the element is hide
     */
    hidden?: boolean;
    /**
     * Callback when user pressed the delete icon
     */
    handleReset?: React.MouseEventHandler;
    /**
     * input focus
     */
    triggerFocus?: () => void;
}

export interface InputProps
    extends CommonInputProps,
        Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
    /**
     * The type of input, see: MDN( use Input.TextArea instead of type="textarea")
     */
    type?: LiteralUnion<
        | "button"
        | "checkbox"
        | "color"
        | "date"
        | "datetime-local"
        | "email"
        | "file"
        | "hidden"
        | "image"
        | "month"
        | "number"
        | "password"
        | "radio"
        | "range"
        | "reset"
        | "search"
        | "submit"
        | "tel"
        | "text"
        | "time"
        | "url"
        | "week",
        string
    >;
    /**
     * The callback function that is triggered when Enter key is pressed
     */
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
    /**
     * Trigger when the value of the input box changes
     */
    onInputChange?: (value: string) => void;
    /**
     * Whether the input is autoComplete
     */
    autoComplete?: string;
    /**
     * Whether show text count
     */
    showCount?: boolean | ShowCountProps;
    /**
     * set input size property
     */
    htmlSize?: number;
    /**
     * Whether has border style
     */
    bordered?: boolean;
}

export interface InputRef {
    clear: () => void;
    focus: (options?: InputFocusOptions) => void;
    blur: () => void;
    setSelectionRange: (
        start: number,
        end: number,
        direction?: "forward" | "backward" | "none",
    ) => void;
    select: () => void;
    input?: HTMLInputElement | null;
}

export interface InputFocusOptions extends FocusOptions {
    cursor?: "start" | "end" | "all";
}
