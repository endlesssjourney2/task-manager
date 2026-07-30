import { Button, DatePicker, Input, Modal, Select } from "antd";
import { useEffect, useState, type FC } from "react";
import { useProjectsContext } from "../../../context/ProjectsContext";
import { useTasksContext } from "../../../context/TasksContext";
import type { Priority } from "../../../types/task";
import { PRIORITY_OPTIONS } from "../../../constants/priority";
import s from "./AddModalTask.module.css";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { QUICK_DATES } from "../../../constants/dates";
import PriorityIcon from "../../tasks/components/CustomPriority/PriorityIcon/PriorityIcon";
import { IconCancel, IconPlus } from "@tabler/icons-react";
import ProjectIcon from "../../project/components/ProjectIcon/ProjectIcon";

type Props = {
  modalOpen: boolean;
  handleClose: () => void;
};

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

  const projectOptions = projects.map((p) => ({
    value: p.id,
    label: <ProjectIcon project={p} size={14} fontSize={14} />,
  }));

  const priorityOptions = PRIORITY_OPTIONS.map((p) => ({
    ...p,
    label: <PriorityIcon priority={p.value} />,
  }));

  const reset = () => {
    setTitle("");
    setDescription("");
    setDate(null);
    setPriority("low");
  };

  const handleOk = async () => {
    const result = await addTask(
      selectedProjectId,
      title,
      description,
      priority,
      date ? date.format("YYYY-MM-DD") : null,
    );
    if (result) {
      reset();
      handleClose();
    }
  };

  const handleCancel = () => {
    reset();
    handleClose();
  };

  return (
    <Modal
      style={{ top: "200px", minWidth: "600px" }}
      open={modalOpen}
      onCancel={handleCancel}
      title="Add new task"
      footer={[
        <div className={s.footer} key={"footer"}>
          <div className={s.buttons}>
            <Button type="default" onClick={handleCancel}>
              <IconCancel size={16} />
              Cancel
            </Button>
            <Button type="primary" onClick={handleOk} loading={actionLoading}>
              <IconPlus size={16} />
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
        <div className={s.bottomContainer}>
          <span className={s.subtitle}>Project</span>
          <Select
            className={s.select}
            defaultValue={selectedProjectId}
            options={projectOptions}
            value={selectedProjectId}
            onChange={(newValue) => setSelectedProjectId(newValue)}
          />
        </div>

        <div className={s.bottomContainer}>
          <span className={s.subtitle}>Priority</span>
          <Select
            className={s.select}
            defaultValue={priority}
            options={priorityOptions}
            value={priority}
            onChange={(newValue) => setPriority(newValue)}
          />
        </div>
      </div>
      <div className={s.dateContainer}>
        <span className={s.subtitle}>Date</span>
        <div className={s.date}>
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
                key={q.label}
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
