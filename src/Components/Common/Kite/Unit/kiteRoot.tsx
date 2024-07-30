/**
 * @file
 * @date 2021-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { Fragment, useEffect, useId, useRef, useState } from "react";
import { useLatest } from "../../../../Hooks/useLatest";
import styles from "../../Portal/style.module.scss";
import { findDomFn } from "./findDomNode";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface KiteRootProps {
    /**
     *
     */
    children: React.ReactElement | Element;
    /**
     * 通讯id
     */
    getRootEl: (el: Element | null) => void;
    /**
     * 下拉框是否可见
     */
    show: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const KiteRoot: React.FC<KiteRootProps> = ({ children, getRootEl }) => {
    KiteRoot.displayName = "KiteRoot";

    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const hashKey = useId();

    const [showCount, setShowCount] = useState<number>();
    const showCountRef = useRef<number>();

    const ref = useRef<HTMLElement | null>(null);

    const getRootElRef = useLatest(getRootEl);

    useEffect(() => {
        if (children instanceof Element) {
            getRootElRef.current(children);
            setShowCount(undefined);
        } else {
            showCountRef.current = 1 + (showCountRef.current ?? 0);
            setShowCount(showCountRef.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]);

    useEffect(() => {
        if (showCount) {
            const el = ref.current;
            if (!el) {
                return;
            }
            const node = el.parentElement;

            const childrenList = node?.children;

            if (!childrenList) {
                return;
            }

            for (const childrenItem of childrenList) {
                if (childrenItem !== el) {
                    const element = childrenItem as HTMLElement;
                    const status = findDomFn(element, hashKey);
                    if (status) {
                        getRootElRef.current(element);
                    }
                }
            }

            setShowCount(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showCount, hashKey]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */

    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    if (children instanceof Element) {
        return <></>;
    }

    return (
        <Fragment key={`kiteRoot${hashKey}`}>
            {children}
            {showCount ? <i ref={ref} className={styles.kiteRoot_i} /> : <></>}
        </Fragment>
    );
};
KiteRoot.displayName = "KiteRoot";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default KiteRoot;
