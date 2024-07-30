/**
 * @file tag card component
 * @date 2020-10-26
 * @author Andy Jiang
 * @lastModify Andy Jiang 2020-10-26
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { ReactElement, useState } from "react";
import style from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface TagCardProps {
    /**
     * width of this component
     */
    width?: string;
    /**
     * height of this component
     */
    height?: string;
    /**
     * set of names to tags of this component
     */
    tagSet?: Array<string>;
    /**
     * content needs to display
     */
    content?: Array<ReactElement>;
    /**
     * index of selected tag, default is the first element in the tagSet
     */
    selectedTag?: number;
    /**
     * able to scroll
     */
    scroll?: boolean;
    /**
     * style sheet of tag card
     */
    styleIndex?: number;
    /**
     *
     */
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const TagCard: React.FC<TagCardProps> = ({
    width = "28rem",
    height = "100%",
    tagSet = ["Tag1", "Tag2"],
    scroll = true,
    styleIndex = 2,
    ...props
}) => {
    //set default props
    if (props.selectedTag === undefined) props.selectedTag = 0;
    if (props.content === undefined)
        props.content = [
            <div key={`${0}tagContent`}>put content1 here</div>,
            <div key={`${1}tagContent`}>put content2 here</div>,
        ];
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    /**
     * get the index of current tag
     */
    const [currentTag, setCurrentTag] = useState(props.selectedTag);
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTIONS START **** ------------------------------------ */
    /**
     * set an new index as current tag index
     * @param index index of tag
     */
    const setNewCurrentTag = (index: number) => setCurrentTag(index);
    /* <------------------------------------ **** FUNCTIONS END **** ------------------------------------ */

    const getTagCardByStyleIndex = (): JSX.Element => {
        switch (styleIndex) {
            case 1: {
                return (
                    <div className={style.tagCard_container} style={{ width, height }}>
                        <div className={style.tagCard_tagWrapper}>
                            {tagSet.map((item, index) => (
                                <div
                                    className={
                                        item === tagSet[currentTag]
                                            ? style.tagCard_tag__selected
                                            : style.tagCard_tag__notSelected
                                    }
                                    style={{
                                        borderRightWidth:
                                            index === tagSet.length - 1 ? "0" : "0.1rem",
                                    }}
                                    key={`${index}tagSet`}
                                    onClick={() => setNewCurrentTag(index)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div
                            style={{
                                width,
                                height: `calc(${height} - 3.8rem)`,
                                overflow: !scroll ? "hidden" : "scroll",
                                overflowX: "hidden",
                            }}
                        >
                            {props.content !== undefined ? props.content[currentTag] : null}
                        </div>
                    </div>
                );
            }
            case 2: {
                return (
                    <div className={style.tagCard_container} style={{ width, height }}>
                        <div>
                            {tagSet.map((item, index) => (
                                <div
                                    className={
                                        item === tagSet[currentTag]
                                            ? style.tagCard_tag2__selected
                                            : style.tagCard_tag2__notSelected
                                    }
                                    style={{
                                        borderRightWidth:
                                            index === tagSet.length - 1 ? "0" : "0.1rem",
                                    }}
                                    key={`${index}tagSet`}
                                    onClick={() => setNewCurrentTag(index)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div
                            style={{
                                width,
                                height: `calc(${height} - 2.7rem)`,
                                overflow: !scroll ? "hidden" : "scroll",
                                overflowX: "hidden",
                            }}
                        >
                            {props.content !== undefined ? props.content[currentTag] : null}
                        </div>
                    </div>
                );
            }
            default:
                return <div />;
        }
    };

    return getTagCardByStyleIndex();
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
