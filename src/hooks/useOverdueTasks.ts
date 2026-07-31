import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useNotify from "./useNotify";
import type { TasksWithProjects } from "../types/task";
import { getOverdueTasks } from "../api/task";
import { useTasksContext } from "../context/TasksContext";

const useOverdueTasks = () => {
  const { user } = useAuth();
  const notify = useNotify();
  const { editTask, removeTask } = useTasksContext();
  const [overdueTasks, setOverdueTasks] = useState<TasksWithProjects[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchOverdueTasks = async () => {
    const [data, error] = await getOverdueTasks(user.id);

    if (error) {
      notify.notification.error(
        "Failed to load tasks",
        "Please try again or check console for more details",
        "fetch-tasks-error",
      );
      console.error("Error fetching tasks:", error);
      setInitialLoading(false);
      return;
    }
    setOverdueTasks(data as TasksWithProjects[]);
    setInitialLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    setInitialLoading(true);
    fetchOverdueTasks();
  }, [user]);

  const handleRemoveTask = async (taskId: string) => {
    setActionLoading(true);
    const result = await removeTask(taskId);
    if (result) {
      setOverdueTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
    setActionLoading(false);
  };

  const handleReschedule = async (taskId: string, newDate: string) => {
    setActionLoading(true);
    const result = await editTask(taskId, { due_date: newDate });
    if (result) {
      setOverdueTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
    setActionLoading(false);
  };

  const handleDoneTask = async (taskId: string) => {
    setActionLoading(true);
    const result = await editTask(taskId, { status: "done" });
    if (result) {
      setOverdueTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
    setActionLoading(false);
  };

  return {
    overdueTasks,
    actionLoading,
    initialLoading,
    handleRemoveTask,
    handleReschedule,
    handleDoneTask,
  };
};

export default useOverdueTasks;
