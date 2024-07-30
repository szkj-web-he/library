/**
 * @file 项目的类型数据
 * @date 2023-08-23
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-23
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Icon, IconTypes, Skeleton, useLatest } from "../../../../..";
import classNames from "../../../../../Unit/classNames";
import { AssetsType, useAssetsType } from "../../Context/assetsType";
import { useSidebarDispatch } from "../../Context/dispatch";
import { AssetsTypeEvents, AssetsTypeProps, Item, Wrapper } from "../AssetsType";
import styles from "../AssetsType/style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
const list: Array<{ key: AssetsType; icon: IconTypes }> = [
    { key: "all", icon: "all" },
    { key: "star", icon: "star" },
    { key: "publish", icon: "send" },
    { key: "archived", icon: "Archived" },
];
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<AssetsTypeEvents, AssetsTypeProps>(({ value, data }, events) => {
    Temp.displayName = "Temp";
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { t } = useTranslation();

    /**
     * 修改选中的类型
     */
    const { setActiveAssetsType } = useSidebarDispatch();

    const setActiveAssetsTypeRef = useLatest(setActiveAssetsType);

    /**
     * 获取选中的类型
     */
    const type = useAssetsType();

    /**
     * top
     */
    const top = useMemo(() => {
        let index: null | number = null;
        for (let i = 0; i < list.length; ) {
            if (list[i].key === type) {
                index = i;
                i = list.length;
            } else {
                ++i;
            }
        }

        if (!index) {
            return "2.4rem";
        }

        return `calc(${index} * 3rem + ${index + 1} * 2.4rem)`;
    }, [type]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        if (value && list.some((item) => item.key === value)) {
            setActiveAssetsTypeRef.current(value);
        }
        setActiveAssetsTypeRef.current(list[0].key);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useImperativeHandle(events, () => {
        return {
            change: (val) => {
                const key = val as (typeof list)[number]["key"];
                if (list.some((item) => item.key === key)) {
                    setActiveAssetsTypeRef.current(key);
                }
            },
        };
    });

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Wrapper>
            {data === "loading" || !data ? (
                <></>
            ) : (
                <div
                    style={{
                        transform: `translateY(${top})`,
                    }}
                    className={styles.sidebar_assetsType__slid}
                />
            )}

            {list.map((item) => {
                if (data === "loading" || !data) {
                    return (
                        <Item key={item.key}>
                            <Skeleton variant="rect" height="2.8rem" width="100%" />
                        </Item>
                    );
                }

                const keyVal = item.key in data ? (item.key as keyof typeof data) : null;
                const value = keyVal ? data[keyVal] : 0;

                return (
                    <Item
                        key={item.key}
                        active={type === item.key}
                        onClick={() => {
                            setActiveAssetsType(item.key);
                        }}
                    >
                        <div className={styles.sidebar_assetsType__label}>
                            <div className={styles.sidebar_assetsType__iconView}>
                                <Icon
                                    type={item.icon}
                                    className={classNames(
                                        styles[`sidebar_assetsType__${item.key}Icon`],
                                        styles.sidebar_assetsType__icon,
                                    )}
                                />
                            </div>
                            <div className={styles.sidebar_assetsType__text}>
                                {t(`GridSidebar.${item.key}`)}
                            </div>
                        </div>
                        <div className={styles.sidebar_assetsType__num}>{value}</div>
                    </Item>
                );
            })}
        </Wrapper>
    );
});
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
Temp.displayName = "Temp";
