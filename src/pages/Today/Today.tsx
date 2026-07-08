import s from "./Today.module.css";
import useTodayTasks from "../../hooks/useTodayTasks";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { Checkbox, Spin, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Today = () => {
  const {
    todayTasks,
    handleDoneTask,
    handleTomorrowUpdate,
    handleNextWeekUpdate,
    initialLoading,
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
                <div className={s.buttons}>
                  <button
                    className={`${s.button}`}
                    onClick={() => handleTomorrowUpdate(t.id)}
                  >
                    Tomorrow
                  </button>

                  <button
                    className={`${s.button}`}
                    onClick={() => handleNextWeekUpdate(t.id)}
                  >
                    Next week
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
