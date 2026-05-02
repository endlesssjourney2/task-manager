import { supabase } from "../supabase/supabaseClient";
import type { CreateTaskPayload } from "../types/task";

export const getTasks = async (projectId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks: ", error.message);
    return [null, error];
  }
  return [data, null];
};

export const createTask = async (payload: CreateTaskPayload) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: payload.userId,
      project_id: payload.projectId,
      title: payload.title,
      description: payload.description,
      status: payload.status,
      priority: payload.priority,
      due_date: payload.dueDate,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating task: ", error.message);
    return [null, error];
  }
  return [data, null];
};

export const deleteTask = async (id: string) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) {
    console.error("Error deleting task: ", error.message);
    return error;
  }
  return null;
};
