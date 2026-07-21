import { Button, ColorPicker, Input, Modal } from "antd";
import s from "./AddModalProject.module.css";
import { useState, type FC } from "react";
import { getRandomColor } from "../../../helpers/getRandomColor";
import { IconCancel, IconFolder, IconFolderPlus } from "@tabler/icons-react";

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
        <div className={s.footer} key={"footer"}>
          <Button type="default" onClick={handleCancel}>
            <IconCancel size={16} />
            Cancel
          </Button>
          <Button type="primary" onClick={handleOk} loading={loading}>
            <IconFolderPlus size={16} />
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
              arrow={{ pointAtCenter: true }}
              placement="bottom"
              value={color}
              onChange={(e) => setColor(e.toHexString())}
            >
              <IconFolder
                style={{ cursor: "pointer" }}
                size={25}
                color={color}
              />
            </ColorPicker>
          }
        />
      </div>
    </Modal>
  );
};

export default HomeModal;
