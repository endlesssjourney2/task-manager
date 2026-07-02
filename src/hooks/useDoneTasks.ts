import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getDoneTasks } from "../api/task";
import useNotify from "./useNotify";
import type { TasksWithProjects } from "../types/task";
import { useTasksContext } from "../context/TasksContext";

const useDoneTasks = () => {
  const { user } = useAuth();
  const notify = useNotify();
  const { editTask, removeTask } = useTasksContext();
  const [doneTasks, setDoneTasks] = useState<TasksWithProjects[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDoneTasks = async () => {
    const [data, error] = await getDoneTasks(user.id);
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
    setDoneTasks(data as TasksWithProjects[]);
    setInitialLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    setInitialLoading(true);
    fetchDoneTasks();
  }, [user]);

  const handleRestoreTask = async (taskId: string, newStatus: "todo") => {
    setActionLoading(true);
    const result = await editTask(taskId, { status: newStatus });
    if (result) {
      setDoneTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
    setActionLoading(false);
  };

  const handleRemoveTask = async (taskId: string) => {
    setActionLoading(true);
    const result = await removeTask(taskId);
    if (result) {
      setDoneTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
    setActionLoading(false);
  };

  return {
    doneTasks,
    initialLoading,
    refetch: fetchDoneTasks,
    handleRestoreTask,
    actionLoading,
    handleRemoveTask,
  };
};

export default useDoneTasks;
