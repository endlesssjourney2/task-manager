import { useEffect, useState } from "react";
import type { Priority, Task, UpdateTaskPayload } from "../types/task";
import { useAuth } from "../context/AuthContext";
import { createTask, deleteTask, getTasks, updateTask } from "../api/task";
import useNotify from "./useNotify";

const useTasks = (projectId?: string) => {
  const notify = useNotify();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !projectId) return;
    const fetchTasks = async () => {
      setInitialLoading(true);
      const [data, error] = await getTasks(projectId);
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
      setTasks(data as Task[]);
      setInitialLoading(false);
    };
    fetchTasks();
  }, [user, projectId]);

  const addTask = async (
    projectId: string,
    title: string,
    description: string | null,
    priority: Priority,
    due_date: string | null,
  ) => {
    if (!user) return;

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle) {
      notify.notification.error(
        "Task title cannot be empty",
        "Please enter a valid title",
        "empty-task-title-error",
      );
      return false;
    }

    setActionLoading(true);
    const [data, error] = await createTask({
      userId: user.id,
      projectId,
      title: cleanTitle,
      description: cleanDescription,
      status: "todo",
      priority,
      due_date: due_date,
    });
    if (error) {
      notify.error("Failed to create task", { duration: 2 });
      console.error("Error creating task:", error);
      setActionLoading(false);
      return false;
    }
    notify.success("Task created successfully!", { duration: 1 });
    setTasks((prev) => [data as Task, ...prev]);
    setActionLoading(false);
    return true;
  };

  const removeTask = async (id: string) => {
    setActionLoading(true);
    const error = await deleteTask(id);
    if (error) {
      notify.error("Failed to delete task", { duration: 2 });
      console.error("Error deleting task:", error);
      setActionLoading(false);
      return false;
    }
    notify.success("Task deleted successfully!", { duration: 1 });
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setActionLoading(false);
    return true;
  };

  const editTask = async (
    id: string,
    fields: Omit<UpdateTaskPayload, "id">,
  ) => {
    if ("title" in fields) {
      const cleanTitle = fields.title.trim();

      if (!cleanTitle) {
        notify.notification.error(
          "Task title cannot be empty",
          "Please enter a valid title",
          "empty-task-title-error",
        );
        return false;
      }
    }

    setActionLoading(true);
    const error = await updateTask({
      id,
      ...fields,
    });
    if (error) {
      notify.error("Failed to update task", { duration: 2 });
      console.error("Error updating task:", error);
      setActionLoading(false);
      return false;
    }
    notify.success("Task updated successfully!", { duration: 1 });
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...fields,
              due_date:
                "due_date" in fields
                  ? (fields.due_date ?? null)
                  : task.due_date,
            }
          : task,
      ),
    );
    setActionLoading(false);
    return true;
  };

  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id) ?? null;
  };

  return {
    tasks,
    setTasks,
    addTask,
    removeTask,
    editTask,
    initialLoading,
    actionLoading,
    getTaskById,
  };
};

export default useTasks;
