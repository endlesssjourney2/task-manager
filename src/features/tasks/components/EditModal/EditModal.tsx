import { useState, type FC } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { DatePicker, Input, Modal, Select } from "antd";
import s from "./EditModal.module.css";
import type { Priority, Task, UpdateTaskPayload } from "../../../../types/task";
import CustomModalFooter from "../../../../components/CustomModalFooter/CustomModalFooter";
import { PRIORITY_OPTIONS } from "../../../../constants/priority";

type Props = {
  modalOpen: boolean;
  handleCloseModal: () => void;
  handleEditTask: (
    id: string,
    fields: Omit<UpdateTaskPayload, "id">,
  ) => Promise<boolean>;
  selectedTask: Task;
  loading?: boolean;
};

const EditModal: FC<Props> = ({
  modalOpen,
  handleCloseModal,
  handleEditTask,
  selectedTask,
  loading,
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
      due_date: date ? date.format("YYYY-MM-DD") : null,
    });
  };

  const handleReset = () => {
    setTitle(selectedTask.title);
    setDescription(selectedTask.description);
    setPriority(selectedTask.priority);
    setDate(selectedTask.due_date ? dayjs(selectedTask.due_date) : null);
  };

  return (
    <Modal
      title="Edit your Task"
      closable={{ "aria-label": "Custom Close Button" }}
      open={modalOpen}
      onCancel={handleCloseModal}
      onOk={handleOk}
      footer={[
        <CustomModalFooter
          clearText="Reset"
          handleAction={handleReset}
          handleCloseModal={handleCloseModal}
          handleOk={handleOk}
          loading={loading}
          addText="Edit"
        />,
      ]}
    >
      <div className={s.modalContent}>
        <div className={s.header}>
          <div className={s.item}>
            <span className={s.itemLabel}>Title</span>
            <Input
              size="large"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={s.input}
            />
          </div>
          <div className={s.item}>
            <span className={s.itemLabel}>Description</span>
            <Input
              size="large"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={s.input}
            />
          </div>
        </div>
        <div className={s.bottom}>
          <Select
            size="large"
            className={s.select}
            options={[
              {
                label: (
                  <div className={s.labelContainer}>
                    <span className={s.selectLabel}>Priority</span>
                  </div>
                ),
                options: PRIORITY_OPTIONS,
              },
            ]}
            value={priority}
            onChange={(e) => setPriority(e)}
          />
          <DatePicker
            disabledDate={(curr) => curr.isBefore(dayjs(), "day")}
            size="large"
            value={date}
            onChange={(e) => setDate(e)}
            className={s.datePicker}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
