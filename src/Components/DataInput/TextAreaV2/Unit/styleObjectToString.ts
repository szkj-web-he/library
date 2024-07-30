/**
 * @file 将declarationToString转化为stiring
 * @date 2023-05-04
 * @author xuejie.he
 * @lastModify xuejie.he 2023-05-04
 */

export const styleObjectToString = (style: CSSStyleDeclaration) => {
    let str = "";
    for (let i = 0; i < style.length; i++) {
        str += `${style.item(i)}:${style.getPropertyValue(style.item(i))};`;
    }

    return str;
};
