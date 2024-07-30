/**
 * @file Project type context
 * @date 2022-09-27
 * @author Cunming Liu
 * @lastModify  2022-09-27
 */

import { createContext, useContext } from "react";
import { ProjectType } from "../../Api/redirectDomain";

export const ProjectContext = createContext<ProjectType | undefined>(undefined);
export const useProjectContext = () => useContext(ProjectContext);
