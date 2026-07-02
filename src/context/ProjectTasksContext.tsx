import { createContext, useContext, type ReactNode } from "react";
import useTasks from "../hooks/useTasks";

type ProjectTasksContextType = ReturnType<typeof useTasks>;

const ProjectTasksContext = createContext<ProjectTasksContextType | null>(null);

export const ProjectTasksProvider = ({
  projectId,
  children,
}: {
  projectId: string;
  children: ReactNode;
}) => {
  const value = useTasks(projectId);
  return (
    <ProjectTasksContext.Provider value={value}>
      {children}
    </ProjectTasksContext.Provider>
  );
};

export const useProjectTasksContext = () => {
  const context = useContext(ProjectTasksContext);
  if (!context)
    throw new Error(
      "useProjectTasksContext must be used within ProjectTasksProvider",
    );
  return context;
};
