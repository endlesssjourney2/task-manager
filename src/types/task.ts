export type Status = "todo" | "in_progress" | "done";

export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: Status;
  priority: Priority;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateTaskPayload = {
  userId: string;
  projectId: string;
  title: string;
  description: string | null;
  status: Status;
  priority: Priority;
  due_date: string | null;
};

export type UpdateTaskPayload = {
  id: string;
  title?: string;
  description?: string | null;
  status?: Status;
  priority?: Priority;
  due_date?: string | null;
};

export type TasksWithProjects = Task & {
  projects: {
    title: string;
    color: string;
  };
};
