import { useState } from "react";
import { useProfileContext } from "../../../../context/ProfileContext";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import s from "./SidebarProfile.module.css";
import { getFirstLetter } from "../../../../helpers/getFirstLetter";

const SidebarProfile = () => {
  const { profile, initialLoading } = useProfileContext();

  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const handleOpenModal = () => {
    setEditProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditProfileModalOpen(false);
  };

  if (initialLoading || !profile) return null;

  return (
    <div className={s.profile}>
      <div className={s.profileContent} onClick={handleOpenModal}>
        {profile.avatar_url ? (
          <img className={s.avatar} src={profile.avatar_url} alt="avatar" />
        ) : (
          <div className={s.noAvatar}>
            {getFirstLetter(profile.display_name)}
          </div>
        )}
        <span className={s.username}>{profile?.display_name ?? null}</span>
      </div>
      <ProfileEditModal
        modalOpen={editProfileModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default SidebarProfile;
