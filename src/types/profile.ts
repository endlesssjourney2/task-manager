export type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type UpdateProfilePayload = {
  id: string;
  display_name?: string | null;
  avatar_url?: string | null;
};
