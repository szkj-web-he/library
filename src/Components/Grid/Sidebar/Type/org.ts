/**
 * @file 组织的类型文件
 * @date 2023-08-22
 * @author xuejie.he
 * @lastModify xuejie.he 2023-08-22
 */

export interface Org {
    description: string;
    id: string;
    logo: string;
    name: string;
    organization_role: "owner" | "reviewer" | "admin";
    type: "personal" | "basic";
}
