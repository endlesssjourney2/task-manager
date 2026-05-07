import type { FC } from "react";
import type { Task } from "../../../../types/task";
import s from "./TasksList.module.css";
import { capitalizeFirst } from "../../../../helpers/capitalizeFirst";
type Props = {
  tasks: Task[];
  removeTask: (id: string) => void;
};

const TasksList: FC<Props> = ({ tasks, removeTask }) => {
  return (
    <ul className={s.list}>
      {tasks.map((t) => (
        <li key={t.id} className={s.item}>
          <div className={s.header}>
            <span className={s.status}>{capitalizeFirst(t.status)}</span>
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
        </li>
      ))}
    </ul>
  );
};

export default TasksList;
