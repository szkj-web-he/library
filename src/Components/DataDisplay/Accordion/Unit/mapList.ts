/**
 * @file 递归map
 * @date 2022-03-29
 * @author xuejie.he
 * @lastModify xuejie.he 2022-03-29
 */

export interface Label {
    content: React.ReactNode;
    id: string | number;
    indent?: string;
    child?: Label[];
}

export interface ListItem {
    content: React.ReactNode;
    id: string | number;
    indent: string;
    show: boolean;
    child?: ListItem[];
    subsId: (string | number)[];
    parentsId: (string | number)[];
}

interface RecursionProps {
    old?: ListItem[];
    list: Label[];
    deep: number;
    parentsId: string[];
    indent: string;
}

export const mapList = (
    old: Array<ListItem>,
    arr: Array<Label>,
    indent: string,
): Array<ListItem> => {
    const list = recursion({
        old,
        list: arr,
        deep: 1,
        parentsId: [],
        indent,
    });

    return list;
};

export const recursion = ({ old, list, deep, parentsId, indent }: RecursionProps) => {
    return list.map((item) => {
        const oldData = old?.find((val) => val.id === item.id);

        const data: ListItem = {
            content: item.content,
            id: item.id,
            indent: item.indent || `calc(${indent} * ${deep})`,
            show: oldData?.show ?? false,
            subsId: [],
            parentsId,
        };

        if (item.child) {
            const idList: typeof parentsId = JSON.parse(JSON.stringify(parentsId));
            idList.push(String(item.id));

            data.child = recursion({
                old: oldData?.child,
                list: item.child,
                deep: deep + 1,
                parentsId: idList,
                indent,
            });

            data.subsId = data.child
                .map((childItem) => {
                    const childIdList: typeof childItem.subsId = JSON.parse(
                        JSON.stringify(childItem.subsId),
                    );
                    childIdList.push(childItem.id);
                    return childIdList;
                })
                .flat();
        }
        return data;
    });
};
