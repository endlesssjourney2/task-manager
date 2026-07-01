import type { FC } from "react";
import s from "./TasksList.module.css";
import type { Status, Task } from "../../../../types/task";
import { useProjectTasksContext } from "../../../../context/ProjectTasksContext";
import TaskDropdown from "../TaskDropdown/TaskDropdown";
import CustomStatus from "../CustomStatus/CustomStatus";
import { formatDueDate } from "../../../../helpers/dates";
import CustomPriority from "../CustomPriority/CustomPriority";
import { useDoneTasksContext } from "../../../../context/DoneTasksContext";

type Props = {
  tasks: Task[];
  handleOpenModal: (task: Task) => void;
};

const TasksList: FC<Props> = ({ tasks, handleOpenModal }) => {
  const { editTask } = useProjectTasksContext();
  const { refetch } = useDoneTasksContext();

  const handleChangeStatus = async (
    taskId: string,
    currentStatus: Status,
    newStatus: Status,
  ) => {
    if (currentStatus === newStatus) return;
    const result = await editTask(taskId, { status: newStatus });

    if (result && newStatus === "done") {
      refetch();
    }
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
                  <span className={s.subtitle}>{t.description}</span>
                </div>
              </div>
              <div className={s.right}>
                <div className={s.date}>{formatDueDate(t.due_date)}</div>
                <CustomPriority
                  priority={t.priority}
                  onChange={(newPriority) => {
                    newPriority === t.priority
                      ? null
                      : editTask(t.id, { priority: newPriority });
                  }}
                />
                <TaskDropdown task={t} handleOpenEditModal={handleOpenModal} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TasksList;
