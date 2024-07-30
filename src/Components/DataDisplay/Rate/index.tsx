/**
 * @file
 * @date 2021-11-16
 * @author xuejie.he
 * @lastModify xuejie.he 2021-11-16
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useState } from "react";
import { Icon, IconDefinition } from "../../..";
import classNames from "../../../Unit/classNames";
import styles from "./style.module.scss";
import { brightStar } from "./Unit/starList";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface RateProps {
    /**
     * How many stars bright
     */
    value?: number;
    /**
     * How many stars bright (only first)
     */
    defaultValue?: number;
    /**
     * disabled of this component
     */
    disabled?: boolean;
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * How many stars are there
     */
    total?: number;
    /**
     * Can it be half bright
     */
    allowHalf?: boolean;
    /**
     * start item classname
     */
    itemClsName?: string;
    /**
     * When the number of bright stars is changed
     */
    handleStarChange?: (val: number) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Rate: React.FC<RateProps> = ({
    value,
    defaultValue = 0,
    disabled,
    className,
    style,
    total = 5,
    allowHalf,
    itemClsName,
    handleStarChange,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [starList, setStarList] = useState(() => brightStar(total, defaultValue));

    const [starVal, setStarVal] = useState(defaultValue);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    //空心
    const hollow: IconDefinition = {
        iconName: "hollow-a",
        icon: [
            1024,
            1024,
            [],
            "33303",
            "M813.127 1000.3C808.014 1000.3 802.904 998.717 798.564 995.564L511.996 787.365L225.439 995.564C221.205 998.637 216.108 1000.29 210.877 1000.29C205.645 1000.29 200.548 998.637 196.314 995.564C192.084 992.489 188.935 988.154 187.319 983.18C185.703 978.206 185.702 972.849 187.316 967.874L296.777 631L10.2097 422.801C5.97936 419.726 2.83041 415.391 1.2137 410.418C-0.403021 405.444 -0.404601 400.087 1.20918 395.112C2.82666 390.137 5.97728 385.801 10.2097 382.725C14.4422 379.65 19.5394 377.993 24.7711 377.992H378.983L488.437 41.1176C490.055 36.1429 493.205 31.8076 497.437 28.7327C501.668 25.6579 506.765 24.0012 511.996 24C517.228 24.0001 522.325 25.6562 526.558 28.7312C530.791 31.8061 533.942 36.142 535.559 41.1176L645.02 377.992H999.232C1009.95 377.992 1019.47 384.903 1022.79 395.112C1026.1 405.311 1022.47 416.495 1013.79 422.801L727.218 631L836.687 967.873C839.992 978.074 836.363 989.259 827.688 995.563C823.456 998.641 818.358 1000.3 813.125 1000.3H813.127ZM101.012 427.536L340.456 601.504C344.687 604.579 347.836 608.914 349.452 613.888C351.069 618.862 351.07 624.22 349.456 629.195L257.992 910.673L497.437 736.712C501.67 733.638 506.767 731.983 511.999 731.983C517.23 731.983 522.328 733.638 526.561 736.712L766.006 910.673L674.535 629.196C672.922 624.221 672.923 618.864 674.539 613.89C676.155 608.916 679.302 604.581 683.531 601.504L923 427.536H627.022C621.791 427.535 616.694 425.878 612.462 422.803C608.23 419.728 605.079 415.393 603.461 410.418L511.996 128.93L420.543 410.418C418.925 415.393 415.774 419.728 411.542 422.803C407.31 425.877 402.213 427.534 396.982 427.536H101.012V427.536Z",
        ],
    };

    //实心
    const solid: IconDefinition = {
        iconName: "solid-a",
        icon: [
            1024,
            1024,
            [],
            "33304",
            "M1022.18 395.195C1021.09 391.825 1018.95 388.888 1016.09 386.806C1013.22 384.724 1009.77 383.603 1006.23 383.604H640.476L527.447 35.5904C526.352 32.2209 524.219 29.2846 521.354 27.2025C518.488 25.1203 515.038 23.9993 511.496 24C507.955 23.9998 504.505 25.121 501.64 27.2031C498.775 29.2852 496.642 32.2213 495.548 35.5904L382.527 383.604H16.7705C13.2291 383.604 9.77854 384.725 6.91323 386.807C4.04792 388.889 1.91496 391.825 0.820034 395.195C-0.273675 398.564 -0.273335 402.194 0.820995 405.563C1.91533 408.933 4.0475 411.869 6.91209 413.952L302.811 629.029L189.79 977.036C188.973 979.554 188.763 982.229 189.178 984.844C189.592 987.458 190.619 989.938 192.174 992.079C193.729 994.221 195.769 995.964 198.126 997.166C200.484 998.368 203.092 998.995 205.738 998.996C209.193 998.996 212.658 997.93 215.597 995.793L511.495 780.707L807.404 995.793C810.268 997.877 813.719 999 817.261 999C820.803 999 824.254 997.877 827.119 995.793C829.983 993.71 832.116 990.774 833.21 987.405C834.305 984.035 834.305 980.406 833.211 977.036L720.18 629.029L1016.09 413.952C1018.95 411.869 1021.08 408.932 1022.18 405.563C1023.27 402.194 1023.27 398.564 1022.18 395.195V395.195Z",
        ],
    };

    useEffect(() => {
        setStarList(brightStar(total, starVal));
    }, [total, starVal]);

    useEffect(() => {
        if (Number(value) >= 0) {
            setStarVal(value as number);
        }
    }, [value]);

    const handleClick = (val: number) => {
        if (!disabled) {
            setStarVal(val);
            handleStarChange?.(val);
        }
    };

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const starElement = (val: number, index: number) => {
        let content: JSX.Element = <></>;

        switch (val) {
            case 0:
                content = (
                    <Icon
                        icon={hollow}
                        style={{
                            transitionDelay: `${index * 0.01}`,
                        }}
                        className={styles.rate_star__gray}
                    />
                );
                break;
            case 0.5:
                content = (
                    <>
                        <span className={styles.rate_halfStar}>
                            <Icon
                                icon={solid}
                                style={{
                                    transitionDelay: `${index * 0.01 + 0.005}`,
                                }}
                                className={styles.rate_fillStar__active}
                            />
                        </span>
                        <span className={styles.rate_halfStar}>
                            <Icon
                                icon={hollow}
                                style={{
                                    transitionDelay: `${index * 0.01 + 0.0095}`,
                                }}
                                className={styles.rate_stokeStar__active}
                            />
                        </span>
                    </>
                );

                break;
            case 1:
                content = (
                    <Icon
                        style={{
                            transitionDelay: `${index * 0.01}`,
                        }}
                        icon={solid}
                        className={styles.rate_fillStar__active}
                    />
                );
                break;
        }
        return (
            <div className={classNames(styles.rate_star, itemClsName)} key={`star_${index}`}>
                {allowHalf ? (
                    <div className={styles.rate_hoverContainer__allowHalf}>
                        <div
                            className={styles.rate_halfHover}
                            onMouseEnter={() => {
                                if (!disabled) {
                                    setStarList(brightStar(total, index + 0.5));
                                }
                            }}
                            onClick={() => {
                                handleClick(index + 0.5);
                            }}
                        />
                        <div
                            className={styles.rate_halfHover}
                            onMouseEnter={() => {
                                if (!disabled) {
                                    setStarList(brightStar(total, index + 1));
                                }
                            }}
                            onClick={() => {
                                handleClick(index + 1);
                            }}
                        />
                    </div>
                ) : (
                    <div
                        className={styles.rate_hoverContainer}
                        onMouseEnter={() => {
                            if (!disabled) {
                                setStarList(brightStar(total, index + 1));
                            }
                        }}
                        onClick={() => {
                            handleClick(index + 1);
                        }}
                    />
                )}
                {content}
            </div>
        );
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={classNames(styles.rate_wrapper, className, {
                [`${styles.rate_wrapper__disabled}`]: disabled,
            })}
            style={style}
            onMouseLeave={() => {
                if (!disabled) {
                    setStarList(brightStar(total, starVal));
                }
            }}
        >
            {starList.map((item, n) => starElement(item, n))}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
