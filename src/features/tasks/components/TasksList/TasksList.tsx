import type { FC } from "react";
import s from "./TasksList.module.css";
import type { Task } from "../../../../types/task";
import { Typography } from "antd";
import { useProjectTasksContext } from "../../../../context/ProjectTasksContext";

type Props = {
  tasks: Task[];
  removeTask: (id: string) => void;
  handleOpenModal: (task: Task) => void;
};

const TasksList: FC<Props> = ({ tasks }) => {
  const { editTask } = useProjectTasksContext();

  const handleUpdateTitle = async (newTitle: string, id: string) => {
    await editTask(id, { title: newTitle });
  };

  const handleUpdateDescription = async (newDesc: string, id: string) => {
    await editTask(id, { description: newDesc });
  };

  return (
    <>
      <ul className={s.list}>
        {tasks.map((t) => (
          <li className={s.item} key={t.id}>
            <div className={s.left}>
              <div className={s.itemInfo}>
                <Typography.Title
                  level={4}
                  className={s.title}
                  editable={{
                    triggerType: ["text"],
                    onChange: (newTitle) => {
                      if (newTitle === t.title) return;
                      handleUpdateTitle(newTitle, t.id);
                    },
                  }}
                >
                  {t.title}
                </Typography.Title>
                <Typography.Paragraph
                  editable={{
                    triggerType: ["text"],
                    onChange: (newDesc) => {
                      if (newDesc === t.description) return;
                      handleUpdateDescription(newDesc, t.id);
                    },
                  }}
                  className={s.subtitle}
                >
                  {t.description}
                </Typography.Paragraph>
              </div>
            </div>
            <div className={s.right}>
              <div className={s.date}>{t.due_date ?? "No date"}</div>
              <div
                className={s.priority}
                style={{
                  background:
                    t.priority === "high"
                      ? "#ef4444"
                      : t.priority === "medium"
                        ? "#f59e0b"
                        : "#22c55e",
                }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TasksList;
