import { createContext, useContext, type ReactNode } from "react";
import useProjects from "../hooks/useProjects";

type ProjectsContentType = ReturnType<typeof useProjects>;

const ProjectsContext = createContext<ProjectsContentType | null>(null);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const value = useProjects();

  return <ProjectsContext value={value}>{children}</ProjectsContext>;
};

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);
  if (!context)
    throw new Error("useProjectsContext must be used within ProjectsProvider");
  return context;
};
