import { Button, ColorPicker, Input, Modal } from "antd";
import s from "./EditModalProject.module.css";
import { useState, type FC } from "react";
import type { Project, UpdateProjectPayload } from "../../../../types/project";
import { IconCancel, IconEdit, IconFolder } from "@tabler/icons-react";

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
      confirmLoading={loading}
      footer={[
        <div className={s.footer} key={"footer"}>
          <Button type="default" onClick={handleCloseModal}>
            <IconCancel size={16} />
            Cancel
          </Button>
          <Button type="primary" onClick={handleOk} loading={loading}>
            <IconEdit size={16} />
            Edit Project
          </Button>
        </div>,
      ]}
    >
      <div className={s.modalContainer}>
        <Input
          className={s.input}
          onPressEnter={handleOk}
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

export default EditModalProject;
