import useDoneTasks from "../../hooks/useDoneTasks";
import s from "./Done.module.css";

const Done = () => {
  const { doneTasks } = useDoneTasks();

  return (
    <div className={s.done}>
      {doneTasks.map((t) => (
        <div key={t.id}>
          <div>{t.title}</div>
          <div>{t.description}</div>
          <div>{t.status}</div>
        </div>
      ))}
    </div>
  );
};

export default Done;
