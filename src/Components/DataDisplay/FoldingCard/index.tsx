/**
 * @file index file of FoldingCard component
 * @date 2020-09-07
 * @author Andy Jiang
 * @lastModify Andy Jiang 2020-09-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { Icon, Transition } from "../../..";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface FoldingCardProps {
    /**
     * need overflow or not, default is true;
     */
    overflow?: boolean;
    /**
     * id of this folding card and id should be unique
     */
    id?: string;
    /**
     * if is true, this folding card is a normal card which means it can not hide
     * the content, default is false
     */
    disableFolding?: boolean;
    /**
     * content will be shown in this folding card
     */
    content?: React.ReactNode;
    /**
     * set default display status, default is true
     */
    openState?: boolean;
    /**
     * width of this component
     */
    width?: string;
    /**
     * custom className
     */
    customClassName?: string;
    /**
     * title of this component
     */
    title?: string;
    /**
     * React.Element title ,  elementTitle> title
     */
    elementTitle?: React.ReactNode;
    /**
     * handle open change
     */
    handleOpenChange?: (status: boolean) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const FoldingCard: React.FC<FoldingCardProps> = ({
    id,
    content,
    title = "no title here",
    width = "100%",
    openState = false,
    disableFolding = false,
    customClassName,
    elementTitle,
    handleOpenChange,
    ...props
}) => {
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    /**
     * open the folding card or not
     */
    const [open, setOpen] = useState(disableFolding ? true : openState);
    /**
     * enable overflow prop or not
     */
    const [enable, setEnable] = useState(disableFolding ? true : openState);

    const timer = useRef<null | number>(null);
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */

    /* <------------------------------------ **** PARAMETERS START **** ------------------------------------ */
    useEffect(
        () => () => {
            timer.current && window.clearTimeout(timer.current);
        },
        [],
    );

    useEffect(() => {
        handleOpenChange && handleOpenChange(open);
    }, [handleOpenChange, open]);

    /* <------------------------------------ **** PARAMETERS END **** ------------------------------------ */

    /* <------------------------------------ **** FUNCTIONS START **** ------------------------------------ */
    /**
     * handle overflow change
     */
    const handleSetOverflow = () => {
        setOpen(!open);
        if (!enable) {
            timer.current = window.setTimeout(() => {
                setEnable(!open);
            }, 300);
        } else {
            setEnable(!open);
        }
    };
    /* <------------------------------------ **** FUNCTIONS END **** ------------------------------------ */

    return (
        <div
            className={style.foldingCard_container + (customClassName ? ` ${customClassName}` : "")}
            {...props}
            style={{ overflow: enable ? "visible" : "hidden" }}
        >
            <div
                className={style.foldingCard_titleContainer}
                style={{ cursor: disableFolding ? "default" : "pointer" }}
                onClick={disableFolding ? undefined : handleSetOverflow}
            >
                {disableFolding ? null : (
                    <div
                        className={style.foldingCard_titleIcon}
                        style={{ transform: `rotate(${open ? 0 : -90}deg)` }}
                    >
                        <Icon type="down" />
                    </div>
                )}

                <div
                    className={style.foldingCard_titleText}
                    style={{ paddingLeft: disableFolding ? "2.6rem" : "0rem" }}
                >
                    {elementTitle ? elementTitle : title}
                </div>
            </div>
            <div className={style.foldingCard_contentWrapper}>
                <Transition
                    show={open}
                    id={id}
                    animationType="taller"
                    className={style.foldingCard_contentContainer}
                    style={{
                        width,
                    }}
                >
                    <div>{content || <div>no content here</div>}</div>
                </Transition>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
