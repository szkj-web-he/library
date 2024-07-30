/**
 * @file DialogGroup的主体
 * @date 2023-02-06
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-06
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import {
    cloneElement,
    forwardRef,
    ForwardRefRenderFunction,
    Fragment,
    isValidElement,
    startTransition,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { DialogGroupForwardEvents, DialogGroupProps } from "..";
import { Transition } from "../../../..";
import { useLatest } from "../../../../Hooks/useLatest";
import classNames from "../../../../Unit/classNames";
import { readChildElement } from "../../../../Unit/readChild";
import { DialogItem } from "../../DialogItem";
import { DialogGroupContext } from "../../Unit/context";
import { dialogGroupActiveProps } from "../../Unit/type";
import styles from "../style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
interface TempProps extends Omit<DialogGroupProps, "removeOnHidden"> {
    /**
     *
     * @param res 哪个容器过渡结束了
     * @param status 结束了哪个状态
     * @returns
     */
    handleTransitionEnd: (res: "bg" | "main", status: boolean) => void;
}
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: ForwardRefRenderFunction<DialogGroupForwardEvents, TempProps> = (
    {
        show = false,
        zIndex = 99,
        children,
        startIndex,
        handleTransitionEnd,
        className,
        onChange,
        ...props
    },
    ref,
) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    /**
     * 当前活跃的item的uuid
     */
    const [activeIndex, setActiveIndex] = useState<dialogGroupActiveProps>({
        from: undefined,
        to: undefined,
        isAnimate: true,
    });

    const startIndexRef = useLatest(startIndex ?? 0);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        if (show) {
            setActiveIndex(() => {
                return {
                    from: undefined,
                    to: startIndexRef.current,
                    isAnimate: true,
                };
            });
        } else {
            startTransition(() => {
                setActiveIndex(() => {
                    return {
                        from: undefined,
                        to: undefined,
                        isAnimate: true,
                    };
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    useImperativeHandle(ref, () => ({
        goTo: (index: number, isAnimate = true) => {
            let length = 0;
            readChildElement(children).forEach((item) => {
                if (item.displayName === DialogItem.displayName) {
                    ++length;
                }
            });
            if (index >= 0 && index < length) {
                setActiveIndex((pre) => {
                    onChange?.(index, pre.to);
                    return {
                        isAnimate,
                        from: pre.to,
                        to: index,
                    };
                });
            } else {
                console.error("跳转的界面不存在");
            }
        },
        next: () => {
            setActiveIndex((pre) => {
                let length = 0;
                readChildElement(children).forEach((item) => {
                    if (item.displayName === DialogItem.displayName) {
                        ++length;
                    }
                });

                const preTo = (pre.to ?? 0) + 1;
                const toIndex = preTo >= length ? pre.to : preTo;
                onChange?.(toIndex ?? 0, pre.to);
                return {
                    isAnimate: true,
                    from: pre.to,
                    to: toIndex,
                };
            });
        },
        prev: () => {
            setActiveIndex((pre) => {
                const preTo = (pre.to ?? 0) - 1;
                const toIndex = preTo < 0 ? 0 : preTo;
                onChange?.(toIndex, pre.to);
                return {
                    isAnimate: true,
                    from: pre.to,
                    to: toIndex,
                };
            });
        },
    }));

    /**
     * 是不是有效的children
     *
     * 1. 子必须是 DialogItem
     * 2. DialogItem的uuid一定不能重复
     */

    /**
     * 是不是有效的children
     *
     * 1. 子必须是 DialogItem
     */

    const childrenList = readChildElement(children).map((item, index) => {
        if (item.displayName !== DialogItem.displayName && process.env.NODE_ENV === "development") {
            console.warn("children传的不对,DialogGroup的children不正确");
        }

        let el = item.element;
        if (item.displayName === DialogItem.displayName && isValidElement(el)) {
            el = cloneElement(el, {
                ...(el.props as Record<string, unknown>),
                ...{ index },
            });
        }

        return <Fragment key={index}>{el}</Fragment>;
    });

    return (
        <div
            className={classNames(styles.dialogGroup_wrapper, className)}
            style={{ zIndex }}
            {...props}
        >
            <Transition
                show={show}
                animationType="fade"
                firstAnimation={true}
                className={styles.dialogGroup_bg}
                handleTransitionEnd={(status) => handleTransitionEnd("bg", status)}
                handleTransitionCancel={(status) => handleTransitionEnd("bg", status)}
            />
            <DialogGroupContext.Provider
                value={{
                    activeIndex,
                    startIndex: startIndex ?? 0,
                    show,
                    handleTransitionCancel: (status) => {
                        handleTransitionEnd("main", status);
                    },
                    handleTransitionEnd: (status) => {
                        handleTransitionEnd("main", status);
                    },
                }}
            >
                {childrenList}
            </DialogGroupContext.Provider>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
const DialogGroupMain = forwardRef(Temp);
DialogGroupMain.displayName = "DialogGroupMain";
export default DialogGroupMain;
