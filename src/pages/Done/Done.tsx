import CustomHeader from "../../components/CustomHeader/CustomHeader";
import useDoneTasks from "../../hooks/useDoneTasks";
import s from "./Done.module.css";

const Done = () => {
  const { doneTasks } = useDoneTasks();

  return (
    <div className={s.done}>
      <CustomHeader title="Your done tasks" />
      <div className={s.content}>
        <ul className={s.list}>
          {doneTasks.map((t) => (
            <li key={t.id} className={s.item}>
              <div className={s.status}></div>
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Done;
