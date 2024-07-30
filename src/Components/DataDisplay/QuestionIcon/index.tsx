/**
 * @file QuestionIcon
 * @date 2021-01-27
 * @author Andy Jiang
 * @lastModify Andy Jiang 2021-01-27
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef, useState } from "react";
import { Icon, Kite, useUnmount } from "../../..";
import style from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface QuestionIconProps {
    /**
     * the position of hint will show
     */
    position?: "left" | "right";
    /**
     * content of the hint
     */
    content?: string;
    /**
     *  width of hind window
     */
    width?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const QuestionIcon: React.FC<QuestionIconProps> = ({
    position = "right",
    width = "30rem",
    content = "Please set content. Please set content. Please set content. Please set content. Please set content. Please set content.",
}: QuestionIconProps) => {
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */

    const [show, setShow] = useState(false);

    const timer = useRef<null | number>(null);

    const hover = useRef({
        tips: false,
        content: false,
    });

    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useUnmount(() => {
        timer.current && window.clearTimeout(timer.current);
    });

    const setShowStatus = () => {
        timer.current && window.clearTimeout(timer.current);
        if (hover.current.tips || hover.current.content) {
            setShow(true);
        } else {
            timer.current = window.setTimeout(() => {
                setShow(false);
            }, 300);
        }
    };

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const rootEl = () => (
        <div
            className={style.questionIcon_container}
            onMouseEnter={() => {
                hover.current.content = true;
                setShowStatus();
            }}
            onMouseLeave={() => {
                hover.current.content = false;
                setShowStatus();
            }}
        >
            <Icon type="query" className={style.questionIcon_icon} />
        </div>
    );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Kite
            root={rootEl()}
            triangle={{
                width: "1rem",
                height: "2rem",
                color: "#fff",
            }}
            direction="horizontal"
            placement={position === "left" ? "lc" : "rc"}
            show={show}
            onMouseEnter={() => {
                hover.current.tips = true;
                setShowStatus();
            }}
            onMouseLeave={() => {
                hover.current.tips = false;
                setShowStatus();
            }}
        >
            <div
                className={style.questionIcon_hintContainer}
                style={{
                    width,
                }}
            >
                <div className={style.questionIcon_hintContent}>{content}</div>
            </div>
        </Kite>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
