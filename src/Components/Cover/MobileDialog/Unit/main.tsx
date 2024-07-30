/**
 * @file 手机端对话框的主体
 * @date 2023-06-13
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-13
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { useEffect, useLayoutEffect, useState } from "react";
import { Transition, useEventListener } from "../../../..";
import classNames from "../../../../Unit/classNames";
import styles from "../style.module.scss";
import { MobileDialogProps } from "./type";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends Omit<MobileDialogProps, "removeOnHidden" | "show"> {
    /**
     * 是否可见
     */
    show: boolean;
    /**
     * 当过渡结束的时候
     */
    handleTransitionEnd: (res: "bg" | "main") => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    children,
    className,
    bodyClassName,
    bodyStyle,
    show,
    onCloseClick,
    zIndex,
    style,
    handleTransitionEnd,
    ...props
}) => {
    Temp.displayName = "MobileDialogMain";
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [visible, setVisible] = useState(show);
    /**
     * 过渡动画是否结束
     */
    /**
     * 背景
     */
    const [bgTransitionEnd, setBgTransitionEnd] = useState<boolean>();
    /**
     * 弹框
     */
    const [mainTransitionEnd, setMainTransitionEnd] = useState<boolean>();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEventListener("keyup", (e) => {
        if (e.key === "Escape" && show) {
            onCloseClick?.(true);
        }
    });

    useLayoutEffect(() => {
        setBgTransitionEnd(false);
        setMainTransitionEnd(false);
    }, [show]);

    useEffect(() => {
        setVisible(show);
    }, [show]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const isNone = () => {
        if (show) {
            return false;
        }

        if (bgTransitionEnd || mainTransitionEnd) {
            return true;
        }
        return false;
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={classNames(className, styles.mobileDialog_wrapper)}
            style={{
                ...style,
                zIndex,
                ...{ display: isNone() ? "none" : undefined },
            }}
            {...props}
        >
            <Transition
                show={visible}
                animationType="fade"
                className={styles.mobileDialog_bg}
                firstAnimation
                handleTransitionEnd={() => {
                    handleTransitionEnd("bg");
                    setBgTransitionEnd(true);
                }}
                onClick={() => {
                    onCloseClick?.();
                }}
            />
            <Transition
                show={visible}
                firstAnimation
                animationType="inBottom"
                className={classNames(bodyClassName, styles.mobileDialog_body)}
                style={bodyStyle}
                handleTransitionEnd={() => {
                    handleTransitionEnd("main");
                    setMainTransitionEnd(true);
                }}
            >
                {children}
            </Transition>
        </div>
    );
};
Temp.displayName = "MobileDialogMain";
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
