/**
 * @file 区号的选择
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import {
    Dropdown,
    DropdownBtn,
    DropdownContent,
    Icon,
    ScrollComponent,
    deepCloneData,
    useUpdateEffect,
} from "../../../../..";
import { MobileInputProps } from "../..";
import styles from "./style.module.scss";
import Item from "../Item";
import classNames from "../../../../../Unit/classNames";
import { onlyCNorAUList } from "../../../../../DefaultData/DataInput/MobileInput";
import { findAreaData } from "../findAreaData";
import { useLatest } from "../../../../../Hooks/useLatest";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends Pick<MobileInputProps, "mount" | "areaCodeList"> {
    /**
     * 当选中的区号改变时
     */
    handleChange: (res?: (typeof onlyCNorAUList)[0]) => void;
    /**
     * 区号
     */
    value?: string;
    /**
     * 下拉框是否打开
     */
    handleVisibleChange: (status: boolean) => void;
    /**
     * 下拉框是否打开了
     */
    show: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    mount,
    handleChange,
    value,
    areaCodeList,
    handleVisibleChange,
    show,
    disabled,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [selectedData, setSelectedData] = useState(() => {
        return findAreaData(areaCodeList, value);
    });

    const areaCodeListRef = useLatest(areaCodeList);
    const handleChangeRef = useLatest(handleChange);

    const changeVisibleFn = useRef<React.Dispatch<React.SetStateAction<boolean>> | undefined>(
        () => undefined,
    );
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useUpdateEffect(() => {
        setSelectedData(findAreaData(areaCodeListRef.current, value));
    }, [value]);

    useEffect(() => {
        handleChangeRef.current(selectedData ?? undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedData]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const list = areaCodeList ?? onlyCNorAUList;

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Dropdown
            trigger={"click"}
            mount={mount}
            placement="lb"
            hideOnClick={false}
            disable={disabled}
        >
            <DropdownBtn className={styles.mobileInputV2_areaCodeBtn}>
                <img src={selectedData?.img} className={styles.mobileInputV2_areaImg} alt="" />
                <span className={styles.mobileInputV2_areaCodeText}>
                    {selectedData?.value ? `+${selectedData.value}` : ""}
                </span>
                <div
                    className={classNames(styles.mobileInputV2_iconContainer, {
                        [`${styles.mobileInputV2_iconContainer__active}`]: show,
                    })}
                >
                    <Icon type="dropdown" className={styles.mobileInputV2_dropdownIcon} />
                </div>
            </DropdownBtn>
            <DropdownContent
                handleVisibleChange={handleVisibleChange}
                changeVisibleFn={changeVisibleFn}
                offset={{
                    y: 3,
                }}
                bodyClassName={styles.mobileInputV2_areaCodeDropdown}
            >
                <ScrollComponent
                    bodyClassName={styles.mobileInputV2_areaCodeListBody}
                    width="9.2rem"
                >
                    {list.map((item) => {
                        return (
                            <Item
                                key={item.key}
                                active={selectedData?.key === item.key}
                                onClick={() => {
                                    setSelectedData(deepCloneData(item));
                                    changeVisibleFn.current?.(false);
                                }}
                                src={item.img}
                                content={item.value}
                            />
                        );
                    })}
                </ScrollComponent>
            </DropdownContent>
        </Dropdown>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
