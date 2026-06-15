import { Modal, Select } from "antd";
import { useEffect, useState, type FC } from "react";
import { useProjectsContext } from "../../../context/ProjectsContext";
import { useTasksContext } from "../../../context/TasksContext";

type Props = {
  modalOpen: boolean;
  handleClose: () => void;
};

const AddModalTask: FC<Props> = ({ modalOpen, handleClose }) => {
  const { projects } = useProjectsContext();
  const { addTask } = useTasksContext();

  const lastProjectId = projects[0]?.id;

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    lastProjectId,
  );

  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0]?.id);
    }
  }, [projects]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const options = projects.map((p) => ({
    value: p.id,
    label: p.title,
  }));

  const handleOk = async () => {
    await addTask(selectedProjectId, title, description, "high", null);
    handleClose();
  };

  return (
    <Modal open={modalOpen} onCancel={handleClose} onOk={handleOk}>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Select
        defaultValue={selectedProjectId}
        style={{ width: 100 }}
        options={options}
        value={selectedProjectId}
        onChange={(newValue) => setSelectedProjectId(newValue)}
      />
    </Modal>
  );
};

export default AddModalTask;
