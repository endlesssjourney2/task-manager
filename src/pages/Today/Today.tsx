import s from "./Today.module.css";
import useTodayTasks from "../../hooks/useTodayTasks";
import CustomHeader from "../../components/CustomHeader/CustomHeader";

const Today = () => {
  const { todayTasks } = useTodayTasks();

  return (
    <div className={s.today}>
      <CustomHeader title="Your today's tasks" />

      <ul className={s.list}>
        {todayTasks.map((t) => (
          <li key={t.id} className={s.item}>
            <div className={s.content}>
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
                {/* <div className={s.buttons}>
                  <button>Edit date</button> work in progress
                </div> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Today;
