import s from "./Today.module.css";
import useTodayTasks from "../../hooks/useTodayTasks";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { Checkbox, Spin, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { nextMonday } from "../../helpers/dates";
import dayjs from "dayjs";
import {
  IconArrowRight,
  IconCalendarPlus,
  IconFolder,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import EmptyState from "../../features/components/EmptyState/EmptyState";
import Empty from "../../../images/emptyToday.svg";

const Today = () => {
  const {
    todayTasks,
    handleDoneTask,
    handleReschedule,
    initialLoading,
    actionLoading,
  } = useTodayTasks();

  if (initialLoading)
    return (
      <div className={s.loading}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
      </div>
    );

  return (
    <div className={s.today}>
      <CustomHeader title="Your today's tasks" />
      {todayTasks.length > 0 ? (
        <ul className={s.list}>
          {todayTasks.map((t) => (
            <li key={t.id} className={s.item}>
              <div className={s.content}>
                <Tooltip title="Mark as done" color={"green"} placement="left">
                  <Checkbox onChange={() => handleDoneTask(t.id)} />
                </Tooltip>

                <div className={s.left}>
                  <h2 className={s.title}>{t.title}</h2>
                </div>
                <div className={s.right}>
                  <div
                    className={s.project}
                    style={{ backgroundColor: `${t.projects.color}26` }}
                  >
                    <Link
                      className={s.projectTitle}
                      style={{ color: t.projects.color }}
                      to={`/app/project/${t.project_id}`}
                    >
                      <IconFolder size={14} />
                      <span>{t.projects.title}</span>
                    </Link>
                  </div>
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
      ) : (
        <EmptyState
          image={Empty}
          description="No tasks today. Enjoy your day!"
        />
      )}
    </div>
  );
};

export default Today;
