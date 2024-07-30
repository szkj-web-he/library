/**
 * @file PopUp
 * @date 2021-05-18
 * @author Andy Jiang
 * @lastModify Andy Jiang 2021-05-18
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { SyntheticEvent } from "react";
import { Button, Icon } from "../../..";
import style from "./style.module.scss";
import { createRoot } from "react-dom/client";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface PopupProps {
    title?: string;
    content?: string;
    onConfirm?: (e: SyntheticEvent) => void;
    onCancel?: (e: SyntheticEvent) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Popup: React.FC<PopupProps> = ({ ...props }: PopupProps) => {
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.popup_window}>
            {/* <------------------------------------ **** SECTION1 START **** ------------------------------------ */}
            {/** git the brief description for this section */}
            <div className={style.popup_title}>
                <Icon type="warning" />
                <span>{props.title}</span>
            </div>
            <div className={style.popup_content}>{props.content}</div>
            <div className={style.popup_button}>
                <Button
                    label={"Confirm"}
                    {...Object.assign({}, props.onConfirm && { onClick: props.onConfirm })}
                />
                <span>
                    <Button
                        label={"Cancel"}
                        type={"secondary"}
                        {...Object.assign({}, props.onCancel && { onClick: props.onCancel })}
                    />
                </span>
            </div>
            {/* <------------------------------------ **** SECTION1 END **** ------------------------------------ */}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

export const popup = (
    content = "",
    title = "",
    onConfirm?: (e: SyntheticEvent) => void,
    onCancel?: (e: SyntheticEvent) => void,
): void => {
    const doc = window.document;
    const node = doc.createElement("div");
    const divContainer = document.getElementsByClassName(style.popup_container);
    let divElement: HTMLElement;
    if (divContainer.length > 0) {
        divElement = divContainer[0] as HTMLElement;
    } else {
        divElement = doc.createElement("div");
        divElement.setAttribute("class", style.popup_container);
        doc.body.appendChild(divElement);
    }
    divElement.appendChild(node);

    const contentEl = (
        <Popup
            title={title}
            content={content}
            {...Object.assign({}, onConfirm && { onConfirm }, onCancel && { onCancel })}
        />
    );

    createRoot(node).render(contentEl);
};
