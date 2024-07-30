/**
 * @file
 * @date 2022-08-23
 * @author
 * @lastModify  2022-08-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "../../../../../Unit/classNames";
import { ScrollComponent } from "../../../../DataDisplay/Scroll";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export type ColumnType = "H" | "h" | "m" | "s" | "a";

export interface TimeColumnChangeProps {
    val: string | number;
    type: ColumnType;
}

export interface TimeColumnProps {
    className?: string;
    bodyClassName?: string;
    value: string;
    type: ColumnType;
    use12Hours?: boolean;
    onChange?: (val: TimeColumnChangeProps) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const TimeColumn: React.FC<TimeColumnProps> = ({
    value,
    type,
    use12Hours = false,
    className,
    bodyClassName,
    onChange,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [val, setVal] = useState<string | number>(Number(value));

    const currentNode = useRef<HTMLLIElement | null>(null);

    const currentScrollNode = useRef<HTMLElement>();

    const timeoutList = useRef<number[]>([]);

    const behavior = useRef<ScrollBehavior>("auto");

    const { t } = useTranslation();

    useEffect(() => {
        scrollView(behavior.current);

        () => {
            timeoutList.current.forEach((item) => {
                window.clearTimeout(item);
            });
        };
    }, []);

    useLayoutEffect(() => {
        behavior.current =
            Number(currentNode.current?.innerText) !== Number(value) ? "auto" : "smooth";
        setVal(Number(value));
    }, [value]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const scrollView = (behavior: ScrollBehavior) => {
        if (currentNode.current) {
            const scrollNode = currentNode.current.parentElement?.parentElement;
            if (scrollNode) {
                currentScrollNode.current = scrollNode;
                timeoutList.current.push(
                    window.setTimeout(() => {
                        currentNode.current &&
                            scrollNode.scrollTo({
                                left: 0,
                                top: currentNode.current.offsetTop,
                                behavior,
                            });
                    }),
                );
            }
        }
    };

    const createList = (length: number) => {
        return length > 0
            ? Array.from({ length }, (_, i) => {
                  if (length === 12) {
                      if (i === 0) {
                          return `12`;
                      } else {
                          return i <= 9 ? `0${i}` : `${i}`;
                      }
                  }

                  return i <= 9 ? `0${i}` : `${i}`;
              })
            : [];
    };

    const handleItemClick = (even: React.MouseEvent<HTMLLIElement>) => {
        behavior.current = "smooth";
        const valNode = even.currentTarget.children.item(0) as HTMLSpanElement;
        const part = valNode.innerText === "AM" || valNode.innerText === "上午" ? "0" : "1";
        const currentVal = isNaN(Number(valNode.innerText)) ? part : valNode.innerText;

        if (Number(currentVal) === Number(val)) {
            return;
        }
        setVal(Number(currentVal));
        onChange?.({
            val: currentVal,
            type,
        });
    };

    const renderColumn = (type: ColumnType) => {
        let arr: string[] = [];

        switch (type) {
            case "H":
            case "h":
                {
                    arr = createList(use12Hours ? 12 : 24);
                }
                break;
            case "m":
            case "s":
                {
                    arr = createList(60);
                }
                break;
            case "a": {
                arr = ["0", "1"];
            }
        }

        return arr.map((item, index) => (
            <li
                ref={(element) => {
                    if (val === Number(item) && (currentNode.current = element))
                        scrollView(behavior.current);
                }}
                className={classNames(styles.picker_time_cell, {
                    [`${styles.picker_time_cell__selected}`]: val === Number(item),
                })}
                key={index}
                onClick={handleItemClick}
            >
                <span className={classNames(styles.picker_time_cell_inner)}>
                    {arr.length === 2
                        ? item === "0"
                            ? t("TimePickerV2Component.AM")
                            : t("TimePickerV2Component.PM")
                        : item}
                </span>
            </li>
        ));
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <ScrollComponent bodyClassName={classNames(className)} width="5.6rem" height="22.4rem">
            <ul className={classNames(styles.picker_time_column, bodyClassName)}>
                {renderColumn(type)}
            </ul>
        </ScrollComponent>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
