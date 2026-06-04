import { useState } from "react";
import { useProfileContext } from "../../../../context/ProfileContext";
import type { UpdateProfilePayload } from "../../../../types/profile";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";

const SidebarProfile = () => {
  const { profile, editProfile } = useProfileContext();

  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const handleOpenModal = () => {
    setEditProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditProfileModalOpen(false);
  };

  const handleEditProfile = async (
    fields: Omit<UpdateProfilePayload, "id">,
  ) => {
    await editProfile({ display_name: fields.display_name });
  };

  return (
    <div>
      <h2>{profile?.display_name}</h2>
      <button onClick={handleOpenModal}>EDIT</button>
      <ProfileEditModal
        modalOpen={editProfileModalOpen}
        handleCloseModal={handleCloseModal}
        handleEditProfile={handleEditProfile}
        profileName={profile.display_name}
      />
    </div>
  );
};

export default SidebarProfile;
