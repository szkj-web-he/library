/**
 * @file navigation style sheet
 * @date 2020-11-09
 * @author Andy
 * @lastModify Andy 2020-11-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { SyntheticEvent } from "react";
import style from "./style.module.scss";
import { headerItemSet } from "../../../DefaultData/Navigation/navigation";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface NavigationProps {
    /**
     * item set of header
     */
    defaultHeaderItemSet?: Array<{ content: string; func: () => void }>;
    /**
     * avatar name of user
     */
    avatar?: string;
    /**
     * share label
     */
    shareLabel?: string;
    /**
     * share Function
     */
    handleShareOnClick?: (event: SyntheticEvent) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Navigation: React.FC<NavigationProps> = ({
    avatar = "XX",
    shareLabel = "Share",
    ...props
}) => {
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /**
     * default data set of navigation
     */
    const itemSet = props.defaultHeaderItemSet ? props.defaultHeaderItemSet : headerItemSet;
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    return (
        <div className={style.navigationBar_container}>
            <div className={style.navigationBar_leftContainer}>
                {itemSet.map((item, index) => (
                    <div
                        key={`${index}headerItemSet`}
                        className={style.navigationBar_headerItem}
                        onClick={item.func}
                    >
                        {item.content}
                    </div>
                ))}
            </div>
            <div>
                <div className={style.navigationBar_headerBars}>
                    <span className={style.navigationBar_menuBtn}>
                        <i />
                        <i />
                        <i />
                    </span>
                    <div className={style.navigationBar_headerMenuContainer}>
                        {itemSet.map((item, index) => (
                            <div
                                key={`${index}hideHeaderItemSet`}
                                className={style.navigationBar_headerMenuItem}
                                onClick={item.func}
                            >
                                {item.content}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={style.navigationBar_headerRight}>
                <div className={style.navigationBar_headerAvatar}>{avatar}</div>
                <div
                    className={style.navigationBar_headerShare}
                    onClick={(event) => {
                        if (props.handleShareOnClick !== undefined) props.handleShareOnClick(event);
                    }}
                >
                    {shareLabel}
                </div>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
