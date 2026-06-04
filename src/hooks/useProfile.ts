import { useEffect, useState } from "react";
import type { Profile, UpdateProfilePayload } from "../types/profile";
import { useAuth } from "../context/AuthContext";
import { getProfile, updateProfile } from "../api/profile";
import useNotify from "./useNotify";

const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [initialLoading, setInitialLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useAuth();
  const notify = useNotify();

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      setInitialLoading(true);
      const [data, error] = await getProfile(user.id);
      if (error) {
        notify.notification.error(
          "Failed to load profile",
          "Please try again or check console for more details",
          "fetch-profile-error",
        );
        console.error("Error fetching profile:", error);
        setInitialLoading(false);
        return;
      }
      setProfile(data as Profile);
      setInitialLoading(false);
    };

    fetchProfile();
  }, [user]);

  const editProfile = async (fields: Omit<UpdateProfilePayload, "id">) => {
    if (!user) return;

    setActionLoading(true);

    const error = await updateProfile({ id: user.id, ...fields });
    if (error) {
      notify.error("Failed to update profile", { duration: 2 });
      console.error("Error updating profile:", error);
      setActionLoading(false);
      return;
    }
    setProfile((prev) => (prev ? { ...prev, ...fields } : prev));
    setActionLoading(false);
    return;
  };

  return { profile, initialLoading, actionLoading, editProfile };
};

export default useProfile;
