import { useState, type FC } from "react";
import s from "./TasksModal.module.css";
import { DatePicker, Input, Modal, Select } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Priority } from "../../../../types/task";
import CustomModalFooter from "../../../../components/CustomModalFooter/CustomModalFooter";
import { PRIORITY_OPTIONS } from "../../../../constants/priority";

type Props = {
  modalOpen: boolean;
  handleCloseModal: () => void;
  handleCreateTask: (
    title: string,
    description: string | null,
    priority: Priority,
    dueDate: string | null,
  ) => Promise<boolean>;
  loading?: boolean;
};

const TasksModal: FC<Props> = ({
  modalOpen,
  handleCloseModal,
  handleCreateTask,
  loading,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [priority, setPriority] = useState<Priority>("medium");

  const handleOk = async () => {
    const result = await handleCreateTask(
      title,
      description,
      priority,
      date ? date.format("YYYY-MM-DD") : null,
    );
    if (result) {
      setPriority("medium");
      setTitle("");
      setDescription("");
      setDate(null);
    }
  };

  const handleClear = () => {
    setPriority("medium");
    setTitle("");
    setDescription("");
    setDate(null);
  };

  const handleSelect = (value: Priority) => {
    setPriority(value);
  };

  return (
    <Modal
      title="Add new Task"
      closable={{ "aria-label": "Custom Close Button" }}
      rootClassName="task-modal"
      open={modalOpen}
      onCancel={handleCloseModal}
      style={{ top: "150px" }}
      footer={[
        <CustomModalFooter
          handleAction={handleClear}
          handleCloseModal={handleCloseModal}
          handleOk={handleOk}
          loading={loading}
        />,
      ]}
    >
      <div className={s.modalContent}>
        <div className={s.inputs}>
          <Input
            size="large"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={s.input}
          />
          <Input
            size="large"
            placeholder="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={s.input}
          />
          <Select
            placeholder="Priority"
            value={priority}
            defaultValue={"medium"}
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
            onChange={handleSelect}
            className={s.select}
          />
          <DatePicker
            disabledDate={(curr) => curr.isBefore(dayjs(), "day")}
            size="large"
            placeholder="End date"
            value={date}
            onChange={(d) => setDate(d)}
            className={s.datePicker}
          />
        </div>
      </div>
    </Modal>
  );
};

export default TasksModal;
