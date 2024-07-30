/**
 * @file
 * @date 2023-02-28
 * @author xuejie.he
 * @lastModify xuejie.he 2023-02-28
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { isValidElement, useMemo, useRef, useState } from "react";
import { Dropdown, DropdownContent, ScrollComponent, useUpdateEffect } from "../../..";
import classNames from "../../../Unit/classNames";
import { readChildElement } from "../../../Unit/readChild";
import { BorderButtonForDropdown } from "../BorderButton";
import { useLatest } from "./../../../Hooks/useLatest";
import { DropdownHr } from "./../DropdownHr/index";
import { DropdownItem, DropdownItemProps } from "./../DropdownItem/index";
import styles from "./style.module.scss";
import { SingleDropdownContext } from "./Unit/context";
import NoBorderBtn from "./Unit/noBorderBtn";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface SingleDropdownListProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
    /**
     * 当前选中的哪一个 dropdown item的id
     */
    activeUUid?: string | number;
    /**
     * children里只能是 <SingleDropdownList.Item>
     */
    children?: React.ReactNode;
    /**
     * 下拉框的按钮
     * 有3个选项 其它的不能正常运行
     * SingleDropdownList.BorderBtn => 有边框的btn
     * SingleDropdownList.IconBtn => 无边框的按钮
     * dropdownBtn => 自定义按钮
     */
    btn?: React.ReactNode;
    /**
     * 下拉框的宽度
     * * 默认值: "Middle"
     */
    size?: "Small" | "Middle" | "Large" | "ExtraLarge";
    /**
     * 每个item的line height
     * * 必传
     */
    lineHeight: string;
    /**
     * 起点位置
     */
    placement?: "lb" | "cb" | "rb";
    /**
     * 是否禁用
     * * 默认是false
     */
    disable?: boolean;

    /**
     * 当选中的uuid发生变化是
     */
    handleChange?: (to?: number | string, from?: number | string) => void;

    /**
     * 当可见度发生变化的时候
     */
    handleVisibleChange?: (res: boolean) => void;

    /**
     * 最多可以展示多少个item
     * 默认是4个
     * Hr不算在里面
     */
    maxLength?: number;
    /**
     * 修改content是否可见的方法
     */
    changeVisibleFn?:
        | React.MutableRefObject<React.Dispatch<React.SetStateAction<boolean>> | undefined>
        | ((res: React.Dispatch<React.SetStateAction<boolean>> | undefined) => void);
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */

type SingleDropdownComponent = React.FC<SingleDropdownListProps> & {
    Item: typeof DropdownItem;
    BorderBtn: typeof BorderButtonForDropdown;
    IconBtn: typeof NoBorderBtn;
    Hr: typeof DropdownHr;
};

/**
 * @bate 开始公测
 * 可能会因为新功能的添加而做出调整
 */
const SingleDropdownList: SingleDropdownComponent = ({
    activeUUid,
    children,
    btn,
    size = "Small",
    lineHeight,
    disable = false,
    placement = "lb",
    maxLength = 4,
    handleChange,
    handleVisibleChange,
    changeVisibleFn,
    ...props
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /**
     * 单选选中的item的Uuid
     */
    const [uuid, setUUid] = useState(activeUUid);
    /**
     * 修改下拉是否可见的回调函数
     */
    const _changeVisibleFn = useRef<React.Dispatch<React.SetStateAction<boolean>>>();
    /**
     * 可见的状态值
     */
    const [show, setShow] = useState<boolean>();

    /**
     * 存储所有的{uuid:item}
     */
    const uuidToChild = useRef<Record<string, React.ReactNode>>();

    const handleChangeRef = useLatest(handleChange);

    /**
     * 统计的child的数量
     * 这决定了下拉列表的高度
     */
    const childCount = useMemo(() => {
        const childList = readChildElement(children);

        /**
         * 校验Uuid是否重复
         */

        const uuids: Array<string | number> = [];
        const checkUUid = (uuidVal: string | number) => {
            if (uuids.some((val) => val === uuidVal)) {
                if (process.env.NODE_ENV === "development") {
                    console.error("存在重复的uuid", uuidVal);
                }
                return true;
            }

            uuids.push(uuidVal);
        };

        const { length } = childList;
        let itemLength = 0;
        let hrLength = 0;

        let flag = false;

        for (let i = 0; i < length; ++i) {
            const item = childList[i].element;
            if (isValidElement(item)) {
                if (childList[i].displayName === DropdownItem.displayName) {
                    const { uuid, children: itemChild } = item.props as DropdownItemProps;
                    ++itemLength;

                    uuidToChild.current = Object.assign(
                        {},
                        { ...uuidToChild.current },
                        { [uuid]: itemChild },
                    );

                    if (!flag) {
                        flag = checkUUid(uuid) ?? false;
                    }
                } else if (childList[i].displayName === DropdownHr.displayName) {
                    ++hrLength;
                }
            }
        }
        /**
         * 检查uuid有没有重复 end
         */
        return {
            item: itemLength > maxLength ? maxLength : length,
            hr: hrLength,
            isOverflow: itemLength > maxLength,
        };
    }, [children, maxLength]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useUpdateEffect(() => {
        setUUid((pre) => {
            if (pre !== activeUUid) {
                handleChangeRef.current?.(activeUUid, pre);
            }
            return activeUUid;
        });
    }, [activeUUid]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Dropdown trigger={"click"} disable={disable}>
            <SingleDropdownContext.Provider
                value={{
                    setUUid: (res) => {
                        setUUid((pre) => {
                            if (pre !== res) {
                                handleChange?.(res, pre);
                            }
                            return res;
                        });

                        setUUid(res);
                    },
                    currentUUid: uuid,
                    changeVisibleFn: _changeVisibleFn,
                    lineHeight,
                    open: show,
                    uuidToChild,
                    disable,
                }}
            >
                {btn}
                <DropdownContent
                    placement={placement}
                    changeVisibleFn={(callback) => {
                        _changeVisibleFn.current = callback;
                        if (changeVisibleFn) {
                            if (typeof changeVisibleFn === "function") {
                                changeVisibleFn(callback);
                            } else {
                                changeVisibleFn.current = callback;
                            }
                        }
                    }}
                    hideOnClick={false}
                    bodyClassName={classNames(
                        styles.radioDropdownList_body,
                        styles[`radioDropdownList_${size}`],
                    )}
                    handleVisibleChange={(res) => {
                        setShow(res);
                        handleVisibleChange?.(res);
                    }}
                    offset={{
                        y: 4,
                    }}
                    style={{
                        height: `calc(${childCount.item} * calc(${lineHeight} + 0.8rem) + calc(${
                            childCount.item + 1
                        } * 0.8rem)${childCount.hr ? ` + 0.8rem + 1px` : ""}${
                            childCount.isOverflow
                                ? ` + 0.8rem + calc(calc(${lineHeight} + 0.8rem) / 2)`
                                : ""
                        })`,
                    }}
                    {...props}
                >
                    <ScrollComponent
                        bodyClassName={styles.radioDropdownList_scrollBody}
                        hidden={{
                            x: true,
                        }}
                    >
                        {children}
                    </ScrollComponent>
                </DropdownContent>
            </SingleDropdownContext.Provider>
        </Dropdown>
    );
};
SingleDropdownList.displayName = "SingleDropdownList";

SingleDropdownList.Item = DropdownItem;
SingleDropdownList.Item.displayName = "SingleDropdownList.Item";
SingleDropdownList.BorderBtn = BorderButtonForDropdown;
SingleDropdownList.BorderBtn.displayName = "SingleDropdownList.BorderBtn";
SingleDropdownList.IconBtn = NoBorderBtn;
SingleDropdownList.IconBtn.displayName = "SingleDropdownList.IconBtn";
SingleDropdownList.Hr = DropdownHr;
SingleDropdownList.Hr.displayName = "SingleDropdownList.Hr";

export default SingleDropdownList;
