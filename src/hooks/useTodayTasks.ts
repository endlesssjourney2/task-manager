import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useNotify from "./useNotify";
import type { TasksWithProjects } from "../types/task";
import { getTodayTasks } from "../api/task";
import { useTasksContext } from "../context/TasksContext";
import dayjs from "dayjs";
import { nextMonday } from "../helpers/dates";

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

  // const handleUpdateDate = async (taskId: string, newDueDate: string) => {
  //   setActionLoading(true);
  //   const result = await editTask(taskId, { due_date: newDueDate });
  //   if (result) {
  //     const today = dayjs().format("YYYY-MM-DD");
  //     if (newDueDate !== today) {
  //       setTodayTasks((prev) => prev.filter((task) => task.id !== taskId));
  //     } else {
  //       setTodayTasks((prev) =>
  //         prev.map((task) =>
  //           task.id === taskId ? { ...task, due_date: newDueDate } : task,
  //         ),
  //       );
  //     }
  //   }
  //   setActionLoading(false);
  // }; need to think blablabla

  const handleTomorrowUpdate = async (taskId: string) => {
    setActionLoading(true);
    const newDueDate = dayjs().add(1, "day").format("YYYY-MM-DD");
    const result = await editTask(taskId, { due_date: newDueDate });
    if (result) {
      setTodayTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
    setActionLoading(false);
  };

  const handleNextWeekUpdate = async (taskId: string) => {
    setActionLoading(true);
    const newDueDate = nextMonday(dayjs()).format("YYYY-MM-DD");
    const result = await editTask(taskId, { due_date: newDueDate });
    if (result) {
      setTodayTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
    setActionLoading(false);
  };

  const handleDoneTask = async (taskId: string) => {
    setActionLoading(true);
    const result = await editTask(taskId, { status: "done" });
    if (result) {
      setTodayTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
    setActionLoading(false);
  };

  return {
    todayTasks,
    initialLoading,
    actionLoading,
    handleDoneTask,
    handleTomorrowUpdate,
    handleNextWeekUpdate,
  };
};

export default useTodayTasks;
