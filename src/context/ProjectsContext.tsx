import { createContext, useContext, type ReactNode } from "react";
import useProjects from "../hooks/useProjects";

type ProjectsContextType = ReturnType<typeof useProjects>;

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const value = useProjects();

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);
  if (!context)
    throw new Error("useProjectsContext must be used within ProjectsProvider");
  return context;
};
