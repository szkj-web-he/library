/**
 * @file text area component
 * @date 2020-10-20
 * @author Andy Jiang
 * @lastModify Andy Jiang 2020-10-20
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useCallback, useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /**
     * width of this component, default is 23rem
     */
    width?: string;
    /**
     * height of this component, default is 8.7rem
     */
    height?: string;
    /**
     * placeholder in this component
     */
    placeholder?: string;
    /**
     * enable resize
     */
    resize?: boolean;
    /**
     * hide border
     */
    border?: boolean;

    /**
     * get input value
     */
    handleInputOnChange?: (value: string) => void;
    /**
     * custom focus style of this component
     */
    focusStyle?: {
        [key: string]: string | number;
    };
    /**
     * The content is limited to the visible range
     */
    noScroll?: boolean;

    /** handler onChange */
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    /** handler onFocus */
    onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    /** handler onBlur */
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    /** custom className */
    className?: string;
    /**value of this component */
    value?: string;
    /** get textarea element */
    getCurrentEl?: (el: HTMLTextAreaElement) => void;

    onKeyDown?: (res: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const TextArea: React.FC<TextAreaProps> = ({
    width = "23rem",
    resize = false,
    border = true,
    height = "8.7rem",
    placeholder = "put placeholder here",
    focusStyle = undefined,
    noScroll = false,
    handleInputOnChange = undefined,
    onChange = undefined,
    onFocus = undefined,
    onBlur = undefined,
    getCurrentEl = undefined,
    value = "",
    className = "",
    onKeyDown = undefined,
    ...props
}) => {
    const textareaRef = useRef<null | HTMLTextAreaElement>(null);
    const puppetRef = useRef<null | HTMLDivElement>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [allMsg, setAllMsg] = useState("");
    /* <------------------------------------ **** FUNCTIONS START **** ------------------------------------ */
    /**
     * will be called when input changes
     * @param event event target
     */
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.persist();
        onChange && onChange(e);
        handleInputOnChange && handleInputOnChange(e.target.value);
        if (puppetRef.current && puppetRef.current.scrollHeight <= puppetRef.current.offsetHeight) {
            const text = e.target.value;
            puppetRef.current.innerText = text;
        }
    };
    /**
     * is overflow
     */
    const overflow = useCallback(() => {
        if (puppetRef.current) {
            let _clientMsg = puppetRef.current.innerText;
            const isEllipsis = puppetRef.current.scrollHeight > puppetRef.current.offsetHeight;
            while (puppetRef.current.scrollHeight > puppetRef.current.offsetHeight) {
                _clientMsg = _clientMsg.substring(0, _clientMsg.length - 1);
                puppetRef.current.innerText = _clientMsg;
            }
            if (isEllipsis) {
                puppetRef.current.innerText =
                    _clientMsg.substring(0, _clientMsg.length - 3) + "...";
            }
        }
    }, []);

    /**
     * handle blur
     */
    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLTextAreaElement>) => {
            e.persist();
            onBlur && onBlur(e);
            setIsFocus(false);
            if (textareaRef.current && noScroll) {
                const text = e.target.value;
                textareaRef.current.value = " ";
                setAllMsg(text);
            }
            overflow();
        },
        [onBlur, overflow, noScroll],
    );

    /**
     * handle focus
     */
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        e.persist();
        setIsFocus(true);
        onFocus && onFocus(e);
        if (noScroll) {
            e.target.value = allMsg;
        }
    };

    /**
     * handler keydown
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.persist();
        const code = e.key;
        if (code === "Escape" && textareaRef.current) {
            textareaRef.current.blur();
        }
        onKeyDown && onKeyDown(e);
    };

    /* <------------------------------------ **** FUNCTIONS END **** ------------------------------------ */

    /**
     * when noScroll === true
     */
    const noScrollEl = () => {
        if (noScroll) {
            return (
                <div
                    className={styles.textArea_puppet}
                    ref={puppetRef}
                    style={isFocus ? { color: "transparent" } : {}}
                ></div>
            );
        }
    };

    /**
     * handler value change
     */
    useEffect(() => {
        setAllMsg(value);
        if (isFocus || !noScroll) {
            if (textareaRef.current) {
                textareaRef.current.value = value;
            }
            if (puppetRef.current) {
                puppetRef.current.innerText = value;
                overflow();
            }
        } else {
            if (textareaRef.current) {
                textareaRef.current.value = " ";
            }
            if (puppetRef.current) {
                puppetRef.current.innerText = value;
                overflow();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, overflow]);

    return (
        <div
            className={styles.textArea_container}
            style={Object.assign(
                {},
                {
                    width: resize ? "auto" : width,
                    height: resize ? "auto" : height,
                },
                border ? undefined : { border: "none" },
                isFocus ? focusStyle : {},
            )}
        >
            {noScrollEl()}
            <textarea
                className={styles.textArea_textarea + (className ? " " + className : "")}
                style={{ resize: resize ? "both" : "none" }}
                ref={(el) => {
                    textareaRef.current = el;
                    getCurrentEl && el && getCurrentEl(el);
                }}
                placeholder={placeholder}
                onChange={handleInput}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                {...props}
            ></textarea>
        </div>
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
