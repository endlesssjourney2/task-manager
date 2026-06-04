import { Modal } from "antd";
import { useState, type FC } from "react";
import type { UpdateProfilePayload } from "../../../../types/profile";

type Props = {
  profileName: string;
  modalOpen: boolean;
  handleEditProfile: (
    fields: Omit<UpdateProfilePayload, "id">,
  ) => Promise<void>;
  handleCloseModal: () => void;
};

const ProfileEditModal: FC<Props> = ({
  profileName,
  modalOpen,
  handleCloseModal,
  handleEditProfile,
}) => {
  const [name, setName] = useState(profileName);

  const handleOk = async () => {
    await handleEditProfile({ display_name: name });
    handleCloseModal();
  };

  return (
    <Modal open={modalOpen} onCancel={handleCloseModal} onOk={handleOk}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Modal>
  );
};

export default ProfileEditModal;
