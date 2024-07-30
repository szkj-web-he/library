/**
 * @file 有关Tabs 的类型
 * @date 2023-08-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-15
 */

import { HTMLAttributes } from "react";
import { TabsItem } from "..";

export interface NavItemProps
    extends Omit<TabsItem, "children" | "key">,
        HTMLAttributes<HTMLDivElement> {
    active?: boolean;
    value: string;
    onMounted?: (ref: HTMLDivElement | null) => void;
    onActive?: (ref: HTMLDivElement | null) => void;
}

export interface TabBarExtraContent {
    before?: React.ReactNode;
    after?: React.ReactNode;
}
