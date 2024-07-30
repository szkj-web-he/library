/**
 * @file
 * @date 2021-08-12
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-12
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { ColorSlider } from "./Unit/ColorSlider";
import { SubColor } from "./Unit/ColorPalette";
import { rgbTo16Hex, otherToRGB } from "./Unit/colorConversion";
import { colorList } from "../../../DefaultData/DataDisplay/colorPicker";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ColorPickerProps {
    /**
     * default color
     */
    defaultColor?: string;
    /**
     * defaultColor list
     */
    defaultColorList?: string[];
    /**
     * width of this component
     */
    width?: string;
    /**
     * height of this component
     */
    height?: string;
    /**
     * className of this component
     */
    className?: string;
    /**
     * style of this component
     */
    style?: React.CSSProperties;
    /**
     * handle color change methods
     */
    handleColorChange?: (res: number[] | undefined) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const ColorPicker: React.FC<ColorPickerProps> = ({
    defaultColor = "#fff",
    defaultColorList = colorList,
    width = "17.2rem",
    height = "22.3rem",
    className,
    style,
    handleColorChange,
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [mainColor, setMainColor] = useState<[number, number, number]>();
    const [selectColor, setSelectColor] = useState<number[]>();

    const [cafeteriaList, setCafeteriaList] = useState(() =>
        defaultColorList.map((index) => {
            const res = otherToRGB(index) || undefined;

            return res ? `rgb(${res[0]}, ${res[1]}, ${res[2]})` : "transparent";
        }),
    );

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        handleColorChange && handleColorChange(selectColor);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectColor]);

    useEffect(() => {
        if (defaultColorList && defaultColorList.length) {
            const arr = defaultColorList.map((index) => {
                const res = otherToRGB(index) || undefined;
                return res ? `rgb(${res[0]}, ${res[1]}, ${res[2]})` : "transparent";
            });
            setCafeteriaList(arr);
        }
    }, [defaultColorList]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /**
     * The currently selected color element
     * @returns
     */
    const colorAttrEl = () => (
        <div className={styles.colorPicker_colorAttr}>
            <div
                className={styles.colorPicker_colorBlank}
                style={{
                    backgroundColor: selectColor ? rgbTo16Hex(selectColor) : "transparent",
                }}
            />
            <div className={styles.colorPicker_colorAttrValue}>
                {selectColor && rgbTo16Hex(selectColor)}
            </div>
        </div>
    );

    /**
     * Color shortcut selection area
     * @returns
     */
    const colorCafeteriaEl = () => (
        <div className={styles.colorPicker_colorCafeteria}>
            {cafeteriaList.map((index, n) => (
                <div
                    className={
                        styles.colorPicker_colorCafeteriaItem +
                        (selectColor &&
                        index === `rgb(${selectColor[0]}, ${selectColor[1]}, ${selectColor[2]})`
                            ? ` ${styles.colorPicker_colorCafeteriaItem__active}`
                            : "")
                    }
                    key={n}
                >
                    <div
                        className={styles.colorPicker_colorCafeteriaItem__container}
                        onClick={() => {
                            const value = index.includes("rgb")
                                ? index.replace(/rgb|\(|\)/gi, "").split(",")
                                : [];
                            setSelectColor(value.map((item) => Number(item)));
                        }}
                        style={{
                            backgroundColor: index,
                        }}
                    />
                </div>
            ))}
        </div>
    );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div
            className={styles.colorPicker_wrap + (className ? ` ${className}` : "")}
            style={Object.assign({}, { width, height }, style)}
        >
            <SubColor
                defaultColor={defaultColor}
                mainColor={mainColor}
                getSelectColor={(r, g, b) => {
                    setSelectColor([r, g, b]);
                }}
            />
            <ColorSlider
                defaultColor={defaultColor}
                getMainColor={(r, g, b) => {
                    setMainColor([r, g, b]);
                }}
            />
            {colorAttrEl()}
            {colorCafeteriaEl()}
        </div>
    );
};

/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
