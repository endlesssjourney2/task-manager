import { supabase } from "../supabase/supabaseClient";
import type { UpdateProjectPayload } from "../types/project";

export const getProjects = async (userId: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [null, error];
  }

  return [data, null];
};

export const createProject = async (
  title: string,
  color: string | null,
  userId: string,
) => {
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title,
      color,
      user_id: userId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    return [null, error];
  }

  return [data, null];
};

export const deleteProject = async (id: string) => {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    return error;
  }

  return null;
};

export const updateProject = async (payload: UpdateProjectPayload) => {
  const { id, ...rest } = payload;

  const { error } = await supabase.from("projects").update(rest).eq("id", id);

  if (error) {
    console.error("Error updating project", error.message);
    return null;
  }
};
