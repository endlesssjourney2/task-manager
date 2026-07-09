import { Spin } from "antd";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { useDoneTasksContext } from "../../context/DoneTasksContext";
import { relativeDate } from "../../helpers/dates";
import useNotify from "../../hooks/useNotify";
import s from "./Done.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import {
  IconCircleCheck,
  IconClock,
  IconRotateClockwise2,
  IconTrash,
} from "@tabler/icons-react";

const DoneContent = () => {
  const { doneTasks, handleRestoreTask, handleRemoveTask, initialLoading } =
    useDoneTasksContext();

  const notify = useNotify();

  if (initialLoading)
    return (
      <div className={s.loading}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
      </div>
    );

  return (
    <div className={s.done}>
      <CustomHeader title="Your done tasks" />
      <ul className={s.list}>
        {doneTasks.map((t) => (
          <li key={t.id} className={s.item}>
            <IconCircleCheck stroke={2} color="#22c55e" className={s.status} />
            <div className={s.content}>
              <div className={s.left}>
                <h2
                  style={{
                    textDecoration: "line-through",
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
                <div
                  className={s.project}
                  style={{ backgroundColor: `${t.projects.color}26` }}
                >
                  <span
                    className={s.projectTitle}
                    style={{ color: t.projects.color }}
                  >
                    # {t.projects.title}
                  </span>
                </div>
                <span className={s.date}>
                  <IconClock size={14} />
                  {relativeDate(t.updated_at)}
                </span>
                <div className={s.buttons}>
                  <button
                    className={`${s.button} ${s.restoreButton}`}
                    onClick={() => handleRestoreTask(t.id)}
                  >
                    <IconRotateClockwise2 size={14} />
                    Restore
                  </button>
                  <button
                    className={`${s.button} ${s.removeButton}`}
                    onClick={() =>
                      notify.modal.confirm(
                        "Are you sure you want to delete this task?",
                        "This action cannot be undone",

                        () => handleRemoveTask(t.id),
                        450,
                      )
                    }
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
    </div>
  );
};

export default DoneContent;
