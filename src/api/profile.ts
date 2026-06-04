import { supabase } from "../supabase/supabaseClient";
import type { UpdateProfilePayload } from "../types/profile";

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return [null, error];
  }
  return [data, null];
};

export const updateProfile = async (payload: UpdateProfilePayload) => {
  const { id, ...rest } = payload;

  const { error } = await supabase.from("profiles").update(rest).eq("id", id);

  if (error) {
    console.error("Error updating profile:", error);
    return null;
  }
};
