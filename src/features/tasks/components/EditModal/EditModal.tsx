import { useState, type FC } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Button, DatePicker, Input, Modal, Select } from "antd";
import s from "./EditModal.module.css";
import type { Priority, Task } from "../../../../types/task";
import { PRIORITY_OPTIONS } from "../../../../constants/priority";
import { useProjectTasksContext } from "../../../../context/ProjectTasksContext";
import { QUICK_DATES } from "../../../../constants/dates";
import { capitalizeFirst } from "../../../../helpers/capitalizeFirst";

type Props = {
  modalOpen: boolean;
  selectedTask: Task;
  handleCloseModal: () => void;
};

const EditModal: FC<Props> = ({
  modalOpen,
  selectedTask,
  handleCloseModal,
}) => {
  const { editTask, actionLoading } = useProjectTasksContext();
  const [title, setTitle] = useState(selectedTask.title);
  const [description, setDescription] = useState(selectedTask.description);
  const [priority, setPriority] = useState<Priority>(selectedTask.priority);
  const [date, setDate] = useState<Dayjs | null>(
    selectedTask.due_date ? dayjs(selectedTask.due_date) : null,
  );

  const isEdit =
    selectedTask.title === title &&
    selectedTask.description === description &&
    selectedTask.priority === priority &&
    selectedTask.due_date === (date ? date.format("YYYY-MM-DD") : null);

  const handleEditTask = async () => {
    if (isEdit) {
      handleCloseModal();
      return;
    }
    const result = await editTask(selectedTask.id, {
      title,
      description,
      priority,
      due_date: date ? date.format("YYYY-MM-DD") : null,
    });
    if (result) {
      handleCloseModal();
    }
  };

  const handleReset = () => {
    setTitle(selectedTask.title);
    setDescription(selectedTask.description);
    setPriority(selectedTask.priority);
    setDate(selectedTask.due_date ? dayjs(selectedTask.due_date) : null);
  };

  return (
    <Modal
      title={`Edit your task ${selectedTask.title}`}
      closable={{ "aria-label": "Custom Close Button" }}
      open={modalOpen}
      onCancel={handleCloseModal}
      onOk={handleEditTask}
      footer={[
        <div className={s.footer}>
          <div className={s.statusIndicator}>
            <div className={`${s.circle} ${s[selectedTask.status]}`} />
            <span className={s.statusText}>
              {capitalizeFirst(selectedTask.status)}
            </span>
          </div>

          <div className={s.buttons}>
            <Button type="default" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="default" onClick={handleReset}>
              Reset
            </Button>
            <Button
              type="primary"
              onClick={handleEditTask}
              loading={actionLoading}
            >
              Edit task
            </Button>
          </div>
        </div>,
      ]}
    >
      <div className={s.inputs}>
        <div className={s.inputContainer}>
          <span className={s.subtitle}>Title</span>
          <Input.TextArea
            size="large"
            rows={1}
            autoSize={{ minRows: 1, maxRows: 1 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            styles={{
              textarea: {
                backgroundColor: "#161b22",
                borderColor: "#30363d",
              },
            }}
          />
        </div>
        <div className={s.inputContainer}>
          <span className={s.subtitle}>Description</span>
          <Input.TextArea
            rows={3}
            autoSize={{ minRows: 1, maxRows: 3 }}
            size="large"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            styles={{
              textarea: {
                backgroundColor: "#161b22",
                borderColor: "#30363d",
              },
            }}
          />
        </div>
      </div>
      <div className={s.actions}>
        <div className={s.actionsContainer}>
          <span className={s.subtitle}>Priority</span>
          <Select
            className={s.select}
            value={priority}
            options={PRIORITY_OPTIONS}
            style={{ width: 150 }}
            onChange={(p) => setPriority(p)}
          />
        </div>
        <div className={s.dateContainer}>
          <span className={s.subtitle}>Due date</span>
          <DatePicker
            format={"DD/MMM/YYYY"}
            value={date}
            onChange={(d) => setDate(d)}
            disabledDate={(curr) => curr.isBefore(dayjs(), "day")}
            className={s.datePicker}
          />
          <div className={s.quickDates}>
            {QUICK_DATES.map((q) => (
              <button
                onClick={() => setDate(q.getValue())}
                className={s.quickDateBtn}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
