import type { FC } from "react";
import s from "./CustomDate.module.css";
import { dateChecker } from "../../../../helpers/dateChecker";

type Props = {
  due_date: string;
};

const CustomDate: FC<Props> = ({ due_date }) => {
  const dateStatus = dateChecker(due_date, 5);

  return (
    <div className={s.date}>
      <div className={s.dueDateContainer}>
        <span className={s.dueDateLabel}>End Date: </span>
        <span className={s.dueDate}>{due_date ? due_date : "Not set"}</span>
      </div>
      {dateStatus && (
        <div className={s.dataInfo}>
          <span
            className={`${s.dataInfoText} ${dateStatus === "Out of date" ? s.outOfDate : dateStatus === "Soon out of date" ? s.soonOutOfDate : s.upcoming}`}
          >
            {dateStatus}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomDate;
