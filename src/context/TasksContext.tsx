import { createContext, useContext, type ReactNode } from "react";
import useTasks from "../hooks/useTasks";

type TasksContextType = {
  addTask: ReturnType<typeof useTasks>["addTask"];
  actionLoading: ReturnType<typeof useTasks>["actionLoading"];
};

const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const { addTask, actionLoading } = useTasks();

  return (
    <TasksContext.Provider value={{ actionLoading, addTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context)
    throw new Error("useTasksContext must be used within TasksProvider");
  return context;
};
