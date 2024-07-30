/**
 * @file
 * @date 2022-05-26
 * @author mingzhou.zhang
 * @lastModify  2022-05-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
    useLayoutEffect,
    useEffect,
    Fragment,
} from "react";
import { createPortal } from "react-dom";
import { Transition } from "../../..";
import classNames from "../../../Unit/classNames";
import { Icon } from "../../Icon";
import styles from "./style.module.scss";
import { mountElement } from "../../Cover/Unit/mountEl";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACEPP START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface BaseScaleProps {
    /**
     * The classname of the container
     */
    containerClassName?: string;
    /**
     * The classname of the component
     */
    className?: string;
    /**
     * The style of the component
     */
    style?: React.CSSProperties;
    /**
     * The title of the component
     */
    title?: React.ReactNode;
    /**
     * The subtitle of the component
     */
    subtitle?: React.ReactNode;
}
export interface ScaleProps extends BaseScaleProps {
    /**
     * Scaling before Title node
     */
    beforeTitle?: React.ReactNode;
    /**
     * Scaling after Title node
     */
    afterTitle?: React.ReactNode;
    /**
     * Scaling after width
     */
    scaleW?: string;
    /**
     * Scaling after height
     */
    scaleH?: string;
    /**
     * Scaling before Content node
     */
    beforeContent?: React.ReactNode;
    /**
     * Scaling after Content node
     */
    afterContent?: React.ReactNode;
    /**
     * popup display status
     */
    isShow?: boolean;
    /**
     * whether allow is click background zoom
     */
    allowBgZoom?: boolean;
    /**
     * whether allow is click mask close
     */
    maskClosable?: boolean;
    /**
     * custom node in before scale
     */
    customScaleNode?: React.ReactNode;
    /**
     * zoom out event
     */
    onZoomOut?: () => void;
    /**
     * zoom in event
     */
    onZoomIn?: () => void;
}

export interface ScaleRef {
    zoomIn: () => void;
    zoomOut: () => void;
    scaleStatus: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Scale = forwardRef<ScaleRef, ScaleProps>(
    (
        {
            containerClassName,
            className,
            style,
            beforeTitle = <div />,
            afterTitle = <div />,
            scaleW = "60rem",
            scaleH = "54.2rem",
            beforeContent,
            afterContent,
            isShow = false,
            allowBgZoom = true,
            maskClosable = true,
            customScaleNode,
            onZoomOut,
            onZoomIn,
        },
        ref,
    ) => {
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const [hover, setHover] = useState(false);
        const [show, setShow] = useState(isShow);
        const containerRef = useRef<HTMLDivElement>(null);
        const alertRef = useRef<HTMLDivElement>(null);

        const mousePosition = useRef<{ x: number; y: number } | null>(null);

        const isFirstRender = useRef(true);

        const isClose = useRef(false);

        useLayoutEffect(() => {
            setShow(isShow);
        }, [isShow]);

        useEffect(() => {
            document.documentElement.addEventListener("click", getClickPosition, true);
            return () => {
                document.documentElement.removeEventListener("click", getClickPosition, true);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useImperativeHandle(ref, () => ({
            zoomIn() {
                isClose.current = true;
                setShow(false);
            },
            zoomOut() {
                setShow(true);
            },
            scaleStatus: show,
        }));
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        const getClickPosition = (e: MouseEvent) => {
            if (!show) {
                if (!isClose.current) {
                    mousePosition.current = {
                        x: e.pageX,
                        y: e.pageY,
                    };
                }
                isClose.current = false;
            }
        };
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const zoom = createPortal(
            <Fragment>
                <Transition
                    className={styles.scale_mask}
                    fromEnter={styles.scale_mask_form_enter}
                    enterActive={styles.scale_mask_form_active}
                    toEnter={styles.scale_mask_to_enter}
                    fromLeave={styles.scale_mask_form_leave}
                    leaveActive={styles.scale_mask_to_active}
                    toLeave={styles.scale_mask_to_leave}
                    onMouseDown={() => {
                        isClose.current = true;
                    }}
                    onClick={() => {
                        if (maskClosable) {
                            setShow(false);
                        }
                    }}
                    show={show}
                />
                <Transition
                    show={show}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transformOrigin: mousePosition.current
                            ? `${mousePosition.current?.x}px ${mousePosition.current?.y}px`
                            : "",
                        zIndex: 99,
                    }}
                    fromEnter={styles.scale_wrap_form_enter}
                    enterActive={styles.scale_wrap_form_active}
                    toEnter={styles.scale_wrap_to_enter}
                    fromLeave={styles.scale_wrap_form_leave}
                    leaveActive={styles.scale_wrap_to_active}
                    toLeave={styles.scale_wrap_to_leave}
                    handleTransitionEnd={() => {
                        if (show) {
                            onZoomIn?.();
                        } else {
                            onZoomOut?.();
                        }
                    }}
                >
                    <div
                        ref={alertRef}
                        className={classNames(
                            styles.scale_wrap,
                            styles.scale_wrap__scale,
                            className,
                            {},
                        )}
                        style={{
                            width: scaleW,
                            height: scaleH,

                            transform: `translate(calc(50vw - 50%), calc(50vh - 50%))`,
                        }}
                        onMouseDown={() => {
                            isClose.current = true;
                        }}
                    >
                        <div className={styles.scale_wrap_head}>
                            {afterTitle}
                            <div
                                className={classNames(
                                    styles.scale_wrap_head_icon,
                                    styles.scale_wrap_head_icon__borderless,
                                )}
                            >
                                <Icon
                                    className={styles.scale_wrap_head_shrink}
                                    type="shrink"
                                    onClick={() => {
                                        setShow(false);
                                    }}
                                />
                            </div>
                        </div>
                        {afterContent}
                    </div>
                </Transition>
            </Fragment>,
            mountElement(),
        );
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        Scale.displayName = "Scale";

        return (
            <div
                className={classNames(styles.scale_container, containerClassName)}
                ref={containerRef}
            >
                {customScaleNode ?? (
                    <div
                        className={classNames(styles.scale_wrap, className, {
                            [`${styles.scale_wrap__transition}`]: !isFirstRender.current,
                            [`${styles.scale_wrap__pointer}`]: allowBgZoom,
                        })}
                        style={style}
                        onMouseEnter={() => {
                            setHover(true);
                        }}
                        onMouseLeave={() => {
                            setHover(false);
                        }}
                        onClick={() => {
                            if (allowBgZoom) setShow(true);
                        }}
                    >
                        <div className={styles.scale_wrap_head}>
                            {beforeTitle}
                            <div
                                className={classNames(styles.scale_wrap_head_icon, {
                                    [`${styles.scale_wrap_head_icon__borderless}`]: !hover,
                                })}
                            >
                                {hover && (
                                    <Icon
                                        className={styles.scale_wrap_head_magnify}
                                        type="magnify"
                                        onClick={() => {
                                            setShow(true);
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {beforeContent}
                    </div>
                )}
                {zoom}
            </div>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
