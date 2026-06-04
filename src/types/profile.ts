export type Profile = {
  id: string;
  display_name: string;
  avatar_url: string;
  created_at: string;
};

export type UpdateProfilePayload = {
  id: string;
  display_name?: string;
  avatar_url?: string;
};
