import { useState } from "react";
import { useProfileContext } from "../../../../context/ProfileContext";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import s from "./SidebarProfile.module.css";
import { getFirstLetter } from "../../../../helpers/getFirstLetter";
import { supabase } from "../../../../supabase/supabaseClient";
import { Dropdown, type MenuProps } from "antd";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";

const SidebarProfile = () => {
  const { profile, initialLoading } = useProfileContext();

  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const handleOpenModal = () => setEditProfileModalOpen(true);
  const handleCloseModal = () => setEditProfileModalOpen(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const items: MenuProps["items"] = [
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
      onClick: handleOpenModal,
    },
    { type: "divider" },
    {
      key: "logout",
      label: "Log out",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  if (initialLoading || !profile) return null;

  return (
    <div className={s.profile}>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottom">
        <div className={s.profileContent}>
          {profile.avatar_url ? (
            <img className={s.avatar} src={profile.avatar_url} alt="avatar" />
          ) : (
            <div className={s.noAvatar}>
              {getFirstLetter(profile.display_name)}
            </div>
          )}
          <span className={s.username}>{profile.display_name}</span>
        </div>
      </Dropdown>
      <ProfileEditModal
        modalOpen={editProfileModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default SidebarProfile;
