import s from "./Today.module.css";
import useTodayTasks from "../../hooks/useTodayTasks";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { Checkbox, Spin, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { nextMonday } from "../../helpers/dates";
import dayjs from "dayjs";
import { IconArrowRight, IconCalendarPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Today = () => {
  const {
    todayTasks,
    handleDoneTask,
    handleTomorrowUpdate,
    handleNextWeekUpdate,
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
                    # {t.projects.title}
                  </Link>
                </div>
                <div className={s.buttons}>
                  <button
                    disabled={actionLoading}
                    className={`${s.button}`}
                    onClick={() => handleTomorrowUpdate(t.id)}
                  >
                    <IconArrowRight size={14} />
                    {dayjs().add(1, "day").format("MMMM D")}
                  </button>

                  <button
                    disabled={actionLoading}
                    className={`${s.button}`}
                    onClick={() => handleNextWeekUpdate(t.id)}
                  >
                    <IconCalendarPlus size={14} />
                    {nextMonday(dayjs()).format("MMM D")}
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

export default Today;
