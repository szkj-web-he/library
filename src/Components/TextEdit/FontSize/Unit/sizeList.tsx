/**
 * @file FontSizeList
 * @date 2022-03-08
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-08
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { useSlateStatic } from "slate-react";
import { Icon, ScrollComponent } from "../../../..";
import { fontSizeList } from "../../../../DefaultData/TextEditor/fontSize";
import { setRichMark, removeRichMark, isMarkActive } from "../../Unit/command";
import styles from "../style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const FontSizeList: React.FC = () => {
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const editor = useSlateStatic();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */

    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const onClick = (fontSize?: number) => {
        if (fontSize) {
            setRichMark(editor, "font-size", fontSize);
        } else {
            removeRichMark(editor, "font-size");
        }
    };

    const fontSize = isMarkActive(editor, "font-size") as number | false;

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <ScrollComponent
            className={styles.fontSizeList_wrap}
            bodyClassName={styles.fontSizeList_body}
        >
            <div className={styles.fontSizeList_default} onClick={() => onClick()}>
                default
            </div>
            {fontSizeList.map((item) => {
                const icon =
                    fontSize && fontSize === item ? (
                        <Icon type="right" className={styles.fontSizeList_icon} />
                    ) : (
                        <></>
                    );
                return (
                    <div
                        className={styles.fontSizeList_item}
                        key={`fontSize-${item}`}
                        style={{ fontSize: `${item}px` }}
                        onClick={() => onClick(item)}
                    >
                        {icon}
                        {item}px
                    </div>
                );
            })}
        </ScrollComponent>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
