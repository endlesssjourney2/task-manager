import { useEffect, useState } from "react";
import type { Profile } from "../types/profile";
import { useAuth } from "../context/AuthContext";
import { getProfile, updateProfile, uploadAvatar } from "../api/profile";
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

  const editProfile = async (username: string) => {
    if (!user) return;

    setActionLoading(true);

    const error = await updateProfile({ id: user.id, display_name: username });
    if (error) {
      notify.error("Failed to update profile", { duration: 2 });
      console.error("Error updating profile:", error);
      setActionLoading(false);
      return;
    }
    notify.success("Username updated successfully", { duration: 1 });
    setProfile((prev) => (prev ? { ...prev, display_name: username } : prev));
    setActionLoading(false);
    return;
  };

  const editAvatar = async (file: File) => {
    if (!user) return;

    setActionLoading(true);

    const [url, uploadError] = await uploadAvatar(user.id, file);

    if (uploadError) {
      notify.error("Failed to upload avatar", { duration: 2 });
      console.error("Error uploading avatar", uploadError);
      setActionLoading(false);
      return;
    }

    const updateError = await updateProfile({
      id: user.id,
      avatar_url: url as string,
    });

    if (updateError) {
      notify.error("Failed to update avatar", { duration: 2 });
      console.error("Error updating avatar", updateError);
      setActionLoading(false);
      return;
    }

    notify.success("Avatar updated successfully", { duration: 1 });
    setProfile((prev) =>
      prev ? { ...prev, avatar_url: url as string } : prev,
    );
    setActionLoading(false);
  };

  return { profile, initialLoading, actionLoading, editProfile, editAvatar };
};

export default useProfile;
