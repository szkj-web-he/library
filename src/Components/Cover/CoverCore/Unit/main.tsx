/**
 * @file
 * @date 2023-12-13
 * @author xuejie.he
 * @lastModify xuejie.he 2023-12-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { forwardRef } from "react";
import { CoverCoreProps } from "..";
import { Transition } from "../../../..";
import styles from "../style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends Omit<CoverCoreProps, "removeOnHidden"> {
    handleTransitionEnd: (res: "bg" | "main", show: boolean) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<HTMLDivElement | null, TempProps>(
    ({ handleTransitionEnd, zIndex, show = false, handleBgClick, children, ...props }, ref) => {
        Temp.displayName = "CoverCoreTemp";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
        /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
        /************* This section will include this component general function *************/
        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
        return (
            <div className={styles.coverCore_wrapper} style={{ zIndex }}>
                <Transition
                    show={show}
                    animationType="fade"
                    className={styles.coverCore_bg}
                    firstAnimation={true}
                    onClick={handleBgClick}
                    handleTransitionEnd={(status) => handleTransitionEnd("bg", status)}
                    handleTransitionCancel={(status) => handleTransitionEnd("bg", status)}
                />

                <Transition
                    show={show}
                    animationType="zoom"
                    firstAnimation={true}
                    handleTransitionEnd={(status) => handleTransitionEnd("main", status)}
                    handleTransitionCancel={(status) => handleTransitionEnd("main", status)}
                    {...props}
                    ref={ref}
                >
                    {children}
                </Transition>
            </div>
        );
    },
);
Temp.displayName = "CoverCoreTemp";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
