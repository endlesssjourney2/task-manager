import { useState, type FC } from "react";
import s from "./AddInlineTask.module.css";
import { useProjectTasksContext } from "../../../../context/ProjectTasksContext";
import type { Priority } from "../../../../types/task";
import { Button, DatePicker, Input } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { QUICK_DATES } from "../../../../constants/dates";
import { priorityLabels } from "../../../../constants/priority";

type Props = {
  projectId: string;
};

const AddInlineTask: FC<Props> = ({ projectId }) => {
  const { addTask, actionLoading } = useProjectTasksContext();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [priority, setPriority] = useState<Priority>("low");

  const handleAddTask = async () => {
    const result = await addTask(
      projectId,
      title,
      description,
      priority,
      date ? date.format("YYYY-MM-DD") : null,
    );
    if (result) {
      setIsAdding(false);
      setTitle("");
      setDescription("");
      setDate(null);
      setPriority("low");
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setTitle("");
    setDescription("");
    setDate(null);
    setPriority("low");
  };

  return (
    <>
      {!isAdding && (
        <div className={s.addTask} onClick={() => setIsAdding(true)}>
          <span className={s.addTaskTitle}>Add task +</span>
        </div>
      )}

      {isAdding && (
        <div className={s.addingContainer}>
          <div className={s.inputs}>
            <Input.TextArea
              placeholder="Task title"
              styles={{
                textarea: {
                  backgroundColor: "#161b22",
                  borderColor: "#30363d",
                },
              }}
              rows={1}
              autoSize={{ minRows: 1, maxRows: 1 }}
              className={s.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input.TextArea
              placeholder="Description for your task..."
              styles={{
                textarea: {
                  backgroundColor: "#161b22",
                  borderColor: "#30363d",
                },
              }}
              rows={3}
              autoSize={{ minRows: 1, maxRows: 3 }}
              className={s.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={s.actions}>
            <div className={s.dateContainer}>
              <DatePicker
                value={date}
                format="DD/MMM/YYYY"
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
            <div className={s.priorityContainer}>
              <span className={`${s.subtitle} ${s[priority]}`}>
                {priorityLabels[priority]}
              </span>
              <div className={s.priorityActions}>
                <div
                  onClick={() => setPriority("low")}
                  className={`${s.priority} ${s.l}`}
                />
                <div
                  onClick={() => setPriority("medium")}
                  className={`${s.priority} ${s.m}`}
                />
                <div
                  onClick={() => setPriority("high")}
                  className={`${s.priority} ${s.h}`}
                />
              </div>
            </div>
          </div>
          <div className={s.buttons}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="primary"
              onClick={handleAddTask}
              loading={actionLoading}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddInlineTask;
