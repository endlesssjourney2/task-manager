import { ColorPicker, Input, Modal } from "antd";
import s from "./EditModalProject.module.css";
import { useState, type FC } from "react";
import type { Project, UpdateProjectPayload } from "../../../../types/project";

type Props = {
  modalOpen: boolean;
  handleCloseModal: () => void;
  selectedProject: Project;
  handleEditProject: (
    id: string,
    fields: Omit<UpdateProjectPayload, "id">,
  ) => Promise<boolean>;
  loading?: boolean;
};

const EditModalProject: FC<Props> = ({
  modalOpen,
  handleCloseModal,
  selectedProject,
  loading,
  handleEditProject,
}) => {
  const [title, setTitle] = useState(selectedProject.title);
  const [color, setColor] = useState(selectedProject.color);

  const handleOk = async () => {
    if (title === selectedProject.title && color === selectedProject.color) {
      handleCloseModal();
      return;
    }
    const result = await handleEditProject(selectedProject.id, {
      title,
      color,
    });
    if (result) {
      handleCloseModal();
    }
  };

  return (
    <Modal
      style={{ top: "250px" }}
      closable={{ "aria-label": "Custom Close Button" }}
      title={`Edit your project ${selectedProject.title}`}
      open={modalOpen}
      onCancel={handleCloseModal}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <div className={s.modalContainer}>
        <Input
          onPressEnter={handleOk}
          placeholder="Title..."
          className={s.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ColorPicker
          className={s.datePicker}
          value={color}
          onChange={(e) => setColor(e.toHexString())}
        />
      </div>
    </Modal>
  );
};

export default EditModalProject;
