import s from "./StatusIcon.module.css";
import {
  IconCircle,
  IconCircleCheck,
  IconCircleHalf2,
} from "@tabler/icons-react";
import type { Status } from "../../../../../types/task";
import { STATUS_COLORS } from "../../../../../constants/status";
import type { FC } from "react";

type Props = {
  status: Status;
};

const StatusIcon: FC<Props> = ({ status }) => {
  if (status === "todo")
    return (
      <span className={s.label}>
        <IconCircle size={14} color={STATUS_COLORS.todo} /> Todo
      </span>
    );
  if (status === "in_progress")
    return (
      <span className={s.label}>
        <IconCircleHalf2 size={14} color={STATUS_COLORS.in_progress} /> In
        progress
      </span>
    );

  return (
    <span className={s.label}>
      <IconCircleCheck size={14} color={STATUS_COLORS.done} /> Done
    </span>
  );
};

export default StatusIcon;
