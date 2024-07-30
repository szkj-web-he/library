/**
 * @file 常用的 非项目和非插件的类型数据
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
import { SidebarProps } from "../..";
import { useProjectContext } from "../../../../OIDCLogin/Unit/projectContext";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp = forwardRef<AssetsTypeEvents, AssetsTypeProps & { ide: SidebarProps["ide"] }>(
    ({ value, data, ide }, events) => {
        Temp.displayName = "Temp";
        /* <------------------------------------ **** STATE START **** ------------------------------------ */
        /************* This section will include this component HOOK function *************/
        const { t } = useTranslation();

        const project = useProjectContext();

        const list: Array<AssetsType> = useMemo(() => {
            if (ide === "supplier" && project !== "trade-agreement") {
                return ["all", "star", "projectRelated"];
            }

            return ["all", "star", "projectRelated", "notBound"];
        }, [ide, project]);

        const listRef = useLatest(list);

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
                if (list[i] === type) {
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
        }, [list, type]);

        /* <------------------------------------ **** STATE END **** ------------------------------------ */
        /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
        /************* This section will include this component parameter *************/
        useEffect(() => {
            if (value && listRef.current.includes(value)) {
                setActiveAssetsTypeRef.current(value);
            }
            setActiveAssetsTypeRef.current(listRef.current[0]);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value]);

        useImperativeHandle(events, () => {
            return {
                change: (val) => {
                    const key = val as (typeof list)[number];
                    if (list.includes(key)) {
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
                            <Item key={item}>
                                <Skeleton variant="rect" height="2.8rem" width="100%" />
                            </Item>
                        );
                    }

                    const keyVal = item in data ? (item as keyof typeof data) : null;
                    const value = keyVal ? data[keyVal] : 0;

                    return (
                        <Item
                            key={item}
                            active={type === item}
                            onClick={() => {
                                setActiveAssetsType(item);
                            }}
                        >
                            <div className={styles.sidebar_assetsType__label}>
                                <div className={styles.sidebar_assetsType__iconView}>
                                    <Icon
                                        type={item as IconTypes}
                                        className={classNames(
                                            styles[`sidebar_assetsType__${item}Icon`],
                                            styles.sidebar_assetsType__icon,
                                        )}
                                    />
                                </div>
                                <div className={styles.sidebar_assetsType__text}>
                                    {t(`GridSidebar.${item}`)}
                                </div>
                            </div>
                            <div className={styles.sidebar_assetsType__num}>{value}</div>
                        </Item>
                    );
                })}
            </Wrapper>
        );
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
Temp.displayName = "Temp";
