import { useState, type FC } from "react";
import type { Priority, Task, UpdateTaskPayload } from "../../../../types/task";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { DatePicker, Input, Modal, Select } from "antd";
import { PRIORITY_OPTIONS } from "../../../../constants/priority";

type Props = {
  modalOpen: boolean;
  handleCloseModal: () => void;
  handleEditTask: (
    id: string,
    fields: Omit<UpdateTaskPayload, "id">,
  ) => Promise<boolean>;
  selectedTask: Task;
};

const EditModal: FC<Props> = ({
  modalOpen,
  handleCloseModal,
  handleEditTask,
  selectedTask,
}) => {
  const [title, setTitle] = useState(selectedTask.title);
  const [description, setDescription] = useState(selectedTask.description);
  const [priority, setPriority] = useState<Priority>(selectedTask.priority);
  const [date, setDate] = useState<Dayjs | null>(
    selectedTask.due_date ? dayjs(selectedTask.due_date) : null,
  );

  const handleOk = async () => {
    await handleEditTask(selectedTask.id, {
      title,
      description,
      priority,
      dueDate: date ? date.format("YYYY-MM-DD") : null,
    });
  };

  return (
    <Modal
      title="Edit your Task"
      closable={{ "aria-label": "Custom Close Button" }}
      open={modalOpen}
      onCancel={handleCloseModal}
      onOk={handleOk}
    >
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select
        options={PRIORITY_OPTIONS}
        value={priority}
        onChange={(e) => setPriority(e)}
      />
      <DatePicker value={date} onChange={(e) => setDate(e)} />
    </Modal>
  );
};

export default EditModal;
