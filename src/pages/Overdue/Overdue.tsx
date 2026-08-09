import s from "./Overdue.module.css";
import useOverdueTasks from "../../hooks/useOverdueTasks";
import { LoadingOutlined } from "@ant-design/icons";
import { Select, Spin } from "antd";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import TasksList from "../../features/overdue/components/TasksList/TasksList";
import EmptyState from "../../features/components/EmptyState/EmptyState";
import Empty from "../../../images/emptyOverdue.svg";
import useNotify from "../../hooks/useNotify";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  IconArrowDown,
  IconArrowUp,
  IconCalendarRepeat,
  IconFlag,
} from "@tabler/icons-react";
import type { SortBy } from "../../types/sort";

const Overdue = () => {
  const {
    overdueTasks,
    initialLoading,
    handleRemoveTask,
    handleDoneTask,
    handleReschedule,
    handleRescheduleAll,
    actionLoading,
  } = useOverdueTasks();

  const notify = useNotify();

  const [sortOption, setSortOption] = useState<SortBy>("due_date_desc");

  const sortedTasks = useMemo(() => {
    const sorted = [...overdueTasks];

    switch (sortOption) {
      case "priority": {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return sorted.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
        );
      }

      case "due_date_asc":
        return sorted.sort((a, b) => dayjs(a.due_date).diff(dayjs(b.due_date)));

      case "due_date_desc":
      default:
        return sorted.sort((a, b) => dayjs(b.due_date).diff(dayjs(a.due_date)));
    }
  }, [overdueTasks, sortOption]);

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
        <>
          <div className={s.actions}>
            <Select
              className={s.select}
              value={sortOption}
              defaultValue="due_date_asc"
              onChange={(value: SortBy) => setSortOption(value)}
              options={[
                {
                  label: (
                    <span className={s.optionLabel}>
                      <IconArrowDown size={14} />
                      Recently overdue
                    </span>
                  ),
                  value: "due_date_desc",
                },
                {
                  label: (
                    <span className={s.optionLabel}>
                      <IconArrowUp size={14} />
                      Longest overdue
                    </span>
                  ),
                  value: "due_date_asc",
                },
                {
                  label: (
                    <span className={s.optionLabel}>
                      <IconFlag size={14} />
                      Priority
                    </span>
                  ),
                  value: "priority",
                },
              ]}
            />
            <button
              className={s.rescheduleAllBtn}
              onClick={() =>
                notify.modal.confirm(
                  "Reschedule all tasks",
                  `Are you sure you want to reschedule all overdue tasks to today (${dayjs().format(
                    "D MMMM YYYY",
                  )})?`,
                  handleRescheduleAll,
                  450,
                )
              }
            >
              <IconCalendarRepeat size={17} />
              Reschedule all
            </button>
          </div>
          <TasksList
            overdueTasks={sortedTasks}
            handleRemove={handleRemoveTask}
            handleDone={handleDoneTask}
            handleReschedule={handleReschedule}
            actionLoading={actionLoading}
          />
        </>
      )}
    </div>
  );
};

export default Overdue;
