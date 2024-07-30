/**
 * @file 树的item
 * @date 2023-03-06
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-06
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import { Icon, Transition, useUpdateEffect } from "../../../..";
import classNames from "../../../../Unit/classNames";
import { readChildElement } from "../../../../Unit/readChild";
import { useChangeCheck } from "../Hooks/useChangeCheck";
import { Action_Type } from "../Hooks/useCheckTree";
import { useMsg } from "../Hooks/useMsg";
import styles from "../style.module.scss";
import { useLatest } from "./../../../../Hooks/useLatest";
import CheckBtn from "./checkBtn";
import {
    CheckTreePostMsg,
    useCheckTreeContext,
    useCheckTreePostMsg,
    useCheckTreeState,
} from "./context";
import { getChildStatus } from "./getChildStatus";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
    /**
     * 当children有值时
     * 会被识别为有子item
     */
    children?: React.ReactNode;
    /**
     * 当前item的内容
     */
    content?: React.ReactNode;
    /**
     * 是否展开
     * 当有children的时候
     */
    open?: boolean;
    /**
     * 当前是否被选中
     * * 默认值为false
     */
    active?: boolean;
    /**
     * 唯一标识
     */
    uuid: string;
    /**
     * 当打开状态被改变时
     */
    handleOpenChange?: (openValue: boolean) => void;
    /**
     * 当选中状态被改变时
     */
    handleActiveChange?: (activeChange: boolean) => void;
    /**
     * 是否时禁用 的
     */
    disable?: boolean;
    /**
     * 是否为最后一个子级
     * 不会再有子
     *
     * * 默认自动判断 但是如果children里是自己封装的组件，无法对自定义封装的组件进行结构
     * * 所以如果是自定义封装的组件,请自行传入 是否为"树叶"的属性
     */
    isLeaf?: boolean;
}

/**
 * 复选树的item的转发事件
 */
export interface CheckTreeItemForwardEvent {
    /**
     * 改变item的展开状态
     * 前提是: 它有children的话
     */
    changeOpenStatus: (res: boolean) => void;
    /**
     * 改变是否可见的状态
     */
    changeActiveStatus: (res: boolean) => void;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.ForwardRefRenderFunction<CheckTreeItemForwardEvent | null, TempProps> = (
    {
        className,
        children,
        open = false,
        content,
        active,
        uuid,
        handleOpenChange,
        handleActiveChange,
        disable,
        isLeaf,
        ...props
    },
    events,
) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { disable: globalDisable, values } = useCheckTreeContext();

    const [checked, setChecked] = useChangeCheck(uuid, active);

    /**
     * 子级的所有item的选中状态
     * 0 => 全没选
     * 1 => 全选
     * 2 => 有选中的
     */
    const [childStatus, setChildStatus] = useState<0 | 1 | 2>(0);

    /**
     * 是否展开
     */
    const [openState, setOpenState] = useState(open);

    /**
     * 保证禁用的优先级
     * 当局部的设置了的话
     * 就不再去访问全局的
     */
    const disableVal = useMemo(() => {
        return disable ?? globalDisable;
    }, [globalDisable, disable]);

    /**
     * 是否为最后一级
     */
    const AutoIsLeaf = useMemo(() => {
        const childrenData = readChildElement(children);
        /***
         * 有没有子item
         */
        return !childrenData.some((item) => {
            return item.displayName === CheckTreeItem.displayName;
        });
    }, [children]);

    /**
     * 获取通讯信息
     */
    const { deep, siblings } = useCheckTreePostMsg();

    const { dispatch, checkedDataRef } = useCheckTreeState();

    const dispatchRef = useLatest(dispatch);

    const uuidRef = useRef<{
        from?: string;
        to?: string;
    }>({
        from: undefined,
        to: undefined,
    });

    const [msgId, subChild] = useMsg(
        uuid,
        (res) => {
            setChecked(res);
            handleActiveChange?.(res);
            /**
             * 修改全局state的状态
             */
            dispatch({
                type: Action_Type.SwitchItemCheckStatus,
                payload: {
                    value: res,
                    id: uuid,
                },
            });
        },
        setChildStatus,
        isLeaf ?? AutoIsLeaf,
    );
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useUpdateEffect(() => {
        setOpenState(open);
    }, [open]);

    useEffect(() => {
        setChildStatus(getChildStatus(subChild.current, checkedDataRef.current));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uuid, active, values]);

    /**
     * 删除state里已经废弃的uuid
     */
    useEffect(() => {
        if (uuidRef.current.from) {
            dispatchRef.current({
                type: Action_Type.removeItem,
                payload: {
                    id: uuidRef.current.from,
                },
            });
        }
        uuidRef.current.from = uuidRef.current.to;
        uuidRef.current.to = uuid;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uuid]);

    /**
     * 告诉父级 我的身份
     */
    useEffect(() => {
        let fromIndex = -1;
        let toIndex = -1;
        for (let i = 0; i < siblings.current.length; ++i) {
            const item = siblings.current[i];
            if (item === uuidRef.current.from) {
                fromIndex = i;
            } else if (item === uuidRef.current.to) {
                toIndex = i;
            }
        }

        if (toIndex < 0) {
            /**
             * 添加子
             */
            siblings.current.push(uuid);
        }

        if (fromIndex >= 0) {
            /**
             * 删除子
             */
            siblings.current.splice(fromIndex, 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uuid]);

    useImperativeHandle(events, () => {
        return {
            changeOpenStatus: (res) => {
                setOpenState(res);
            },
            changeActiveStatus: (res) => {
                setChecked(res);
            },
        };
    });

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /**
     * 当下拉按钮被点击时
     */
    const handleOpenBtnClick = () => {
        if (disableVal) {
            return;
        }
        setOpenState((pre) => {
            handleOpenChange?.(!pre);
            return !pre;
        });
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    /**
     * 下拉三角
     */
    let openBtn = <></>;
    if (!(isLeaf ?? AutoIsLeaf)) {
        openBtn = (
            <div
                className={classNames(styles.checkTreeItem_openBtn, {
                    [styles.checkTreeItem_openBtnActive]: openState,
                })}
                onClick={handleOpenBtnClick}
            >
                <Icon type="next" className={styles.checkTreeItem_openIcon} />
            </div>
        );
    }

    /**
     * 计算缩进值
     */
    let paddingLeft = ``;
    /**
     * 如果当前的深度大于0
     */
    if (deep) {
        /**
         * 先加个40px
         * 因为第一层的缩进是一个复选框和一个下拉菜单
         *
         */
        paddingLeft += `calc(4rem`;

        if (deep - 1 > 0) {
            /**
             * 后续的缩进  按一个复选框来计算
             *
             */
            paddingLeft += ` + 2rem * ${deep - 1}`;
        }

        if (isLeaf ?? AutoIsLeaf) {
            paddingLeft += ")";
        } else {
            /**
             * 如果拥有第二层
             * 则得向左缩进 一个下拉三角
             */
            paddingLeft += " - 0.4rem - 2rem)";
        }
    }

    /**
     * 从下拉复选树这里过来的参数
     */
    // const { lineHeight } = useParamsToCheckTree();
    // lineHeight;
    return (
        <>
            <div className={classNames(styles.checkTreeItem_wrapper, className)} {...props}>
                <div
                    className={styles.checkTreeItem_main}
                    style={{
                        paddingLeft,
                    }}
                >
                    {openBtn}
                    <CheckBtn
                        msgId={msgId}
                        uuid={uuid}
                        hasSubItem={!(isLeaf ?? AutoIsLeaf)}
                        checked={checked}
                        childStatus={childStatus}
                        disable={disableVal ?? false}
                        handleStatusChange={(res) => {
                            handleActiveChange?.(res);
                            setChecked(res);
                            dispatch({
                                type: Action_Type.SwitchItemCheckStatus,
                                payload: {
                                    value: res,
                                    id: uuid,
                                },
                            });
                        }}
                    />
                    <div className={styles.checkTreeItem_content}>{content}</div>
                </div>
            </div>
            {isLeaf ?? AutoIsLeaf ? (
                <></>
            ) : (
                <Transition
                    show={openState}
                    removeOnHidden={false}
                    cache={false}
                    animationType="taller"
                    className={styles.checkTreeItem_subItems}
                >
                    <CheckTreePostMsg.Provider
                        value={{
                            deep: deep + 1,
                            pId: uuid,
                            siblings: subChild,
                            pMsgId: msgId,
                        }}
                    >
                        {children}
                    </CheckTreePostMsg.Provider>
                </Transition>
            )}
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

const CheckTreeItem = forwardRef(Temp);
CheckTreeItem.displayName = "CheckTreeItem";

export default CheckTreeItem;
