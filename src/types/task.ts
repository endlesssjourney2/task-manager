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
};

export type CreateTaskPayload = {
  userId: string;
  projectId: string;
  title: string;
  description: string | null;
  status: Status;
  priority: Priority;
  dueDate: string | null;
};
