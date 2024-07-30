/**
 * @file
 * @date 2021-08-19
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-19
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { Transition, Icon } from "../../..";
import { Label, ListItem, mapList } from "./Unit/mapList";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface AccordionProps {
    /**
     * labels
     */
    labels?: {
        content: React.ReactNode;
        id: string | number;
        indent?: string;
        child?: Label[];
    }[];
    /**
     * indent of this component
     */
    indent?: string;
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * width of this component
     */
    width?: string;
    /**
     * height of this component
     */
    height?: string;
    /**
     * handle selected Change methods
     */
    handleSelectedChange?: (
        id: string | number,
        subsId: (string | number)[],
        parentsId: (string | number)[],
    ) => void;
    /**
     * Deselect the selected status
     */
    toggleSelected?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Accordion: React.FC<AccordionProps> = ({
    labels,
    className,
    style,
    indent = "0",
    width,
    height,
    handleSelectedChange,
    toggleSelected = true,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const listRef = useRef<ListItem[]>([]);

    const [list, setList] = useState(() => {
        listRef.current = mapList([], labels ?? [], indent);
        return [...listRef.current];
    });

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const arr = mapList(listRef.current, labels ?? [], indent);
        if (JSON.stringify(arr) !== JSON.stringify(listRef.current)) {
            listRef.current = [...arr];

            setList([...listRef.current]);
        }
    }, [indent, labels]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const toggleSubVisibleStatus = (arr: ListItem[], findId: string | number) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === findId) {
                arr[i].show = toggleSelected ? !arr[i].show : true;
            } else {
                arr[i].show = arr[i].subsId.includes(findId) ? true : false;
                if (arr[i].child) {
                    toggleSubVisibleStatus(arr[i].child as ListItem[], findId);
                }
            }
        }
    };

    const handleClick = (item: ListItem) => {
        toggleSubVisibleStatus(list, item.id);
        setList([...list]);
        handleSelectedChange && handleSelectedChange(item.id, item.subsId, item.parentsId);
    };

    const listContent = () => {
        const fn = (list: ListItem[]) =>
            list.map((index) => {
                let subContent: React.ReactNode = null;
                if (index.child) {
                    subContent = fn(index.child);
                }

                return (
                    <li
                        key={index.id}
                        className={
                            styles.accordion_item +
                            (subContent ? ` ${styles.accordion_itemContent__hasChild}` : "")
                        }
                    >
                        <div
                            className={
                                styles.accordion_itemContent +
                                (index.show ? ` ${styles.accordion_itemContent__active}` : "")
                            }
                            style={{
                                paddingLeft: index.indent,
                            }}
                            onClick={() => {
                                handleClick(index);
                            }}
                        >
                            <div className={styles.accordion_itemContext}>{index.content}</div>
                            {subContent && (
                                <Icon type="open" className={styles.accordion_itemIcon} />
                            )}
                        </div>
                        {subContent && (
                            <Transition show={index.show} animationType="taller">
                                <ol className={styles.accordion_subContainer}>{subContent}</ol>
                            </Transition>
                        )}
                    </li>
                );
            });
        return <ul className={styles.accordion_container}>{fn(list)}</ul>;
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={styles.accordion_wrap + (className ? ` ${className}` : "")}
            style={Object.assign({}, style, { width, height })}
        >
            {listContent()}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
