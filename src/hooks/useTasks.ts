import { useEffect, useState } from "react";
import type { Priority, Task, UpdateTaskPayload } from "../types/task";
import { useAuth } from "../context/AuthContext";
import { createTask, deleteTask, getTasks, updateTask } from "../api/task";

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
    priority: Priority,
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
      return false;
    }
    setTasks((prev) => [data as Task, ...prev]);
    setActionLoading(false);
    return true;
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

  const editTask = async (
    id: string,
    fields: Omit<UpdateTaskPayload, "id">,
  ) => {
    setActionLoading(true);
    const error = await updateTask({
      id,
      ...fields,
    });
    if (error) {
      setError("Failed to update task");
      setActionLoading(false);
      return;
    }
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...fields, due_date: fields.dueDate }
          : task,
      ),
    );
    setActionLoading(false);
  };

  return {
    tasks,
    setTasks,
    addTask,
    removeTask,
    editTask,
    initialLoading,
    actionLoading,
    error,
  };
};

export default useTasks;
