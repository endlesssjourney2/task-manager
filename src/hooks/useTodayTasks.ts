import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useNotify from "./useNotify";
import type { TasksWithProjects } from "../types/task";
import { getTodayTasks } from "../api/task";
import { useTasksContext } from "../context/TasksContext";
import dayjs from "dayjs";

const useTodayTasks = () => {
  const { user } = useAuth();
  const { editTask } = useTasksContext();
  const notify = useNotify();
  const [todayTasks, setTodayTasks] = useState<TasksWithProjects[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchTodayTasks = async () => {
      setInitialLoading(true);
      const [data, error] = await getTodayTasks(user.id);
      if (error) {
        notify.notification.error(
          "Failed to load today's tasks",
          "Please try again or check console for more details",
          "fetch-tasks-error",
        );
        console.error("Error fetching tasks:", error);
        setInitialLoading(false);
        return;
      }
      setTodayTasks(data as TasksWithProjects[]);
      setInitialLoading(false);
    };
    fetchTodayTasks();
  }, [user]);

  const handleUpdateDate = async (taskId: string, newDueDate: string) => {
    setActionLoading(true);
    const result = await editTask(taskId, { due_date: newDueDate });
    if (result) {
      const today = dayjs().format("YYYY-MM-DD");
      if (newDueDate !== today) {
        setTodayTasks((prev) => prev.filter((task) => task.id !== taskId));
      } else {
        setTodayTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, due_date: newDueDate } : task,
          ),
        );
      }
    }
    setActionLoading(false);
  };

  return { todayTasks, initialLoading, actionLoading, handleUpdateDate };
};

export default useTodayTasks;
