import s from "./Overdue.module.css";
import useOverdueTasks from "../../hooks/useOverdueTasks";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import TasksList from "../../features/overdue/components/TasksList/TasksList";
import EmptyState from "../../features/components/EmptyState/EmptyState";
import Empty from "../../../images/emptyOverdue.svg";

const Overdue = () => {
  const {
    overdueTasks,
    initialLoading,
    handleRemoveTask,
    handleDoneTask,
    handleReschedule,
    actionLoading,
  } = useOverdueTasks();

  if (initialLoading)
    return (
      <div className={s.loading}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
      </div>
    );

  return (
    <div className={s.overdue}>
      <CustomHeader title="Your overdue tasks" />
      {overdueTasks.length === 0 ? (
        <EmptyState image={Empty} description="No overdue tasks. nice work." />
      ) : (
        <TasksList
          overdueTasks={overdueTasks}
          handleRemove={handleRemoveTask}
          handleDone={handleDoneTask}
          handleReschedule={handleReschedule}
          actionLoading={actionLoading}
        />
      )}
    </div>
  );
};

export default Overdue;
