import type { FC } from "react";
import type { Task, UpdateTaskPayload } from "../../../../types/task";
import s from "./TasksList.module.css";
import CustomStatus from "../CustomStatus/CustomStatus";

type Props = {
  tasks: Task[];
  removeTask: (id: string) => void;
  editTask: (
    id: string,
    fields: Omit<UpdateTaskPayload, "id">,
  ) => Promise<boolean>;
  handleOpenModal: (task: Task) => void;
};

const TasksList: FC<Props> = ({
  tasks,
  removeTask,
  editTask,
  handleOpenModal,
}) => {
  return (
    <>
      <ul className={s.list}>
        {tasks.map((t) => (
          <li key={t.id} className={s.item}>
            <div className={s.header}>
              <CustomStatus
                status={t.status}
                id={t.id}
                updateStatus={(id, status) => editTask(id, { status })}
              />
            </div>

            <div className={s.body}>
              <span className={s.title}>{t.title}</span>
              <span>{t.description}</span>
            </div>
            <div className={s.footer}>
              <span>{t.priority}</span>
              <span>{t.due_date}</span>
            </div>
            <button className={s.btn} onClick={() => removeTask(t.id)}>
              REMOVE
            </button>
            <button className={s.btn} onClick={() => handleOpenModal(t)}>
              EDIT
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TasksList;
