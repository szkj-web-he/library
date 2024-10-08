/**
 * @file icon
 * @date 2021-08-09
 * @author xuejie.he
 * @lastModify xuejie.he 2021-08-09
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import iconType, { IconDefinition } from "./Unit/customFontIcon";

import { forwardRef } from "react";
import styles from "./style.module.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
    /**
     * icon type
     */
    type?: keyof typeof iconType;
    /**
     * color of this component
     */
    color?: string;
    /**
     * fontSize of this component
     */
    fontSize?: string;
    /**
     * custom icon
     */
    icon?: IconDefinition;
    /**
     * title of this component
     */
    title?: string;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ type, color, fontSize, style, className, icon, title, ...props }, ref) => {
        Icon.displayName = "Icon";
        const iconData = type ? iconType[type] : icon;
        if (!iconData) {
            return <></>;
        }

        const path = iconData.pathList ?? iconData.icon[4];

        return (
            <svg
                data-icon={iconData.iconName}
                focusable="false"
                ref={ref}
                aria-hidden="true"
                className={styles.icon_wrap + (className ? ` ${className}` : "")}
                viewBox={`0 0 ${iconData.icon[0]} ${iconData.icon[1]}`}
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                style={Object.assign(
                    {},
                    style,
                    fontSize && {
                        fontSize,
                    },
                    color && {
                        color,
                    },
                )}
                {...props}
            >
                {title && <title>{title}</title>}
                {Array.isArray(path) ? (
                    path.map(({ d, fill, pid, ...props }, index) => (
                        <path key={pid ?? index} fill={fill ?? "currentColor"} d={d} {...props} />
                    ))
                ) : (
                    <path fill="currentColor" d={iconData.icon[4]} />
                )}
            </svg>
        );

        /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    },
);
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

Icon.displayName = "Icon";
