/**
 * @file 判断children是否有效
 * @date 2023-08-18
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-18
 */
import React, { Children, isValidElement } from "react";
/**
 * children是否是有效值
 * @returns
 */
export const isValidChild = (children: React.ReactNode) => {
    if (Children.count(children) === 1 && Children.toArray(children)[0]) {
        const child = Children.toArray(children)[0];
        if (
            isValidElement(child) &&
            child.type === React.Fragment &&
            (!child.props || JSON.stringify(child.props) === `{}`)
        ) {
            return false;
        }
        return true;
    }

    return false;
};
