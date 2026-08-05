import s from "./Today.module.css";
import useTodayTasks from "../../hooks/useTodayTasks";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import EmptyState from "../../features/components/EmptyState/EmptyState";
import Empty from "../../../images/emptyToday.svg";
import TasksList from "../../features/today/components/TasksList/TasksList";

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
        <TasksList
          todayTasks={todayTasks}
          handleDone={handleDoneTask}
          handleReschedule={handleReschedule}
          actionLoading={actionLoading}
        />
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
