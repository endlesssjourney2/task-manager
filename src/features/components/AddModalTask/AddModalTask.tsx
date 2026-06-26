import { Button, DatePicker, Input, Modal, Select } from "antd";
import { useEffect, useState, type FC } from "react";
import { useProjectsContext } from "../../../context/ProjectsContext";
import { useTasksContext } from "../../../context/TasksContext";
import type { Priority } from "../../../types/task";
import { PRIORITY_OPTIONS } from "../../../constants/priority";
import s from "./AddModalTask.module.css";
import { capitalizeFirst } from "../../../helpers/capitalizeFirst";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { nextMonday } from "../../../helpers/dates";

type Props = {
  modalOpen: boolean;
  handleClose: () => void;
};

const QUICK_DATES = [
  { label: "Today", getValue: () => dayjs() },
  { label: "Tomorrow", getValue: () => dayjs().add(1, "day") },
  { label: "Next Week", getValue: () => nextMonday(dayjs()) },
];

const AddModalTask: FC<Props> = ({ modalOpen, handleClose }) => {
  const { projects } = useProjectsContext();
  const { addTask, actionLoading } = useTasksContext();

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
  const [priority, setPriority] = useState<Priority>("low");
  const [date, setDate] = useState<Dayjs | null>(null);

  const options = projects.map((p) => ({
    value: p.id,
    label: p.title,
  }));

  const handleOk = async () => {
    const result = await addTask(
      selectedProjectId,
      title,
      description,
      priority,
      date ? date.format("YYYY-MM-DD") : null,
    );
    if (result) {
      setTitle("");
      setDescription("");
      setDate(null);
      handleClose();
    }
  };

  return (
    <Modal
      style={{ top: "200px", minWidth: "600px" }}
      open={modalOpen}
      onCancel={handleClose}
      title="Add new task"
      footer={[
        <div className={s.footer}>
          <div className={s.priorityIndicator}>
            <div
              className={s.priorityCircle}
              style={{
                background:
                  priority === "high"
                    ? "#ef4444"
                    : priority === "medium"
                      ? "#f59e0b"
                      : "#22c55e",
              }}
            />
            <span
              className={s.priorityLabel}
              style={{
                color:
                  priority === "high"
                    ? "#ef4444"
                    : priority === "medium"
                      ? "#f59e0b"
                      : "#22c55e",
              }}
            >
              {capitalizeFirst(priority)}
            </span>
          </div>

          <div className={s.buttons}>
            <Button type="default" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleOk} loading={actionLoading}>
              Add task
            </Button>
          </div>
        </div>,
      ]}
    >
      <div className={s.inputs}>
        <div className={s.inputContainer}>
          <span className={s.subtitle}>Title</span>
          <Input.TextArea
            placeholder="Task title"
            styles={{
              textarea: { backgroundColor: "#161b22", borderColor: "#30363d" },
            }}
            rows={1}
            autoSize={{ minRows: 1, maxRows: 1 }}
            className={s.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={s.inputContainer}>
          <span className={s.subtitle}>Description</span>
          <Input.TextArea
            placeholder="Description for your task..."
            styles={{
              textarea: { backgroundColor: "#161b22", borderColor: "#30363d" },
            }}
            rows={3}
            autoSize={{ minRows: 2, maxRows: 3 }}
            className={s.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className={s.bottom}>
        <div className={s.selects}>
          <div className={s.selectContainer}>
            <span className={s.subtitle}>Project</span>
            <Select
              className={s.select}
              defaultValue={selectedProjectId}
              style={{ width: 120 }}
              options={options}
              value={selectedProjectId}
              onChange={(newValue) => setSelectedProjectId(newValue)}
            />
          </div>

          <div className={s.selectContainer}>
            <span className={s.subtitle}>Priority</span>
            <Select
              className={s.select}
              defaultValue={priority}
              style={{ width: 120 }}
              options={PRIORITY_OPTIONS}
              value={priority}
              onChange={(newValue) => setPriority(newValue)}
            />
          </div>
        </div>
        <div className={s.dateContainer}>
          <span className={s.subtitle}>Date</span>
          <DatePicker
            value={date}
            format={"DD/MMM/YYYY"}
            onChange={(e) => setDate(e)}
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

export default AddModalTask;
