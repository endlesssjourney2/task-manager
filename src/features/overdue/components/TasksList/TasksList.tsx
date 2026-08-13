import type { FC } from "react";
import type { TasksWithProjects } from "../../../../types/task";
import s from "./TasksList.module.css";
import { Checkbox, DatePicker, Popover, Tooltip } from "antd";
import {
  OVERDUE_BG,
  OVERDUE_BORDER,
  OVERDUE_COLORS,
} from "../../../../constants/overdue";
import { getOverdueColor, relativeDate } from "../../../../helpers/dates";
import { IconCalendarExclamation, IconTrash } from "@tabler/icons-react";
import useNotify from "../../../../hooks/useNotify";
import dayjs from "dayjs";
import { QUICK_DATES } from "../../../../constants/dates";
import ProjectBadge from "../../../components/ProjectBadge/ProjectBadge";
import TaskInfoBadge from "../../../components/TaskInfoBadge/TaskInfoBadge";

type Props = {
  overdueTasks: TasksWithProjects[];
  handleDone: (taskId: string) => void;
  handleRemove: (taskId: string) => void;
  handleReschedule: (taskId: string, newDate: string) => void;
  actionLoading: boolean;
};

const TasksList: FC<Props> = ({
  overdueTasks,
  handleDone,
  handleRemove,
  handleReschedule,
  actionLoading,
}) => {
  const notify = useNotify();

  return (
    <ul className={s.list}>
      {overdueTasks.map((t) => {
        const overdueColor = getOverdueColor(t.due_date);

        return (
          <li key={t.id} className={s.item}>
            <div className={s.content}>
              <Tooltip title="Mark as done" color={"green"} placement="left">
                <Checkbox
                  onChange={() => handleDone(t.id)}
                  disabled={actionLoading}
                />
              </Tooltip>

              <div className={s.left}>
                <span className={s.title}>{t.title}</span>
                {t.description && (
                  <span className={s.description}>{t.description}</span>
                )}
              </div>
              <div className={s.right}>
                <TaskInfoBadge status={t.status} priority={t.priority} />
                <Popover
                  title={
                    <span className={s.subtitle}>New date for your task</span>
                  }
                  trigger={"click"}
                  placement="bottom"
                  arrow={{ pointAtCenter: true }}
                  content={
                    <div className={s.popover}>
                      <DatePicker
                        disabled={actionLoading}
                        format="DD MMMM YYYY"
                        onChange={(date) => {
                          if (date) {
                            handleReschedule(t.id, date.format("YYYY-MM-DD"));
                          }
                        }}
                        disabledDate={(curr) => curr.isBefore(dayjs(), "day")}
                      />
                      <div className={s.quickDates}>
                        {QUICK_DATES.map((q) => (
                          <Tooltip
                            title={`Reschedule to ${q.getValue().format("D MMM")}`}
                            key={q.label}
                            color={"blue"}
                          >
                            <button
                              disabled={actionLoading}
                              onClick={() =>
                                handleReschedule(
                                  t.id,
                                  q.getValue().format("YYYY-MM-DD"),
                                )
                              }
                              className={s.quickDateBtn}
                            >
                              {q.label}
                            </button>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  }
                >
                  <div
                    className={s.dateActions}
                    style={{
                      backgroundColor: OVERDUE_BG[overdueColor],
                      color: OVERDUE_COLORS[overdueColor],
                      borderColor: OVERDUE_BORDER[overdueColor],
                    }}
                  >
                    <IconCalendarExclamation size={14} />
                    <span>
                      {dayjs(t.due_date).format("D MMM")} (
                      {relativeDate(t.due_date)})
                    </span>
                  </div>
                </Popover>
                <ProjectBadge project={t.projects} id={t.project_id} />
                <div className={s.buttons}>
                  <button
                    className={s.removeBtn}
                    onClick={() =>
                      notify.modal.confirm(
                        `Are you sure you want to delete ${t.title} task?`,
                        "This action cannot be undone",

                        () => handleRemove(t.id),
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
        );
      })}
    </ul>
  );
};

export default TasksList;
