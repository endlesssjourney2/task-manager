import { useState } from "react";
import s from "./TasksList.module.css";
import type { Status, Task } from "../../../../types/task";
import { useProjectTasksContext } from "../../../../context/ProjectTasksContext";
import CustomStatus from "../CustomStatus/CustomStatus";
import { formatDueDate, getDueDateColor } from "../../../../helpers/dates";
import CustomPriority from "../CustomPriority/CustomPriority";
import EditModal from "../EditModal/EditModal";
import useNotify from "../../../../hooks/useNotify";
import { IconCalendar, IconEdit, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Tooltip } from "antd";

const TasksList = () => {
  const { editTask, removeTask, tasks, actionLoading } =
    useProjectTasksContext();
  const notify = useNotify();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleOpenEditModal = (task: Task) => {
    setEditModalOpen(true);
    setSelectedTask(task);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setTimeout(() => setSelectedTask(null), 300);
  };

  const handleChangeStatus = async (
    taskId: string,
    currentStatus: Status,
    newStatus: Status,
  ) => {
    if (currentStatus === newStatus) return;
    await editTask(taskId, { status: newStatus });
  };

  return (
    <>
      <ul className={s.list}>
        {tasks.map((t) => (
          <li className={s.item} key={t.id}>
            <div className={s.status}>
              <CustomStatus
                status={t.status}
                onChange={(newStatus) =>
                  handleChangeStatus(t.id, t.status, newStatus)
                }
              />
            </div>
            <div className={s.content}>
              <div className={s.left}>
                <div className={s.itemInfo}>
                  <h2
                    style={{
                      textDecoration: t.status === "done" && "line-through",
                    }}
                    className={s.title}
                  >
                    {t.title}
                  </h2>
                  <span className={s.description}>{t.description}</span>
                </div>
              </div>
              <div className={s.right}>
                <Tooltip
                  title={`${t.due_date ? dayjs(t.due_date).format("YYYY-MM-DD") : ""}`}
                >
                  <div
                    className={s.date}
                    style={{ color: getDueDateColor(t.due_date, t.status) }}
                  >
                    <IconCalendar size={16} />
                    {formatDueDate(t.due_date)}
                  </div>
                </Tooltip>

                <CustomPriority
                  priority={t.priority}
                  onChange={(newPriority) => {
                    newPriority === t.priority
                      ? null
                      : editTask(t.id, { priority: newPriority });
                  }}
                />
                <div className={s.buttons}>
                  <button
                    className={`${s.button} ${s.editBtn}`}
                    onClick={() => handleOpenEditModal(t)}
                    disabled={actionLoading}
                  >
                    <IconEdit size={14} />
                    Edit
                  </button>
                  <button
                    className={`${s.button} ${s.removeBtn}`}
                    onClick={() =>
                      notify.modal.confirm(
                        "Are you sure you want to delete this task?",
                        "This action cannot be undone",
                        () => removeTask(t.id),
                        450,
                      )
                    }
                    disabled={actionLoading}
                  >
                    <IconTrash size={14} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedTask && (
        <EditModal
          modalOpen={editModalOpen}
          selectedTask={selectedTask}
          handleCloseModal={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default TasksList;
