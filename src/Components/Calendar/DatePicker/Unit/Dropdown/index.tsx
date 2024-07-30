/**
 * @file
 * @date 2021-12-15
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef, useState } from "react";
import { Icon, ScrollComponent, Transition, useUnmount } from "../../../../..";
import styles from "./style.module.scss";
import { ScrollProps } from "../../../../DataDisplay/Scroll";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TemplateProps {
    labels: { id: string | number; content: string }[];
    handleScroll?: (res: {
        left: number;
        top: number;
        scrollHeight: number;
        scrollWidth: number;
        offsetHeight: number;
        offsetWidth: number;
        clientHeight: number;
        clientWidth: number;
    }) => void;
    value?: string | number;
    className?: string;
    style?: React.CSSProperties;
    handleFocus?: () => void;
    handleBlur?: () => void;
    handleChange?: (res: { id: string | number; content: string }) => void;
    readonly?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Template: React.FC<TemplateProps> = ({
    labels,
    handleScroll,
    value,
    className,
    style,
    handleFocus,
    handleBlur,
    handleChange,
    readonly,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [show, setShow] = useState(false);

    const commData = useRef<{
        oldFocus?: boolean;
    }>({
        oldFocus: undefined,
    });

    const ref = useRef<HTMLDivElement | null>(null);

    /**
     * 延时器
     */
    const timer = useRef<number | null>(null);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useUnmount(() => {
        timer.current && window.clearTimeout(timer.current);
    });
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /**
     * 延时执行滚动结束的事件
     */
    const handleScrollFn: ScrollProps["handleBarChange"] = (res) => {
        timer.current && window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            handleScroll?.(res);
        }, 100);
    };

    /**
     * 当下拉框的动画结束时
     */
    const handleTransitionEnd = () => {
        const node = ref.current;
        if (show && node && value) {
            const selectedEl = node.querySelector(`[data-id='${value}']`) as HTMLElement;
            const scrollBody = node.querySelector('[class*="scroll_scrollBody"]') as HTMLElement;

            if (selectedEl && scrollBody) {
                scrollBody.scrollTo({
                    top: selectedEl.offsetTop - scrollBody.clientHeight / 2,
                    behavior: "smooth",
                });
            }
        }
    };

    /**
     * 当输入框被点击时
     */
    const handleIptClick = () => {
        if (commData.current.oldFocus && ref.current) {
            ref.current.blur();
        } else {
            commData.current.oldFocus = show;
        }
    };

    /**
     * 获焦时
     */
    const handleFocusFn = () => {
        handleFocus?.();
        commData.current.oldFocus = show;
        setShow(true);
    };

    /**
     * 失焦时
     */
    const handleBlurFn = () => {
        handleBlur?.();
        commData.current.oldFocus = show;
        setShow(false);
    };

    const getClassNameList = () => {
        const arr = [styles.datePicker_dropdownWrapper];
        readonly && arr.push(styles.datePicker_readonly);
        return arr.join(" ") + (className ? ` ${className}` : "");
    };

    const contentValue = labels.find((item) => item.id === value)?.content;

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={getClassNameList()}
            ref={ref}
            style={style}
            onFocus={handleFocusFn}
            onBlur={handleBlurFn}
            tabIndex={-1}
        >
            <div className={styles.datePicker_dropdownIpt} onClick={handleIptClick}>
                <div className={styles.datePicker_dropdownIptContent}>{contentValue}</div>
                <Icon type="dropdown" className={styles.datePicker_dropdownIcon} />
            </div>
            <Transition
                show={show}
                animationType="slideDown"
                className={styles.datePicker_dropdownListContainer}
                handleTransitionEnd={handleTransitionEnd}
                firstAnimation={show}
            >
                <ScrollComponent
                    className={styles.datePicker_dropdownList}
                    handleBarChange={handleScrollFn}
                >
                    {labels.map((item) => {
                        const arr = [styles.datePicker_dropdownItem];
                        if (value && item.id.toString() === value.toString()) {
                            arr.push(styles.datePicker_dropdownItem__active);
                        }

                        return (
                            <div
                                className={arr.join(" ")}
                                key={`dropdownItem${item.id}`}
                                onClick={() => {
                                    handleChange?.(item);
                                    ref.current?.blur();
                                }}
                                data-id={item.id}
                            >
                                {item.content}
                            </div>
                        );
                    })}
                </ScrollComponent>
            </Transition>
        </div>
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Template;
