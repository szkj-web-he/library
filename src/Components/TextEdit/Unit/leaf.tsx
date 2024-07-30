/**
 * @file leaf
 * @date 2022-03-03
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-03
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */

import { ReactNode } from "react";
import { RenderLeafProps } from "slate-react";

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    let child = children as ReactNode;
    if (leaf.bold) {
        child = <strong>{child}</strong>;
    }

    if (leaf.italic) {
        child = <em>{child}</em>;
    }

    if (leaf.underline) {
        child = <u>{child}</u>;
    }

    if (leaf["line-through"]) {
        child = <del>{child}</del>;
    }

    // if (leaf.code) {
    //     child = <code>{child}</code>;
    // }

    const style: React.CSSProperties = {};

    if (leaf["font-size"]) {
        const value = leaf["font-size"];
        style.fontSize = `${value}px`;
        style.lineHeight = `${value + 6}px`;
    }

    if (leaf.color) {
        const value = leaf.color;
        style.color = value;
    }

    if (leaf.background) {
        const value = leaf.background;
        style.backgroundColor = value;
    }

    return (
        <span {...attributes} style={style}>
            {child}
        </span>
    );
};
