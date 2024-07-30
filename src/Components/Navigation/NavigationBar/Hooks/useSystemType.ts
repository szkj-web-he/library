/**
 * @file 获取项目类型
 * @date 2022-10-11
 * @author xuejie.he
 * @lastModify xuejie.he 2022-10-11
 */

import { useProjectContext } from "../../../OIDCLogin/Unit/projectContext";

export const useSystemType = () => {
    const systemName = useProjectContext();
    /**
     * The system is divided into two categories
     * 1. Management (mainly interactive)
     * 2. Product introduction (mainly display)
     */

    switch (systemName) {
        case "profile":
            return 1;
        case "dashboard":
            return 1;
        case "project-manager":
            return 1;
        case "qeditor":
            return 1;
        case "qeditor-dashboard":
            return 1;
        case "survey-dist":
            return 1;
        case "data-proc":
            return 1;
        case "plugins ide":
            return 1;
        case "marketplace":
            return 2;
        case "data-collection":
            return 1;
        case "community":
            return 2;
        case "trade-agreement":
            return 1;
        case "data-assets-entry":
            return 1;
        default:
            return 2;
    }
};
