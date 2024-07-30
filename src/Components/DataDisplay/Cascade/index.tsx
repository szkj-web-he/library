/**
 * @file index file of Cascade component
 * @date 2020-09-07
 * @author Andy
 * @lastModify Andy 2020-09-07
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { SyntheticEvent, useEffect, useState } from "react";
import style from "./style.module.scss";
import { cascadeSet } from "../../../DefaultData/DataDisplay/cascade";
import { Icon } from "../../..";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface ItemType {
    content: React.ReactNode;
    func: () => void;
    link: string;
    linkJump: boolean;
    open: boolean;
    id: string;
    children: Array<ItemType>;
}
export interface CascadeProps {
    /**
     * set of items in this list
     *
     */
    itemSet?: Array<{
        content: React.ReactNode;
        func: () => void;
        link: string;
        linkJump: boolean;
        open: boolean;
        id: string;
        children: Array<ItemType>;
    }>;
    /**
     * width of this component
     */
    width?: string;
    /**
     * function will be called when this component is clicked
     */
    onClick?: () => void;
    /**
     * needs to init component or not
     */
    init?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Cascade: React.FC<CascadeProps> = ({
    itemSet,
    width = "14rem",
    init = true,
    ...props
}: CascadeProps) => {
    // init default props
    if (itemSet === undefined) {
        itemSet = cascadeSet;
    }

    /* <------------------------------------ **** STATES START **** ------------------------------------ */
    /**
     * data need to render
     */
    const [mapData, setMapData] = useState<Array<ItemType>>(itemSet);
    /**
     * set all open prop in data list to false
     * @param newMapData data list
     */
    const changeAllStateToFalse = (newMapData: Array<ItemType>) => {
        newMapData.forEach((item) => {
            item.open = false;
            changeAllStateToFalse(item.children);
        });
    };
    /**
     * handle mouse click other window place
     */
    const handleOtherPlaceClick = () => {
        const newMapData = [...mapData];
        changeAllStateToFalse(newMapData);
        setMapData(newMapData);
    };
    /**
     * handle click none child item
     * @param event event object
     */
    const handleNoChildOnClick = (event: SyntheticEvent, item: ItemType) => {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        handleOtherPlaceClick();
        item.func();
        if (props.onClick !== undefined) {
            props.onClick();
        }
    };
    /**
     * add global event listener
     */
    useEffect(() => {
        document.addEventListener("click", handleOtherPlaceClick);
        return () => {
            document.removeEventListener("click", handleOtherPlaceClick);
        };
    });

    /**
     * change the state of an item according to its id
     * @param newMapData deep copied data set
     * @param id item need to change state
     * @param newState new state of id item
     */
    const changeState = (newMapData: Array<ItemType>, id: string, newState: boolean) => {
        newMapData.forEach((item) => {
            if (item.id === id) {
                item.open = newState;
                if (!newState) {
                    changeAllStateToFalse(item.children);
                }
            } else {
                changeState(item.children, id, newState);
            }
        });
    };

    /**
     * handle change state event
     * @param preMapData deep copied data set
     * @param id item need to change state
     * @param newState new state of id item
     */
    const handleChangeStateEvent = (preMapData: Array<ItemType>, id: string, newState: boolean) => {
        const newMapData = [...preMapData];
        changeState(newMapData, id, newState);
        setMapData(newMapData);
    };

    /**
     * handle change bro state event
     * @param preMapData deep copied data set
     * @param id item need to change state
     * @param newState new state of id item
     */
    const handleChangeBroStateEvent = (fatherMapData: Array<ItemType>, id: string) => {
        fatherMapData.forEach((item) => {
            if (item.id !== id) {
                handleChangeStateEvent(mapData, item.id, false);
            }
        });
    };

    // init state
    if (!init) {
        changeAllStateToFalse(mapData);
    }

    /**
     * handle item with children on clicked
     * @param event click event object
     * @param item item clicked
     * @param fatherMapData previous level data
     */
    const handleHasChildOnClick = (
        event: SyntheticEvent,
        item: ItemType,
        fatherMapData: Array<ItemType>,
    ) => {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        handleChangeStateEvent(mapData, item.id, !item.open);
        handleChangeBroStateEvent(fatherMapData, item.id);
    };
    /* <------------------------------------ **** STATES END **** ------------------------------------ */
    const itemTemplate = (item: ItemType, index: number, fatherMapData: Array<ItemType>) => (
        <div
            className={style.cascade_itemContainer}
            key={`${index}itemSet`}
            onClick={
                item.children.length !== 0
                    ? (event) => handleHasChildOnClick(event, item, fatherMapData)
                    : (event) => handleNoChildOnClick(event, item)
            }
        >
            {item.children.length !== 0 ? (
                <div className={style.cascade_contentConvert}>
                    {item.content}

                    <Icon type="open" className={style.cascade_contentIcon} />
                    <div
                        className={style.cascade_contentAddition}
                        style={{ display: item.open ? "block" : "none" }}
                    >
                        <div className={style.cascade_dotContainer} style={{ width }} {...props}>
                            {item.children.map((sonItem, index) =>
                                sonItem.content === "/" ? (
                                    <div
                                        key={`/${index}itemSet`}
                                        className={style.cascade_divider}
                                    />
                                ) : (
                                    itemTemplate(sonItem, index, item.children)
                                ),
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={style.cascade_content}>{item.content}</div>
            )}
        </div>
    );

    return (
        <div className={style.cascade_dotContainer} style={{ width }} {...props}>
            {mapData.map((item, index) =>
                item.content === "/" ? (
                    <div key={`/${index}itemSet`} className={style.cascade_divider} />
                ) : (
                    itemTemplate(item, index, mapData)
                ),
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
