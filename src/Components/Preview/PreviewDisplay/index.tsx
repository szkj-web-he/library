/**
 * @file Preview display component
 * @date 2020-10-13
 * @author Andy Jiang
 * @lastModify Andy Jiang 2020-10-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { ReactElement, useState, useEffect } from "react";
import style from "./style.module.scss";
import ReactDOM from "react-dom";
import { Icon } from "../../..";
import { createRoot } from "react-dom/client";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface PreviewDisplayProps {
    /**
     * the width of this component
     */
    width?: string;
    /**
     * the height of this component
     */
    height?: string;
    /**
     * desktop screen size, default is 1280*800px
     */
    desktopSize?: { width: string; height: string };
    /**
     * pad screen size, default is 768*1024px
     */
    padSize?: { width: string; height: string };
    /**
     * phone screen size, default is 375*812px
     */
    phoneSize?: { width: string; height: string };
    /**
     * the content or component needs to display
     */
    content?: ReactElement;
    /**
     * link of website
     */
    link?: string;
    /**
     * need to show error msg or not, default is false
     */
    err?: boolean;
    /**
     * error msg
     */
    errMsg?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const PreviewDisplay: React.FC<PreviewDisplayProps> = ({
    width = "100%",
    height = "100%",
    err = false,
    ...props
}: PreviewDisplayProps) => {
    const getWindowHeight = () => window.innerHeight;
    const [windowHeight, setWindowHeight] = useState(
        getWindowHeight() < 750 ? 750 : getWindowHeight(),
    );

    const handleResize = () => {
        setWindowHeight(getWindowHeight() < 750 ? 750 : getWindowHeight());
    };
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /**
     * The set of different size
     */
    const sizeSet = {
        desktop:
            props.desktopSize !== undefined
                ? props.desktopSize
                : {
                      width: "1280px",
                      height: `calc(${windowHeight}px - 20rem)`,
                  },
        pad:
            props.padSize !== undefined
                ? props.padSize
                : {
                      width: "768px",
                      height: `calc(${windowHeight}px - 25rem)`,
                  },
        phone:
            props.phoneSize !== undefined
                ? props.phoneSize
                : {
                      width: "375px",
                      height: `calc(${windowHeight}px - 25rem)`,
                  },
    };
    /**
     *  the set of icons
     */
    const iconSet = [
        { label: "desktop", icon: <Icon type="mac" /> },
        { label: "pad", icon: <Icon type="tablet" /> },
        { label: "phone", icon: <Icon type="mobile" /> },
    ];
    /**
     *  the set of styles under different size
     */
    const styleSet = {
        phone: style.previewDisplay_frameContainer__phone,
        pad: style.previewDisplay_frameContainer__pad,
        desktop: style.previewDisplay_frameContainer__desktop,
    };
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */

    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    /**
     * identify current size, default is 'phone'
     */
    const [currentSize, setCurrentSize] = useState<"phone" | "pad" | "desktop">("phone");
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */

    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /**
     * record the current size tag
     * @param index size tag
     */
    const handleChangeSizeEvent = (index: "phone" | "pad" | "desktop") => {
        setCurrentSize(index);
    };

    /**
     * init the display iframe
     */
    const initFrame = () => {
        const iframeRoot = window.frames[0].document.getElementById("iframeRoot");
        const { version } = ReactDOM;
        // need to show error massage? if not, show content then
        const content = err ? (
            <div className={style.previewDisplay_errMsg}>{props.errMsg}</div>
        ) : props.content !== undefined ? (
            props.content
        ) : (
            <div className={style.previewDisplay_errMsg}>no content here</div>
        );
        if (version.startsWith("17")) {
            ReactDOM.render(content, iframeRoot);
        } else if (version.startsWith("18")) {
            iframeRoot && createRoot(iframeRoot).render(content);
        }
        // import all style sheets
        const head = window.frames[0].document.getElementsByTagName("head")[0];
        const iframeStyleList = document.getElementsByTagName("style");
        for (let i = 0; i < iframeStyleList.length; i++) {
            const iframeStyle = document.createElement("style");
            iframeStyle.innerHTML = iframeStyleList[i].innerHTML;
            head.appendChild(iframeStyle);
        }
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETERS START **** ------------------------------------ */
    /**
     * style of iframe
     */
    const iStyle: React.CSSProperties = {
        transition: "0.8s",
        width: sizeSet[currentSize].width,
        height: sizeSet[currentSize].height,
        border: "0.1rem solid #bfbfbf",
    };
    /* <------------------------------------ **** PARAMETERS END **** ------------------------------------ */
    return (
        <div className={style.previewDisplay_container} style={{ width, height }}>
            <div className={style.previewDisplay_iconContainer}>
                {iconSet.map((item, index) => (
                    <div
                        key={`${index}iconSet`}
                        className={
                            item.label === currentSize
                                ? style.previewDisplay_iconButton__selected
                                : style.previewDisplay_iconButton
                        }
                        onClick={() =>
                            handleChangeSizeEvent(item.label as "phone" | "pad" | "desktop")
                        }
                    >
                        {item.icon}
                    </div>
                ))}
            </div>
            <div className={style.previewDisplay_wrapper}>
                <div
                    className={styleSet[currentSize]}
                    style={{
                        width: `calc(${sizeSet[currentSize].width} + 0.2rem)`,
                    }}
                >
                    {props.link === undefined ? (
                        <iframe
                            title={"preview"}
                            id={"previewFrame"}
                            onLoad={() => initFrame()}
                            frameBorder={"0"}
                            srcDoc={`
                    <div id="iframeRoot"></div>
                    `}
                            style={iStyle}
                        />
                    ) : (
                        <iframe
                            title={"preview"}
                            id={"previewFrame"}
                            src={props.link}
                            style={iStyle}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
