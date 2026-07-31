import s from "./Overdue.module.css";
import useOverdueTasks from "../../hooks/useOverdueTasks";
import { LoadingOutlined } from "@ant-design/icons";
import { Checkbox, Spin, Tooltip } from "antd";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import useNotify from "../../hooks/useNotify";

const Overdue = () => {
  const { overdueTasks, initialLoading, handleRemoveTask, handleDoneTask } =
    useOverdueTasks();

  const notify = useNotify();

  if (initialLoading)
    return (
      <div className={s.loading}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
      </div>
    );

  return (
    <div className={s.overdue}>
      <CustomHeader title="Your overdue tasks" />
      <ul className={s.list}>
        {overdueTasks.map((t) => (
          <li key={t.id} className={s.item}>
            <div className={s.content}>
              <Tooltip title="Mark as done" color={"green"} placement="left">
                <Checkbox onChange={() => handleDoneTask(t.id)} />
              </Tooltip>
              <div className={s.left}>
                <span className={s.title}>{t.title}</span>
                <span className={s.description}>{t.description}</span>
              </div>
              <div className={s.right}>
                <button
                  className={s.removeBtn}
                  onClick={() =>
                    notify.modal.confirm(
                      `Are you sure you want to delete ${t.title} task?`,
                      "This action cannot be undone",

                      () => handleRemoveTask(t.id),
                      450,
                    )
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Overdue;
