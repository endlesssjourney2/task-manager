import { useState, type FC } from "react";
import s from "./AddInlineTask.module.css";
import { useProjectTasksContext } from "../../../../context/ProjectTasksContext";
import type { Priority } from "../../../../types/task";
import { DatePicker, Input, Popover } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { QUICK_DATES } from "../../../../constants/dates";
import {
  IconCalendar,
  IconCancel,
  IconPlus,
  IconRestore,
} from "@tabler/icons-react";
import PriorityIcon from "../CustomPriority/PriorityIcon/PriorityIcon";
import { formatDueDate } from "../../../../helpers/dates";

type Props = {
  projectId: string;
};

const PRIORITIES: Priority[] = ["low", "medium", "high"];

const AddInlineTask: FC<Props> = ({ projectId }) => {
  const { addTask, actionLoading } = useProjectTasksContext();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [priority, setPriority] = useState<Priority>("low");

  const reset = () => {
    setTitle("");
    setDescription("");
    setDate(null);
    setPriority("low");
  };

  const handleAddTask = async () => {
    const result = await addTask(
      projectId,
      title,
      description,
      priority,
      date ? date.format("YYYY-MM-DD") : null,
    );
    if (result) {
      reset();
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    reset();
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
              autoFocus
              rows={1}
              autoSize={{ minRows: 1, maxRows: 3 }}
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={s.titleInput}
            />

            <Input.TextArea
              rows={1}
              autoSize={{ minRows: 1, maxRows: 3 }}
              placeholder="Description for your task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={s.descriptionInput}
            />
          </div>
          <div className={s.bottom}>
            <div className={s.left}>
              <Popover
                title={<div className={s.subtitle}>Due Date</div>}
                trigger="click"
                arrow={{ pointAtCenter: true }}
                placement="bottomLeft"
                content={
                  <div className={s.popover}>
                    <DatePicker
                      value={date}
                      format="DD/MMMM/YYYY"
                      onChange={(e) => setDate(e)}
                      disabledDate={(curr) => curr.isBefore(dayjs(), "day")}
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
                }
              >
                <button className={s.actionBtn}>
                  <IconCalendar size={16} />
                  {date ? formatDueDate(date.format("YYYY-MM-DD")) : "Date"}
                </button>
              </Popover>
              <Popover
                title={<div className={s.subtitle}>Priority</div>}
                trigger="click"
                arrow={{ pointAtCenter: true }}
                placement="bottomLeft"
                content={
                  <div className={s.popover}>
                    {PRIORITIES.map((p) => (
                      <div
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`${s.priorityOption} ${priority === p ? s.active : ""}`}
                      >
                        <PriorityIcon priority={p} />
                      </div>
                    ))}
                  </div>
                }
              >
                <button className={`${s.actionBtn} ${s[priority]}`}>
                  <PriorityIcon priority={priority} />
                </button>
              </Popover>
            </div>
            <div className={s.buttons}>
              <button
                className={`${s.btn} ${s.cancelBtn}`}
                onClick={handleCancel}
                disabled={actionLoading}
              >
                <IconCancel size={16} />
                Cancel
              </button>
              <button
                className={`${s.btn} ${s.resetBtn}`}
                onClick={reset}
                disabled={actionLoading}
              >
                <IconRestore size={16} />
                Reset
              </button>
              <button
                className={`${s.btn} ${s.addBtn}`}
                onClick={handleAddTask}
                disabled={actionLoading}
              >
                <IconPlus size={16} />
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddInlineTask;
