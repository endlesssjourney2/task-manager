export type Project = {
  id: string;
  title: string;
  color: string | null;
  created_at: string;
};

export type UpdateProjectPayload = Omit<Project, "created_at">;
