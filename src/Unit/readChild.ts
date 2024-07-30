import React, { isValidElement } from "react";

/**
 * @file 读 children的数据
 * @date 2023-03-01
 * @author xuejie.he
 * @lastModify xuejie.he 2023-03-01
 */
export interface ChildrenElementData {
    displayName: string;
    element: React.ReactNode;
}

/**
 * 读children  element
 * 忽略 fragment
 */
export const readChildElement = (children: React.ReactNode): Array<ChildrenElementData> => {
    const arr = React.Children.toArray(children);

    const nameList: Array<ChildrenElementData> = [];
    mapChild(arr, nameList);
    return nameList;
};

const mapChild = (children: React.ReactNode[], container: Array<ChildrenElementData>) => {
    for (let i = 0; i < children.length; i++) {
        const item = children[i];

        if (isValidElement(item)) {
            const reactEl = item.type as React.FC;
            const name = reactEl.displayName ?? reactEl.name;
            const childList = (item.props as Record<string, React.ReactNode[] | undefined>)
                .children;
            if (name === undefined && childList) {
                mapChild(childList, container);
            } else {
                container.push({
                    displayName: name,
                    element: item,
                });
            }
        }
    }
};
