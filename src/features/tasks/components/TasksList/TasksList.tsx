import type { FC } from "react";
import s from "./TasksList.module.css";
import CustomStatus from "../CustomStatus/CustomStatus";
import CustomPriority from "../CustomPriority/CustomPriority";
import CustomDate from "../CustomDate/CustomDate";
import useNotify from "../../../../hooks/useNotify";
import type { Task, UpdateTaskPayload } from "../../../../types/task";

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
  const notify = useNotify();

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
              <CustomPriority priority={t.priority} />
            </div>
            <div className={s.mainContent}>
              <div className={s.body}>
                <span className={s.title}>{t.title}</span>
                <span className={s.description}>{t.description}</span>
              </div>
              <div className={s.footer}>
                <CustomDate due_date={t.due_date} />
              </div>
            </div>
            <div className={s.buttons}>
              <button
                className={`${s.btn} ${s.removeBtn}`}
                onClick={() => {
                  notify.modal.confirm(
                    "Are you sure you want delete this task?",
                    "This action cannot be undone.",
                    () => removeTask(t.id),
                  );
                }}
              >
                DELETE
              </button>
              <button
                className={`${s.btn} ${s.editBtn}`}
                onClick={() => handleOpenModal(t)}
              >
                EDIT
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TasksList;
