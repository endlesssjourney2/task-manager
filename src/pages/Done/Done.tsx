import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { useDoneTasksContext } from "../../context/DoneTasksContext";
import useNotify from "../../hooks/useNotify";
import s from "./Done.module.css";

const Done = () => {
  const { doneTasks, handleRestoreTask, handleRemoveTask } =
    useDoneTasksContext();

  const notify = useNotify();

  return (
    <div className={s.done}>
      <CustomHeader title="Your done tasks" />
      <ul className={s.list}>
        {doneTasks.map((t) => (
          <li key={t.id} className={s.item}>
            <div className={s.status} />
            <div className={s.content}>
              <div className={s.left}>
                <h2
                  style={{
                    textDecoration: t.status === "done" && "line-through",
                  }}
                  className={s.title}
                >
                  {t.title}
                </h2>
                {t.description && (
                  <span className={s.subtitle}>{t.description}</span>
                )}
              </div>
              <div className={s.right}>
                <div className={s.project}>
                  <span
                    className={s.projectTitle}
                    style={{ color: t.projects.color }}
                  >
                    # {t.projects.title}
                  </span>
                </div>
                <div className={s.buttons}>
                  <button
                    className={s.button}
                    onClick={() => handleRestoreTask(t.id, "todo")}
                  >
                    restore
                  </button>
                  <button
                    className={s.button}
                    onClick={() =>
                      notify.modal.confirm(
                        "Are you sure you want to delete this task?",
                        null,
                        () => handleRemoveTask(t.id),
                      )
                    }
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Done;
