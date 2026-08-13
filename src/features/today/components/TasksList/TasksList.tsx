import type { FC } from "react";
import type { TasksWithProjects } from "../../../../types/task";
import s from "./TasksList.module.css";
import { Checkbox, Tooltip } from "antd";
import ProjectBadge from "../../../components/ProjectBadge/ProjectBadge";
import dayjs from "dayjs";
import { IconArrowRight, IconCalendarPlus } from "@tabler/icons-react";
import { nextMonday } from "../../../../helpers/dates";
import TaskInfoBadge from "../../../components/TaskInfoBadge/TaskInfoBadge";

type Props = {
  todayTasks: TasksWithProjects[];
  handleDone: (taskId: string) => void;
  handleReschedule: (taskId: string, newDate: string) => void;
  actionLoading: boolean;
};

const TasksList: FC<Props> = ({
  todayTasks,
  handleDone,
  handleReschedule,
  actionLoading,
}) => {
  return (
    <ul className={s.list}>
      {todayTasks.map((t) => (
        <li key={t.id} className={s.item}>
          <div className={s.content}>
            <Tooltip title="Mark as done" color={"green"} placement="left">
              <Checkbox onChange={() => handleDone(t.id)} />
            </Tooltip>

            <div className={s.left}>
              <h2 className={s.title}>{t.title}</h2>
            </div>
            <div className={s.right}>
              <TaskInfoBadge status={t.status} priority={t.priority} />
              <ProjectBadge project={t.projects} id={t.project_id} />
              <div className={s.buttons}>
                <button
                  disabled={actionLoading}
                  className={`${s.button}`}
                  onClick={() =>
                    handleReschedule(
                      t.id,
                      dayjs().add(1, "day").format("YYYY-MM-DD"),
                    )
                  }
                >
                  <IconArrowRight size={14} />
                  {dayjs().add(1, "day").format("MMMM D")}
                </button>

                <button
                  disabled={actionLoading}
                  className={`${s.button}`}
                  onClick={() =>
                    handleReschedule(
                      t.id,
                      nextMonday(dayjs()).format("YYYY-MM-DD"),
                    )
                  }
                >
                  <IconCalendarPlus size={14} />
                  {nextMonday(dayjs()).format("MMMM D")}
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TasksList;
