/**
 * @file
 * @date 2021-12-21
 * @author xuejie.he
 * @lastModify xuejie.he 2021-12-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { forwardRef } from "react";
import { ColProps } from "../Col";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface RowProps {
    /**
     * children of this component
     */
    children: React.ReactElement<ColProps> | Array<React.ReactElement<ColProps>>;
    /**
     * Vertical align of this component
     */
    align?: "top" | "middle" | "bottom" | "stretch";
    /**
     * justify align of this component
     */
    justify?: "center" | "left" | "right";
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * Is the beam visible?
     */
    debug?: boolean;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Row: React.FC<RowProps> = forwardRef<HTMLDivElement, RowProps>(
    ({ children, align = "top", justify = "left", className, style, debug, ...props }, ref) => {
        Row.displayName = "Row";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/

        const arr = [styles.gridRow_wrap];
        arr.push(styles[`gridRow_align${align}`]);
        arr.push(styles[`gridRow_justify${justify}`]);
        className && arr.push(className);

        let beam = <></>;
        if (debug) {
            arr.push(styles.gridRow_wrap_debug);
            beam = (
                <ul className={styles.gridRow_debugWrap}>
                    {new Array(12).fill("").map((_, n) => {
                        return <li className={styles.gridRow_debugItem} key={`rowDebug${n}`} />;
                    })}
                </ul>
            );
        }
        return (
            <div className={arr.join(" ")} ref={ref} {...props} style={style}>
                {children}
                {beam}
            </div>
        );

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
Row.displayName = "Row";
