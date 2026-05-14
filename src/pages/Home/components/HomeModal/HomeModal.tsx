import { ColorPicker, Input, Modal } from "antd";
import s from "./HomeModal.module.css";
import { useState, type FC } from "react";

type Props = {
  modalOpen: boolean;
  handleCloseModal: () => void;
  handleCreateProject: (title: string, color: string) => Promise<void>;
  loading: boolean;
};

const HomeModal: FC<Props> = ({
  modalOpen,
  handleCloseModal,
  handleCreateProject,
  loading,
}) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000000");

  const handleOk = async () => {
    await handleCreateProject(title, color);
    setColor("#000000");
    setTitle("");
  };

  return (
    <Modal
      title="Add new project"
      closable={{ "aria-label": "Custom Close Button" }}
      open={modalOpen}
      onCancel={handleCloseModal}
      onOk={handleOk}
      style={{ top: "250px" }}
      confirmLoading={loading}
    >
      <div className={s.modalContent}>
        <Input
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onPressEnter={handleOk}
        />
        <ColorPicker
          defaultValue={color}
          value={color}
          onChange={(e) => setColor(e.toHexString())}
        />
      </div>
    </Modal>
  );
};

export default HomeModal;
