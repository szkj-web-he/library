/**
 * @file 联系人的类型文件
 * @date 2023-06-15
 * @author xuejie.he
 * @lastModify xuejie.he 2023-06-15
 */

export interface ContactProps {
    contact: {
        area?: string;
        country?: string;
        number?: string;
        email?: string;
    };
    name: string;
}
