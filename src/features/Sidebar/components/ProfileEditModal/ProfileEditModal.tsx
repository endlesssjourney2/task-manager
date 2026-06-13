import { Modal } from "antd";
import React, { useRef, useState, type FC } from "react";
import { getFirstLetter } from "../../../../helpers/getFirstLetter";
import s from "./ProfileEditModal.module.css";
import { useProfileContext } from "../../../../context/ProfileContext";

type Props = {
  modalOpen: boolean;
  handleCloseModal: () => void;
};

const ProfileEditModal: FC<Props> = ({ modalOpen, handleCloseModal }) => {
  const { profile, editProfile, editAvatar, actionLoading, removeAvatar } =
    useProfileContext();
  const [name, setName] = useState(profile?.display_name ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOk = async () => {
    if (name === profile?.display_name) {
      handleCloseModal();
      return;
    }
    const result = await editProfile(name);
    if (result) handleCloseModal();
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await editAvatar(file);
  };

  return (
    <Modal
      open={modalOpen}
      onCancel={handleCloseModal}
      onOk={handleOk}
      confirmLoading={actionLoading}
    >
      <div className={s.content}>
        <span className={s.subtitle}>Photo</span>
        <div className={s.avatarInfo}>
          {profile.avatar_url ? (
            <img className={s.avatar} src={profile.avatar_url} alt="avatar" />
          ) : (
            <div className={s.noAvatar}>
              {getFirstLetter(profile.display_name)}
            </div>
          )}
          <div className={s.changeAvatar}>
            <div className={s.buttons}>
              <button
                className={s.btnUpload}
                onClick={handleAvatarClick}
                disabled={actionLoading}
              >
                Change photo
              </button>
              <button
                className={s.btnDelete}
                disabled={actionLoading || !profile.avatar_url}
                onClick={removeAvatar}
              >
                Delete photo
              </button>
              <input
                ref={fileInputRef}
                style={{ display: "none" }}
                type="file"
                accept=".jpeg, .jpg, .png"
                onChange={handleFileChange}
              />
            </div>
            <span className={s.aboutInfo}>
              Do not take a photo that is too big, it will shrink and will not
              be beautiful
            </span>
          </div>
        </div>
        <span className={s.subtitle}>Name</span>
        <div className={s.changeUsername}>
          <input
            className={s.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProfileEditModal;
