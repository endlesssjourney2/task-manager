import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { useAuth } from "../context/AuthContext";
import { createTask, deleteTask, getTasks } from "../api/task";

const useTasks = (projectId: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      setInitialLoading(true);
      const [data, error] = await getTasks(projectId);
      if (error) {
        setError("Failed to load tasks");
        setInitialLoading(false);
        return;
      }
      setTasks(data as Task[]);
      setInitialLoading(false);
    };
    fetchTasks();
  }, [user, projectId]);

  const addTask = async (
    title: string,
    description: string | null,
    priority: string,
    dueDate: string | null,
  ) => {
    if (!user) return;

    const cleanTitle = title.trim();

    if (!cleanTitle) return;

    setActionLoading(true);
    const [data, error] = await createTask({
      userId: user.id,
      projectId,
      title: cleanTitle,
      description: description,
      status: "todo",
      priority,
      dueDate,
    });
    if (error) {
      setError("Failed to create task");
      setActionLoading(false);
      return;
    }
    setTasks((prev) => [data as Task, ...prev]);
    setActionLoading(false);
  };

  const removeTask = async (id: string) => {
    setActionLoading(true);
    const error = await deleteTask(id);
    if (error) {
      setError("Failed to delete task");
      setActionLoading(false);
      return;
    }
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setActionLoading(false);
  };

  return {
    tasks,
    setTasks,
    addTask,
    removeTask,
    initialLoading,
    actionLoading,
    error,
  };
};

export default useTasks;
