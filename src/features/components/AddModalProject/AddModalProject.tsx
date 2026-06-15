import { Button, ColorPicker, Input, Modal } from "antd";
import s from "./AddModalProject.module.css";
import { useState, type FC } from "react";
import { getRandomColor } from "../../../helpers/getRandomColor";

type Props = {
  modalOpen: boolean;
  handleCloseModal: () => void;
  handleCreateProject: (title: string, color: string) => Promise<boolean>;
  loading: boolean;
};

const HomeModal: FC<Props> = ({
  modalOpen,
  handleCloseModal,
  handleCreateProject,
  loading,
}) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(getRandomColor());

  const handleOk = async () => {
    const result = await handleCreateProject(title, color);
    if (result) {
      setColor(getRandomColor());
      setTitle("");
    }
  };

  const handleCancel = () => {
    handleCloseModal();
    setColor(getRandomColor());
    setTitle(title);
  };

  return (
    <Modal
      title="Add new project"
      closable={{ "aria-label": "Custom Close Button" }}
      open={modalOpen}
      onCancel={handleCancel}
      style={{ top: "250px" }}
      confirmLoading={loading}
      footer={[
        <div className={s.footer}>
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleOk} loading={loading}>
            Create Project
          </Button>
        </div>,
      ]}
    >
      <div className={s.modalContent}>
        <Input
          className={s.input}
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onPressEnter={handleOk}
          suffix={
            <ColorPicker
              value={color}
              onChange={(e) => setColor(e.toHexString())}
            >
              <div
                className={s.colorSwatch}
                style={{ backgroundColor: color }}
              />
            </ColorPicker>
          }
        />
      </div>
    </Modal>
  );
};

export default HomeModal;
