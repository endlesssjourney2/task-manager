import { createContext, useContext, type ReactNode } from "react";
import useDoneTasks from "../hooks/useDoneTasks";

type DoneTasksContextType = ReturnType<typeof useDoneTasks>;

const DoneTasksContext = createContext<DoneTasksContextType | null>(null);

export const DoneTasksProvider = ({ children }: { children: ReactNode }) => {
  const value = useDoneTasks();

  return (
    <DoneTasksContext.Provider value={value}>
      {children}
    </DoneTasksContext.Provider>
  );
};

export const useDoneTasksContext = () => {
  const context = useContext(DoneTasksContext);
  if (!context)
    throw new Error(
      "useDoneTasksContext must be used within DoneTasksProvider",
    );
  return context;
};
