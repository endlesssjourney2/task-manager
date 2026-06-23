import type { FC } from "react";
import s from "./TasksList.module.css";
import type { Task } from "../../../../types/task";
import { useProjectTasksContext } from "../../../../context/ProjectTasksContext";
import TaskDropdown from "../../../components/TaskDropdown/TaskDropdown";
import CustomStatus from "../CustomStatus/CustomStatus";
import { tomorrowDate } from "../../../../helpers/tomorrowDate";
import CustomPriority from "../CustomPriority/CustomPriority";

type Props = {
  tasks: Task[];
  handleOpenModal: (task: Task) => void;
};

const TasksList: FC<Props> = ({ tasks, handleOpenModal }) => {
  const { editTask } = useProjectTasksContext();

  return (
    <>
      <ul className={s.list}>
        {tasks.map((t) => (
          <li className={s.item} key={t.id}>
            <div className={s.status}>
              <CustomStatus
                status={t.status}
                onChange={(newStatus) => {
                  newStatus === t.status
                    ? null
                    : editTask(t.id, { status: newStatus });
                }}
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
                <div className={s.date}>{tomorrowDate(t.due_date)}</div>
                <CustomPriority
                  priority={t.priority}
                  onChange={(newPriority) => {
                    newPriority === t.priority
                      ? null
                      : editTask(t.id, { priority: newPriority });
                  }}
                />
                <TaskDropdown
                  id={t.id}
                  task={t}
                  handleOpenEditModal={handleOpenModal}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TasksList;
