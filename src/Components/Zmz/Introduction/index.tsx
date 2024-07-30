/**
 * @file
 * @date 2023-01-03
 * @author mingzhou.zhang
 * @lastModify  2023-01-03
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useLayoutEffect, useRef, useState } from "react";
import { Transition } from "../../..";
import type {
    IntroductionListItem,
    IntroductionTemplate,
} from "../../../DefaultData/Zmz/introduction";
import {
    contractTemplate,
    deliveryTemplate,
    permissionTemplate,
} from "../../../DefaultData/Zmz/introduction";
import classNames from "../../../Unit/classNames";
import { Icon } from "../../Icon";
import { Scale, ScaleProps } from "../Scale";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
type IntroductionTemplateType = "delivery" | "contract" | "permission";

type IntroductionBaseProps = IntroductionTemplate & Omit<ScaleProps, "title">;

export interface IntroductionProps extends IntroductionBaseProps {
    type?: IntroductionTemplateType;
    show?: boolean;
    onChange?: (state: boolean) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Introduction: React.FC<IntroductionProps> = ({
    type,
    show = true,
    title,
    content,
    linkBtn,
    src,
    list = [],
    children,
    onChange,
    ...rest
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [detailShow, setDetailShow] = useState(false);
    const [active, setActive] = useState(0);
    const [template, setTemplate] = useState<IntroductionTemplate>();
    // 如果linkBtn为数组 用于绑定对应的二维数组list
    const [currentIndex, setCurrentIndex] = useState(0);

    const closeRef = useRef(false);

    useLayoutEffect(() => {
        if (type) {
            switch (type) {
                case "delivery":
                    setTemplate(deliveryTemplate);
                    break;
                case "contract":
                    setTemplate(contractTemplate);
                    break;
                case "permission":
                    setTemplate(permissionTemplate);
                    break;
            }
        }
    }, [type]);

    useLayoutEffect(() => {
        onChange?.(show);
    }, [onChange, show]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const onSwitchLeft = () => {
        if (active === 0) return;
        setActive(active - 1);
    };

    const onSwitchRight = (list: Array<unknown>) => {
        if (active === list.length - 1) return;
        setActive(active + 1);
    };

    const detail = () => {
        const imgList: JSX.Element[] = [];
        const btnList: JSX.Element[] = [];

        let temp: Array<IntroductionListItem>;

        if (template) {
            temp = (
                Array.isArray(template.list[0]) ? template.list[currentIndex] : template.list
            ) as Array<IntroductionListItem>;
        } else {
            temp = (
                Array.isArray(list[0]) ? list[currentIndex] : list
            ) as Array<IntroductionListItem>;
        }

        temp.forEach((item, index) => {
            imgList.push(<img key={index} width={"100%"} height={"100%"} src={item.src} />);
            btnList.push(
                <li
                    key={index}
                    onClick={() => {
                        setActive(index);
                    }}
                    className={classNames(styles.dr_introduction_detail_swiper_li, {
                        [`${styles.dr_introduction_detail_swiper_li__active}`]: active === index,
                    })}
                />,
            );
        });

        return (
            <Transition
                className={styles.dr_introduction_detail}
                show={detailShow}
                fromEnter={styles.dr_introduction_detail_form_enter}
                enterActive={styles.dr_introduction_detail_form_active}
                toEnter={styles.dr_introduction_detail_to_enter}
                fromLeave={styles.dr_introduction_detail_form_leave}
                leaveActive={styles.dr_introduction_detail_to_active}
                toLeave={styles.dr_introduction_detail_to_leave}
                handleTransitionEnd={() => {
                    if (closeRef.current && !detailShow) {
                        setActive(0);
                    }
                }}
            >
                <div className={styles.dr_introduction_detail_wrap}>
                    <span
                        className={styles.dr_introduction_detail_back}
                        onClick={() => {
                            setDetailShow(false);
                            closeRef.current = true;
                        }}
                    >
                        <Icon type="nextArrow" />
                    </span>
                    <div className={styles.dr_introduction_detail_left}>
                        {temp[active]?.children ?? (
                            <div className={styles.dr_introduction_detail_main}>
                                <span className={styles.dr_introduction_detail_title}>
                                    {temp[active]?.title}
                                </span>
                                <span className={styles.dr_introduction_detail_subtitle}>
                                    {temp[active]?.subtitle}
                                </span>
                                <span className={styles.dr_introduction_detail_main_content}>
                                    {temp[active]?.content}
                                </span>
                            </div>
                        )}
                        <div className={styles.dr_introduction_detail_btn}>
                            <span
                                className={classNames(styles.dr_introduction_detail_btn_left, {
                                    [`${styles.dr_introduction_detail_btn_left__disabled}`]:
                                        active === 0,
                                })}
                                onClick={onSwitchLeft}
                            >
                                <Icon type="open" />
                            </span>
                            <span
                                className={classNames(styles.dr_introduction_detail_btn_right, {
                                    [`${styles.dr_introduction_detail_btn_right__disabled}`]:
                                        active === temp.length - 1,
                                })}
                                onClick={() => {
                                    onSwitchRight(temp);
                                }}
                            >
                                <Icon type="open" />
                            </span>
                        </div>
                    </div>
                    <div className={styles.dr_introduction_detail_right}>
                        <div
                            className={styles.dr_introduction_detail_swiper}
                            style={{ transform: `translateX(${-458 * active}px)` }}
                        >
                            {imgList}
                        </div>
                        <ul className={styles.dr_introduction_detail_swiper_ul}>{btnList}</ul>
                    </div>
                </div>
            </Transition>
        );
    };

    const afterContent = () => {
        const linkBtnTemp = linkBtn ?? template?.linkBtn;

        let linkBtnNode;

        if (linkBtnTemp) {
            if (Array.isArray(linkBtnTemp)) {
                linkBtnNode = linkBtnTemp.map((node, index) => {
                    return (
                        <span
                            key={index}
                            onClick={() => {
                                setDetailShow(true);
                                setCurrentIndex(index);
                            }}
                        >
                            {node}
                        </span>
                    );
                });
            } else {
                linkBtnNode = (
                    <span
                        onClick={() => {
                            setDetailShow(true);
                        }}
                    >
                        {linkBtnTemp}
                    </span>
                );
            }
        }

        return (
            children ?? (
                <div className={styles.dr_introduction_wrap}>
                    <div className={styles.dr_introduction_content}>
                        <div className={styles.dr_introduction_main}>
                            <span className={styles.dr_introduction_title}>
                                {title ?? template?.title}
                            </span>
                            <span className={styles.dr_introduction_main_content}>
                                {content ?? template?.content}
                            </span>
                        </div>

                        <div className={styles.dr_introduction_content_btn}>{linkBtnNode}</div>
                    </div>
                    <div className={styles.dr_introduction_illustration}>
                        <img width={"100%"} height={"100%"} src={src ?? template?.src} alt="" />
                    </div>
                    {detail()}
                </div>
            )
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <Scale
            scaleW="80rem"
            scaleH="52.8rem"
            {...rest}
            className={classNames(styles.dr_introduction_container, {
                [`${styles.dr_introduction_icon_position}`]: !show,
            })}
            isShow={show}
            afterContent={afterContent()}
            onZoomOut={() => {
                onChange?.(false);
                setDetailShow(false);
                closeRef.current = true;
            }}
            onZoomIn={() => onChange?.(true)}
        />
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Introduction;
