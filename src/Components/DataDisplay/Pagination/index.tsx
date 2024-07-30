/**
 * @file pagination component
 * @date 2021-07-21
 * @author xuejie.he
 * @lastModify xuejie.he 2021-07-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "../../..";
import classNames from "../../../Unit/classNames";

import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface PaginationProps {
    /**
     * total of this component
     */
    total?: number;
    /**
     * current page of this component
     */
    defaultCurrentPage?: number;
    /**
     * How many pages are displayed at a time
     */
    maxLength?: number;
    /**
     * Records per page
     */
    rows?: number;
    /**
     * handle pagination change
     */
    handleChange?: (res: number) => void;
    /**
     * handle next page click methods
     */
    handleNextClick?: () => void;
    /**
     * handle next page group click methods
     */
    handleNextGroupClick?: () => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Pagination: React.FC<PaginationProps> = ({
    total = 2000,
    defaultCurrentPage = 1,
    maxLength = 5,
    rows = 20,
    handleChange,
    handleNextClick,
    handleNextGroupClick,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [list, setList] = useState<number[]>();

    const pageCount = useMemo(() => Math.ceil(total / rows), [total, rows]);

    const [startVal, setStartVal] = useState(() => {
        const medianVal = Math.ceil(maxLength / 2);
        const marginLeft = medianVal - 1;
        return defaultCurrentPage - marginLeft < 1 ? 1 : defaultCurrentPage - marginLeft;
    });
    const [endVal, setEndVal] = useState(() => {
        const medianVal = Math.ceil(maxLength / 2);
        const marginRight = maxLength - medianVal;
        return defaultCurrentPage + marginRight > pageCount
            ? pageCount
            : defaultCurrentPage + marginRight;
    });

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const medianVal = Math.ceil(maxLength / 2);
        const marginLeft = medianVal - 1;
        const marginRight = maxLength - medianVal;
        if (pageCount > maxLength) {
            if (defaultCurrentPage <= medianVal) {
                setEndVal(Math.min(maxLength, pageCount));
                setStartVal(1);
            } else if (defaultCurrentPage + marginRight >= pageCount) {
                const starVal = pageCount - (maxLength - 1);
                setEndVal(pageCount);
                setStartVal(starVal);
            } else {
                setEndVal(defaultCurrentPage + marginRight);
                setStartVal(defaultCurrentPage - marginLeft);
            }
        } else {
            setEndVal(pageCount);
            setStartVal(1);
        }
    }, [defaultCurrentPage, maxLength, pageCount]);

    useEffect(() => {
        const arr: number[] = [];
        for (let i = startVal; i <= endVal; i++) {
            arr.push(i);
        }
        setList([...arr]);
    }, [startVal, endVal]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const switchPage = (val: number) => {
        if (val !== defaultCurrentPage) {
            handleChange?.(val);
        }
    };

    const nextPage = () => {
        handleNextClick?.();
        if (defaultCurrentPage + 1 > pageCount) {
            if (defaultCurrentPage !== pageCount) {
                handleChange?.(pageCount);
            }
        } else {
            handleChange?.(defaultCurrentPage + 1);
        }
    };

    const prePage = () => {
        if (defaultCurrentPage - 1 <= 0) {
            if (defaultCurrentPage !== 1) {
                handleChange?.(1);
            }
        } else {
            handleChange?.(defaultCurrentPage - 1);
        }
    };

    const nextGroupPage = () => {
        handleNextGroupClick?.();
        if (endVal === pageCount) return;
        let end = startVal === endVal ? endVal + maxLength * 2 : endVal + maxLength - 1;
        if (end >= pageCount) {
            end = pageCount;
        }
        const start = end - (maxLength - 1);

        setStartVal(start);
        setEndVal(end);
    };

    const preGroupPage = () => {
        if (startVal === 1) return;

        let start = startVal === endVal ? startVal - maxLength * 2 : startVal - maxLength + 1;
        if (start <= 1) {
            start = 1;
        }

        const end = start + maxLength - 1;

        setStartVal(start);
        setEndVal(end);
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.pagination_container}>
            <div
                onClick={preGroupPage}
                className={classNames(styles.pagination_preColumnBtn, {
                    [`${styles.pagination_preColumnBtn__gray}`]: startVal <= 1,
                })}
            >
                <Icon type="previousPage" className={styles.pagination_icon} />
            </div>

            <div
                className={classNames(styles.pagination_preBtn, {
                    [`${styles.pagination_preBtn__gray}`]: defaultCurrentPage <= 1,
                })}
                onClick={prePage}
            >
                <Icon type="open" className={styles.pagination_icon} />
            </div>

            <ul className={styles.pagination_listContainer}>
                {list?.map((index, n) => (
                    <li
                        key={n}
                        className={classNames(styles.pagination_itemContainer, {
                            [`${styles.pagination_itemActive}`]: index === defaultCurrentPage,
                        })}
                        onClick={() => {
                            switchPage(index);
                        }}
                    >
                        {pageCount > 5 && n === 4 && index < pageCount ? (
                            <div>...</div>
                        ) : (
                            <div> {index}</div>
                        )}
                    </li>
                ))}
            </ul>

            <div
                className={classNames(styles.pagination_nextBtn, {
                    [`${styles.pagination_nextBtn__gray}`]: defaultCurrentPage + 1 > pageCount,
                })}
                onClick={nextPage}
            >
                <Icon type="open" className={styles.pagination_icon} />
            </div>

            <div
                onClick={nextGroupPage}
                className={classNames(styles.pagination_nextColumnBtn, {
                    [`${styles.pagination_nextColumnBtn__gray}`]: endVal >= pageCount,
                })}
            >
                <Icon type="nextPage" className={styles.pagination_icon} />
            </div>
        </div>
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
