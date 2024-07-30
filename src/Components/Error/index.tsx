/**
 * @file error
 * @date 2021-04-15
 * @author zhoubin
 * @lastModify  2021-04-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import spr404 from "../../Assets/images/spr_404.png";
import spr500 from "../../Assets/images/spr_500.png";
import { Button } from "../Buttons/Button";
import style from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface ErrorProps {
    /**
     * Is this the error type
     */
    type?: "404" | "500";
    /**
     * btn content
     */
    btnContent?: string;
    /**
     * btn clicked function
     */
    btnClick?: () => void;
    /**
     * title content
     */
    title?: string;
    /**
     * content text
     */
    content?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Error: React.FC<ErrorProps> = ({
    type = "404",
    btnContent = "Go Back",
    title = "Page Not Found",
    content = "Sorry, we can't find that page! It might be an old link or maybe it moved",
    ...props
}) => {
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */

    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.error_container}>
            <div className={style.error_notFond}>
                <img src={type === "404" ? spr404 : spr500} alt="" />
                <h2>{title}</h2>
                <span>{content}</span>
                <Button
                    height="4.2rem"
                    label={btnContent}
                    size="normal"
                    type="primary"
                    width="14rem"
                    {...Object.assign({}, props.btnClick && { onClick: props.btnClick })}
                />
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
