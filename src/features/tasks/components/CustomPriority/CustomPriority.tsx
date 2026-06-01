import type { FC } from "react";
import s from "./CustomPriority.module.css";
import { capitalizeFirst } from "../../../../helpers/capitalizeFirst";
import type { Priority } from "../../../../types/task";

type Props = {
  priority: Priority;
};

const CustomPriority: FC<Props> = ({ priority }) => {
  return (
    <div
      className={`${s.priority} ${priority === "low" ? s.lowBg : priority === "medium" ? s.mediumBg : s.highBg}`}
    >
      <span className={s.priorityInfo}>Priority:</span>
      <span
        className={`${s.priorityText} ${
          priority === "low" ? s.low : priority === "medium" ? s.medium : s.high
        }`}
      >
        {capitalizeFirst(priority)}
      </span>
    </div>
  );
};

export default CustomPriority;
