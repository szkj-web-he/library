/**
 * @file
 * @date 2023-02-01
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { forwardRef, ForwardRefRenderFunction } from "react";
import { Transition } from "../../..";
import classNames from "../../../Unit/classNames";
import { TransitionProps } from "../../Common/Transition";
import CommonDialog from "../CommonDialog";
import { useDialogGroupContext } from "../Unit/context";
import { DialogCommonProps } from "../Unit/type";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface DialogItemProps
    extends DialogCommonProps,
        Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /**
     * 隐藏的时候删除节点
     * * 默认值 false
     */
    removeOnHidden?: boolean;
    /**
     * 是否有关闭按钮
     * * 第一个item默认是有
     * * 第二个item默认是没有
     */
    closeIcon?: boolean;

    /**
     * 是否有 返回按钮
     */
    backIcon?: boolean;
    /**
     * 当返回按钮被点击时
     */
    onBackClick?: () => void;

    /**
     * 当关闭按钮被点击时
     */
    onCloseClick?: (isEsc?: true) => void;
    /**
     * 按钮
     */
    buttons?: React.ReactNode;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

/**
 * @beta 测试版(接触真实项目环境,看看有没有需要添加的功能)
 */
const Temp: ForwardRefRenderFunction<HTMLDivElement | null, DialogItemProps> = (
    {
        title,
        description,
        children,
        closeIcon,
        removeOnHidden = false,
        className,
        onCloseClick,
        type = "none",
        size = "regular",
        buttons,
        backIcon,
        onBackClick,
        ...props
    },
    ref,
) => {
    Temp.displayName = "DialogItem";
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { activeIndex, show, handleTransitionEnd, handleTransitionCancel } =
        useDialogGroupContext();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const _props = props as DialogItemProps & { index?: number };
    const { index } = _props;

    _props.index = undefined;
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    let animationType: TransitionProps["animationType"] = "fade";

    let selfShow = false;
    if (activeIndex.to === index) {
        selfShow = show;

        if (activeIndex.isAnimate) {
            if (activeIndex.from === undefined) {
                animationType = "zoom";
            }
        } else {
            animationType = undefined;
        }
    }

    if (show === false && activeIndex.to === index) {
        animationType = "zoom";
    }

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={classNames(className, styles.dialogItem_wrapper)} {...props} ref={ref}>
            <Transition
                show={selfShow}
                animationType={animationType}
                removeOnHidden={removeOnHidden}
                cache={false}
                className={styles.dialogItem_body}
                handleTransitionEnd={handleTransitionEnd}
                handleTransitionCancel={handleTransitionCancel}
            >
                <CommonDialog
                    type={type}
                    title={title}
                    closeIcon={closeIcon ?? index === 0}
                    description={description}
                    size={size}
                    buttons={buttons}
                    onClose={onCloseClick}
                    backIcon={backIcon}
                    onBack={onBackClick}
                >
                    {children}
                </CommonDialog>
            </Transition>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

export const DialogItem = forwardRef(Temp);
DialogItem.displayName = "DialogItem";
